# Re:MirAI ver2 Backend Engineering & API Control Guide

**Author:** Backend Architecture Team  
**Audience:** Backend engineers, DevOps, API reviewers  
**Version:** 2.0 (aligned with ver2 frontend overhaul)  
**Sources:** `docs/02-project-overview/*`, `docs/07-Enhancement/ver2/*`, backend NestJS repo  

---

## 13. Mission Context

Ver2 elevates the Summoning ritual into a cinematic, multi-stage experience (Survey Hub → Summoning → Persona Room). The backend must:

1. **Convert anonymous survey “echoes” into actionable persona data** (see `02-Core-Features.md` & `05-Design-Resources.md`).
2. **Expose trustworthy APIs** that keep the frontend in sync through the Pre-Synthesis → Alchemic Mode → Reveal flow (`07-Summoning-Page-Enhancement.md`).
3. **Guarantee privacy** (an explicit goal in `01-Project-Goals.md`) while preserving low-latency chat + synthesis interactions.

This guide documents the system boundaries, data contracts, and execution plan required to ship ver2 reliability standards.

---

## 14. High-Level Architecture

| Layer | Responsibilities | Notes |
|------|------------------|-------|
| **API Gateway (NestJS)** | REST endpoints, authentication, request validation | Currently only `auth` module exists—ver2 requires additional modules enumerated below. |
| **Domain Modules** | Encapsulate survey orchestration, persona synthesis, chat, and analytics | Each module should expose DTOs + Swagger docs for API control. |
| **Data Layer (Prisma + PostgreSQL)** | Persistent store for rituals, responses, personas, chats | Reference `prisma/schema.prisma`; extend to support archetypes, persona versions, events. |
| **Async Workers / Queues** | Persona synthesis, analytics, AI calls | Use BullMQ / SQS to prevent blocking App Router interactions. |
| **AI Providers** | OpenAI GPT-4 (persona narrative + chat), embedding services, moderation | Abstract behind `AIService` for auditability + fallback. |
| **Observability** | Structured logging, tracing, metrics, DLQ | Target <200 ms API latency, <30 s persona generation (per `01-Project-Goals.md`). |

---

## 15. Domain Modules & Responsibilities

| Module | Key Entities | Core Responsibilities | Ver2 Impact |
|--------|--------------|-----------------------|-------------|
| **Auth** | `User`, `Session`, `RefreshToken` | Google OAuth, JWT issuance | Already live; ensure tokens include `userId`, `locale`, `featureFlags`. |
| **Survey Hub** | `Survey`, `SurveySection`, `SurveyResponse`, `ShareToken` | Create rituals, track progress, enforce min 3 responses (`06-Survey-Hub-Page-Enhancement.md`) | Add statuses (`COLLECTING`, `READY`, `ARCHIVED`) & telemetry counters for Live Preview + Ritual Hub metrics. |
| **Summoning Pipeline** | `SummoningSession`, `ArchetypePreference`, `PersonaDraft`, `PersonaReveal` | Manage Pre-Synthesis timer, Alchemic Mode selection, queue persona synthesis, store reveal payload | Critical for aligning with `07-Summoning-Page-Enhancement.md`. |
| **Persona Service** | `Persona`, `PersonaVersion`, `PersonaTrait`, `MemoryShard` | Persist final persona data, track bonding meter, connect to Persona Room (see `05-Persona-Room-Page-Enhancement.md`) | Must support versioning + rollback for re-synthesis. |
| **Chat Service** | `ChatThread`, `ChatMessage`, `TypingState` | Bridge persona responses with AI provider, apply guardrails | Provide streaming endpoints + conversation context for ver2 chat UI. |
| **Analytics & Notifications** | `EventLog`, `Reminder`, `ShareMetric` | Cron jobs for reminders, share tracking, growth metrics defined in `01-Project-Goals.md` | Feeds dashboard telemetry cards. |

---

## 16. Data Model Additions (Prisma)

Key tables to add/update (`snake_case` → Prisma `camelCase`):

