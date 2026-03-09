/**
 * Type definitions for Obsidian Vault Connector
 * File system polling based integration
 */

export interface VaultNote {
  /** Full file path */
  filePath: string

  /** File name without extension */
  fileName: string

  /** Note title (from H1 or metadata) */
  title: string

  /** YAML frontmatter as parsed object */
  metadata: Record<string, any>

  /** Note body (markdown content) */
  body: string

  /** All tags in note (from metadata + inline tags) */
  tags: string[]

  /** Last modified timestamp */
  modifiedAt: Date

  /** When note was last synced to external system */
  lastSyncedAt?: Date

  /** Sync status */
  syncStatus?: 'pending' | 'syncing' | 'synced' | 'error'

  /** Client name (extracted from folder path) */
  clientName?: string

  /** Project type (from folder structure) */
  projectType?: 'proposta' | 'projeto' | 'relatorio' | 'doc'
}

export interface SyncJob {
  /** Unique job ID */
  id: string

  /** Source note */
  note: VaultNote

  /** Job type (what should happen) */
  type: 'generate-proposal' | 'create-project' | 'generate-report' | 'custom'

  /** Job status */
  status: 'queued' | 'processing' | 'completed' | 'failed' | 'blocked'

  /** When job was created */
  createdAt: Date

  /** When job started processing */
  startedAt?: Date

  /** When job completed */
  completedAt?: Date

  /** Job result or error message */
  result?: {
    success: boolean
    message: string
    data?: Record<string, any>
    error?: string
  }

  /** Retry count */
  retries?: number
}

export interface VaultConfig {
  /** Path to Obsidian vault root */
  vaultPath: string

  /** Polling interval in milliseconds */
  pollInterval: number

  /** Projects folder path (e.g., "1-PROJECTS") */
  projectsFolder: string

  /** Resources folder path (e.g., "3-RESOURCES") */
  resourcesFolder: string

  /** Archive folder path (e.g., "4-ARCHIVE") */
  archiveFolder: string

  /** Tags that trigger automations */
  triggerTags: {
    proposal: string
    project: string
    report: string
  }

  /** Sync output directory */
  syncLogPath: string
}

export interface ConnectorState {
  /** Last sync timestamp */
  lastSyncAt: Date

  /** Currently processing notes */
  processingNotes: Map<string, SyncJob>

  /** Job queue */
  jobQueue: SyncJob[]

  /** Error logs */
  errors: Array<{
    timestamp: Date
    note: string
    error: string
  }>

  /** Statistics */
  stats: {
    totalScans: number
    notesFound: number
    jobsProcessed: number
    jobsFailed: number
  }
}

export interface TriggerMatch {
  /** Matched note */
  note: VaultNote

  /** Which trigger was matched */
  triggerTag: string

  /** Job type to create */
  jobType: SyncJob['type']

  /** Confidence score (0-1) */
  confidence: number

  /** Reason for match */
  reason: string
}
