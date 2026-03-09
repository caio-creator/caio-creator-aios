# 🚀 CreatorOS Chat Suite — Guia de Inicialização

## ⚡ Quick Start (3 minutos)

### 1️⃣ Obtenha API Key do Groq (REQUERIDO)

Visite: https://console.groq.com/keys
- Crie uma conta (gratuita)
- Copie sua API key

### 2️⃣ Configure .env.local

Na pasta `aios-dashboard/`:

```bash
# Se .env.local não existir, crie:
cp .env.example .env.local

# Edite .env.local e adicione:
GROQ_API_KEY=gsk_sua_chave_aqui_xxxxxxxxx

# OPCIONAL: Injetar contexto de clientes do Obsidian
OBSIDIAN_VAULT_PATH=/Users/seu-usuario/Documents/seu-obsidian-vault
```

### 3️⃣ Instale Dependências

```bash
cd aios-dashboard/backend && npm install
cd ../frontend && npm install
```

### 4️⃣ Inicie a Aplicação

**Opção A: Script automático (Recomendado)**
```bash
cd aios-dashboard
./start.sh
```

Pronto! Acesse: http://localhost:5175

**Opção B: Manualmente em 2 terminais**

Terminal 1:
```bash
cd aios-dashboard/backend
npm run dev
# Escuta em http://127.0.0.1:3002
```

Terminal 2:
```bash
cd aios-dashboard/frontend
npm run dev
# Escuta em http://localhost:5175
```

---

## 📋 Checklist Inicial

- [ ] Obtenha API key em https://console.groq.com/keys
- [ ] Configure GROQ_API_KEY em `.env.local`
- [ ] Rode `npm install` em backend e frontend
- [ ] Inicie com `./start.sh` ou manualmente
- [ ] Acesse http://localhost:5175
- [ ] Teste: selecione "Copy Agent" + envie "Escreva um post Instagram"

---

## 🎯 Primeiro Uso

### Passo 1: Acessar Chat
```
http://localhost:5175 → clique em "Chat" no sidebar
```

### Passo 2: Selecionar Agent
Dropdown top-left com 5 opções:
- **Copy Agent** ✏️ — Posts sociais, WhatsApp
- **Sales Agent** 💼 — Propostas, pricing
- **Pitch Agent** ◎ — Pitches, narrativas
- **Briefing Agent** ◈ — Briefs, SOW
- **Brand Agent** ◉ — Guidelines, voice & tone

### Passo 3: Selecionar Cliente (Opcional)
Dropdown top-middle. Deixe "No Client" para começar.

Se tiver `OBSIDIAN_VAULT_PATH` configurado:
- Selecionar um cliente injeta contexto automaticamente
- Sistema lê arquivos de `{VAULT}/1-PROJECTS/{client-slug}/`

### Passo 4: Escrever Mensagem
```
"Escreva um carrossel Instagram sobre branding"
"Crie uma proposta para projeto de rebranding"
"Desenvolva um brief criativo para campanha"
```

Pressione `Enter` ou clique "Send"

### Passo 5: Acompanhe Streaming
- Resposta aparece em tempo real (letra por letra)
- "●" model-name no canto (mostra qual LLM foi usado)
- Histórico salvo automaticamente

---

## ✅ Verificação de Funcionamento

### Backend está rodando?
```bash
curl http://127.0.0.1:3002/health
# Esperado: {"ok":true,"repoRoot":"..."}
```

### Frontend está rodando?
```bash
curl http://localhost:5175
# Esperado: HTML da aplicação
```

### API de sessões funciona?
```bash
curl http://localhost:5175/api/sessions
# Esperado: [] (lista vazia se primeira vez)
```

---

## 🔧 Troubleshooting

### ❌ "API key not configured"
```
→ Solução:
  1. Obtenha em https://console.groq.com/keys
  2. Edite .env.local e adicione GROQ_API_KEY
  3. Reinicie backend (npm run dev)
```

### ❌ "All LLM providers failed"
```
→ Causas possíveis:
  - API key inválida
  - Groq indisponível
  - Sua IP está bloqueada

→ Solução:
  1. Verifique GROQ_API_KEY em .env.local
  2. Teste em: https://console.groq.com/playground
  3. Se tiver OPENROUTER_API_KEY, sistema faz fallback
```

### ❌ "Cannot GET /chat"
```
→ Solução:
  - Reinicie frontend (npm run dev em /frontend)
  - Limpe cache: Cmd+Shift+R (Mac)
```

### ❌ Port 3002 ou 5175 já em uso
```
→ Solução:
  - Mate processo anterior: lsof -i :3002
  - Ou configure porta diferente em vite.config.ts
```

### ❌ npm install falha
```
→ Solução:
  - Limpe cache: rm -rf node_modules package-lock.json
  - Tente novamente: npm install
  - Se persistir: npm install --legacy-peer-deps
```

---

## 📁 Onde os Dados São Salvos

**Sessões de Chat:**
```
~/.aios-sessions/
  └── {uuid}.json (uma por conversa)
```

Exemplo:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "agentId": "copy",
  "title": "Post Instagram Malta",
  "messages": [...],
  "createdAt": "2026-03-09T14:42:00Z",
  "updatedAt": "2026-03-09T14:45:30Z"
}
```

---

## 🔒 Segurança

- API keys em `.env.local` (NÃO commitê!)
- Conversas salvas apenas localmente
- Nenhum envio de dados (exceto para Groq)
- Zero tracking ou analytics

---

## 🎓 Próximas Funcionalidades

- [ ] Exportar conversa como PDF/Markdown
- [ ] Custom system prompts por agent
- [ ] Sync com Supabase (cloud optional)
- [ ] Voice input
- [ ] PDF/image upload para context

---

## 📞 Suporte

Se encontrar erros:

1. Verifique **Troubleshooting** acima
2. Verifique **Console do Browser** (F12)
3. Verifique **Terminal do Backend** (npm run dev output)
4. Verifique `.env.local` tem `GROQ_API_KEY`

---

**Status**: ✅ Pronto para usar
**Versão**: 1.0.0 (Mar 9, 2026)
**Última atualização**: Mar 9, 2026
