/**
 * Sales Agent - Generate and sync proposals to Companie
 *
 * This is the main implementation of the proposal automation workflow.
 * It coordinates Obsidian reading, proposal generation, and Companie syncing.
 */

import { createLogger } from 'pino'
import type { SyncJob, VaultNote, JobHandler } from '@aios/obsidian-connector'
import { updateNoteMetadata } from '@aios/obsidian-connector'
import type { CompanieClient } from '@aios/companie-connector'
import { createCompanieClient } from '@aios/companie-connector'

const logger = createLogger({ name: 'sales-agent' })

export interface SalesAgentConfig {
  companieApiKey: string
  companieApiBase: string
  brandBookPath: string
  templatesPath: string
  vaultPath: string
}

/**
 * Main Sales Agent Handler
 * Called by SyncOrchestrator when a proposal job is dequeued
 */
export async function createSalesAgentHandler(
  config: SalesAgentConfig
): Promise<JobHandler> {
  const companie = createCompanieClient({
    apiKey: config.companieApiKey,
    apiBase: config.companieApiBase,
  })

  return async (job: SyncJob) => {
    logger.info(`Sales Agent processing job ${job.id}`)

    try {
      const note = job.note

      // Step 1: Extract proposal data from note
      const proposalData = extractProposalData(note)
      logger.debug('Extracted proposal data', { proposalData })

      // Step 2: Find or create client in Companie
      const client = await findOrCreateCompanieClient(
        companie,
        proposalData
      )
      logger.info(`Client resolved: ${client.id}`)

      // Step 3: Create deal in Companie
      const deal = await companie.createDeal({
        title: proposalData.title,
        stage: 'proposal',
        value: proposalData.value,
        currency: 'BRL',
        client_id: client.id,
        description: proposalData.description,
        tags: ['aios-generated', 'proposal'],
        metadata: {
          source: 'aios-sales-agent',
          obsidian_note: note.filePath,
          generated_at: new Date().toISOString(),
          version: '1.0',
        },
      })

      logger.info(`Deal created in Companie: ${deal.id}`)

      // Step 4: Update Obsidian note with results
      await updateNoteMetadata(note.filePath, {
        removeTags: ['proposta-pendente'],
        addTags: ['proposta-criada', 'aios-processed'],
        metadata: {
          companieDealId: deal.id,
          companieLink: `https://app.companie.app/deals/${deal.id}`,
          syncedAt: new Date().toISOString(),
          syncStatus: 'synced',
        },
        appendText: generateSyncNotification(deal),
      })

      logger.info(`Note updated: ${note.filePath}`)

      // Step 5: Return success
      job.result = {
        success: true,
        message: `Proposal synced to Companie (deal ${deal.id})`,
        data: {
          dealId: deal.id,
          dealLink: `https://app.companie.app/deals/${deal.id}`,
          clientId: client.id,
        },
      }

      logger.info(`Job ${job.id} completed successfully`)
    } catch (error) {
      logger.error(`Sales Agent job failed: ${job.id}`, { error })

      // Mark note as error for manual review
      try {
        await updateNoteMetadata(job.note.filePath, {
          addTags: ['proposta-erro'],
          appendText: generateErrorNotification(error),
        })
      } catch (updateError) {
        logger.error('Failed to update note with error', { updateError })
      }

      // Re-throw to let orchestrator handle
      throw error
    }
  }
}

/**
 * Extract proposal data from Obsidian note
 */
function extractProposalData(note: VaultNote): {
  title: string
  clientName: string
  value: number
  description: string
  dueDate?: string
} {
  // Title: Use frontmatter title or note title
  const title = note.metadata.title || note.title

  // Client: From folder path or metadata
  const clientName =
    note.metadata.client || note.clientName || 'Unknown Client'

  // Value: From metadata
  const value = note.metadata.value || 0

  // Description: From body or metadata
  const description =
    note.metadata.description || note.body.substring(0, 500)

  // Due date: From metadata
  const dueDate = note.metadata.dueDate

  return {
    title,
    clientName,
    value,
    description,
    dueDate,
  }
}

/**
 * Find or create client in Companie
 */
async function findOrCreateCompanieClient(
  companie: any,
  proposalData: {
    clientName: string
    value: number
    description: string
  }
): Promise<CompanieClient> {
  // Try to find existing client by name
  const { data: existingClients } = await companie.listClients({
    name: proposalData.clientName,
  })

  if (existingClients.length > 0) {
    logger.info(`Found existing client: ${existingClients[0].id}`)
    return existingClients[0]
  }

  // Create new client
  logger.info(`Creating new client: ${proposalData.clientName}`)
  return await companie.createClient({
    name: proposalData.clientName,
    metadata: {
      source: 'aios-sales-agent',
      createdAt: new Date().toISOString(),
    },
  })
}

/**
 * Generate sync notification text for Obsidian
 */
function generateSyncNotification(deal: any): string {
  return `
---

## ✅ Sync Status

**Status:** Synced to Companie
**Deal ID:** \`${deal.id}\`
**Deal Link:** [View in Companie](https://app.companie.app/deals/${deal.id})
**Synced At:** ${new Date().toISOString()}
**Value:** R$ ${deal.value.toLocaleString('pt-BR')}

This proposal was automatically synced by AIOS Sales Agent.
Any changes to the proposal should be updated in Companie.
`
}

/**
 * Generate error notification text
 */
function generateErrorNotification(error: unknown): string {
  const message =
    error instanceof Error ? error.message : String(error)

  return `
---

## ❌ Sync Error

**Status:** Failed
**Error:** ${message}
**Time:** ${new Date().toISOString()}

This proposal could not be synced to Companie automatically.
Tagged with #proposta-erro for manual review.

**Next Steps:**
1. Review the error above
2. Fix the issue in the note
3. Remove #proposta-erro tag
4. Add #proposta-pendente tag to retry
`
}

/**
 * Export handler factory
 */
export async function createSalesAgent(
  config: SalesAgentConfig
): Promise<JobHandler> {
  return createSalesAgentHandler(config)
}