1. **Survey Enhancements**
   ```prisma
   model Survey {
     id           String   @id @default(uuid())
     ownerId      String
     status       SurveyStatus @default(COLLECTING)
     responses    SurveyResponse[]
     minResponses Int      @default(3)
     archetypeHint String? // optional context from owner
     progressPct  Int      @default(0) // cached for Ritual Hub
     ...
   }
   ```

2. **Summoning Session**
   ```prisma
   model SummoningSession {
     id             String   @id @default(uuid())
     surveyId       String   @unique
     stage          SummoningStage @default(PRE_SYNTHESIS)
     selectedArchetype Archetype? // Creator/Sage/Explorer/Guardian
     progress       Int      @default(0)
     personaDraftId String?  // points to PersonaDraft once queued
     revealAt       DateTime?
     ...
   }
   ```

3. **Persona + Versioning**
   ```prisma
   model Persona {
     id             String   @id @default(uuid())
     userId         String
     activeVersionId String?
     bondScore      Int      @default(0) // feeds Persona Room meter
     memories       MemoryShard[]
     ...
   }

   model PersonaVersion {
     id          String   @id @default(uuid())
     personaId   String
     archetype   Archetype
     synopsis    String
     traits      Json
     createdAt   DateTime @default(now())
   }
   ```

4. **Chat Thread**
   ```prisma
   model ChatMessage {
     id         String   @id @default(uuid())
     threadId   String
     role       ChatRole // USER | PERSONA
     content    String
     metadata   Json?
     createdAt  DateTime @default(now())
   }
   ```

---

## 17. API Surface (v1)

### 5.1 Survey Hub

| Endpoint | Method | Description | Notes |
|----------|--------|-------------|-------|
| `/v1/surveys` | POST | Create ritual; returns share token | Validate min sections (ver2 templates). |
| `/v1/surveys/{id}` | GET | Fetch survey with progress, template metadata | Used by Ritual Hub + Live Preview. |
| `/v1/surveys/{id}/responses` | POST (public) | Submit anonymous response | Rate-limit & store hashed fingerprint. |
| `/v1/surveys/{id}/status` | GET | Progress %, readiness flag | Drives dashboard progress bars. |

### 5.2 Summoning Pipeline

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/v1/summoning/{surveyId}` | GET | Returns session state (`PRE_SYNTHESIS`, timers, progress). |
| `/v1/summoning/{surveyId}/archetype` | POST | Save archetype selection + optional rationale (ver2 Alchemic Mode). |
| `/v1/summoning/{surveyId}/queue` | POST | Initiate synthesis job once ready (idempotent). |
| `/v1/summoning/{surveyId}/reveal` | GET | Poll reveal payload (persona preview, CTA links). |

### 5.3 Persona & Chat

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/v1/personas/{personaId}` | GET | Persona card, bonding meter, latest memories. |
| `/v1/personas/{personaId}/memories` | POST | Append new MemoryShard from ver2 experiences. |
| `/v1/chat/{personaId}` | POST | Send message; returns streaming response token or chunked SSE. |

### 5.4 Admin / Analytics

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/v1/admin/surveys/{id}/share-metrics` | GET | Summaries for telemetry cards. |
| `/v1/admin/summoning/sessions` | GET | Paginated session monitor (debug stage transitions). |

> **API Control:** Document DTOs in Swagger, enforce schema validation (e.g., `class-validator`), and add integration tests per module. Maintain backward compatibility by versioning endpoints.

---

## 18. Summoning Workflow Details

1. **Pre-Synthesis (duration: 3–5 s)**
   - `GET /summoning/{surveyId}` returns `stage=PRE_SYNTHESIS`, `eta`, `minResponses`.
   - Backend ensures survey has min responses; returns `422` otherwise.

2. **Alchemic Mode**
   - Frontend calls `POST /summoning/{surveyId}/archetype` with `archetypeId`, optional `motivation`.
   - Backend persists selection, sets `stage=ALCHEMIC_MODE`, and enqueues synthesis job if progress threshold met.
   - Provide `progress` field (0–100) computed from job state (`Queued`, `Embedding`, `Drafting`, `Styling`, `Reveal`).

3. **Persona Reveal**
   - Worker completes job, writes `PersonaVersion`, updates `SummoningSession.stage = REVEAL`, stores reveal payload (name, archetype, synopsis, CTA routes).
   - Frontend polls `GET /summoning/{surveyId}/reveal` (or subscribe via WebSocket) to present final stage.

4. **Failure Handling**
   - On AI error, set `stage=ERROR`, include `retryAfter` + friendly message (`“threads are tangled” per ver2 copy).
   - Support manual retry endpoint for support staff.

