# AIOS Dashboard — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Construir um dashboard web local (React + Vite + Express) que centraliza todos os projetos, stories, agentes e módulos do AIOS em uma interface visual com design system próprio.

**Architecture:** Backend Express (port 3002) lê arquivos YAML/MD do filesystem do AIOS em tempo real e expõe endpoints REST. Frontend React + Vite (port 5175) consome esses endpoints via proxy e renderiza o cockpit completo. Sem banco de dados — filesystem é a fonte de verdade.

**Tech Stack:** React 18, Vite 5, React Router v6, Express, TypeScript, js-yaml, gray-matter, concurrently, CSS Modules + CSS custom properties.

**Caminhos importantes (relativos à raiz do repo):**
- Projeto status: `.aios/project-status.yaml`
- Agentes AIOS: `.aios-core/development/agents/*.md`
- Agentes Creative Hub: `creative-hub/agents/*.md`
- Módulos: `creative-hub/modules/`
- Stories: `docs/stories/` (pode estar vazio no início — tratar graciosamente)
- Dashboard: `aios-dashboard/`

---

## Task 1: Scaffold do Backend

**Files:**
- Create: `aios-dashboard/backend/package.json`
- Create: `aios-dashboard/backend/tsconfig.json`
- Create: `aios-dashboard/backend/src/server.ts`

**Step 1: Criar `aios-dashboard/backend/package.json`**

```json
{
  "name": "aios-dashboard-backend",
  "version": "1.0.0",
  "scripts": {
    "dev": "ts-node-dev --respawn src/server.ts",
    "build": "tsc"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "gray-matter": "^4.0.3",
    "js-yaml": "^4.1.0"
  },
  "devDependencies": {
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/js-yaml": "^4.0.9",
    "@types/node": "^20.11.0",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.3.3"
  }
}
```

**Step 2: Criar `aios-dashboard/backend/tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

**Step 3: Criar `aios-dashboard/backend/src/server.ts`**

```typescript
import express from 'express';
import cors from 'cors';
import path from 'path';

export const REPO_ROOT = path.resolve(__dirname, '../../../../');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true, repoRoot: REPO_ROOT });
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`AIOS Dashboard Backend running at http://localhost:${PORT}`);
  console.log(`Repo root: ${REPO_ROOT}`);
});
```

**Step 4: Instalar dependências e verificar health**

```bash
cd aios-dashboard/backend && npm install
npm run dev
# Em outro terminal:
curl http://localhost:3002/health
```

Esperado: `{"ok":true,"repoRoot":"/Users/caio_almeida/Documents/caio-creator-aios"}`

**Step 5: Commit**

```bash
git add aios-dashboard/backend/
git commit -m "feat(dashboard): scaffold backend Express + health endpoint"
```

---

## Task 2: Parser e API de Clientes

**Files:**
- Create: `aios-dashboard/backend/src/parsers/clients.ts`
- Create: `aios-dashboard/backend/src/routes/clients.ts`
- Modify: `aios-dashboard/backend/src/server.ts`

**Step 1: Criar `aios-dashboard/backend/src/parsers/clients.ts`**

```typescript
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
```

**Step 2: Criar `aios-dashboard/backend/src/routes/clients.ts`**

```typescript
import { Router } from 'express';
import { parseClients } from '../parsers/clients';

const router = Router();

