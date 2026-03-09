# Obsidian API Analysis - 3 Integration Patterns
**Date:** 2026-03-09
**Status:** COMPLETE - Ready for Decision
**Owner:** @architect

---

## Executive Summary

You have **3 viable options** to connect AIOS to your Obsidian Vault. Each has trade-offs in complexity, real-time capability, and plugin dependency.

**Recommendation:** **Option 2 (Hybrid)** — Best balance of real-time sync + simplicity.

---

## Option 1: Official Obsidian API (Obsidian Publish/Sync)

### How It Works
```
Obsidian Editor
    ↓
Obsidian Publish API (webhooks)
    ↓
Your AIOS backend
```

### Pros ✅
- **Official & stable** - Obsidian maintains it
- **Real-time webhooks** - Instant notifications
- **Cloud-native** - No local file system needed
- **Multi-device sync** - Works across devices automatically
- **Security** - Obsidian handles auth

### Cons ❌
- **Requires Obsidian Sync** - Costs $4/month
- **Limited metadata** - Only title, modified date, tags
- **Webhook configuration** - Manual setup per vault
- **Rate limits** - 100 requests/day (low for active automation)
- **No native read** - Can only react to publish events, not read vault directly

### Cost
- Obsidian Sync: $4/month
- Hosting webhook server: $5-10/month
- **Total:** ~$10/month minimum

### Complexity (1-10 scale)
**2/10** - Very simple, very limited

### Best For
**Publishing workflows** - When you want to publish articles/proposals publicly and sync back.

### API Example
```typescript
// Webhook payload from Obsidian
{
  "event": "publish",
  "document": {
    "title": "Malta Rentals - Proposal",
    "tags": ["#proposta-pendente"],
    "modified": "2026-03-09T14:30:00Z"
  }
}

// Your action: read from Obsidian cloud, pull content
```

---

## Option 2: Obsidian Dataview + Local File System (RECOMMENDED)

### How It Works
```
Local Obsidian Vault (/Users/caio_almeida/Obsidian/...)
    ↓
AIOS reads .md files directly
    ↓
AIOS parses YAML frontmatter + tags
    ↓
AIOS executes workflow (API calls, etc)
    ↓
AIOS writes back to vault
    ↓
Obsidian auto-syncs via Sync/Git
```

### Pros ✅
- **Zero cost** - No plugins, no subscription
- **Direct access** - Read/write full note content
- **Full data available** - All metadata, frontmatter, links
- **Offline-first** - Works without internet
- **Git-friendly** - Integrates with your repo sync
- **No rate limits** - Local file system has none
- **Full control** - You own the sync logic
- **Dataview queries** - Leverage your existing query setup

### Cons ❌
- **5-10min latency** - Polls vault every 5-10 minutes (configurable)
- **File system dependency** - Assumes vault stored locally
- **Conflict handling** - Need to manage file locks
- **Manual polling** - Not truly "real-time" reactive
- **No webhook support** - Must poll, can't listen

### Cost
**$0** - Completely free

### Complexity (1-10 scale)
**4/10** - Straightforward polling loop, moderate complexity

### Best For
**Your use case** - Batch automations, scheduled syncs, cost-conscious.

### API Example
```typescript
// Read approach: Poll every 5 minutes
import fs from 'fs'
import YAML from 'yaml'

async function syncObsidian() {
  const vaultPath = '/Users/caio_almeida/Obsidian/1-PROJECTS'

  // Find all notes with #proposta-pendente tag
  const files = fs.readdirSync(vaultPath, { recursive: true })

  for (const file of files) {
    if (!file.endsWith('.md')) continue

    const content = fs.readFileSync(file, 'utf-8')
    const [frontmatter, body] = content.split('---')
    const metadata = YAML.parse(frontmatter)

    // Check for trigger tags
    if (metadata.tags?.includes('proposta-pendente')) {
      // TRIGGER: Generate proposal
      await generateProposal(metadata, body)
    }
  }
}

// Write back
function updateNote(filePath, updates) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const [frontmatter, body] = content.split('---')
  const metadata = YAML.parse(frontmatter)

  // Merge updates
  Object.assign(metadata, updates)

  // Write back
  const newContent = `---\n${YAML.stringify(metadata)}---\n${body}`
  fs.writeFileSync(filePath, newContent)
}
```

### Integration with Dataview
Your existing Dataview queries work as views. AIOS executes based on query results:
```
Dataview query: list where tags contains #proposta-pendente
    ↓
AIOS parses results
    ↓
AIOS processes each note
```

### Recommended Setup
```bash
# Poll every 5 minutes
npm run aios sync:obsidian -- --interval 5m

# Or with cron
0 */5 * * * npm run aios sync:obsidian
```

---

## Option 3: Obsidian Plugin (Custom Development)

### How It Works
```
Obsidian Plugin (runs in Obsidian electron process)
    ↓
Can read/write vault in real-time
    ↓
Sends events to AIOS backend via websocket
    ↓
AIOS executes workflow
    ↓
Plugin can update UI
```

### Pros ✅
- **True real-time** - Instant reactions to changes
- **Full vault access** - Deepest integration possible
- **UI-enhanced** - Can show status in Obsidian sidebar
- **Reactive** - Not polling, actually event-driven
- **Tightest integration** - Most native Obsidian experience

### Cons ❌
- **High complexity** - Need to learn Obsidian plugin API (~400-600 lines)
- **Maintenance burden** - Updates to Obsidian can break your plugin
- **Development time** - 2-3 weeks to build properly
- **Testing difficulty** - Must test in Obsidian sandbox
- **Debugging hard** - Plugin sandboxing makes troubleshooting difficult
- **Community support low** - Fewer examples than normal Node.js
- **Publication friction** - If you want to share the plugin later, release process is complex

