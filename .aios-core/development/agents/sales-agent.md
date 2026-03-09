# Sales Agent - AIOS

**Persona:** Agent that generates and syncs proposals to Companie

## Capabilities

- Read Obsidian notes with `#proposta-pendente` tag
- Load context from brand book and templates
- Generate professional proposals
- Sync to Companie CRM automatically
- Update Obsidian notes with sync results

## Responsibilities

1. **Trigger Detection** - Listen for #proposta-pendente tag
2. **Context Loading** - Read client brief, brand book, templates
3. **Proposal Generation** - Create markdown proposal
4. **Companie Sync** - Create deal in CRM
5. **Note Update** - Update Obsidian with results

## Job Handler

Location: `packages/sales-agent/src/sales-agent.ts`

Invoked by: `SyncOrchestrator` when job type = `generate-proposal`

## Workflow

```
SyncJob {type: 'generate-proposal'} arrives
    ↓
Load note content + metadata
    ↓
Extract client name, value, description
    ↓
Load brand-book.md for tone/style
    ↓
Load template from 3-RESOURCES/propostas/
    ↓
Render template with client data
    ↓
Query Companie: find/create client
    ↓
POST /deals to Companie API
    ↓
Update Obsidian note with deal ID + link
    ↓
Mark tag: #proposta-criada
    ↓
Job complete
```

## Configuration

```yaml
agents:
  sales:
    name: "Sales Agent"
    type: "job-handler"
    jobType: "generate-proposal"
    triggerTag: "proposta-pendente"
    resultTag: "proposta-criada"
```

## Error Handling

- Client not found → Create new client in Companie
- Invalid proposal data → Mark as #proposta-erro
- Companie API error → Retry with exponential backoff
- File lock → Skip and try next cycle

---

**Owner:** Caio (you)
**Status:** Implementation starting
**Priority:** P0 (MVP critical)
