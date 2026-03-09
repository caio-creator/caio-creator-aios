# Obsidian ↔️ AIOS Integration Roadmap
**Status:** Phase 1 (API Mapping) - IN PROGRESS
**Created:** 2026-03-09
**Target:** Complete integration by 2026-03-16

---

## 📊 Executive Summary

Integrating AIOS agents with your Obsidian Vault (658 notes, P.A.R.A structure) + Companie (internal platform) to unlock:
- **Automated proposal generation** (45min → 5min)
- **Intelligent client onboarding** (30min → 2min)
- **Real-time knowledge sync** across systems
- **Smart decision-making** based on unified context

---

## 🎯 4-Phase Implementation Plan

### PHASE 1: API Mapping (Current - 2 days)
**Goal:** Identify all connection points between Obsidian, Companie, Git repos

**Tasks:**
- [ ] 1.1: Map Obsidian API options (official + plugins)
- [ ] 1.2: Audit Companie API endpoints & authentication
- [ ] 1.3: Define data schemas (notes → JSON → API)
- [ ] 1.4: Create integration diagram

**Deliverables:**
- `OBSIDIAN-API-ANALYSIS.md` - Pros/cons of each option
- `COMPANIE-API-SPEC.md` - Endpoints, auth, rate limits
- `DATA-SCHEMA-MAPPING.md` - Field-by-field transformation rules
- `ARCHITECTURE-DIAGRAM.yml` - Visual flow

**Owner:** @architect
**Status:** ⏳ Ready to start

---

### PHASE 2: Companie Integration Enhancement (2 days)
**Goal:** Extend your existing Companie plan (from MEMORY.md) with real API implementation

**Tasks:**
- [ ] 2.1: Choose integration method (Manual/Zapier/Make.md/Claude API)
- [ ] 2.2: Design webhook schema (Obsidian → Companie triggers)
- [ ] 2.3: Create authentication layer (API keys, rate limits)
- [ ] 2.4: Build data transformation engine

**Deliverables:**
- `COMPANIE-INTEGRATION-DETAILED.md` - Implementation specs
- `webhook-schema.yaml` - Event-driven architecture
- `auth-config.template.md` - Secure credential management
- `.env.example` - Required environment variables

**Owner:** @architect + @dev
**Status:** ⏳ Awaiting Phase 1

---

### PHASE 3: Agent Definitions (2 days)
**Goal:** Design 4-6 specialized agents that read Obsidian context and take actions

**Tasks:**
- [ ] 3.1: Define Sales Agent (proposal generation)
- [ ] 3.2: Define Project Manager Agent (onboarding/delivery)
- [ ] 3.3: Define Analyst Agent (insights/reporting)
- [ ] 3.4: Define DevOps Agent integration (repo sync)
- [ ] 3.5: Create agent memory structure

**Agent Specs:**
1. **Sales Agent** - Read proposals, client history, templates → Generate proposal
2. **PM Agent** - Read project template, client brief → Create project folder + kickoff
3. **Analyst Agent** - Query all client data → Generate monthly reports
4. **DevOps Agent** - Sync repo state ↔ Obsidian documentation
5. **Brand Agent** - Maintain tone consistency across all outputs

**Deliverables:**
- `.aios-core/development/agents/sales-agent.md`
- `.aios-core/development/agents/pm-agent.md`
- `.aios-core/development/agents/analyst-agent.md`
- `AGENT-ARCHITECTURE.md` - Communication protocol

**Owner:** @architect + @pm
**Status:** ⏳ Awaiting Phase 1

---

### PHASE 4: Prototype & Validation (3 days)
**Goal:** Build 1 complete workflow (New Client → Proposal → Companie)

**Tasks:**
- [ ] 4.1: Choose pilot client (e.g., Malta Rentals or new prospect)
- [ ] 4.2: Implement Sales Agent (full workflow)
- [ ] 4.3: Test with real data
- [ ] 4.4: Validate output quality
- [ ] 4.5: Document lessons learned

