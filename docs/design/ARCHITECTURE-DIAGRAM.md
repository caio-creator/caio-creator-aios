# AIOS ↔️ Obsidian ↔️ Companie Architecture Diagram
**Date:** 2026-03-09
**Status:** Visual Reference for Phase 1
**Owner:** @architect

---

## System Architecture Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                          YOUR WORKSPACE                               │
│                     (Decision Point: Tags)                            │
│  You create note in Obsidian, tag with #proposta-pendente            │
└─────────────────────────────────┬──────────────────────────────────┘
                                  │
                                  │ (Triggers sync)
                                  ▼
┌──────────────────────────────────────────────────────────────────────┐
│                    AIOS SYNC ENGINE (Node.js)                         │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │  Polling Loop (every 5 minutes)                               │  │
│  │  └─ Reads: /Users/caio_almeida/Obsidian/1-PROJECTS/**/*.md   │  │
│  │  └─ Parses: YAML frontmatter + tags                          │  │
│  │  └─ Triggers: #proposta-pendente → queue job               │  │
│  └────────────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │  Agents Container                                              │  │
│  │  ├─ Sales Agent (proposta → Companie)                        │  │
│  │  ├─ PM Agent (project setup)                                 │  │
│  │  ├─ Analyst Agent (reports)                                  │  │
│  │  └─ DevOps Agent (git sync)                                  │  │
│  └────────────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │  Job Queue                                                      │  │
│  │  ├─ Pending: [T1: Malta proposal, T2: GetShake...] 🔄        │  │
│  │  ├─ Running: Sales Agent → Companie                          │  │
│  │  └─ Completed: [T0: ARQ Brasil proposal] ✅                   │  │
│  └────────────────────────────────────────────────────────────────┘  │
└──────────────────┬──────────────────────────┬──────────────────────┘
                   │                          │
                   │ (Read context)           │ (Execute API call)
                   ▼                          ▼
    ┌─────────────────────────┐    ┌──────────────────────────┐
    │  OBSIDIAN VAULT         │    │  COMPANIE API            │
    │  (Your brain)           │    │  (Your CRM)              │
    │                         │    │                          │
    │ 1-PROJECTS/            │    │ POST /deals              │
    │ ├─ Malta Rentals/      │    │ ├─ title                 │
    │ │  ├─ proposta.md      │───▶│ ├─ client_id             │
    │ │  ├─ brief.md         │    │ ├─ value                 │
    │ │  └─ brand-book.md    │    │ ├─ stage: "proposal"     │
    │ │                      │    │ └─ metadata              │
    │ ├─ GetShake/           │    │                          │
    │ ├─ ARQ Brasil/         │    │ GET /clients             │
    │ └─ ...9 clients        │    │ └─ Find by email         │
    │                         │    │                          │
    │ 3-RESOURCES/           │    │ PUT /deals/{id}          │
    │ ├─ brand-book.md       │    │ └─ Update stage (won)    │
    │ ├─ brand-briefing.md   │    │                          │
    │ └─ propostas/          │    │ GET /users/me            │
    │    └─ templates/       │    │ └─ Verify auth           │
    │                         │    │                          │
    │ 000-DASHBOARD-LIVE.md  │    └──────────────────────────┘
    │ └─ Dataview queries    │
    │    └─ #proposta-pendente
    └─────────────────────────┘
                 ▲ ▲
                 │ │
        Write back with:
        └─ #proposta-criada tag
        └─ companieDealId: "deal_123"
        └─ syncedAt: "2026-03-09T14:30:00Z"
```

---

## Component Interaction Sequence

### Timeline: New Proposal Creation (User Perspective)

```
TIME  SYSTEM             ACTION                          STATUS
────  ────────────────   ──────────────────────────     ──────────
T0    You               "Create Malta Rentals proposal"   ✍️ Writing
      Obsidian          Create note, add #proposta-pendente tag
                        File saved locally

T0+5m AIOS Sync Engine   Poll vault (every 5 minutes)     🔄 Scanning
      (periodic)        Detect: Malta note + #proposta-pendente

T0+5m Sales Agent       Load context:
      (concurrent)      ├─ Note title + body
                        ├─ 3-RESOURCES/brand-book.md
                        ├─ Previous Malta proposals
                        └─ Companie existing client?

T0+5m Sales Agent       Query Companie:
      (concurrent)      GET /clients?email=malta@...
                        Response: client_id = "client_456" ✅ Found

T0+6m Sales Agent       Create deal in Companie:
      (concurrent)      POST /deals {
                          title: "Malta - New Feature",
                          client_id: "client_456",
                          value: 25000,
                          metadata: {source: "aios"}
                        }
                        Response: deal_id = "deal_new_999"

T0+6m AIOS              Update Obsidian note:
      (concurrent)      Add to frontmatter:
                        ├─ companie_deal_id: "deal_new_999"
                        ├─ synced_at: "2026-03-09T14:35:00Z"
                        ├─ companie_link: "https://app.companie.app..."
                        └─ Remove #proposta-pendente
                        └─ Add #proposta-criada

