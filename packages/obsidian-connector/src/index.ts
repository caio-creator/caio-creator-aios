/**
 * @aios/obsidian-connector
 * Obsidian Vault Connector - File system polling based integration
 *
 * Usage:
 * const { createSyncOrchestrator } = require('@aios/obsidian-connector')
 * const orchestrator = createSyncOrchestrator({
 *   vaultPath: '/Users/you/Obsidian',
 *   pollInterval: 5 * 60 * 1000,
 *   projectsFolder: '1-PROJECTS',
 *   resourcesFolder: '3-RESOURCES',
 *   archiveFolder: '4-ARCHIVE',
 *   triggerTags: {
 *     proposal: 'proposta-pendente',
 *     project: 'projeto-novo',
 *     report: 'relatorio-pendente'
 *   },
 *   syncLogPath: '.aios/sync-logs'
 * })
 *
 * orchestrator.registerHandler('generate-proposal', proposalHandler)
 * await orchestrator.startPolling()
 */

export {
  VaultNote,
  SyncJob,
  VaultConfig,
  ConnectorState,
  TriggerMatch,
} from './types'

export { VaultScanner, createVaultScanner } from './vault-scanner'

export {
  SyncOrchestrator,
  JobHandler,
  createSyncOrchestrator,
} from './sync-orchestrator'

export { updateNoteMetadata } from './note-updater'
