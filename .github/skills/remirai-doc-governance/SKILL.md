---
name: remirai-doc-governance
description: Use when restructuring, pruning, or validating Re:MirAI documentation sets under docs/. Ensures only approved core docs and api docs are maintained, and preserves Re:MirAI concept integrity during cleanup.
---

# Re:MirAI Doc Governance

## Use When
- Reorganizing documentation folders
- Deleting obsolete docs
- Enforcing allowed docs layout
- Preventing concept drift in planning docs

## Guardrails
- Preserve Re:MirAI domain concept and terminology (Ritual, Persona, Summon)
- Avoid accidental replacement with unrelated domains
- Keep docs focused on current implemented architecture

## Required Layout
- `docs/PRD.md`
- `docs/USER_FLOW.md`
- `docs/FRONTEND_ARCHITECTURE.md`
- `docs/BACKEND_ARCHITECTURE.md`
- `docs/DATABASE_MODEL.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/api/*.md`
