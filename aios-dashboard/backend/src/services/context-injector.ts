import fs from 'fs';
import path from 'path';

interface FrontmatterData {
  [key: string]: unknown;
}

interface ExtractedContext {
  status: string;
  files: Array<{
    name: string;
    content: string;
  }>;
}

function extractFrontmatter(
  content: string
): { data: FrontmatterData; body: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { data: {}, body: content };
  }

  const frontmatterStr = match[1];
  const body = match[2];

  // Simple YAML parser for basic frontmatter
  const data: FrontmatterData = {};
  frontmatterStr.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      data[key.trim()] = value.replace(/^['"]|['"]$/g, '');
    }
  });

  return { data, body };
}

export async function injectClientContext(
  clientSlug: string
): Promise<ExtractedContext> {
  const vaultPath = process.env.OBSIDIAN_VAULT_PATH;

  if (!vaultPath) {
    return {
      status: 'no_vault_configured',
      files: [],
    };
  }

  const clientPath = path.join(vaultPath, '1-PROJECTS', clientSlug);

  if (!fs.existsSync(clientPath)) {
    return {
      status: 'client_not_found',
      files: [],
    };
  }

  // Find up to 3 most relevant .md files
  const mdFiles = fs
    .readdirSync(clientPath)
    .filter(f => f.endsWith('.md'))
    .slice(0, 3);

  const files = mdFiles
    .map(filename => {
      try {
        const filePath = path.join(clientPath, filename);
        const content = fs.readFileSync(filePath, 'utf-8');
        const { data, body } = extractFrontmatter(content);

        // Limit body to 2000 chars
        const limitedBody = body.substring(0, 2000);

        return {
          name: filename,
          content: `## ${filename}\n\n${limitedBody}`,
        };
      } catch {
        return null;
      }
    })
    .filter((f): f is { name: string; content: string } => f !== null);

  return {
    status: files.length > 0 ? 'success' : 'no_files',
    files,
  };
}

export function formatContextAsPrompt(clientSlug: string, context: ExtractedContext): string {
  if (context.status === 'no_vault_configured') {
    return '';
  }

  if (context.files.length === 0) {
    return '';
  }

  const fileContent = context.files
    .map(f => f.content)
    .join('\n\n---\n\n');

  return `
## Client Context: ${clientSlug}

Below is relevant context from the client project directory. Use this to personalize responses:

${fileContent}

---
`;
}
