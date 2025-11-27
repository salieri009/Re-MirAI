# 01. Frontend ↔ Backend Connectivity Test Plan

**Version:** 1.0  
**Owners:** Fullstack Team (Frontend + Backend)  
**Scope:** Ver2 App Router client ↔ NestJS API (Auth + Survey modules)  

---

## 1. Objectives

1. Guarantee that every user-facing flow (login → survey → summoning) communicates with the NestJS API without CORS/auth/session regressions.  
2. Detect schema/contract drift between App Router fetchers (`frontend/src/lib/api/**`) and backend DTOs before release.  
3. Validate deployment wiring (env vars, TLS, load balancers) across Dev → Staging → Production.  

---

## 2. Test Environments

| Layer | Dev | Staging | Production |
|-------|-----|---------|------------|
| API Base URL | `http://localhost:3001` | `https://staging-api.remirai.app` | `https://api.remirai.app` |
| FRONTEND_URL env | `http://localhost:3000` | `https://staging.remirai.app` | `https://remirai.app` |
| Auth providers | Google OAuth Sandbox | Google OAuth Staging Project | Google OAuth Production Project |
| Database | Local Postgres (Docker) | Managed Postgres (stg) | Managed Postgres (prod) |
| CDN / Edge | Vite dev server | Cloudflare staging | Cloudflare production |

> **Checklist:** All three environments must expose identical `.well-known` CORS headers, TLS versions (≥1.2), and health checks before running suites.

---

## 3. Prerequisites

1. **Backend**
   - `DATABASE_URL` populated (can use docker-compose postgres for dev).  
   - `npm install && npx prisma generate`.  
   - `npm run start:dev` (port 3001).  
2. **Frontend**
   - `.env.local` has `NEXT_PUBLIC_API_URL=http://localhost:3001`.  
   - `npm run dev` (port 3000).  
3. **Test Accounts**
   - Google OAuth test user w/ verified email.  
   - Seed script to create persona records optional.  
4. **Observability**
   - Enable verbose logging (`DEBUG=prisma:* nest:*`).  
   - Metrics pipeline (Grafana/Prom) accessible for staging/prod.  

---

## 4. Test Matrix

| # | Flow | Frontend Entry | Backend Endpoints | Expected Result |
|---|------|----------------|-------------------|-----------------|
| 1 | Health | `curl /api/health` | `GET /health` | `200 OK` JSON with uptime |
| 2 | Login redirect | `/login` CTA | `GET /v1/auth/google` | Browser redirected to Google with correct client ID |
| 3 | Login callback | Google OAuth | `GET /v1/auth/google/callback` | JWT cookies issued, FE store updated |
| 4 | Fetch surveys | Dashboard load | `GET /v1/surveys/my` | JSON list matches Prisma records |
| 5 | Create survey | `/dashboard/ritual` create button | `POST /v1/surveys` | Response returns shareable link used in UI |
| 6 | Public survey fetch | `/s/[id]` getServerSideProps | `GET /v1/surveys/:link/public` | Questions match `defaultQuestions` array |
| 7 | Submit survey response | `/s/[id]` submit | `POST /v1/surveys/:id/responses` | Response saved, `minResponses` enforced |
| 8 | Summoning session poll | `/summon` stage poller | (future) `/v1/summoning/:surveyId` | Stage/timeouts align with UI state machine |
| 9 | Persona fetch | `/p/[id]` initial render | `GET /v1/personas/:id` | Persona JSON feeds bonding meter & memory board |
| 10 | Chat post | `/chat/[id]` send message | `POST /v1/chat/:personaId` | SSE/stream event delivered in <3s |

---

## 5. Test Procedures