router.get('/', (_req, res) => {
  try {
    res.json(parseClients());
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

export default router;
```

**Step 3: Registrar rota no `server.ts`**

Adicionar após as imports existentes:
```typescript
import clientsRouter from './routes/clients';
// ...
app.use('/api/clients', clientsRouter);
```

**Step 4: Testar**

```bash
curl http://localhost:3002/api/clients | python3 -m json.tool
```

Esperado: array de objetos com slug, status, completion, etc.

**Step 5: Commit**

```bash
git add aios-dashboard/backend/src/parsers/clients.ts aios-dashboard/backend/src/routes/clients.ts aios-dashboard/backend/src/server.ts
git commit -m "feat(dashboard): clients parser + GET /api/clients"
```

---

## Task 3: Parser e API de Agentes

**Files:**
- Create: `aios-dashboard/backend/src/parsers/agents.ts`
- Create: `aios-dashboard/backend/src/routes/agents.ts`
- Modify: `aios-dashboard/backend/src/server.ts`

**Step 1: Criar `aios-dashboard/backend/src/parsers/agents.ts`**

```typescript
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
```

**Step 2: Criar `aios-dashboard/backend/src/routes/agents.ts`**

```typescript
import { Router } from 'express';
import { parseAgents } from '../parsers/agents';

const router = Router();

router.get('/', (_req, res) => {
  try {
    res.json(parseAgents());
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

export default router;
```

**Step 3: Registrar no `server.ts`**

```typescript
import agentsRouter from './routes/agents';
app.use('/api/agents', agentsRouter);
```

**Step 4: Testar**

```bash
curl http://localhost:3002/api/agents | python3 -m json.tool
```

Esperado: array com ~14 agentes (aios-master, dev, qa, architect, etc.)

**Step 5: Commit**

```bash
git add aios-dashboard/backend/src/parsers/agents.ts aios-dashboard/backend/src/routes/agents.ts aios-dashboard/backend/src/server.ts
git commit -m "feat(dashboard): agents parser + GET /api/agents"
```

---

## Task 4: Parser e API de Módulos

**Files:**
- Create: `aios-dashboard/backend/src/parsers/modules.ts`
- Create: `aios-dashboard/backend/src/routes/modules.ts`
- Modify: `aios-dashboard/backend/src/server.ts`

**Step 1: Criar `aios-dashboard/backend/src/parsers/modules.ts`**

```typescript
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
```

**Step 2: Criar `aios-dashboard/backend/src/routes/modules.ts`**

```typescript
import { Router } from 'express';
import { parseModules } from '../parsers/modules';

const router = Router();

router.get('/', (_req, res) => {
  try {
    res.json(parseModules());
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

export default router;
```

**Step 3: Registrar no `server.ts`**

```typescript
import modulesRouter from './routes/modules';
app.use('/api/modules', modulesRouter);
```

**Step 4: Testar**

```bash
curl http://localhost:3002/api/modules | python3 -m json.tool
```

Esperado: 5 módulos (branding, second-brain, agenting, content-production, gpt-builder)

**Step 5: Commit**

```bash
git add aios-dashboard/backend/src/parsers/modules.ts aios-dashboard/backend/src/routes/modules.ts aios-dashboard/backend/src/server.ts
git commit -m "feat(dashboard): modules parser + GET /api/modules"
```

---

## Task 5: Parser e API de Stories (GET + PATCH status)

**Files:**
- Create: `aios-dashboard/backend/src/parsers/stories.ts`
- Create: `aios-dashboard/backend/src/routes/stories.ts`
- Modify: `aios-dashboard/backend/src/server.ts`

**Step 1: Criar `aios-dashboard/backend/src/parsers/stories.ts`**

```typescript
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
```

**Step 2: Criar `aios-dashboard/backend/src/routes/stories.ts`**

```typescript
import { Router } from 'express';
import { parseStories, updateStoryStatus } from '../parsers/stories';

const router = Router();

router.get('/', (_req, res) => {
  try {
    res.json(parseStories());
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

router.patch('/:id/status', (req, res) => {
  const { file, status } = req.body as { file: string; status: string };
  const VALID = ['Draft', 'Ready', 'InProgress', 'InReview', 'Done'];
  if (!VALID.includes(status)) {
    res.status(400).json({ error: `Status inválido. Use: ${VALID.join(', ')}` });
    return;
  }
  try {
    updateStoryStatus(file, status);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

export default router;
```

**Step 3: Registrar no `server.ts`**

```typescript
import storiesRouter from './routes/stories';
app.use('/api/stories', storiesRouter);
```

**Step 4: Testar**

```bash
curl http://localhost:3002/api/stories | python3 -m json.tool
```

Esperado: array vazio `[]` (sem stories ainda) ou lista de stories se existirem.

**Step 5: Commit**

```bash
git add aios-dashboard/backend/src/parsers/stories.ts aios-dashboard/backend/src/routes/stories.ts aios-dashboard/backend/src/server.ts
git commit -m "feat(dashboard): stories parser + GET /api/stories + PATCH status"
```

---

## Task 6: Scaffold do Frontend

**Files:**
- Create: `aios-dashboard/frontend/package.json`
- Create: `aios-dashboard/frontend/vite.config.ts`
- Create: `aios-dashboard/frontend/index.html`
- Create: `aios-dashboard/frontend/src/main.tsx`
- Create: `aios-dashboard/frontend/src/App.tsx`
- Create: `aios-dashboard/frontend/tsconfig.json`

**Step 1: Criar `aios-dashboard/frontend/package.json`**

```json
{
  "name": "aios-dashboard-frontend",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.55",
    "@types/react-dom": "^18.2.19",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.3.3",
    "vite": "^5.1.0"
  }
}
```

**Step 2: Criar `aios-dashboard/frontend/vite.config.ts`**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    proxy: {
      '/api': {
        target: 'http://localhost:3002',
        changeOrigin: true,
      },
    },
  },
});
```

**Step 3: Criar `aios-dashboard/frontend/tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

**Step 4: Criar `aios-dashboard/frontend/index.html`**

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AIOS Dashboard</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Step 5: Criar `aios-dashboard/frontend/src/main.tsx`**

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './design-system/tokens.css';
import './design-system/base.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

**Step 6: Criar `aios-dashboard/frontend/src/App.tsx`**

```tsx
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ClientsPage } from './pages/ClientsPage';
import { StoriesPage } from './pages/StoriesPage';
import { AgentsPage } from './pages/AgentsPage';
import { ModulesPage } from './pages/ModulesPage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/stories" element={<StoriesPage />} />
        <Route path="/agents" element={<AgentsPage />} />
        <Route path="/modules" element={<ModulesPage />} />
      </Routes>
    </Layout>
  );
}
```

**Step 7: Instalar e iniciar**

```bash
cd aios-dashboard/frontend && npm install && npm run dev
```

Esperado: Vite rodando em http://localhost:5175 (com erro temporário de imports que ainda não existem)

**Step 8: Commit**

```bash
git add aios-dashboard/frontend/
git commit -m "feat(dashboard): scaffold frontend React + Vite + React Router"
```

---

## Task 7: Design System — Tokens e Base CSS

**Files:**
- Create: `aios-dashboard/frontend/src/design-system/tokens.css`
- Create: `aios-dashboard/frontend/src/design-system/base.css`

**Step 1: Criar `aios-dashboard/frontend/src/design-system/tokens.css`**

```css
:root {
  /* Colors */
  --color-bg:           #0A0A0F;
  --color-surface:      #141418;
  --color-surface-2:    #1A1A22;
  --color-border:       #1E1E26;
  --color-text:         #FFFFFF;
  --color-text-muted:   #8B8B9E;
  --color-accent:       #6E56CF;
  --color-accent-hover: #7C65DD;

  /* Status */
  --color-active:    #22C55E;
  --color-progress:  #F59E0B;
  --color-pending:   #6B7280;
  --color-delivered: #3B82F6;
  --color-done:      #22C55E;

  /* Spacing */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;

  /* Typography */
  --font-family: 'Inter', system-ui, sans-serif;
  --text-xs:   12px;
  --text-sm:   14px;
  --text-base: 16px;
  --text-lg:   20px;
  --text-xl:   24px;
  --text-2xl:  32px;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* Sidebar */
  --sidebar-width: 240px;
  --topbar-height: 56px;
}
```

**Step 2: Criar `aios-dashboard/frontend/src/design-system/base.css`**

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html, body, #root {
  height: 100%;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-family);
  font-size: var(--text-base);
  -webkit-font-smoothing: antialiased;
}

a { color: inherit; text-decoration: none; }
button { cursor: pointer; font-family: inherit; }
```

**Step 3: Verificar no browser**

Abrir `http://localhost:5175` — deve mostrar fundo escuro `#0A0A0F`.

**Step 4: Commit**

```bash
git add aios-dashboard/frontend/src/design-system/
git commit -m "feat(dashboard): design system tokens + base CSS"
```

---

## Task 8: Componentes de Layout — Sidebar e TopBar

**Files:**
- Create: `aios-dashboard/frontend/src/components/Layout.tsx`
- Create: `aios-dashboard/frontend/src/components/Layout.module.css`
- Create: `aios-dashboard/frontend/src/components/Sidebar.tsx`
- Create: `aios-dashboard/frontend/src/components/Sidebar.module.css`

**Step 1: Criar `aios-dashboard/frontend/src/components/Sidebar.tsx`**

```tsx
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: '⌂' },
  { to: '/clients', label: 'Clientes', icon: '◈' },
  { to: '/stories', label: 'Stories', icon: '◉' },
  { to: '/agents', label: 'Agentes', icon: '◎' },
  { to: '/modules', label: 'Módulos', icon: '⬡' },
];

export function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={styles.logoAccent}>AIOS</span>
        <span className={styles.logoSub}> Dashboard</span>
      </div>
      <ul className={styles.nav}>
        {NAV_ITEMS.map(({ to, label, icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ''}`
              }
            >
              <span className={styles.icon}>{icon}</span>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className={styles.footer}>
        <span className={styles.version}>v1.0 · local</span>
      </div>
    </nav>
  );
}
```

**Step 2: Criar `aios-dashboard/frontend/src/components/Sidebar.module.css`**

```css
.sidebar {
  width: var(--sidebar-width);
  height: 100vh;
  background: var(--color-surface);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
}

.logo {
  padding: var(--space-6) var(--space-6) var(--space-4);
  font-size: var(--text-lg);
  font-weight: 600;
  border-bottom: 1px solid var(--color-border);
}

.logoAccent { color: var(--color-accent); }
.logoSub { color: var(--color-text-muted); font-weight: 400; font-size: var(--text-sm); }

.nav {
  list-style: none;
  padding: var(--space-4) var(--space-3);
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.navItem {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  transition: background 0.15s, color 0.15s;
}

.navItem:hover { background: var(--color-surface-2); color: var(--color-text); }

.active {
  background: color-mix(in srgb, var(--color-accent) 15%, transparent);
  color: var(--color-text);
}

.icon { font-size: var(--text-base); width: 20px; text-align: center; }

.footer {
  padding: var(--space-4) var(--space-6);
  border-top: 1px solid var(--color-border);
}

.version { font-size: var(--text-xs); color: var(--color-text-muted); }
```

**Step 3: Criar `aios-dashboard/frontend/src/components/Layout.tsx`**

```tsx
import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import styles from './Layout.module.css';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
```

**Step 4: Criar `aios-dashboard/frontend/src/components/Layout.module.css`**

```css
.layout {
  display: flex;
  min-height: 100vh;
}

.main {
  margin-left: var(--sidebar-width);
  flex: 1;
  padding: var(--space-8);
  max-width: 1200px;
}
```

**Step 5: Verificar no browser**

Sidebar escura com itens de navegação deve aparecer em `http://localhost:5175`.

**Step 6: Commit**

```bash
git add aios-dashboard/frontend/src/components/
git commit -m "feat(dashboard): Sidebar e Layout components"
```

---

## Task 9: Componentes Base — StatusBadge, MetricPill, Cards

**Files:**
- Create: `aios-dashboard/frontend/src/components/StatusBadge.tsx`
- Create: `aios-dashboard/frontend/src/components/StatusBadge.module.css`
- Create: `aios-dashboard/frontend/src/components/MetricPill.tsx`
- Create: `aios-dashboard/frontend/src/components/MetricPill.module.css`
- Create: `aios-dashboard/frontend/src/components/ProjectCard.tsx`
- Create: `aios-dashboard/frontend/src/components/ProjectCard.module.css`
- Create: `aios-dashboard/frontend/src/components/AgentCard.tsx`
- Create: `aios-dashboard/frontend/src/components/AgentCard.module.css`

**Step 1: Criar `aios-dashboard/frontend/src/components/StatusBadge.tsx`**

```tsx
import styles from './StatusBadge.module.css';

type Status = 'active' | 'in-progress' | 'pending' | 'delivered' | 'completed' | 'done' | 'draft' | 'ready' | 'inprogress' | 'inreview' | string;

const LABEL_MAP: Record<string, string> = {
  active: 'Ativo', 'in-progress': 'Em Progresso', pending: 'Pendente',
  delivered: 'Entregue', completed: 'Concluído', done: 'Done',
  draft: 'Draft', ready: 'Ready', inprogress: 'InProgress',
  inreview: 'InReview',
};

export function StatusBadge({ status }: { status: Status }) {
  const key = status.toLowerCase().replace(/\s/g, '');
  return (
    <span className={`${styles.badge} ${styles[key] ?? styles.pending}`}>
      {LABEL_MAP[key] ?? status}
    </span>
  );
}
```

**Step 2: Criar `aios-dashboard/frontend/src/components/StatusBadge.module.css`**

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 2px var(--space-2);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: 0.02em;
}

.active, .completed, .done    { background: color-mix(in srgb, var(--color-active) 15%, transparent); color: var(--color-active); }
.inprogress, .inreview        { background: color-mix(in srgb, var(--color-progress) 15%, transparent); color: var(--color-progress); }
.pending, .draft               { background: color-mix(in srgb, var(--color-pending) 15%, transparent); color: var(--color-pending); }
.delivered, .ready             { background: color-mix(in srgb, var(--color-delivered) 15%, transparent); color: var(--color-delivered); }
```

**Step 3: Criar `aios-dashboard/frontend/src/components/MetricPill.tsx`**

```tsx
import styles from './MetricPill.module.css';

export function MetricPill({ label, value }: { label: string; value: number | string }) {
  return (
    <div className={styles.pill}>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
```

**Step 4: Criar `aios-dashboard/frontend/src/components/MetricPill.module.css`**

```css
.pill {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-4) var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  min-width: 120px;
}

.value {
  font-size: var(--text-2xl);
  font-weight: 600;
  color: var(--color-text);
  line-height: 1;
}

.label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

**Step 5: Criar `aios-dashboard/frontend/src/components/ProjectCard.tsx`**

```tsx
import { StatusBadge } from './StatusBadge';
import styles from './ProjectCard.module.css';
import type { Client } from '../lib/api';

export function ProjectCard({ client }: { client: Client }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.name}>{client.slug}</span>
        <StatusBadge status={client.status} />
      </div>
      <p className={styles.phase}>{client.phase}</p>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${client.completion}%` }} />
      </div>
      <div className={styles.footer}>
        <span className={styles.completion}>{client.completion}%</span>
        <span className={styles.next}>{client.next_action}</span>
      </div>
    </div>
  );
}
```

**Step 6: Criar `aios-dashboard/frontend/src/components/ProjectCard.module.css`**

```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  transition: border-color 0.15s;
}

.card:hover { border-color: var(--color-accent); }

.header { display: flex; justify-content: space-between; align-items: center; }

.name {
  font-size: var(--text-base);
  font-weight: 600;
  text-transform: capitalize;
}

.phase { font-size: var(--text-sm); color: var(--color-text-muted); }

.progressBar {
  height: 4px;
  background: var(--color-border);
  border-radius: 2px;
  overflow: hidden;
}

.progressFill {
  height: 100%;
  background: var(--color-accent);
  border-radius: 2px;
  transition: width 0.3s;
}

.footer { display: flex; justify-content: space-between; align-items: center; }

.completion { font-size: var(--text-xs); color: var(--color-text-muted); }

.next {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
}
```

**Step 7: Criar `aios-dashboard/frontend/src/components/AgentCard.tsx`**

```tsx
import styles from './AgentCard.module.css';
import type { Agent } from '../lib/api';

const SOURCE_LABELS = { 'aios-core': 'AIOS Core', 'creative-hub': 'Creative Hub' };

export function AgentCard({ agent }: { agent: Agent }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.name}>{agent.name}</span>
        <span className={styles.source}>{SOURCE_LABELS[agent.source]}</span>
      </div>
      <p className={styles.id}>{agent.id}</p>
    </div>
  );
}
```

**Step 8: Criar `aios-dashboard/frontend/src/components/AgentCard.module.css`**

```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  transition: border-color 0.15s;
}

.card:hover { border-color: var(--color-accent); }

.header { display: flex; justify-content: space-between; align-items: center; }

.name { font-size: var(--text-sm); font-weight: 600; }

.source {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  background: var(--color-surface-2);
  padding: 2px var(--space-2);
  border-radius: var(--radius-sm);
}

.id { font-size: var(--text-xs); color: var(--color-text-muted); }
```

**Step 9: Commit**

```bash
git add aios-dashboard/frontend/src/components/
git commit -m "feat(dashboard): StatusBadge, MetricPill, ProjectCard, AgentCard"
```

---

## Task 10: API Client Tipado

**Files:**
- Create: `aios-dashboard/frontend/src/lib/api.ts`

**Step 1: Criar `aios-dashboard/frontend/src/lib/api.ts`**

```typescript
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
```

**Step 2: Commit**

```bash
git add aios-dashboard/frontend/src/lib/api.ts
git commit -m "feat(dashboard): typed API client"
```

---

## Task 11: Home Page

**Files:**
- Create: `aios-dashboard/frontend/src/pages/HomePage.tsx`
- Create: `aios-dashboard/frontend/src/pages/HomePage.module.css`

**Step 1: Criar `aios-dashboard/frontend/src/pages/HomePage.tsx`**

```tsx
import { useEffect, useState } from 'react';
import { api, Client, Story, Agent } from '../lib/api';
import { MetricPill } from '../components/MetricPill';
import { ProjectCard } from '../components/ProjectCard';
import styles from './HomePage.module.css';

export function HomePage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.clients(), api.stories(), api.agents()])
      .then(([c, s, a]) => { setClients(c); setStories(s); setAgents(a); })
      .finally(() => setLoading(false));
  }, []);

  const active = clients.filter(c => c.status === 'active');
  const inProgress = stories.filter(s => s.status === 'InProgress');

  if (loading) return <p className={styles.loading}>Carregando...</p>;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>AIOS Dashboard</h1>
      <p className={styles.subtitle}>Synkra AIOS · Caio Almeida</p>

      <div className={styles.metrics}>
        <MetricPill label="Clientes" value={clients.length} />
        <MetricPill label="Ativos" value={active.length} />
        <MetricPill label="Stories" value={stories.length} />
        <MetricPill label="Agentes" value={agents.length} />
        <MetricPill label="Em Progresso" value={inProgress.length} />
      </div>

      <section>
        <h2 className={styles.sectionTitle}>Projetos Ativos</h2>
        <div className={styles.grid}>
          {active.map(client => (
            <ProjectCard key={client.slug} client={client} />
          ))}
          {active.length === 0 && (
            <p className={styles.empty}>Nenhum projeto ativo.</p>
          )}
        </div>
      </section>
    </div>
  );
}
```

**Step 2: Criar `aios-dashboard/frontend/src/pages/HomePage.module.css`**

```css
.page { display: flex; flex-direction: column; gap: var(--space-8); }

