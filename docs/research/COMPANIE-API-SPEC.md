# Companie API Specification & Integration Guide
**Date:** 2026-03-09
**Status:** REQUIRES VERIFICATION - Contact Companie support
**Owner:** @architect

---

## Executive Summary

Companie is your **internal CRM/operations platform** where:
- Client deals are created
- Proposals become opportunities
- Revenue is tracked
- Team collaboration happens

For AIOS integration, we need to **push proposal data** → Companie automatically creates deals.

---

## Current Integration Status (From MEMORY.md)

✅ **Three implementation options identified:**
1. Manual entry (not scalable)
2. Zapier integration (medium complexity)
3. Direct API (this document)
4. Claude API (future automation)

**Goal:** Replace manual entry with AIOS → Companie API automation.

---

## Companie API Overview (Estimated Structure)

> ⚠️ **NOTE:** This is based on typical SaaS CRM patterns. Verify exact endpoints with Companie docs.

### Authentication

**Method:** API Key (Bearer Token)

```bash
# Your credentials (KEEP SECRET!)
COMPANIE_API_KEY=sk_live_xxxxxxxxxxxxx
COMPANIE_API_BASE=https://api.companie.app/v1

# Using curl
curl -H "Authorization: Bearer $COMPANIE_API_KEY" \
  $COMPANIE_API_BASE/deals
```

### Rate Limits

**Estimated limits** (verify with Companie):
- 1,000 requests per minute
- 10,000 per day
- Burst limit: 100 concurrent

For AIOS:
- 1 proposal sync = ~3-5 API calls
- Max 200 proposals/day = well under limits ✅

---

## Core API Endpoints (Estimated)

### 1. List Deals
```typescript
GET /deals

Response:
{
  "data": [
    {
      "id": "deal_123",
      "title": "Malta Rentals - Website Redesign",
      "stage": "proposal",
      "value": 25000,
      "currency": "BRL",
      "client_id": "client_456",
      "owner_id": "user_123",
      "created_at": "2026-03-09T10:00:00Z",
      "tags": ["website", "urgent"],
      "metadata": {...}
    }
  ],
  "pagination": { "limit": 50, "offset": 0, "total": 342 }
}
```

### 2. Create Deal
```typescript
POST /deals

Request:
{
  "title": "New Client XYZ - Proposal",
  "stage": "proposal",          // pipeline: lead → proposal → won/lost
  "value": 50000,
  "currency": "BRL",
  "client_id": "client_789",    // Link to existing client
  "description": "Full proposal text",
  "due_date": "2026-03-30",
  "tags": ["proposal", "aios-generated"],
  "metadata": {
    "source": "aios",           // Track that AIOS created this
    "obsidian_note": "1-PROJECTS/Client-XYZ/proposta.md",
    "auto_generated": true
  }
}

Response:
{
  "id": "deal_new_123",
  "status": "created",
  "message": "Deal created successfully"
}
```

### 3. Update Deal
```typescript
PUT /deals/{deal_id}

Request: { "stage": "won", "value": 55000, ... }
Response: { "id": "deal_123", "updated": true }
```

### 4. List Clients
```typescript
GET /clients

// Find existing client before creating deal
Response:
{
  "data": [
    {
      "id": "client_456",
      "name": "Malta Rentals",
      "email": "contact@maltarentals.com",
      "phone": "+55 11 98765-4321",
      "address": {...},
      "created_at": "2025-06-15T08:30:00Z"
    }
  ]
}
```

### 5. Create Client
```typescript
POST /clients

Request:
{
  "name": "New Client Company",
  "email": "contact@newclient.com",
  "phone": "+55 11 99999-9999",
  "industry": "tech",
  "size": "10-50",
  "country": "BR",
  "metadata": {
    "source": "aios-proposal",
    "first_contact_date": "2026-03-09"
  }
}

Response:
{
  "id": "client_new_789",
  "created": true
}
```

### 6. Get User/Team Info
```typescript
GET /users/me

Response:
{
  "id": "user_123",
  "name": "Caio Almeida",
  "email": "caio@creator.ai",
  "role": "owner"
}
```

---

## ★ Insight ─────────────────────────────────────
**API Design Pattern for AIOS:**

The key insight is that Companie follows a **standard REST CRUD** pattern:
- Deals = your opportunities/proposals
- Clients = account/company records
- Stages = pipeline progress (lead → proposal → won)

For AIOS integration, the flow is simple:
1. **Check if client exists** → GET /clients (search by email)
2. **Create if not** → POST /clients
3. **Create deal** → POST /deals (links to client_id)
4. **Update status later** → PUT /deals/{id}

