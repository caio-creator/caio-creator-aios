# ⚡ Quick Reference — CreatorOS Chat Suite

## 🚀 Start Application (Choose One)

**Recommended (automatic):**
```bash
cd /Users/caio_almeida/Documents/caio-creator-aios/aios-dashboard
./start.sh
# Opens: http://localhost:5175
```

**Manual (2 terminals):**
```bash
# Terminal 1
cd /Users/caio_almeida/Documents/caio-creator-aios/aios-dashboard/backend
npm run dev  # Port 3002

# Terminal 2
cd /Users/caio_almeida/Documents/caio-creator-aios/aios-dashboard/frontend
npm run dev  # Port 5175
```

---

## 📂 Key Files

| File | Purpose | Edit For |
|------|---------|----------|
| `.env.local` | API keys | Add GROQ_API_KEY |
| `backend/src/services/agent-registry.ts` | Agent system prompts | Customize agent behavior |
| `frontend/src/pages/ChatPage.tsx` | Chat UI logic | Change layout/state |
| `frontend/src/lib/api.ts` | API client types | Add new endpoints |
| `start.sh` | Startup script | Automate deployment |

---

## 🔑 Configuration

**Required:**
```bash
# .env.local
GROQ_API_KEY=gsk_your_key_from_groq
```

**Optional:**
```bash
# .env.local
OBSIDIAN_VAULT_PATH=/Users/your-user/Documents/vault
OPENROUTER_API_KEY=sk_your_openrouter_key
```

Get keys:
- Groq: https://console.groq.com/keys
- OpenRouter: https://openrouter.ai
- Obsidian: Your local vault path

---

## 🧪 Testing

**Verify compilation:**
```bash
cd backend && npx tsc --noEmit
cd ../frontend && npx tsc --noEmit
```

**Check backend health:**
```bash
curl http://127.0.0.1:3002/health
```

**List sessions:**
```bash
curl http://localhost:5175/api/sessions
```

---

## 📍 Important Paths

```
Project:     /Users/caio_almeida/Documents/caio-creator-aios/aios-dashboard/
Sessions:    ~/.aios-sessions/
Backend:     /Users/caio_almeida/Documents/caio-creator-aios/aios-dashboard/backend/
Frontend:    /Users/caio_almeida/Documents/caio-creator-aios/aios-dashboard/frontend/
Vite port:   5175
Express port: 3002
```

---

## 🎯 5 Agents

| Name | Icon | Route | System Prompt Location |
|------|------|-------|------------------------|
| Copy Agent | ✏️ | `/chat?agent=copy` | `agent-registry.ts:copy` |
| Sales Agent | 💼 | `/chat?agent=sales` | `agent-registry.ts:sales` |
| Pitch Agent | ◎ | `/chat?agent=pitch` | `agent-registry.ts:pitch` |
| Briefing Agent | ◈ | `/chat?agent=briefing` | `agent-registry.ts:briefing` |
| Brand Agent | ◉ | `/chat?agent=brand` | `agent-registry.ts:brand` |

---

## 🔧 Common Tasks

**Change agent system prompt:**
```bash
# Edit backend/src/services/agent-registry.ts
# Find agents.{agentId}.systemPrompt
# Update and save
# Restart: npm run dev (backend)
```

**Add new agent:**
```bash
# 1. Add to backend/src/services/agent-registry.ts
# 2. Add to frontend/src/lib/agents.ts
# 3. Update ChatTopBar select options
# 4. Restart both servers
```

**Change UI styling:**
```bash
# All CSS in .module.css files next to components
# Edit without restarting (Vite HMR)
```

**View session storage:**
```bash
ls -la ~/.aios-sessions/
cat ~/.aios-sessions/{uuid}.json | jq .
```

---

## 🐛 Debug

**Frontend not loading?**
```bash
# Clear cache
Cmd+Shift+R (Mac)

# Check browser console
F12 → Console tab
```

**API calls failing?**
```bash
# Check backend running
curl http://127.0.0.1:3002/health

# Check network tab
F12 → Network → XHR requests
```

**No response from LLM?**
```bash
# Verify GROQ_API_KEY in .env.local
# Test at https://console.groq.com/playground
# Check if API key valid
```

**Sessions not persisting?**
```bash
# Check permissions
ls -la ~/.aios-sessions/

# View saved session
cat ~/.aios-sessions/{uuid}.json
```

---

## 📖 Documentation

| File | Purpose |
|------|---------|
| `README.md` | Overview + features |
| `STARTUP.md` | 3-minute setup guide |
| `QUICK_REFERENCE.md` | This file |
| `IMPLEMENTATION_SUMMARY.md` | Technical deep dive |

---

## 🎓 First Use Checklist

- [ ] Got Groq API key from https://console.groq.com/keys
- [ ] Added GROQ_API_KEY to .env.local
- [ ] Ran ./start.sh (or manual setup)
- [ ] Opened http://localhost:5175
- [ ] Clicked "Chat" in sidebar
- [ ] Selected Copy Agent
- [ ] Typed: "Write an Instagram post about coffee"
- [ ] Got streaming response
- [ ] Checked ~/.aios-sessions/ for saved session

---

## ⚙️ npm Commands

```bash
cd backend
npm run dev         # Start with hot reload
npm run build       # Compile
npm install         # Install deps

cd frontend
npm run dev         # Vite dev server
npm run build       # Build for production
npm run preview     # Preview build
npm install         # Install deps
```

---

## 🔗 Useful Links

- Groq API Keys: https://console.groq.com/keys
- OpenRouter: https://openrouter.ai
- Groq Playground: https://console.groq.com/playground
- Vite Docs: https://vitejs.dev
- React Docs: https://react.dev

---

## 💬 Chat Shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` | Send message |
| `Shift+Enter` | New line |
| `Cmd+K` | Search sessions (future) |
| `Cmd+/` | Help (future) |

---

## 📊 System Requirements

- Node.js 18+ (check: `node --version`)
- npm 8+ (check: `npm --version`)
- 200MB disk (node_modules)
- No database required
- Works offline (after LLM response cached)

---

**Last Updated**: March 9, 2026
**Status**: ✅ Production Ready
