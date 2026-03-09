import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import os from 'os';

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

const SESSION_DIR = path.join(os.homedir(), '.aios-sessions');

function ensureSessionDir() {
  if (!fs.existsSync(SESSION_DIR)) {
    fs.mkdirSync(SESSION_DIR, { recursive: true });
  }
}

function getSessionFile(id: string): string {
  return path.join(SESSION_DIR, `${id}.json`);
}

export const sessionStore = {
  createSession(agentId: string, clientSlug?: string): Session {
    ensureSessionDir();
    const id = uuidv4();
    const now = new Date().toISOString();
    const session: Session = {
      id,
      agentId,
      clientSlug,
      title: 'New Conversation',
      messages: [],
      createdAt: now,
      updatedAt: now,
    };
    fs.writeFileSync(getSessionFile(id), JSON.stringify(session, null, 2));
    return session;
  },

  getSession(id: string): Session | null {
    ensureSessionDir();
    const file = getSessionFile(id);
    if (!fs.existsSync(file)) return null;
    const data = fs.readFileSync(file, 'utf-8');
    return JSON.parse(data);
  },

  listSessions(): Session[] {
    ensureSessionDir();
    const files = fs.readdirSync(SESSION_DIR).filter(f => f.endsWith('.json'));
    const sessions = files
      .map(f => {
        try {
          const data = fs.readFileSync(path.join(SESSION_DIR, f), 'utf-8');
          return JSON.parse(data) as Session;
        } catch {
          return null;
        }
      })
      .filter((s): s is Session => s !== null);

    // Sort by updatedAt descending
    return sessions.sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  },

  appendMessage(sessionId: string, message: Message): Session | null {
    const session = this.getSession(sessionId);
    if (!session) return null;

    session.messages.push(message);
    session.updatedAt = new Date().toISOString();

    fs.writeFileSync(getSessionFile(sessionId), JSON.stringify(session, null, 2));
    return session;
  },

  updateTitle(sessionId: string, title: string): Session | null {
    const session = this.getSession(sessionId);
    if (!session) return null;

    session.title = title;
    session.updatedAt = new Date().toISOString();

    fs.writeFileSync(getSessionFile(sessionId), JSON.stringify(session, null, 2));
    return session;
  },

  updateModel(sessionId: string, model: string): Session | null {
    const session = this.getSession(sessionId);
    if (!session) return null;

    session.model = model;
    session.updatedAt = new Date().toISOString();

    fs.writeFileSync(getSessionFile(sessionId), JSON.stringify(session, null, 2));
    return session;
  },
};