.title { font-size: var(--text-2xl); font-weight: 600; }

.subtitle { font-size: var(--text-sm); color: var(--color-text-muted); margin-top: calc(-1 * var(--space-6)); }

.metrics { display: flex; gap: var(--space-4); flex-wrap: wrap; }

.sectionTitle { font-size: var(--text-lg); font-weight: 600; margin-bottom: var(--space-4); }

.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-4); }

.loading { color: var(--color-text-muted); }

.empty { color: var(--color-text-muted); font-size: var(--text-sm); }
```

**Step 3: Verificar no browser**

`http://localhost:5175` — deve mostrar métricas e cards dos projetos ativos (GetShake, MN Relatórios).

**Step 4: Commit**

```bash
git add aios-dashboard/frontend/src/pages/HomePage.tsx aios-dashboard/frontend/src/pages/HomePage.module.css
git commit -m "feat(dashboard): Home page com métricas e projetos ativos"
```

---

## Task 12: Clients Page

**Files:**
- Create: `aios-dashboard/frontend/src/pages/ClientsPage.tsx`
- Create: `aios-dashboard/frontend/src/pages/ClientsPage.module.css`

**Step 1: Criar `aios-dashboard/frontend/src/pages/ClientsPage.tsx`**

```tsx
import { useEffect, useState } from 'react';
import { api, Client } from '../lib/api';
import { ProjectCard } from '../components/ProjectCard';
import { StatusBadge } from '../components/StatusBadge';
import styles from './ClientsPage.module.css';

const STATUS_FILTERS = ['Todos', 'active', 'pending', 'delivered', 'completed'];

export function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [filter, setFilter] = useState('Todos');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.clients().then(setClients).finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'Todos' ? clients : clients.filter(c => c.status === filter);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Clientes</h1>

      <div className={styles.filters}>
        {STATUS_FILTERS.map(s => (
          <button
            key={s}
            className={`${styles.filter} ${filter === s ? styles.active : ''}`}
            onClick={() => setFilter(s)}
          >
            {s === 'Todos' ? s : <StatusBadge status={s} />}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filtered.map(client => (
          <ProjectCard key={client.slug} client={client} />
        ))}
      </div>
    </div>
  );
}
```

