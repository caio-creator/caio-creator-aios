import fs from 'fs';
import path from 'path';
import { REPO_ROOT } from '../server';

export interface Agent {
  id: string;
  name: string;
  source: 'aios-core' | 'creative-hub';
  file: string;
}

const AGENT_DIRS = [
  { dir: '.aios-core/development/agents', source: 'aios-core' as const },
  { dir: 'creative-hub/agents', source: 'creative-hub' as const },
];

export function parseAgents(): Agent[] {
  const agents: Agent[] = [];

  for (const { dir, source } of AGENT_DIRS) {
    const fullDir = path.join(REPO_ROOT, dir);
    if (!fs.existsSync(fullDir)) continue;

    const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const id = file.replace('.md', '');
      agents.push({ id, name: `@${id}`, source, file: path.join(dir, file) });
    }
  }

  return agents;
}
