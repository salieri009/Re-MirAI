---
name: remirai-api-doc-maintainer
description: Use when creating or updating API docs for Re:MirAI backend modules (auth, survey, persona, chat). Keeps API docs aligned to implemented NestJS routes and marks planned endpoints explicitly.
---

# Re:MirAI API Doc Maintainer

## Source of Truth
- `backend/src/modules/*/*.controller.ts`
- `backend/src/main.ts`
- `backend/prisma/schema.prisma`

## Rules
- Distinguish implemented vs planned endpoints
- Document auth requirements per endpoint
- Keep request/response examples concise and valid JSON
- Prefer module-level grouping over unrelated business domains

## Module Mapping
- Auth: OAuth + token refresh/logout
- Survey: ritual create/public/submit/status
- Persona: synthesize/list/get
- Chat: sessions/history/messages