**Step 2: Criar `aios-dashboard/frontend/src/pages/ClientsPage.module.css`**

```css
.page { display: flex; flex-direction: column; gap: var(--space-6); }
.title { font-size: var(--text-2xl); font-weight: 600; }
.filters { display: flex; gap: var(--space-2); flex-wrap: wrap; }
.filter {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  transition: all 0.15s;
}
.filter:hover { border-color: var(--color-accent); color: var(--color-text); }
.active { border-color: var(--color-accent); color: var(--color-text); background: color-mix(in srgb, var(--color-accent) 10%, transparent); }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-4); }
```

**Step 3: Commit**

```bash
git add aios-dashboard/frontend/src/pages/ClientsPage.tsx aios-dashboard/frontend/src/pages/ClientsPage.module.css
git commit -m "feat(dashboard): Clients page com filtro por status"
```

---

## Task 13: Stories Page

**Files:**
- Create: `aios-dashboard/frontend/src/pages/StoriesPage.tsx`
- Create: `aios-dashboard/frontend/src/pages/StoriesPage.module.css`

**Step 1: Criar `aios-dashboard/frontend/src/pages/StoriesPage.tsx`**

```tsx
import { useEffect, useState } from 'react';
import { api, Story } from '../lib/api';
import { StatusBadge } from '../components/StatusBadge';
import styles from './StoriesPage.module.css';

const STATUSES = ['Draft', 'Ready', 'InProgress', 'InReview', 'Done'];

export function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.stories().then(setStories).finally(() => setLoading(false));
  }, []);

  async function handleStatusChange(story: Story, newStatus: string) {
    await api.updateStoryStatus(story.id, story.file, newStatus);
    setStories(prev => prev.map(s => s.id === story.id ? { ...s, status: newStatus } : s));
  }

  if (loading) return <p>Carregando...</p>;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Stories</h1>
      {stories.length === 0 ? (
        <p className={styles.empty}>Nenhuma story encontrada em <code>docs/stories/</code>.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {stories.map(story => (
              <tr key={story.id} className={styles.row}>
                <td className={styles.id}>{story.id}</td>
                <td className={styles.titleCell}>{story.title}</td>
                <td>
                  <select
                    className={styles.select}
                    value={story.status}
                    onChange={e => handleStatusChange(story, e.target.value)}
                  >
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
```