**Workflow: New Client → Proposal**
```
User creates note: "novo cliente XYZ + brief"
    ↓
Sales Agent reads:
  - Client brief (from note)
  - brand-book.md (tone/style)
  - Previous proposals (similar clients)
  - Templates (3-RESOURCES)
    ↓
Sales Agent generates:
  - Proposal (markdown)
  - Sends to Companie API
  - Updates Obsidian note
    ↓
User reviews & approves
    ↓
Done!
```

**Success Criteria:**
- ✅ Proposal generated in < 5 minutes
- ✅ Quality matches manual proposals (80%+)
- ✅ Zero manual intervention needed
- ✅ Full audit trail in Obsidian

**Deliverables:**
- `PROTOTYPE-REPORT.md` - Results & findings
- Working agent code (production-ready)
- Video walkthrough (optional)

**Owner:** @dev + @qa + @sales-agent
**Status:** ⏳ Awaiting Phase 3

---

## 📐 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    USER WORKSPACE                       │
│  (Your decision point: trigger automations)             │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        ↓                         ↓
   ┌─────────────┐         ┌──────────────┐
   │  OBSIDIAN   │         │  AIOS AGENTS │
   │  Vault      │◄────►   │  (CLI)       │
   │  (Context)  │         │  (Logic)     │
   └─────────────┘         └──────────────┘
        ↑ ↓ ↓                     ↓ ↓ ↓
        │ │ └─────────────┬───────┘ │ │
        │ │               │         │ │
        │ └────────────┐  │  ┌──────┘ │
        │          ┌───┴──▼──┴───┐    │
        │          │   APIs      │    │
        │          │  & WEBHOOKS │    │
        │          └───┬──┬──┬───┘    │
        │              │  │  │        │
    ┌───┴──┐    ┌──────┘  │  └─────┬─┴────┐
    │ Git  │    │         │        │      │
    │Repos │    │    COMPANIE   NOTION  EMAIL
    └──────┘    │         │        │      │
               └─────────┘└────────┴──────┘
```

---

## 🔌 Integration Points (Detailed)

### Data Flow: New Proposal Scenario

**Timeline:** T0 to T4

| T | System | Action | Data |
|---|--------|--------|------|
| **T0** | Obsidian | User creates `#proposta-pendente` tag + brief | Text note |
| **T1** | Webhook | Obsidian triggers AIOS webhook | Note ID + tag |
| **T2** | Sales Agent | Reads context: brand-book, templates, similar clients | JSON context |
| **T3** | Agent → Companie | Generates proposal, sends to API | JSON proposal |
| **T4** | Companie | Creates deal/opportunity | Synced with CRM |
| **T4** | Obsidian | Agent updates note with "proposta-gerada" tag | Markdown link |

---

## 📋 Key Decisions (Awaiting Your Input)

### Decision 1: Obsidian API Method
**Options:**
1. **Obsidian Plugin + Dataview API** (Recommended)
   - Pros: Direct access, no auth complexity, real-time
   - Cons: Plugin dependency, smaller ecosystem

2. **File System API** (AIOS reads .md files directly)
   - Pros: Simple, no plugin needed
   - Cons: No real-time sync, requires file polling

3. **Hybrid** (File system + Webhooks)
   - Pros: Best of both
   - Cons: More complex setup

**Your choice:** _______________

### Decision 2: Automation Trigger Method
**Options:**
1. **Webhook-based** (Obsidian tag → AIOS)
   - Pros: Real-time, reactive
   - Cons: Requires plugin setup

2. **Cron-based** (AIOS polls every 5min)
   - Pros: Simple, no plugins
   - Cons: 5min latency, less responsive

3. **Manual CLI** (You run `aios sync-obsidian`)
   - Pros: Full control
   - Cons: Requires you to remember to run it

**Your choice:** _______________

### Decision 3: Agent Priority (What automate first?)
**Options:**
1. **Sales Agent** (Proposals) - Highest ROI
2. **PM Agent** (Onboarding) - Fastest results
3. **Analyst Agent** (Reports) - Strategic insights