---

## 19. AI & Processing Pipelines

1. **Data Prep**
   - Aggregate survey responses; redact PII; run sentiment + trait extraction (embedding-based).
   - Produce `SurveyProfile` JSON (top adjectives, anecdotes, conflicts) used in prompts.

2. **Persona Draft Job**
   - Prompt GPT-4: include `SurveyProfile`, `selectedArchetype`, design system references (tone, gradient).
   - Response contains persona name, narrative, triad of traits, suggested chat “voice”.
   - Validate JSON schema; log raw response for audit.

3. **Styling & Assets**
   - Optional: call image service or gradient generator; store asset URLs.
   - Update `PersonaVersion` with theme metadata (colors, icon).

4. **Chat Alignment**
   - Create `ChatProfile` with guardrails, persona facts, conversation starters.
   - Cache in Redis for sub-3 s chat responses.

5. **Performance Targets**
   - Persona generation <30 s (per success metrics).
   - Chat response <3 s (use streaming).
   - Summoning API <200 ms (excluding synthesis job).

---

## 20. Security, Privacy, Compliance

| Requirement | Implementation |
|-------------|----------------|
| Anonymous surveys | Store hashed responder fingerprint + HMAC surveyId to prevent double submissions. |
| Data minimization | Strip emails/names before AI prompts; keep prompts in encrypted storage for audit only. |
| Access control | Users can only access personas they own; survey share endpoints validate token. |
| Rate limiting | Apply NestJS throttler on `/responses`, `/chat`. |
| Audit logging | Log stage transitions, AI prompts/outputs, admin overrides. |

---

## 21. Observability & DevOps

1. **Metrics**
   - `summoning_stage_time_seconds{stage}` – duration per stage.
   - `persona_generation_failures_total`.
   - `survey_share_events_total`.

2. **Tracing**
   - Wrap AI calls with OpenTelemetry spans (`surveyId`, `personaId` tags).

3. **Alerting**
   - Summoning backlog > X minutes triggers paging.
   - Persona generation failure rate > 5% in 1 hr triggers Slack alert.

4. **Release Strategy**
   - Feature flags for ver2 endpoints; enable per cohort.
   - Backfill job to migrate existing surveys/personas into new schema.

---

## 22. Implementation Plan (Backend POV)

| Step | Description | Owners |
|------|-------------|--------|
| 1. Schema Migration | Add Survey/Summoning/Persona tables, run Prisma migrations. | Backend |
| 2. Module Scaffolding | Create NestJS modules: `survey`, `summoning`, `persona`, `chat`, `analytics`. | Backend |
| 3. API Contracts | Define DTOs, validators, Swagger docs for all endpoints above. | Backend + API Control |
| 4. AI Services | Implement `PersonaSynthesisService` with job queue, prompt templates. | Backend + AI |
| 5. Integration Tests | E2E tests covering survey creation → reveal. | QA |
| 6. Observability | Instrument metrics/logs; update dashboards. | DevOps |
| 7. Rollout | Deploy behind feature flag, run smoke tests with ver2 frontend. | Backend + Frontend |

---

## 23. Reference Materials

- `docs/02-project-overview/01-Project-Goals.md` – success metrics, target persona.
- `docs/07-Enhancement/ver2/*` – page-by-page UX requirements.
- `docs/03-planning/06-API-Specification.md` – legacy API baseline (update to ver2).
- `backend/README.md` – stack overview, commands.

Use this guide to align backend implementation with ver2 product expectations and to maintain a clean API control surface area for future iterations. 

