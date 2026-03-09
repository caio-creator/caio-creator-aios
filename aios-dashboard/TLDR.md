# ⚡ TL;DR — CreatorOS Chat Suite

## What You Get

5 AI agents (Copy, Sales, Pitch, Briefing, Brand) in a centralized chat hub.

## How to Start (8 min)

```bash
# 1. Get API key
# Visit: https://console.groq.com/keys
# Copy your key

# 2. Configure
cd /Users/caio_almeida/Documents/caio-creator-aios/aios-dashboard
# Edit .env.local, add: GROQ_API_KEY=your_key_here

# 3. Run
./start.sh

# 4. Open
# http://localhost:5175
```

Done! Click "Chat" in sidebar. Try any agent.

## File Locations

- **App**: `/Users/caio_almeida/Documents/caio-creator-aios/aios-dashboard/`
- **Config**: `.env.local` (add your API key)
- **Startup**: `./start.sh`
- **Docs**: `STARTUP.md` (if you need help)
- **Sessions saved**: `~/.aios-sessions/`

## Features

- Real-time streaming (SSE)
- 5 specialized agents
- Auto-save conversation history
- Copy response button
- Fallback LLM (if Groq fails, tries OpenRouter)
- Optional: Obsidian vault context injection

## Key Files to Customize

| File | To Change |
|------|-----------|
| `backend/src/services/agent-registry.ts` | Agent behavior (system prompts) |
| `.env.local` | API keys |
| `frontend/src/pages/ChatPage.tsx` | Chat UI layout |

## Troubleshooting

**"API key not configured"**
→ Add `GROQ_API_KEY` to `.env.local`

**"Port already in use"**
→ Change port in `frontend/vite.config.ts` or kill process

**"No response from LLM"**
→ Check API key is correct at https://console.groq.com/playground

## Next Steps

1. Get Groq API key (5 min) → https://console.groq.com/keys
2. Edit `.env.local` (1 min)
3. Run `./start.sh` (2 min)
4. Test agents at http://localhost:5175

That's it!

---

For detailed docs: See `STARTUP.md`, `QUICK_REFERENCE.md`, `IMPLEMENTATION_SUMMARY.md`