**Step 2: Criar `aios-dashboard/frontend/src/pages/StoriesPage.module.css`**

```css
.page { display: flex; flex-direction: column; gap: var(--space-6); }
.title { font-size: var(--text-2xl); font-weight: 600; }
.empty { color: var(--color-text-muted); font-size: var(--text-sm); }
.table { width: 100%; border-collapse: collapse; font-size: var(--text-sm); }
.table th {
  text-align: left;
  padding: var(--space-3) var(--space-4);
  color: var(--color-text-muted);
  border-bottom: 1px solid var(--color-border);
  font-weight: 500;
  text-transform: uppercase;
  font-size: var(--text-xs);
  letter-spacing: 0.05em;
}
.row td { padding: var(--space-3) var(--space-4); border-bottom: 1px solid var(--color-border); }
.row:hover td { background: var(--color-surface); }
.id { color: var(--color-text-muted); font-family: monospace; }
.select {
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text);
  padding: var(--space-1) var(--space-2);
  font-size: var(--text-xs);
  font-family: inherit;
  cursor: pointer;
}
```

**Step 3: Commit**

```bash
git add aios-dashboard/frontend/src/pages/StoriesPage.tsx aios-dashboard/frontend/src/pages/StoriesPage.module.css
git commit -m "feat(dashboard): Stories page com inline status change"
```

