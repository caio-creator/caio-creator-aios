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
};
