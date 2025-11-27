# 01. Frontend-Backend Connectivity Test Plan

**Version:** 1.2
**Owners:** Fullstack Team (Frontend + Backend)
**Scope:** Ver2 App Router client (Next.js) to NestJS API (Auth + Survey modules)

---

## 1. Objectives

1.  **End-to-End Validation**: Guarantee that every user-facing flow (login, survey, summoning) communicates with the NestJS API without CORS, authentication, or session regressions.
2.  **Contract Verification**: Detect schema and contract drift between App Router fetchers (`frontend/src/lib/api/**`) and backend DTOs before release.
3.  **Deployment Verification**: Validate deployment wiring (environment variables, TLS, load balancers) across Development, Staging, and Production environments.
4.  **Feature Compliance**: Ensure that connectivity tests explicitly validate the Functional Requirements (FR) and Non-Functional Requirements (NFR) defined in `docs/02-project-overview/features`.

---

## 2. Test Environments

| Layer | Development (Local) | Staging (Preview) | Production |
| :--- | :--- | :--- | :--- |
| **API Base URL** | `http://localhost:3001` | `https://remirai-backend-staging.up.railway.app` | `https://api.remirai.app` |
| **Frontend URL** | `http://localhost:3000` | `https://remirai-frontend-staging.vercel.app` | `https://remirai.app` |
| **Auth Provider** | Google OAuth Sandbox | Google OAuth Staging Project | Google OAuth Production Project |
| **Database** | Local PostgreSQL | Managed PostgreSQL (Railway) | Managed PostgreSQL (Railway/Neon) |
| **Infrastructure** | Local Node.js | Vercel Preview / Railway | Vercel Production / Railway |

> **Note**: All three environments must expose identical `.well-known` CORS headers and TLS versions (1.2 or higher) before running test suites.

---

## 3. Prerequisites

### 3.1 Backend
1.  **Environment Variables**: `DATABASE_URL` must be populated.
2.  **Dependencies**: Run `npm install` and `npx prisma generate`.
3.  **Server**: Run `npm run start:dev` (defaults to port 3001).

### 3.2 Frontend
1.  **Configuration**: `.env.local` must contain `NEXT_PUBLIC_API_URL=http://localhost:3001`.
2.  **Server**: Run `npm run dev` (defaults to port 3000).

### 3.3 Test Accounts
1.  **Google OAuth**: A test user account with a verified email address.
2.  **Data Seeding**: Optional seed script to create initial persona records.

### 3.4 Observability
1.  **Logging**: Enable verbose logging (`DEBUG=prisma:* nest:*`).
2.  **Metrics**: Ensure metrics pipeline is accessible for Staging and Production.

---

## 4. Test Matrix

| # | Flow | Frontend Entry | Backend Endpoints | Expected Result | Linked Feature/Requirement |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Health Check** | `curl /api/health` | `GET /health` | `200 OK` JSON with uptime status. | **System Core** |
| 2 | **Login Redirect** | `/login` CTA | `GET /v1/auth/google` | Browser redirected to Google with correct client ID. | **System Auth** |
| 3 | **Login Callback** | Google OAuth | `GET /v1/auth/google/callback` | JWT cookies issued; Frontend store updated. | **System Auth** |
| 4 | **Fetch Surveys** | Dashboard load | `GET /v1/surveys/my` | JSON list matches Prisma records. | **F-001** (Survey System) |
| 5 | **Create Survey** | `/dashboard/ritual` create button | `POST /v1/surveys` | Response returns shareable link used in UI. | **FR-001.1** (Unique URL) |
| 6 | **Public Survey Fetch** | `/s/[id]` | `GET /v1/surveys/:link/public` | Questions match `defaultQuestions` array. | **FR-001.2** (Fixed Questions) |
| 7 | **Submit Response** | `/s/[id]` submit | `POST /v1/surveys/:id/responses` | Response saved; `minResponses` enforced. | **FR-001.3** (Anonymous) |
| 8 | **Summoning Poll** | `/summon` stage poller | `/v1/summoning/:surveyId` | Stage and timeouts align with UI state machine. | **FR-002.1** (Stats Calc) |
| 9 | **Persona Fetch** | `/p/[id]` initial render | `GET /v1/personas/:id` | Persona JSON feeds bonding meter and memory board. | **FR-004.2** (Card Data) |
| 10 | **Chat Post** | `/chat/[id]` send message | `POST /v1/chat/:personaId` | SSE/stream event delivered in under 3 seconds. | **FR-003.1** (Real-time), **NFR-003.1** (Latency) |

---

## 5. Feature Connectivity Map

