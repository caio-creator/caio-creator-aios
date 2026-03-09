/**
 * Note Updater - Updates Obsidian notes with sync results
 * Writes metadata back to frontmatter after processing
 */

import fs from 'fs'
import YAML from 'yaml'
import { createLogger } from 'pino'

const logger = createLogger({ name: 'note-updater' })

export interface UpdatePayload {
  /** Remove these tags */
  removeTags?: string[]

  /** Add these tags */
  addTags?: string[]

  /** Metadata to merge into frontmatter */
  metadata?: Record<string, any>

  /** Optional: Append text to note body */
  appendText?: string
}

/**
 * Update note with sync results
 * Writes updated YAML frontmatter and optionally appends text
 */
export async function updateNoteMetadata(
  filePath: string,
  updates: UpdatePayload
): Promise<void> {
  try {
    // 1. Read file
    const content = fs.readFileSync(filePath, 'utf-8')

    // 2. Parse frontmatter and body
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)

    if (!frontmatterMatch) {
      logger.warn(`No frontmatter found in ${filePath}, skipping update`)
      return
    }

    let metadata: Record<string, any> = {}
    try {
      metadata = YAML.parse(frontmatterMatch[1]) || {}
    } catch (error) {
      logger.warn(`Failed to parse existing YAML in ${filePath}`)
    }

    let body = frontmatterMatch[2]

    // 3. Apply updates
    // Remove tags
    if (updates.removeTags) {
      if (!Array.isArray(metadata.tags)) {
        metadata.tags = []
      }

      metadata.tags = (metadata.tags as string[]).filter(
        (tag: string) => !updates.removeTags!.includes(tag)
      )
    }

    // Add tags
    if (updates.addTags) {
      if (!Array.isArray(metadata.tags)) {
        metadata.tags = []
      }

      for (const tag of updates.addTags) {
        if (!metadata.tags.includes(tag)) {
          metadata.tags.push(tag)
        }
      }
    }

    // Merge metadata
    if (updates.metadata) {
      Object.assign(metadata, updates.metadata)
    }

    // Append text
    if (updates.appendText) {
      body = body + '\n\n' + updates.appendText
    }

    // 4. Write file
    const newContent = `---\n${YAML.stringify(metadata)}---\n${body}`
    fs.writeFileSync(filePath, newContent, 'utf-8')

    logger.info(`Updated note: ${filePath}`)
  } catch (error) {
    logger.error(`Failed to update note ${filePath}`, { error })
    throw error
  }
}

/**
 * Batch update notes
 */
export async function batchUpdateNotes(
  updates: Array<{ filePath: string; updates: UpdatePayload }>
): Promise<void> {
  logger.info(`Batch updating ${updates.length} notes`)

  const results = await Promise.allSettled(
    updates.map((item) =>
      updateNoteMetadata(item.filePath, item.updates)
    )
  )

  const failures = results.filter((r) => r.status === 'rejected')
  if (failures.length > 0) {
    logger.warn(`${failures.length} updates failed`)
  }
}
