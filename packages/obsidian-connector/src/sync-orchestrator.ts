/**
 * Sync Orchestrator - Manages polling loop and job queue
 * Coordinates vault scanning, trigger detection, and agent dispatch
 */

import { EventEmitter } from 'events'
import { createLogger } from 'pino'
import {
  VaultConfig,
  SyncJob,
  TriggerMatch,
  VaultNote,
  ConnectorState,
} from './types'
import { VaultScanner } from './vault-scanner'

const logger = createLogger({ name: 'sync-orchestrator' })

export type JobHandler = (job: SyncJob) => Promise<void>

export class SyncOrchestrator extends EventEmitter {
  private scanner: VaultScanner
  private config: VaultConfig
  private pollInterval: NodeJS.Timer | null = null
  private jobHandlers: Map<string, JobHandler> = new Map()
  private isPolling = false

  constructor(config: VaultConfig) {
    super()
    this.config = config
    this.scanner = new VaultScanner(config)
  }

  /**
   * Register handler for job type
   * Handler is called when job of that type is dequeued
   */
  registerHandler(jobType: string, handler: JobHandler): void {
    this.jobHandlers.set(jobType, handler)
    logger.info(`Registered handler for job type: ${jobType}`)
  }

  /**
   * START: Begin polling vault at configured interval
   */
  async startPolling(): Promise<void> {
    if (this.isPolling) {
      logger.warn('Polling already active')
      return
    }

    this.isPolling = true
    logger.info(
      `Starting vault polling every ${this.config.pollInterval}ms`
    )

    // Run immediately, then on interval
    await this.performSync()

    this.pollInterval = setInterval(
      () => this.performSync(),
      this.config.pollInterval
    )

    this.emit('polling-started')
  }

  /**
   * STOP: Stop polling vault
   */
  stopPolling(): void {
    if (this.pollInterval) {
      clearInterval(this.pollInterval)
      this.pollInterval = null
    }

    this.isPolling = false
    logger.info('Vault polling stopped')
    this.emit('polling-stopped')
  }

  /**
   * SYNC: One cycle of vault scanning and job detection
   * This is called every 5 minutes (or on manual trigger)
   */
  async performSync(): Promise<void> {
    if (!this.isPolling && this.pollInterval === null) {
      logger.debug('Sync skipped (not in polling mode)')
      return
    }

    const syncStartTime = Date.now()
    logger.info('Starting vault sync...')

    try {
      // 1. Scan vault for all markdown files
      const notes = await this.scanner.scanVault()

      // 2. Detect triggers (notes that need processing)
      const triggers = this.scanner.detectTriggers(notes)

      // 3. Create jobs for triggered notes
      const newJobs = this.createJobsFromTriggers(triggers)

      // 4. Enqueue jobs
      this.enqueueJobs(newJobs)

      // 5. Process job queue
      await this.processQueue()

      const syncTime = Date.now() - syncStartTime
      logger.info(`Vault sync complete in ${syncTime}ms`)
      this.emit('sync-complete', {
        notesScanned: notes.length,
        triggersDetected: triggers.length,
        jobsCreated: newJobs.length,
        jobsProcessed: newJobs.length,
        timeMs: syncTime,
      })
    } catch (error) {
      logger.error('Vault sync failed', { error })
      this.emit('sync-error', error)
    }
  }

  /**
   * Manual sync (for CLI: aios sync:obsidian --now)
   * Bypasses polling interval, runs immediately
   */
  async syncNow(): Promise<void> {
    logger.info('Manual sync triggered')
    await this.performSync()
  }

  /**
   * Get current orchestrator state
   */
  getState(): ConnectorState {
    return this.scanner.getState()
  }

  /**
   * INTERNAL: Convert trigger matches to sync jobs
   */
  private createJobsFromTriggers(triggers: TriggerMatch[]): SyncJob[] {
    const jobs: SyncJob[] = []

    for (const trigger of triggers) {
      // Skip if already processing this note
      const state = this.scanner.getState()
      if (state.processingNotes.has(trigger.note.filePath)) {
        logger.debug(
          `Skipping ${trigger.note.fileName}: already processing`
        )
        continue
      }

      // Skip if already synced recently (within 10 minutes)
      if (trigger.note.lastSyncedAt) {
        const timeSinceSync =
          Date.now() - trigger.note.lastSyncedAt.getTime()
        if (timeSinceSync < 10 * 60 * 1000) {
          logger.debug(
            `Skipping ${trigger.note.fileName}: recently synced (${timeSinceSync}ms ago)`
          )
          continue
        }
      }

      const job: SyncJob = {
        id: `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        note: trigger.note,
        type: trigger.jobType,
        status: 'queued',
        createdAt: new Date(),
        retries: 0,
      }

      jobs.push(job)
      logger.info(
        `Created job ${job.id} for note: ${trigger.note.fileName} (${trigger.jobType})`
      )
    }

    return jobs
  }

  /**
   * INTERNAL: Add jobs to queue
   */
  private enqueueJobs(jobs: SyncJob[]): void {
    const state = this.scanner.getState()

    for (const job of jobs) {
      state.jobQueue.push(job)
      logger.debug(`Enqueued job: ${job.id}`)
    }

    this.emit('jobs-enqueued', jobs.length)
  }

  /**
   * INTERNAL: Process all queued jobs
   * Calls appropriate handler for each job type
   */
  private async processQueue(): Promise<void> {
    const state = this.scanner.getState()
    const jobs = state.jobQueue.splice(0) // Drain queue

    if (jobs.length === 0) {
      logger.debug('Job queue is empty')
      return
    }

    logger.info(`Processing ${jobs.length} jobs from queue`)

    for (const job of jobs) {
      try {
        // Mark as processing
        job.status = 'processing'
        job.startedAt = new Date()
        state.processingNotes.set(job.note.filePath, job)

        logger.info(`Processing job ${job.id} (${job.type})`)

        // Get handler for this job type
        const handler = this.jobHandlers.get(job.type)
        if (!handler) {
          throw new Error(`No handler registered for job type: ${job.type}`)
        }

        // Execute handler
        await handler(job)

        // Mark as complete
        job.status = 'completed'
        job.completedAt = new Date()
        state.stats.jobsProcessed++

        logger.info(`Job ${job.id} completed`)
        this.emit('job-completed', job)
      } catch (error) {
        job.status = 'failed'
        job.completedAt = new Date()
        job.result = {
          success: false,
          message: 'Job failed',
          error: String(error),
        }
        state.stats.jobsFailed++

        logger.error(`Job ${job.id} failed`, { error })
        this.emit('job-failed', job, error)
      } finally {
        // Remove from processing
        state.processingNotes.delete(job.note.filePath)
      }
    }
  }
}

/**
 * Factory function for easy initialization
 */
export function createSyncOrchestrator(config: VaultConfig): SyncOrchestrator {
  return new SyncOrchestrator(config)
}
