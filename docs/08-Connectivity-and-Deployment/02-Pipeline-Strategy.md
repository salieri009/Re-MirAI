# 02. Pipeline Strategy (FE ↔ BE Deployment)

**Version:** 1.0  
**Owners:** DevOps + Platform Team  
**Scope:** Build/test/deploy automation covering Next.js frontend, NestJS backend, Prisma migrations, and integration verification described in `01-Frontend-Backend-Connectivity-Test-Plan.md`.

---

## 1. Goals

1. **Consistent CI/CD** for both apps with shared quality gates (lint, tests, connectivity smoke).  
2. **Zero-downtime releases** via blue/green or rolling strategies.  
3. **Automated schema + env validation** before traffic shifts.  

---

## 2. Pipeline Overview

```
┌────────────┐    ┌──────────────┐    ┌─────────────┐    ┌──────────────┐
│ Source     │ -> │ Build & Test │ -> │ Deploy Stg  │ -> │ Deploy Prod  │
│ (GitHub)   │    │ (CI)         │    │ (CD stage)  │    │ (blue/green) │
└────────────┘    └──────────────┘    └─────────────┘    └──────────────┘
```

---

## 3. CI (Build & Test) Steps

| Step | Frontend | Backend |
|------|----------|---------|
| Install deps | `npm ci` | `npm ci` |
| Lint | `npm run lint` | `npm run lint` |
| Unit tests | `npm run test` (if available) | `npm run test` |
| Type check | `npm run typecheck` | `tsc --noEmit` |
| Connectivity stubs | Pact/contract tests hitting mocked API | Jest hitting Swagger mocks |
| Artifact build | `npm run build` (Next.js) | `npm run build` (Nest) |

Artifacts stored in GitHub Actions caches or artifact store (`frontend/.next`, `backend/dist`).

---

## 4. CD Staging Pipeline

1. **Prereq:** `main` branch merged; CI green.  
2. **Infrastructure provisioning:**  
   - Backend: deploy Docker image to staging cluster (`stg-api`).  
   - Frontend: push static build to Cloudflare Pages staging environment.  
3. **Database:** `npx prisma migrate deploy` against staging DB.  
4. **Env config:** update `NEXT_PUBLIC_API_URL` to staging API domain; ensure secrets synced (Google OAuth, JWT).  
5. **Smoke tests:** run `frontend-backend-connectivity` suite (Doc 01).  
6. **Manual QA:** verify Summoning ritual, persona room, login.  
7. **Gate:** release manager approval before prod deploy.

---

## 5. Production Deployment Strategy

### 5.1 Backend (NestJS)
- Use **blue/green** or canary: deploy new image to `api-vNext`, run migrations with `--create-only`, cut traffic via load balancer flip.  
- Rollback plan: switch LB back to previous version, run `prisma migrate resolve --rolled-back`.  

### 5.2 Frontend (Next.js)
- Publish to Cloudflare Pages / Vercel with atomic deploys.  
- Configure environment variable to point to new API slot only after backend healthy.  

### 5.3 Ordering
1. Deploy backend & migrations.  
2. Run smoke tests pointing to `api-vNext`.  
3. Flip frontend env to new API.  

---

## 6. Automation Details

| Tool | Usage |
|------|-------|
| GitHub Actions | `ci-frontend.yml`, `ci-backend.yml`, `deploy-staging.yml`, `deploy-prod.yml`. |
| Docker | Containerize Nest service; use multi-stage builds for smaller images. |
| Prisma | `migrate deploy` in CD; use `db push` only for local dev. |
| Monitoring hooks | After deploy, hit `/health`, log version (commit SHA) for tracing. |

---

## 7. Rollback & Incident Response

1. **Auto rollback triggers:** API error rate >5%, contract tests failing, Summoning stage stuck >5 min.  
2. **Manual steps:**  
   - Backend: redeploy previous image, rerun last known good migrations (or revert).  
   - Frontend: revert to previous Pages/Vercel deployment.  
3. **Postmortem:** log in Notion/Confluence; update pipelines to add missing guardrails.  

---

## 8. Future Enhancements

- Add **integration test** stage hitting real API from Next.js Playwright scripts.  
- Introduce **feature flag toggles** (LaunchDarkly) to roll out Summoning enhancements gradually.  
- Implement **database migration simulator** (shadow DB) to catch Prisma drift before staging.  
- Add **chaos tests** (kill backend pod, ensure frontend error UX remains acceptable).  

---

## 9. Alignment with `02-project-overview`

> “Each feature file includes use cases, functional requirements (FR), and non-functional requirements (NFR).” — `02-Core-Features.md`.

Pipeline responsibilities per core feature:

| Feature | Pipeline Enforcement |
|---------|---------------------|
| F-001 Survey System | CI contract tests block deployments if DTOs drift; staging smoke tests exercise `/v1/surveys/*`. |
| F-002 Persona Synthesis | Blue/green deploy ensures Summoning workers can warm up before user traffic (per Phase 1 roadmap). |
| F-003 AI Chat Interface | SSE smoke tests required before flipping frontend env; latency tracked post-release. |
| F-004 Persona Card / F-005 Social / F-006 Gamification | Feature-flag deploys + canary strategy let us align releases with viral growth goals outlined in `01-Project-Goals.md`. |

Roadmap dependencies (`04-Roadmap.md`) tie to pipeline gates: Phase 1 (MVP) must pass Survey + Persona checks, Phase 2 adds Chat streaming asserts, Phase 3 introduces monetization toggles managed by feature flags in the CD process.

---

**Last Updated:** 2025-11-27  
**Next Review:** After Summoning API endpoints reach MVP (Doc 07 reference). 

