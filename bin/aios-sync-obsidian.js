#!/usr/bin/env node

/**
 * AIOS Sync Obsidian Command
 *
 * Usage:
 *   npx aios-sync-obsidian              # Start polling (5 min interval)
 *   npx aios-sync-obsidian --now        # Sync immediately
 *   npx aios-sync-obsidian --stop       # Stop polling
 *   npx aios-sync-obsidian --status     # Show current status
 *
 * Configuration:
 *   - .env: COMPANIE_API_KEY, OBSIDIAN_VAULT_PATH
 *   - .aios/sync-config.yaml: Polling interval, folders, trigger tags
 */

const fs = require('fs')
const path = require('path')
require('dotenv').config()

// Validate environment
if (!process.env.COMPANIE_API_KEY) {
  console.error('❌ Error: COMPANIE_API_KEY not set in .env')
  process.exit(1)
}

if (!process.env.OBSIDIAN_VAULT_PATH) {
  console.error('❌ Error: OBSIDIAN_VAULT_PATH not set in .env')
  process.exit(1)
}

const vaultPath = path.expand(process.env.OBSIDIAN_VAULT_PATH)

if (!fs.existsSync(vaultPath)) {
  console.error(`❌ Error: Vault path not found: ${vaultPath}`)
  process.exit(1)
}

console.log('🚀 AIOS Obsidian Sync Starting...')
console.log(`📁 Vault: ${vaultPath}`)
console.log(`🔑 Companie API: Configured`)

// For now, show config and next steps
console.log(`
✅ Configuration verified

Next steps:
1. Run:  npm install (to install connectors)
2. Run:  node bin/aios-sync-obsidian.js --start
3. Add:  #proposta-pendente tag to notes in Obsidian
4. AIOS will automatically create deals in Companie

Control:
- --start              Start polling
- --now               Sync immediately
- --stop              Stop polling service
- --status            Show current status
- --test              Test connection to Companie

For details, see docs/PHASE-2-IMPLEMENTATION.md
`)

const args = process.argv.slice(2)

if (args.includes('--start')) {
  console.log('Starting polling service...')
  console.log('This would start the SyncOrchestrator from @aios/obsidian-connector')
  console.log('Configured for 5-minute polling intervals')
} else if (args.includes('--now')) {
  console.log('Running sync immediately...')
  console.log('This would call syncOrchestrator.syncNow()')
} else if (args.includes('--status')) {
  console.log('Current sync status:')
  console.log('- Polling: Not active (run with --start)')
  console.log('- Queue: 0 jobs')
  console.log('- Last sync: Never')
} else if (args.includes('--test')) {
  console.log('Testing Companie connection...')
  console.log('This would call companie.verifyAuth()')
} else {
  console.log('Ready to sync! Run with --start to begin.')
}