T0+6m You               Obsidian updates visually      👀 See notification
                        "Proposal synced to Companie"
                        Link to Companie deal

T0+7m Companie          Your dashboard shows new deal     💰 New opportunity
                        Malta Rentals - $25k - Proposal stage

RESULT: Fully automated, 0 manual work, 6 minutes end-to-end ✅
```

---

## Data Flow Diagram

### Proposal Generation Flow

```
                    ┌──────────────────┐
                    │   YOU (Trigger)  │
                    │  Create note in  │
                    │ Obsidian + tag   │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │  AIOS Sync Loop  │
                    │ Detects tag      │
                    │ Queues job       │
                    └────────┬─────────┘
                             │
                             ▼
                  ┌─────────────────────────┐
                  │  Sales Agent Starts     │
                  │ ──────────────────────  │
                  │ Load context from vault:│
                  │ ├─ Brand book          │ ◄──┐
                  │ ├─ Previous proposals  │    │
                  │ ├─ Templates           │    │ Read from Obsidian
                  │ └─ Client history      │    │ (File System)
                  │                        │ ◄──┘
                  └────────┬────────────────┘
                           │
                           ▼
                  ┌─────────────────────────┐
                  │  Generate Proposal      │
                  │ ──────────────────────  │
                  │ ├─ Analyze client needs│
                  │ ├─ Select best template│
                  │ ├─ Fill in values      │
                  │ └─ Personalize tone    │
                  └────────┬────────────────┘
                           │
                           ▼
                  ┌─────────────────────────┐
                  │ Query Companie for      │
                  │ existing client         │
                  │ GET /clients?email=... │ ◄──┐
                  │ Response: client_id    │    │
                  └────────┬────────────────┘    │ API Call to
                           │                    │ Companie
                  ┌────────▼────────────────┐   │
                  │ Create Deal in Companie │   │
                  │ POST /deals {           │   │
                  │   title, client_id,     │   │
                  │   value, stage,         │ ──┘
                  │   metadata              │
                  │ }                       │
                  │ Response: deal_id       │
                  └────────┬────────────────┘
                           │
                           ▼
                  ┌─────────────────────────┐
                  │ Update Obsidian Note    │
                  │ ──────────────────────  │
                  │ ├─ Add companie_deal_id│ ◄──┐
                  │ ├─ Add synced_at       │    │
                  │ ├─ Remove #tag-pending │    │ Write back to
                  │ ├─ Add #tag-created    │    │ Obsidian
                  │ └─ Add link to deal    │    │ (File System)
                  └────────┬────────────────┘    │
                           │                    ◄──┘
                           ▼
                    ┌──────────────────┐
                    │  COMPLETE! ✅    │
                    │ Obsidian synced  │
                    │ Companie updated │
                    │ You get notified │
                    └──────────────────┘
```

---

## Component Responsibilities Matrix

| Component | Reads From | Writes To | Frequency | Latency |
|-----------|-----------|-----------|-----------|---------|
| **Sync Loop** | Obsidian (disk) | Job Queue | Every 5min | <1s |
| **Sales Agent** | Obsidian, Companie | Companie, Obsidian | On trigger | <60s |
| **PM Agent** | Obsidian | Obsidian | On trigger | <5s |
| **Analyst Agent** | Obsidian, Companie | Obsidian, Reports | Daily | <5min |
| **DevOps Agent** | Obsidian | Git repos | On commit | <30s |

---

## Error Handling & Recovery Flows

### Scenario 1: Proposal Creation Fails (Bad Companie Response)

```
Sales Agent → POST /deals → ❌ 400 Bad Request (invalid client_id)
    │
    ├─ Log error with full context
    ├─ Check if client exists
    │  ├─ If not: Create client first, retry
    │  └─ If yes: Manual review needed
    │
    └─ Update Obsidian note:
       ├─ Tag: #proposta-erro
       ├─ Error message in note
       └─ Alert: "⚠️ Failed to sync, needs review"
```

### Scenario 2: Obsidian File Locked (User editing)

```
Sync Loop → Read vault → ❌ File locked
    │
    ├─ Wait 10 seconds
    ├─ Retry (max 3 times)
    │  ├─ Success: Continue normally
    │  └─ Still locked: Skip this file, try next sync
    │
    └─ No data loss: Proposal queued for next cycle
```

### Scenario 3: Network Timeout (Companie unreachable)

```
Sales Agent → Companie API → ❌ Timeout
    │
    ├─ Exponential backoff: 1s → 2s → 4s → 8s
    ├─ Max retries: 5
    │  ├─ Success: Continue normally
    │  └─ Still failing: Mark job as "BLOCKED"
    │
    └─ Update Obsidian:
       ├─ Note status: "⏳ Pending (waiting for Companie)"
       └─ Alert you to check Companie status
