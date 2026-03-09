import Database from 'better-sqlite3';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import os from 'os';
import fs from 'fs';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface Session {
  id: string;
  agentId: string;
  clientSlug?: string;
  title: string;
  messages: Message[];
  model?: string;
  createdAt: string;
  updatedAt: string;
}

const DB_PATH = path.join(os.homedir(), '.aios-chat', 'sessions.db');

class SQLiteSessionStore {
  private db: Database.Database;

  constructor() {
    // Ensure directory exists
    const dbDir = path.dirname(DB_PATH);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    this.db = new Database(DB_PATH);
    this.db.pragma('journal_mode = WAL');
    this.initializeSchema();
  }

  private initializeSchema() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        agent_id TEXT NOT NULL,
        client_slug TEXT,
        title TEXT NOT NULL,
        model TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        session_id TEXT NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
        content TEXT NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_messages_session_id ON messages(session_id);
      CREATE INDEX IF NOT EXISTS idx_sessions_updated_at ON sessions(updated_at DESC);
    `);
  }

  createSession(agentId: string, clientSlug?: string): Session {
    const id = uuidv4();
    const now = new Date().toISOString();

    const stmt = this.db.prepare(`
      INSERT INTO sessions (id, agent_id, client_slug, title, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    stmt.run(id, agentId, clientSlug || null, 'New Conversation', now, now);

    return {
      id,
      agentId,
      clientSlug,
      title: 'New Conversation',
      messages: [],
      createdAt: now,
      updatedAt: now,
    };
  }

  getSession(id: string): Session | null {
    const sessionStmt = this.db.prepare(`
      SELECT id, agent_id as agentId, client_slug as clientSlug, title, model, created_at as createdAt, updated_at as updatedAt
      FROM sessions
      WHERE id = ?
    `);

    const session = sessionStmt.get(id) as any;
    if (!session) return null;

    const messagesStmt = this.db.prepare(`
      SELECT role, content
      FROM messages
      WHERE session_id = ?
      ORDER BY created_at ASC
    `);

    const messages = messagesStmt.all(id) as Message[];

    return {
      ...session,
      messages,
      clientSlug: session.clientSlug || undefined,
      model: session.model || undefined,
    };
  }

  listSessions(): Session[] {
    const sessionsStmt = this.db.prepare(`
      SELECT id, agent_id as agentId, client_slug as clientSlug, title, model, created_at as createdAt, updated_at as updatedAt
      FROM sessions
      ORDER BY updated_at DESC
    `);

    const sessions = sessionsStmt.all() as any[];

    return sessions.map(session => ({
      ...session,
      messages: [], // Don't include messages in list view
      clientSlug: session.clientSlug || undefined,
      model: session.model || undefined,
    }));
  }

  appendMessage(sessionId: string, message: Message): Session | null {
    const session = this.getSession(sessionId);
    if (!session) return null;

    const id = uuidv4();
    const now = new Date().toISOString();

    const stmt = this.db.prepare(`
      INSERT INTO messages (id, session_id, role, content, created_at)
      VALUES (?, ?, ?, ?, ?)
    `);

    stmt.run(id, sessionId, message.role, message.content, now);

    // Update session updated_at
    const updateStmt = this.db.prepare(`
      UPDATE sessions SET updated_at = ? WHERE id = ?
    `);
    updateStmt.run(now, sessionId);

    return this.getSession(sessionId);
  }

  updateTitle(sessionId: string, title: string): Session | null {
    const session = this.getSession(sessionId);
    if (!session) return null;

    const stmt = this.db.prepare(`
      UPDATE sessions SET title = ?, updated_at = ? WHERE id = ?
    `);

    stmt.run(title, new Date().toISOString(), sessionId);

    return this.getSession(sessionId);
  }

  updateModel(sessionId: string, model: string): Session | null {
    const session = this.getSession(sessionId);
    if (!session) return null;

    const stmt = this.db.prepare(`
      UPDATE sessions SET model = ?, updated_at = ? WHERE id = ?
    `);

    stmt.run(model, new Date().toISOString(), sessionId);

    return this.getSession(sessionId);
  }

  close() {
    this.db.close();
  }
}

export const sessionStore = new SQLiteSessionStore();