No complex state machines, just sequential API calls.
─────────────────────────────────────────────────────────

---

## Integration Flow: AIOS → Companie

### Scenario: New Proposal for Malta Rentals

```
T0: User creates Obsidian note
    └─ Tags: #proposta-pendente
    └─ Content: "Malta Rentals - New Feature"

T1: AIOS Sync detects tag
    └─ Reads note metadata
    └─ Extracts: client, value, description

T2: Sales Agent queries Companie
    ├─ GET /clients?email=contact@maltarentals.com
    └─ Response: client_id = "client_456"

T3: Sales Agent creates deal
    ├─ POST /deals
    ├─ Payload: {
    │    "title": "Malta Rentals - New Feature",
    │    "client_id": "client_456",
    │    "value": 25000,
    │    "stage": "proposal",
    │    "metadata": {
    │      "source": "aios",
    │      "obsidian_note": "1-PROJECTS/Malta-Rentals/proposal.md"
    │    }
    │  }
    └─ Response: deal_id = "deal_new_456"

T4: Sales Agent updates Obsidian
    └─ Appends: "Status: ✅ In Companie (deal_new_456)"
    └─ Removes: #proposta-pendente tag
    └─ Adds: #proposta-criada tag

T5: User sees in Obsidian
    └─ "Proposal synced to Companie"
    └─ Can click link to view in Companie
```

### TypeScript Implementation

```typescript
// sales-agent.ts
import axios from 'axios'

class SalesAgentToCompanie {
  private companieAPI = axios.create({
    baseURL: process.env.COMPANIE_API_BASE,
    headers: {
      Authorization: `Bearer ${process.env.COMPANIE_API_KEY}`
    }
  })

  async syncProposalToCompanie(proposal: {
    title: string
    clientEmail: string
    value: number
    description: string
    obsidianNoteFile: string
  }) {
    try {
      // Step 1: Find or create client
      let clientId = await this.findOrCreateClient(proposal.clientEmail)

      // Step 2: Create deal
      const dealResponse = await this.companieAPI.post('/deals', {
        title: proposal.title,
        client_id: clientId,
        value: proposal.value,
        currency: 'BRL',
        stage: 'proposal',
        description: proposal.description,
        metadata: {
          source: 'aios',
          obsidian_note: proposal.obsidianNoteFile,
          auto_generated: true,
          sync_date: new Date().toISOString()
        }
      })

      const dealId = dealResponse.data.id

      // Step 3: Update Obsidian note
      await this.updateObsidianNote(proposal.obsidianNoteFile, {
        companieLink: `https://app.companie.app/deals/${dealId}`,
        companieDealId: dealId,
        syncedAt: new Date().toISOString()
      })

      return { success: true, dealId }
    } catch (error) {
      logger.error('Failed to sync proposal to Companie', {
        proposal: proposal.title,
        error: error.message
      })
      throw error
    }
  }

  private async findOrCreateClient(email: string) {
    try {
      // Try to find existing
      const response = await this.companieAPI.get('/clients', {
        params: { email }
      })

      if (response.data.data.length > 0) {
        return response.data.data[0].id
      }

      // Create new if not found
      const newClientResponse = await this.companieAPI.post('/clients', {
        email,
        name: email.split('@')[0], // Fallback name
        source: 'aios-proposal'
      })

      return newClientResponse.data.id
    } catch (error) {
      logger.error('Failed to find/create client', { email })
      throw error
    }
  }
}
```

---

## Webhook Support (Optional, Future)

If Companie supports webhooks, you could react to events:

```typescript
// Receive webhook from Companie
POST /webhooks/companie-update

{
  "event": "deal.status_changed",
  "deal_id": "deal_123",
  "old_stage": "proposal",
  "new_stage": "won",
  "timestamp": "2026-03-15T10:00:00Z"
}

// Action: Update Obsidian note automatically
→ Update note to "Status: 🎉 Won!"
→ Move to 4-ARCHIVE as completed
```

---

## Error Handling Strategy

### Common Errors & Recovery

```typescript
// Rate limit error
if (error.status === 429) {
  await wait(60000)  // Wait 60s
  retry()
}

// Invalid client_id
if (error.status === 400 && error.message.includes('client_id')) {
  // Fetch fresh client list, try again
  const freshClientId = await findOrCreateClient(email)
  retry({ clientId: freshClientId })
}