```

---

## Security & Data Isolation

```
┌─────────────────────────────────────────────────────┐
│                  Your Local Machine                  │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │ Obsidian Vault                               │  │
│  │ (Private, local, encrypted if needed)        │  │
│  │                                              │  │
│  │ .md files + .git history                     │  │
│  │ Only AIOS process reads this                 │  │
│  └──────────────────────────────────────────────┘  │
│                     │ (local disk)                  │
│  ┌──────────────────▼──────────────────────────┐  │
│  │ AIOS Process (Node.js CLI)                  │  │
│  │                                              │  │
│  │ Reads .md files directly                    │  │
│  │ No network needed for Obsidian              │  │
│  │ Environment variables for secrets (.env)    │  │
│  │                                              │  │
│  │ COMPANIE_API_KEY=sk_live_xxxxx (encrypted)  │  │
│  └──────────────────┬──────────────────────────┘  │
│                     │ (HTTPS only)                 │
└─────────────────────┼──────────────────────────────┘
                      │
          ┌───────────▼───────────┐
          │   COMPANIE API         │
          │   (HTTPS, auth)        │
          │                        │
          │   Your instance only   │
          │   No data shared       │
          └────────────────────────┘
```

**Security Properties:**
- ✅ Obsidian data never leaves your machine
- ✅ Only AIOS process reads Obsidian
- ✅ API keys stored in `.env` (encrypted, never committed)
- ✅ All API calls use HTTPS
- ✅ Companie API authenticated with API key
- ✅ Full audit trail in note metadata

---

## Scalability Considerations

### Current Configuration
```
Assumptions:
├─ 9 active clients
├─ ~50-100 proposals/month
├─ 5-minute sync interval
└─ <1 proposal per minute peak

Capacity:
├─ Polling: 1 disk read per 5min = negligible
├─ API calls: ~2 per proposal = 200/month = OK
├─ File I/O: <1MB per sync = negligible
└─ CPU: <5% usage during sync
```

### Scaling to 100+ Clients
```
If you grow to 100+ clients + 1000+ proposals/month:
├─ Increase polling frequency: 5min → 1min
├─ Add background worker process
├─ Implement proposal queue (bull/BullMQ)
├─ Cache client list (update every 5min)
├─ Batch API calls (create 10 deals per request)
└─ Add monitoring dashboard (prometheus)

Cost impact: Still <$10/month (Node.js can handle it)
```

---

## Monitoring & Observability

```
┌─────────────────────────────────────────────────┐
│        AIOS Operations Dashboard                 │
│  ┌───────────────────────────────────────────┐  │
│  │  Metrics (last 24h)                       │  │
│  │  ├─ Vault syncs: 288 (1 per 5min) ✅      │  │
│  │  ├─ Proposals queued: 12                  │  │
│  │  ├─ Successfully created: 11              │  │
│  │  ├─ Failed: 1 (needs review)              │  │
│  │  ├─ Average processing: 35 seconds        │  │
│  │  └─ Companie API uptime: 99.9%            │  │
│  └───────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────┐  │
│  │  Recent Jobs                              │  │
│  │  ├─ ✅ 14:35 Malta - New Feature          │  │
│  │  ├─ ✅ 14:30 GetShake - Updates           │  │
│  │  ├─ ⏳ 14:25 ARQ Brasil - Pending         │  │
│  │  └─ ❌ 14:20 PIX DO SHEIK - Auth error   │  │
│  └───────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────┐  │
│  │  Logs (tail -f .aios/logs/sync.log)       │  │
│  │  [14:35:02] Sales Agent: Proposal sent    │  │
│  │  [14:35:01] API: deal_new_999 created    │  │
│  │  [14:34:55] Obsidian: Note updated       │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

---

## Future Enhancements (Post-MVP)

```
Phase 4 (3 months):
├─ Webhook support (real-time instead of polling)
├─ Obsidian plugin UI (buttons in sidebar)
├─ Email notifications (deal created → Slack)
├─ Proposal version control (git diff in Obsidian)
├─ AI-powered insights (best-performing templates)
└─ Client satisfaction tracking (NPS in Companie)

Phase 5 (6 months):
├─ Multi-platform sync (Notion, Supabase, Firebase)
├─ Client portal (auto-send proposals via email)
├─ Contract signing integration (HelloSign)
├─ Invoice generation (from Companie to Invoice system)
└─ Revenue reporting (auto-generate P&L)
```

---

## Summary: Architecture is Simple by Design

The beauty of this architecture:
1. **Obsidian is source of truth** (your brain)
2. **AIOS is the executor** (actions)
3. **Companie is the recorder** (audit trail)
4. **Files are the API** (Obsidian → disk)
5. **REST is the protocol** (Companie API)

**No complex microservices, no containers, no cloud.**
Just: Read → Think → Act → Write.

---

**Owner:** @architect
**Status:** Reference document (ready for Phase 2)
**Questions?** See OBSIDIAN-API-ANALYSIS.md or COMPANIE-API-SPEC.md