This section explicitly maps how connectivity tests validate the core value propositions defined in `docs/02-project-overview/features`.

### F-001: Survey System
*   **FR-001.1 (Unique URL)**: Validated by **Test #5**. The backend must return a `shareableLink` that resolves correctly in **Test #6**.
*   **FR-001.3 (Anonymous Submit)**: Validated by **Test #7**. The request must succeed without an `Authorization` header, using only the fingerprint.
*   **NFR-001.1 (Anonymity)**: Validated by inspecting backend logs during **Test #7** to ensure no PII is associated with the response.

### F-002: Persona Synthesis
*   **FR-002.1 (Stats Calculation)**: Validated by **Test #8**. The summoning endpoint must return calculated stats (Charisma, Intellect, etc.) derived from the responses submitted in **Test #7**.
*   **NFR-002.1 (Performance)**: Validated by measuring the time between the final response submission and the "Ready" state in **Test #8**. Must be < 60s.

### F-003: Chat Interface
*   **FR-003.1 (Real-time Chat)**: Validated by **Test #10**. The connection must be established via SSE (Server-Sent Events) or WebSocket.
*   **NFR-003.1 (Latency)**: Validated by **Test #10**. The Time-To-First-Byte (TTFB) of the chat stream must be < 3 seconds.

### F-004: Persona Card
*   **FR-004.2 (Card Data)**: Validated by **Test #9**. The response must include all necessary fields (Name, Archetype, Rarity, Stats) to render the Radar Chart.

---

## 6. Test Procedures

### 6.1 Smoke Suite (Run per deployment)
1.  **Backend Health**: Start backend (`npm run start:dev`) and confirm `http://localhost:3001/health` returns 200 OK.
2.  **Authentication**: Start frontend, visit `/login`, trigger Google auth, and verify cookies/localStorage tokens are set.
3.  **Survey Creation**: Create a survey via the UI and ensure the dashboard list updates without a manual refresh (verifies TanStack Query + API caching).
4.  **Response Submission**: Copy the share link, open in an incognito window, and submit a response. Verify backend logs show fingerprint generation and new record creation.
5.  **Threshold Check**: Confirm `minResponses` threshold toggles status to READY.
6.  **Summoning**: Hit `/summon?s=ID` (once summoning endpoints exist) and ensure stage transitions appear.

### 6.2 Contract Tests (Automated)
Execute the API test suite:
```bash
cd frontend && npm run test:api
```

**Key Contracts:**
*   `surveyApi.create` ↔ `CreateSurveyDto`
*   `surveyApi.get` ↔ `PublicSurveyDto`
*   `summoningApi` ↔ `SummoningSessionDto` (Future)

### 6.3 Error and Edge Cases

| Scenario | Expected Outcome |
| :--- | :--- |
| **Duplicate Fingerprint** | `400 Bad Request` and Frontend toast "Already submitted". |
| **Expired Survey** | `404 Not Found` from public endpoint; Frontend shows "Survey closed". |
| **Unauthorized Access** | `401 Unauthorized` on `GET /v1/surveys/my`; Frontend redirects to `/login`. |
| **Backend Down** | Axios interceptor surfaces "Network error"; verify fallback messaging. |
| **CORS Misconfiguration** | Browser console logs blocked request; use `OPTIONS` preflight via Postman to confirm headers. |

---

## 7. Deployment Validation Steps

1.  **Staging Verification**: Deploy backend to Staging (Railway). Run smoke suite using Staging Frontend (Vercel Preview) pointed to Staging Backend.
2.  **Database Migration**: Run `npx prisma migrate deploy` to ensure database schema aligns with the codebase.
3.  **Cache Validation**: Validate API responses are not cached aggressively (check `Cache-Control` headers).
4.  **Monitoring**: Confirm alerts for `5xx` spikes and authentication failure rates (<2%).

---

## 8. Tooling and Automation

*   **Postman Collection**: `docs/08-Connectivity-and-Deployment/postman/ver2_api.postman_collection.json`
*   **GitHub Actions**: `frontend-backend-connectivity.yml` runs smoke suite on staging after deployment.
*   **Synthetic Monitoring**: UptimeRobot hits `/health` and `/v1/surveys/my` every 5 minutes with an auth token.

---

## 9. Exit Criteria

*   All flows in the Test Matrix pass on Staging.
*   No unresolved lint or TypeScript errors in API client or NestJS modules.
*   Monitoring dashboards show healthy latency and error rates for 24 hours post-release.
*   QA sign-off recorded in `00-PHASE1-IMPLEMENTATION-STATUS.md`.
