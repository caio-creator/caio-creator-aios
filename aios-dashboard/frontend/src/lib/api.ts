const BASE = '/api';

export interface Client {
  slug: string;
  status: string;
  phase: string;
  completion: number;
  priority: string;
  next_action: string;
  stack?: string;
  local_url?: string;
}

export interface Story {
  id: string;
  title: string;
  status: string;
  file: string;
}

export interface Agent {
  id: string;
  name: string;
  source: 'aios-core' | 'creative-hub';
  file: string;
}

export interface Module {
  id: string;
  name: string;
  slug: string;
  order: number;
  path: string;
}

async function get<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE}${endpoint}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json() as Promise<T>;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface Session {
  id: string;
  agentId: string;
  clientSlug?: string;
  title: string;
  messages: ChatMessage[];
  model?: string;
  createdAt: string;
  updatedAt: string;
}

export const api = {
  clients: () => get<Client[]>('/clients'),
  stories: () => get<Story[]>('/stories'),
  agents: () => get<Agent[]>('/agents'),
  modules: () => get<Module[]>('/modules'),
  updateStoryStatus: (id: string, file: string, status: string) =>
    fetch(`${BASE}/stories/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file, status }),
    }).then(r => r.json()),

  sessions: {
    list: () => get<Session[]>('/sessions'),
    get: (id: string) => get<Session>(`/sessions/${id}`),
    create: (agentId: string, clientSlug?: string) =>
      fetch(`${BASE}/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId, clientSlug }),
      }).then(r => r.json() as Promise<Session>),
  },

  chat: {
    stream: (params: {
      agentId: string;
      messages: ChatMessage[];
      clientSlug?: string;
      sessionId?: string;
    }) => fetch(`${BASE}/chat/stream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    }),
  },
};