---

## Task 14: Agents e Modules Pages

**Files:**
- Create: `aios-dashboard/frontend/src/pages/AgentsPage.tsx`
- Create: `aios-dashboard/frontend/src/pages/AgentsPage.module.css`
- Create: `aios-dashboard/frontend/src/pages/ModulesPage.tsx`
- Create: `aios-dashboard/frontend/src/pages/ModulesPage.module.css`

**Step 1: Criar `aios-dashboard/frontend/src/pages/AgentsPage.tsx`**

```tsx
import { useEffect, useState } from 'react';
import { api, Agent } from '../lib/api';
import { AgentCard } from '../components/AgentCard';
import styles from './AgentsPage.module.css';

export function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.agents().then(setAgents).finally(() => setLoading(false));
  }, []);

  const coreAgents = agents.filter(a => a.source === 'aios-core');
  const hubAgents = agents.filter(a => a.source === 'creative-hub');

  if (loading) return <p>Carregando...</p>;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Agentes</h1>

      <section>
        <h2 className={styles.section}>AIOS Core ({coreAgents.length})</h2>
        <div className={styles.grid}>
          {coreAgents.map(a => <AgentCard key={a.id} agent={a} />)}
        </div>
      </section>

      <section>
        <h2 className={styles.section}>Creative Hub ({hubAgents.length})</h2>
        <div className={styles.grid}>
          {hubAgents.map(a => <AgentCard key={a.id} agent={a} />)}
        </div>
      </section>
    </div>
  );
}
```

