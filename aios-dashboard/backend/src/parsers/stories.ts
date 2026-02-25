import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { REPO_ROOT } from '../server';

export interface Story {
  id: string;
  title: string;
  status: string;
  file: string;
}

function findStoryFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...findStoryFiles(full));
    else if (entry.name.endsWith('.story.md')) files.push(full);
  }
  return files;
}

export function parseStories(): Story[] {
  const storiesDir = path.join(REPO_ROOT, 'docs', 'stories');
  const files = findStoryFiles(storiesDir);

  return files.map(file => {
    const raw = fs.readFileSync(file, 'utf-8');
    const { data } = matter(raw);
    const relFile = path.relative(REPO_ROOT, file);
    return {
      id: data.id ?? path.basename(file, '.story.md'),
      title: data.title ?? path.basename(file, '.story.md'),
      status: data.status ?? 'Draft',
      file: relFile,
    };
  });
}

export function updateStoryStatus(relFile: string, newStatus: string): void {
  const fullPath = path.join(REPO_ROOT, relFile);
  let content = fs.readFileSync(fullPath, 'utf-8');
  content = content.replace(/^(status:\s*)(.+)$/m, `$1${newStatus}`);
  fs.writeFileSync(fullPath, content, 'utf-8');
}
