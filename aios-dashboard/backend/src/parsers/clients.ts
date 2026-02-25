import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { REPO_ROOT } from '../server';

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

export function parseClients(): Client[] {
  const statusPath = path.join(REPO_ROOT, '.aios', 'project-status.yaml');
  if (!fs.existsSync(statusPath)) return [];

  const raw = fs.readFileSync(statusPath, 'utf-8');
  const doc = yaml.load(raw) as Record<string, unknown>;
  const clients = doc.clients as Record<string, Partial<Client>> ?? {};

  return Object.entries(clients).map(([slug, data]) => ({
    slug,
    status: data.status ?? 'unknown',
    phase: data.phase ?? '',
    completion: data.completion ?? 0,
    priority: data.priority ?? 'none',
    next_action: data.next_action ?? '',
    stack: data.stack,
    local_url: data.local_url,
  }));
}
