# AIOS Dashboard — Design Document

**Data:** 2026-02-25
**Status:** Aprovado
**Autor:** Caio Almeida

---

## Contexto

O Synkra AIOS acumula projetos de cliente, módulos do creative-hub, agentes, stories e workflows em diferentes pastas do repositório. Hoje não existe uma forma visual de navegar e entender o estado geral do framework. Este documento especifica um dashboard web local que centraliza essa visão.

---

## Objetivo

Criar um **cockpit visual local** que permita:
- Ver todos os clientes/projetos com status e progresso
- Navegar pelos módulos do creative-hub
- Listar stories e mudar seu status diretamente
- Visualizar agentes e suas capacidades
- Tudo lendo diretamente do filesystem (sem banco de dados)

---

## Arquitetura

### Estrutura de pastas

```
caio-creator-aios/
└── aios-dashboard/
    ├── frontend/              ← React + Vite (porta 5175)
    │   ├── src/
    │   │   ├── design-system/ ← tokens CSS, componentes base
    │   │   ├── pages/         ← Home, Clients, Stories, Agents, Modules
    │   │   ├── components/    ← componentes compartilhados
    │   │   └── lib/           ← api client, helpers
    │   ├── index.html
    │   └── vite.config.ts     ← proxy /api → localhost:3002
    ├── backend/               ← Express (porta 3002)
    │   └── server.ts          ← endpoints REST que lêem filesystem
    ├── package.json
    └── README.md
```

### Fluxo de dados

```
Filesystem (YAML/MD)
      ↓
Express backend (port 3002)
  /api/clients   → parse .aios/project-status.yaml
  /api/stories   → parse docs/stories/**/*.story.md
  /api/agents    → parse .aios-core/agents/**/*.md
  /api/modules   → parse creative-hub/modules/
      ↓
React frontend (port 5175)
  Vite proxy /api/* → :3002
```

**Ação de escrita:** mudar status de story = backend reescreve o campo `Status:` no arquivo `.story.md` correspondente. Nenhuma outra operação de escrita no MVP.

---

## Design System

### Paleta de cores

```css
--color-bg:          #0A0A0F;   /* background principal */
--color-surface:     #141418;   /* cards e painéis */
--color-border:      #1E1E26;   /* bordas e divisores */
--color-text:        #FFFFFF;   /* texto primário */
--color-text-muted:  #8B8B9E;   /* texto secundário */
--color-accent:      #6E56CF;   /* violeta — cor AIOS */

/* Status */
--color-active:      #22C55E;   /* active / done */
--color-progress:    #F59E0B;   /* in-progress */
--color-pending:     #6B7280;   /* pending / draft */
--color-delivered:   #3B82F6;   /* delivered */
```

### Tipografia

- **Font:** Inter (sans-serif, via Google Fonts ou bundle local)
- **Scale:** 12 / 14 / 16 / 20 / 24 / 32px
- **Weight:** 400 (body), 500 (labels), 600 (headings)

### Tema

Dark, inspirado no Linear. Sem modo claro no MVP.

### Componentes base

| Componente | Uso |
|-----------|-----|
| `StatusBadge` | Pill colorida com status do projeto/story |
| `ProjectCard` | Card com nome, fase, progress bar, próxima ação |
| `StoryRow` | Linha de tabela com ID, título, status, agente |
| `AgentCard` | Card com persona, autoridade, capacidades |
| `MetricPill` | Número destacado (ex: "4 clientes") |
| `Sidebar` | Navegação lateral fixa 240px |
| `TopBar` | Breadcrumb + ações contextuais |

---

## Layout

```
┌──────────┬────────────────────────────────────────┐
│          │  Top Bar: breadcrumb + ações rápidas    │
│ Sidebar  ├────────────────────────────────────────┤
│ (240px)  │                                        │
│          │   Main Content Area                    │
│ • Home   │   (grid de cards, listas, detalhes)    │
│ • Clients│                                        │
│ • Stories│                                        │
│ • Agents │                                        │
│ • Modules│                                        │
└──────────┴────────────────────────────────────────┘
```

---

## Páginas

### Home
- Métricas rápidas: total de clientes, ativos, stories em progresso, módulos
- Grid de ProjectCards dos projetos ativos
- Feed de atividade recente (últimos status alterados)

### Clients
- Grid de todos os clientes filtráveis por status
- Clica no card → detalhe com fases, brand guidelines links, sessions log
- Fonte: `.aios/project-status.yaml`

### Stories
- Tabela paginada de todas as stories em `docs/stories/`
- Colunas: ID, Título, Status, Agente, Última atualização
- **Ação:** dropdown inline para mudar status → backend reescreve o `.story.md`
- Filtros: por status, por agente

### Agents
- Cards de cada agente (@dev, @qa, @architect, @brand-director, etc.)
- Exibe persona, autoridade exclusiva, capacidades
- Fonte: `.aios-core/agents/` e `creative-hub/agents/`

### Modules
- 5 cards dos módulos do creative-hub
- Mostra quantos clientes usam cada módulo
- Link para a pasta do módulo no filesystem

---

## Fora do escopo (MVP)

- Autenticação (uso local apenas)
- Terminal embutido ou execução de workflows
- Tema claro
- Deploy remoto / hospedagem
- Notificações em tempo real (WebSocket)

---

## Stack técnica

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 18 + Vite 5 |
| Roteamento | React Router v6 |
| Estilização | CSS Modules + CSS custom properties |
| Backend | Express + TypeScript |
| Parse YAML | `js-yaml` |
| Parse Markdown | `gray-matter` (frontmatter) |
| Dev | Vite proxy para o backend |

---

## Critérios de sucesso

1. `npm run dev` em `aios-dashboard/` sobe frontend + backend juntos
2. Home carrega em < 1s com dados reais do filesystem
3. Mudar status de uma story persiste no arquivo `.story.md`
4. Design system documentado em `design-system/tokens.css`
5. Responsivo para janelas a partir de 1280px
