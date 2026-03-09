# AIOS Dashboard

Dashboard local para o Synkra AIOS — cockpit visual completo.

## Setup

```bash
cd aios-dashboard
npm install
npm run install:all
```

## Iniciar

```bash
npm run dev
```

- Frontend: http://localhost:5175
- Backend API: http://localhost:3002

## Páginas

- **Home** — Métricas globais + projetos ativos
- **Chat** ⭐ NEW — CreatorOS Chat Suite (agentes de IA)
- **Clientes** — Todos os clientes com filtro por status
- **Stories** — Stories com troca de status inline
- **Agentes** — Agentes AIOS Core e Creative Hub
- **Módulos** — Módulos do creative-hub

---

## 🎯 CreatorOS Chat Suite (NEW)

Hub centralizado de agents de IA para gerar copy, propostas, pitches, briefings e diretrizes de marca.

### Configuração

1. **API Key Groq** (obtenha em https://console.groq.com/keys)
   ```bash
   # Edite .env.local
   GROQ_API_KEY=sua_chave_aqui
   ```

2. **Opcional: Obsidian Vault** (para injetar contexto de cliente)
   ```bash
   # Edite .env.local
   OBSIDIAN_VAULT_PATH=/Users/seu-usuario/obsidian-vault
   ```

### 5 Agents Especializados

| Agent | Foco | Ícone |
|-------|------|-------|
| **Copy** | Posts sociais, WhatsApp, copy conversão | ✏️ |
| **Sales** | Propostas, pricing, follow-up sequences | 💼 |
| **Pitch** | Elevator pitches, narrativas de deck | ◎ |
| **Briefing** | Creative briefs, SOW, kickoffs | ◈ |
| **Brand** | Brand guidelines, voice & tone | ◉ |

### Como Usar

1. Navegar para `/chat`
2. Selecionar agent + cliente (opcional)
3. Digitar mensagem
4. Resposta faz stream em tempo real
5. Histórico salvo em `~/.aios-sessions/`

### Arquitetura

```
Backend:
  - Groq LLM com fallback para OpenRouter
  - Session store em JSON (~/.aios-sessions/)
  - SSE streaming (text/event-stream)
  - Context injection do Obsidian vault

Frontend:
  - React 18 + CSS Modules
  - Componentes reutilizáveis (ChatSidebar, ChatMessages, etc)
  - SSE client com AsyncGenerator
```

### Troubleshooting

- **"API key not configured"** → Configure `GROQ_API_KEY` em `.env.local`
- **"All LLM providers failed"** → Verifique API key ou adicione `OPENROUTER_API_KEY`
- **Contexto de cliente vazio** → Verifique `OBSIDIAN_VAULT_PATH` e estrutura de pastas
