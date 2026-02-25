import fs from 'fs';
import path from 'path';
import { REPO_ROOT } from '../server';

export interface Module {
  id: string;
  name: string;
  slug: string;
  order: number;
  path: string;
}

const MODULE_LABELS: Record<string, string> = {
  '01-branding': 'Branding',
  '02-second-brain': 'Second Brain',
  '03-agenting': 'Agenting',
  '04-content-production': 'Content Production',
  '05-gpt-builder': 'GPT Builder',
};

export function parseModules(): Module[] {
  const modulesDir = path.join(REPO_ROOT, 'creative-hub', 'modules');
  if (!fs.existsSync(modulesDir)) return [];

  return fs.readdirSync(modulesDir)
    .filter(d => fs.statSync(path.join(modulesDir, d)).isDirectory())
    .sort()
    .map((slug, index) => ({
      id: slug,
      name: MODULE_LABELS[slug] ?? slug,
      slug,
      order: index + 1,
      path: path.join('creative-hub/modules', slug),
    }));
}
