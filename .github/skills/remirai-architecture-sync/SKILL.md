---
name: remirai-architecture-sync
description: Use when syncing PRD, user flow, frontend architecture, backend architecture, and database model docs to current Re:MirAI codebase state.
---

# Re:MirAI Architecture Sync

## Sync Path
- `docs/PRD.md` -> `docs/USER_FLOW.md`
- `docs/USER_FLOW.md` -> `docs/FRONTEND_ARCHITECTURE.md`
- `docs/PRD.md` -> `docs/BACKEND_ARCHITECTURE.md`
- `docs/BACKEND_ARCHITECTURE.md` <-> `docs/DATABASE_MODEL.md`
- Backend controllers -> `docs/api/*.md`

## Checklist
1. Features in PRD exist in flow and architecture docs
2. Route docs match implemented controllers
3. Data model fields reflect current Prisma schema
4. Planned scope is clearly labeled as planned