### 5.1 Smoke Suite (Run per deployment)
1. Bring up backend (`npm run start:dev`). Confirm `http://localhost:3001/health`.  
2. Start frontend. Visit `/login`, trigger Google auth, verify cookies/localStorage tokens set.  
3. Create survey via UI, ensure dashboard list updates without manual refresh (checks TanStack Query + API caching).  
4. Copy share link, open incognito, submit response—verify backend logs fingerprint + new record.  
5. Confirm `minResponses` threshold toggles status to READY.  
6. Hit `/summon?s=ID` once summoning endpoints exist; ensure stage transitions appear.  

### 5.2 Contract Tests (Automated)
Use Pact or custom Axios jest suite:
```bash
cd frontend && npm run test:api
```
Contracts:
- `surveyApi.create` ↔ `CreateSurveyDto`.  
- `surveyApi.get` ↔ `PublicSurveyDto`.  
- Future: `summoningApi` ↔ `SummoningSessionDto`.  

### 5.3 Error/Edge Cases
| Scenario | Expected |
|----------|----------|
| Duplicate fingerprint submission | `400 BadRequest` + FE toast “already submitted”. |
| Expired survey | `404` from public endpoint, FE shows “Survey closed”. |
| Unauthorized `GET /v1/surveys/my` | `401`, frontend redirects to `/login`. |
| Backend down | Axios interceptor surfaces “Network error”; verify fallback messaging. |
| CORS misconfig | Browser console logs blocked request; use `OPTIONS` preflight via Postman to confirm headers. |

---

## 6. Deployment Validation Steps

1. **Blue/Green**: Deploy backend to new slot, run smoke suite using staging frontend pointed to new slot before flip.  
2. **Config Drift Check**: Run `npx prisma migrate deploy --preview-feature` to make sure DB migrations align.  
3. **Cloudflare / CDN**: Validate API responses aren’t cached (set `Cache-Control: no-store`).  
4. **Monitoring Hooks**: Confirm Grafana alerts for `5xx` spikes and auth failure rate (<2%).  

---

## 7. Tooling & Automation

- **Postman Collection**: `docs/08-Connectivity-and-Deployment/postman/ver2_api.postman_collection.json`.  
- **GitHub Actions**: add `frontend-backend-connectivity.yml` to run smoke suite on staging after deploy.  
- **Synthetic Monitoring**: UptimeRobot hits `/health` + `/v1/surveys/my` every 5 min with auth token.  

---

## 8. Exit Criteria

- All flows in the matrix pass on staging.  
- No unresolved lint/TypeScript errors in API client or NestJS modules.  
- Monitoring dashboards show healthy latency/error rates for 24h post-release.  
- QA sign-off recorded in `00-PHASE1-IMPLEMENTATION-STATUS.md`.  

---

## 9. Alignment with `02-project-overview`

> “Create an engaging and shareable experience where users can discover and interact with an AI representation of their public persona, answering the fundamental question: **‘How do others see me?’**” — `01-Project-Goals.md`, Primary Goal.

This connectivity plan ensures every feature listed in `02-Core-Features.md` can flow end-to-end:

| Core Feature | Connectivity Coverage |
|--------------|-----------------------|
| **F-001 Survey System** | Steps 4–7 in the test matrix verify creation, public fetch, and anonymous submission. |
| **F-002 Persona Synthesis** | Summoning session polling (Step 8) confirms readiness once survey thresholds are met. |
| **F-003 AI Chat Interface** | Step 10 validates chat requests/responses stay under the 3-second SLA. |
| **F-004 Persona Card** | Persona fetch (Step 9) ensures bonding meters/memory boards receive fresh data. |
| **F-005 Social Features** | Survey share flows (Step 5) and incognito submissions replicate viral sharing paths. |
| **F-006 Gamification** | Threshold + bonding checks confirm quest/progression triggers fire after connectivity tests. |

Roadmap references (`04-Roadmap.md`) map to the same flows: Phase 1 delivery focuses on F-001~F-003, so the smoke suite prioritizes those APIs before expanding to summoning and gamification milestones.

---

**Last Updated:** 2025-11-27  
**Next Review:** After Summoning pipeline endpoints (`/v1/summoning/*`) are implemented. 