**Your choice:** _______________

---

## 🛠️ Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Vault** | Obsidian + Dataview | Your system of record |
| **Orchestration** | AIOS + Node.js | CLI-first, type-safe |
| **APIs** | REST + Webhooks | Industry standard |
| **Auth** | API keys (encrypted) | Secure, manageable |
| **Sync** | File system polling + events | Dual-redundancy |
| **Storage** | Obsidian (source) + Companie | Distributed authority |

---

## 📅 Timeline & Resource Allocation

```
Week 1 (Mar 9-15):
├─ Phase 1 (API Mapping)      [Days 1-2]   @architect
├─ Phase 2 (Companie detail)  [Days 3-4]   @architect @dev
├─ Phase 3 (Agent design)     [Days 4-5]   @architect @pm
└─ Phase 4 (Prototype)        [Days 6-7]   @dev @qa

Week 2+ (Mar 16+):
├─ Extended agent ecosystem
├─ Production rollout
└─ Monitoring & optimization
```

---

## ⚠️ Known Risks & Mitigations

| Risk | Probability | Mitigation |
|------|-------------|-----------|
| Obsidian plugin incompatibility | Medium | Test with your vault first; fallback to file-system |
| Companie API rate limits | Low | Implement queue system, cache responses |
| Data sync conflicts | Low | Implement reconciliation logic, audit trail |
| Agent hallucination | Medium | All outputs reviewed by @qa before publishing |
| Secret leakage | Low | Rotate keys monthly, encrypt .env |

---

## 🚀 Success Metrics

By end of Phase 4:
- [ ] New proposal generation: <5min (vs 45min)
- [ ] New client onboarding: <2min setup (vs 30min)
- [ ] Zero data loss between systems
- [ ] 2+ agents fully operational
- [ ] 95%+ quality parity with manual work

---

## 📁 File Structure (Generated)

```
docs/
├─ OBSIDIAN-AIOS-INTEGRATION-ROADMAP.md  (this file)
├─ research/
│  ├─ OBSIDIAN-API-ANALYSIS.md
│  ├─ COMPANIE-API-SPEC.md
│  └─ DATA-SCHEMA-MAPPING.md
├─ design/
│  ├─ ARCHITECTURE-DIAGRAM.yml
│  ├─ COMPANIE-INTEGRATION-DETAILED.md
│  ├─ AGENT-ARCHITECTURE.md
│  └─ webhook-schema.yaml
└─ prototype/
   ├─ PROTOTYPE-REPORT.md
   └─ implementation-logs/

.aios-core/development/agents/
├─ sales-agent.md
├─ pm-agent.md
├─ analyst-agent.md
└─ AGENT-MEMORY.md

packages/
├─ @aios/obsidian-connector/   (new)
│  ├─ src/
│  │  ├─ obsidian-api.ts
│  │  ├─ webhook-handler.ts
│  │  └─ data-transformer.ts
│  └─ tests/
└─ @aios/companie-connector/   (new)
   ├─ src/
   │  ├─ companie-api.ts
   │  └─ auth.ts
   └─ tests/
```

---

## 📞 Questions for You

Before starting Phase 1, clarify:

1. **Obsidian subscription level?** (Free / Catalyst / Commercial)
   - Affects which plugins are available

2. **Companie API access level?**
   - Do you have API keys? Webhook URLs?

3. **Which client should be the pilot?**
   - Need a real test case for Phase 4

4. **Timeline preference?**
   - All 4 phases in 1 week? Or distributed?

---

## 🔗 Related Documents

- `MEMORY.md` - Your system context (9 clients, 75 proposals, etc.)
- `.aios-core/CLAUDE.md` - AIOS framework config
- `AGENTS.md` - Available agents
- `000-DASHBOARD-LIVE.md` - Your current dashboard

---

**Next Step:** Confirm decisions above, then start Phase 1 with @architect