// Network timeout
if (error.code === 'ECONNREFUSED') {
  logger.warn('Companie API unreachable, will retry at next sync')
  // Queue for retry in next scheduled sync
}
```

---

## Data Mapping: Obsidian → Companie

| Obsidian Field | Type | Companie Field | Notes |
|---|---|---|---|
| Note title | string | `/deals.title` | "Malta Rentals - Proposal" |
| Client name (from path) | string | `/clients.name` | Extract from 1-PROJECTS folder |
| `value` frontmatter | number | `/deals.value` | In BRL |
| `description` body | string | `/deals.description` | Proposal description |
| `stage` frontmatter | enum | `/deals.stage` | "proposal", "won", etc |
| `#tags` in note | array | `/deals.tags` | Copy tag structure |
| Modified date | ISO | `/deals.updated_at` | Sync timestamp |
| Note file path | string | `/deals.metadata.obsidian_note` | Audit trail |

---

## Testing the Integration

### Manual Test (Before Automation)

```bash
# 1. Get your user ID
curl -H "Authorization: Bearer $COMPANIE_API_KEY" \
  https://api.companie.app/v1/users/me

# 2. List existing clients
curl -H "Authorization: Bearer $COMPANIE_API_KEY" \
  "https://api.companie.app/v1/clients?limit=10"

# 3. Create test deal
curl -X POST \
  -H "Authorization: Bearer $COMPANIE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Proposal from AIOS",
    "stage": "proposal",
    "value": 5000,
    "client_id": "YOUR_CLIENT_ID",
    "metadata": {"source": "aios-test"}
  }' \
  https://api.companie.app/v1/deals

# 4. Verify in Companie dashboard
# Log into app.companie.app and check "Test Proposal from AIOS" appears
```

---

## Security & Credentials

### Storage
```bash
# .env file (KEEP SECRET, never commit)
COMPANIE_API_KEY=sk_live_xxxxxxxxxxxxx
COMPANIE_API_BASE=https://api.companie.app/v1

# Alternative: Use 1Password/LastPass
# Load at runtime: source <(op read "secret/companie-api" --format json)
```

### Rotation
- [ ] Rotate API key quarterly
- [ ] Audit access logs monthly
- [ ] Use separate key for dev vs production
- [ ] Set webhook IP allowlist if available

### Audit Trail
Every AIOS-created deal has:
```json
"metadata": {
  "source": "aios",
  "created_by": "sales-agent",
  "timestamp": "2026-03-09T14:30:00Z",
  "version": "1.0"
}
```

This allows you to:
- Query "all AIOS-generated deals"
- Audit automation quality
- Rollback if needed

---

## Limitations & Constraints

| Constraint | Impact | Workaround |
|---|---|---|
| No bulk API endpoint | Creating 50 proposals takes 50 calls | Implement queue system, space over 10min |
| Rate limit 1000/min | High-volume days may hit limit | Implement exponential backoff + queue |
| No webhook signing | Can't verify webhook authenticity (if added later) | Verify via callback validation API |
| No API versioning | Breaking changes possible | Monitor Companie changelog, pin version in code |

---

## Implementation Tasks

| Task | Estimate | Owner | Status |
|---|---|---|---|
| Verify API endpoints with Companie | 30min | @architect | ⏳ TODO |
| Get API key from Companie admin | 15min | You | ⏳ TODO |
| Test authentication (manual curl) | 30min | @dev | ⏳ TODO |
| Implement client finder/creator | 2h | @dev | ⏳ TODO |
| Implement deal creator | 2h | @dev | ⏳ TODO |
| Add error handling & retry logic | 1.5h | @dev | ⏳ TODO |
| Write unit tests | 2h | @qa | ⏳ TODO |
| Integration test (end-to-end) | 1.5h | @qa | ⏳ TODO |
| Documentation | 1h | @architect | ⏳ TODO |
| **Total** | **~13 hours** | | |

---

## Next Steps

### What You Need to Do
1. **Verify** this API spec against Companie documentation
   - Contact Companie support: support@companie.app
   - Ask: "Can you share API documentation?"
   - Verify endpoints, auth method, rate limits

2. **Provide API Key**
   - Generate from Companie settings → API Keys
   - Store securely (I'll never see it)
   - You'll provide via `.env` during implementation

3. **Confirm Client Mapping**
   - How are clients identified? (Email? ID? Name?)
   - Are there required fields for clients?
   - Do you want auto-create clients or only existing?

---

## Related Documents

- `OBSIDIAN-API-ANALYSIS.md` - How to read from Obsidian
- `OBSIDIAN-AIOS-INTEGRATION-ROADMAP.md` - Full project plan
- `DATA-SCHEMA-MAPPING.md` - Field transformations

---

**Status:** AWAITING VERIFICATION
**Next Review:** After Companie API documentation confirmed
**Questions?** Email Companie support or contact your account manager