### Cost
**$0** - Open source plugin

### Complexity (1-10 scale)
**8/10** - Steep learning curve, significant development effort

### Best For
**Future-proofing** - If you want to eventually publish this as a community plugin. Or if you really need true real-time.

### Development Timeline
- **Week 1:** Learn Obsidian plugin API
- **Week 2:** Build core sync engine
- **Week 3:** Testing, polish, documentation
- **Total:** 60-80 engineering hours

### Code Example
```typescript
// Obsidian plugin structure (plugin.ts)
import { Plugin } from 'obsidian'

export default class AISOSyncPlugin extends Plugin {
  async onload() {
    // Register file change listener
    this.registerEvent(
      this.app.vault.on('modify', (file) => {
        this.onNoteModified(file)
      })
    )

    // Register periodic sync
    this.registerInterval(
      window.setInterval(() => this.syncToAIOS(), 5 * 60 * 1000)
    )
  }

  private async onNoteModified(file) {
    // Read file with full metadata
    const content = await this.app.vault.read(file)
    const metadata = this.app.metadataCache.getFileCache(file)

    // Send to AIOS
    await fetch('http://localhost:3000/aios/sync', {
      method: 'POST',
      body: JSON.stringify({ file: file.path, content, metadata })
    })
  }
}
```

---

## Comparison Matrix

| Feature | Option 1 (Publish API) | Option 2 (File System) | Option 3 (Plugin) |
|---------|-------|------|--------|
| **Cost** | $4/mo | $0 | $0 |
| **Real-time** | ✅ Yes | ❌ 5min latency | ✅ Yes |
| **Complexity** | 🟢 2/10 | 🟡 4/10 | 🔴 8/10 |
| **Data access** | Limited | Full | Full |
| **Rate limits** | ❌ 100/day | ✅ Unlimited | ✅ Unlimited |
| **Learning curve** | Minimal | Low | High |
| **Maintenance** | Obsidian | You | You |
| **Offline support** | ❌ No | ✅ Yes | ✅ Yes |
| **Works with Git sync** | Partial | ✅ Full | ✅ Full |
| **Best for MVP** | No | ✅ Yes | No |
| **Best for production** | Special cases | ✅ Yes | Enterprise |

---

## ★ Insight ─────────────────────────────────────
**Why Option 2 (File System) is Recommended for You:**

1. **Cost:** $0 - Your budget is already constrained with 9 clients
2. **Your vault is local** - Stored on your Mac in real-time via Git sync
3. **5-min latency is acceptable** - Proposals don't need millisecond reactions
4. **You already use Dataview** - Can leverage existing queries
5. **Fastest to implement** - Gets you from "idea" to "working" in days, not weeks
6. **Lowest maintenance** - No plugin API changes to worry about

**Trade-off:** You get 5-10min latency instead of milliseconds. For your use case (sales proposals, not real-time collab), this is completely fine.
─────────────────────────────────────────────────────────

---

## Implementation Recommendation: Hybrid Approach

**Best of both worlds:**

```
┌─────────────────────────────────────────────┐
│         AIOS Sync Engine (Node.js)          │
├─────────────────────────────────────────────┤
│                                             │
│  Primary: Poll file system every 5 min      │
│  ├─ Reads: .md files + frontmatter         │
│  ├─ Triggers: #proposta-pendente tags      │
│  └─ Updates: Writes back modified dates    │
│                                             │
│  Secondary: Manual trigger (CLI)            │
│  └─ `aios sync:obsidian --now`             │
│     (Don't want to wait 5 minutes?)        │
│                                             │
│  Future: Optional webhook (if plugin added) │
│  └─ Real-time as nice-to-have              │
│                                             │
└─────────────────────────────────────────────┘
```

### Why Hybrid?
- **Option 2 as primary** - Simple, reliable, free
- **CLI override as secondary** - Immediate sync when you want it
- **Webhook-ready structure** - Easy to add Option 3 later if needed

---

## Next Steps

### For MVP (this week):
1. ✅ Implement **Option 2 (File System polling)**
2. ✅ Add CLI command for manual sync
3. ✅ Test with 1 real proposal workflow

### For Production (next month):
1. Evaluate adding Option 3 (Plugin) if latency becomes problem
2. Consider Option 1 (Publish API) for client-facing publishing

### Decision Required
Please confirm:
```
[ ] Option 1 - Obsidian Publish API (not recommended)
[ ] Option 2 - File System + Polling (RECOMMENDED)
[ ] Option 3 - Custom Plugin (not for MVP)
[ ] Hybrid - Option 2 + manual CLI override (RECOMMENDED)
```

---

## Implementation Files (Phase 1)

| File | Purpose | Status |
|------|---------|--------|
| `packages/@aios/obsidian-connector/src/file-system-api.ts` | Core polling engine | ⏳ Pending decision |
| `packages/@aios/obsidian-connector/src/dataview-parser.ts` | Parse Dataview results | ⏳ Pending decision |
| `packages/@aios/obsidian-connector/src/trigger-engine.ts` | Tag-based triggers | ⏳ Pending decision |
| `bin/aios-sync-obsidian.js` | CLI command | ⏳ Pending decision |
| `tests/obsidian-connector.test.ts` | Unit tests | ⏳ Pending decision |

---

**Owner:** @architect
**Next Review:** After decision confirmation
**Questions?** See embedded ★ Insights above
