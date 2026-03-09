/**
 * Vault Scanner - Reads Obsidian vault files and detects triggers
 * File system based polling approach
 */

import fs from 'fs'
import path from 'path'
import YAML from 'yaml'
import { createLogger } from 'pino'
import {
  VaultNote,
  VaultConfig,
  TriggerMatch,
  ConnectorState,
} from './types'

const logger = createLogger({ name: 'vault-scanner' })

export class VaultScanner {
  private config: VaultConfig
  private state: ConnectorState

  constructor(config: VaultConfig) {
    this.config = config
    this.state = {
      lastSyncAt: new Date(),
      processingNotes: new Map(),
      jobQueue: [],
      errors: [],
      stats: {
        totalScans: 0,
        notesFound: 0,
        jobsProcessed: 0,
        jobsFailed: 0,
      },
    }
  }

  /**
   * STEP 1: Scan vault and find all markdown files
   */
  async scanVault(): Promise<VaultNote[]> {
    logger.info(`Scanning vault at ${this.config.vaultPath}`)

    const notes: VaultNote[] = []
    const { projectsFolder } = this.config

    try {
      // Scan 1-PROJECTS folder recursively
      const projectPath = path.join(
        this.config.vaultPath,
        projectsFolder
      )

      if (!fs.existsSync(projectPath)) {
        logger.warn(`Projects folder not found: ${projectPath}`)
        return notes
      }

      const files = this.walkDir(projectPath)

      for (const filePath of files) {
        if (!filePath.endsWith('.md')) continue

        try {
          const note = await this.parseNote(filePath)
          notes.push(note)
        } catch (error) {
          logger.error(`Failed to parse note: ${filePath}`, { error })
          this.state.errors.push({
            timestamp: new Date(),
            note: filePath,
            error: String(error),
          })
        }
      }

      this.state.stats.totalScans++
      this.state.stats.notesFound = notes.length
      logger.info(`Vault scan complete: ${notes.length} notes found`)

      return notes
    } catch (error) {
      logger.error('Vault scan failed', { error })
      throw error
    }
  }

  /**
   * STEP 2: Parse individual note (YAML frontmatter + body)
   */
  async parseNote(filePath: string): Promise<VaultNote> {
    const content = fs.readFileSync(filePath, 'utf-8')
    const fileName = path.basename(filePath, '.md')

    // Split frontmatter and body
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)

    let metadata: Record<string, any> = {}
    let body = content

    if (frontmatterMatch) {
      try {
        metadata = YAML.parse(frontmatterMatch[1]) || {}
        body = frontmatterMatch[2]
      } catch (error) {
        logger.warn(`Failed to parse YAML in ${fileName}`, { error })
      }
    }

    // Extract tags from metadata and inline
    const tags = this.extractTags(metadata, body)

    // Extract client name from folder path
    const clientName = this.extractClientName(filePath)

    // Extract H1 as title
    const titleMatch = body.match(/^# (.+)$/m)
    const title = titleMatch ? titleMatch[1] : metadata.title || fileName

    // Get file modification time
    const stats = fs.statSync(filePath)
    const modifiedAt = stats.mtime

    return {
      filePath,
      fileName,
      title,
      metadata,
      body,
      tags,
      modifiedAt,
      clientName,
      projectType: this.detectProjectType(filePath),
      syncStatus: metadata.syncStatus || 'pending',
      lastSyncedAt: metadata.lastSyncedAt
        ? new Date(metadata.lastSyncedAt)
        : undefined,
    }
  }

  /**
   * STEP 3: Detect triggers based on tags
   */
  detectTriggers(notes: VaultNote[]): TriggerMatch[] {
    const matches: TriggerMatch[] = []

    for (const note of notes) {
      // Check for proposal trigger
      if (note.tags.includes(this.config.triggerTags.proposal)) {
        matches.push({
          note,
          triggerTag: this.config.triggerTags.proposal,
          jobType: 'generate-proposal',
          confidence: 0.95,
          reason: `Note has trigger tag: ${this.config.triggerTags.proposal}`,
        })
      }

      // Check for project trigger
      if (note.tags.includes(this.config.triggerTags.project)) {
        matches.push({
          note,
          triggerTag: this.config.triggerTags.project,
          jobType: 'create-project',
          confidence: 0.95,
          reason: `Note has trigger tag: ${this.config.triggerTags.project}`,
        })
      }

      // Check for report trigger
      if (note.tags.includes(this.config.triggerTags.report)) {
        matches.push({
          note,
          triggerTag: this.config.triggerTags.report,
          jobType: 'generate-report',
          confidence: 0.95,
          reason: `Note has trigger tag: ${this.config.triggerTags.report}`,
        })
      }
    }

    logger.info(`Found ${matches.length} trigger matches`)
    return matches
  }

  /**
   * Get current state and statistics
   */
  getState(): ConnectorState {
    return this.state
  }

  /**
   * Helper: Walk directory recursively
   */
  private walkDir(dir: string): string[] {
    let files: string[] = []

    const entries = fs.readdirSync(dir)

    for (const entry of entries) {
      const fullPath = path.join(dir, entry)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        files = files.concat(this.walkDir(fullPath))
      } else {
        files.push(fullPath)
      }
    }

    return files
  }

  /**
   * Helper: Extract all tags from note
   */
  private extractTags(metadata: Record<string, any>, body: string): string[] {
    const tags: Set<string> = new Set()

    // Tags from metadata
    if (metadata.tags) {
      const metaTags = Array.isArray(metadata.tags)
        ? metadata.tags
        : [metadata.tags]

      for (const tag of metaTags) {
        tags.add(String(tag).toLowerCase().replace(/^#/, ''))
      }
    }

    // Tags from body text (#tag pattern)
    const bodyTagMatches = body.match(/#[\w-]+/g) || []
    for (const match of bodyTagMatches) {
      tags.add(match.toLowerCase().substring(1))
    }

    return Array.from(tags)
  }

  /**
   * Helper: Extract client name from folder path
   * Example: /Obsidian/1-PROJECTS/Malta-Rentals/proposta.md → "Malta Rentals"
   */
  private extractClientName(filePath: string): string | undefined {
    const parts = filePath.split(path.sep)
    const projectsIndex = parts.findIndex((p) =>
      p.includes(this.config.projectsFolder)
    )

    if (projectsIndex !== -1 && projectsIndex + 1 < parts.length) {
      const clientFolder = parts[projectsIndex + 1]
      return clientFolder.replace(/-/g, ' ')
    }

    return undefined
  }

  /**
   * Helper: Detect project type from folder/filename
   */
  private detectProjectType(
    filePath: string
  ): 'proposta' | 'projeto' | 'relatorio' | 'doc' {
    const lower = filePath.toLowerCase()

    if (lower.includes('proposta')) return 'proposta'
    if (lower.includes('projeto')) return 'projeto'
    if (lower.includes('relatorio') || lower.includes('report'))
      return 'relatorio'

    return 'doc'
  }
}

/**
 * Export factory function for easy initialization
 */
export function createVaultScanner(config: VaultConfig): VaultScanner {
  return new VaultScanner(config)
}