**Step 2: Criar `aios-dashboard/frontend/src/pages/AgentsPage.module.css`**

```css
.page { display: flex; flex-direction: column; gap: var(--space-8); }
.title { font-size: var(--text-2xl); font-weight: 600; }
.section { font-size: var(--text-lg); font-weight: 500; margin-bottom: var(--space-4); color: var(--color-text-muted); }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: var(--space-3); }
```

**Step 3: Criar `aios-dashboard/frontend/src/pages/ModulesPage.tsx`**

```tsx
import { useEffect, useState } from 'react';
import { api, Module } from '../lib/api';
import styles from './ModulesPage.module.css';

const MODULE_ICONS: Record<string, string> = {
  '01-branding': '◈',
  '02-second-brain': '◉',
  '03-agenting': '◎',
  '04-content-production': '⬡',
  '05-gpt-builder': '◆',
};

export function ModulesPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.modules().then(setModules).finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Módulos</h1>
      <p className={styles.subtitle}>Creative Hub · {modules.length} módulos disponíveis</p>
      <div className={styles.grid}>
        {modules.map(mod => (
          <div key={mod.id} className={styles.card}>
            <span className={styles.icon}>{MODULE_ICONS[mod.id] ?? '◇'}</span>
            <div>
              <p className={styles.name}>{mod.name}</p>
              <p className={styles.path}>{mod.path}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Step 4: Criar `aios-dashboard/frontend/src/pages/ModulesPage.module.css`**

```css
.page { display: flex; flex-direction: column; gap: var(--space-6); }
.title { font-size: var(--text-2xl); font-weight: 600; }
.subtitle { font-size: var(--text-sm); color: var(--color-text-muted); margin-top: calc(-1 * var(--space-4)); }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: var(--space-4); }
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  display: flex;
  align-items: center;
  gap: var(--space-4);
  transition: border-color 0.15s;
}
.card:hover { border-color: var(--color-accent); }
.icon { font-size: var(--text-xl); color: var(--color-accent); flex-shrink: 0; }
.name { font-size: var(--text-sm); font-weight: 600; }
.path { font-size: var(--text-xs); color: var(--color-text-muted); margin-top: var(--space-1); }
```

**Step 5: Commit**

```bash
git add aios-dashboard/frontend/src/pages/
git commit -m "feat(dashboard): Agents e Modules pages"
```

---

## Task 15: Root Package.json — `npm run dev` unificado

**Files:**
- Create: `aios-dashboard/package.json`
- Create: `aios-dashboard/README.md`

**Step 1: Criar `aios-dashboard/package.json`**

```json
{
  "name": "aios-dashboard",
  "version": "1.0.0",
  "scripts": {
    "dev": "concurrently \"npm run dev --prefix backend\" \"npm run dev --prefix frontend\"",
    "install:all": "npm install --prefix backend && npm install --prefix frontend"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
```

**Step 2: Criar `aios-dashboard/README.md`**

```markdown
# AIOS Dashboard

Dashboard local para o Synkra AIOS.

## Setup inicial

```bash
cd aios-dashboard
npm install
npm run install:all
```

## Iniciar

```bash
npm run dev
```

Abre em:
- Frontend: http://localhost:5175
- Backend API: http://localhost:3002
```

**Step 3: Instalar e iniciar tudo junto**

```bash
cd aios-dashboard && npm install && npm run install:all
npm run dev
```

Esperado: dois processos sobem juntos. Frontend em :5175, backend em :3002.

**Step 4: Verificação final**

```bash
curl http://localhost:3002/api/clients
curl http://localhost:3002/api/agents
curl http://localhost:3002/api/modules
```

Abrir `http://localhost:5175` e verificar todas as 5 páginas.

**Step 5: Commit final**

```bash
git add aios-dashboard/package.json aios-dashboard/README.md
git commit -m "feat(dashboard): root package.json com dev unificado + README"
```

---

## Checklist Final

- [ ] `npm run dev` em `aios-dashboard/` sobe frontend + backend juntos
- [ ] Home page carrega métricas reais (clientes, agentes, módulos)
- [ ] Projetos ativos aparecem como cards na Home
- [ ] Clients page mostra todos os clientes com filtro por status
- [ ] Stories page lista stories (vazio é tratado graciosamente)
- [ ] Agents page exibe agentes separados por fonte
- [ ] Modules page exibe os 5 módulos do creative-hub
- [ ] Design system dark funcionando (tokens, sidebar, cards)
- [ ] StatusBadge com cores corretas por status
