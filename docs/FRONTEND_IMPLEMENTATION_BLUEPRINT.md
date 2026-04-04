# Re:MirAI Frontend Implementation Blueprint

## 1. Scope Baseline (Confirmed)
- Delivery scope: full MVP routes
- Data strategy: mock-first, then phased API migration
- Visual direction: design-system compliant, light-first, restrained magical mood
- Refactor mode: incremental refactor over full rewrite

## 2. Feature Slice Structure
Use feature slices to avoid page-level sprawl.

- frontend/src/features/auth
- frontend/src/features/ritual
- frontend/src/features/summon
- frontend/src/features/persona
- frontend/src/features/chat
- frontend/src/features/social
- frontend/src/features/gamification
- frontend/src/features/shared

Each feature contains:
- components/: feature-local ui units
- hooks/: feature-local query/mutation and view logic
- adapters/: dto -> ui mapping
- mocks/: feature mock handlers and fixtures
- types.ts: feature-local ui/domain types

## 3. Shared UI Contract
Shared UI remains outside feature slices.

- frontend/src/components/atoms: atomic controls (button, badge, input)
- frontend/src/components/primitives: layout and container primitives (section, card, flex, grid)
- frontend/src/components/molecules: reusable composed blocks (state cards, progress blocks)
- frontend/src/components/organisms: page-scale modules
- frontend/src/components/layouts: app/page scaffolds

## 4. Standardized State Components
Use one state contract across pages.

- Loading state: blocking async actions and initial page fetch
- Error state: actionable retry where possible
- Empty state: clear next step and one primary action
- Success state: confirmation + route hint

Implementation: use AppState molecule for common patterns, extend only when route-specific UX is required.

## 5. Data Layer Split
- API contracts: frontend/src/lib/api/*.ts (axios and endpoint contract)
- Query hooks: move to feature hooks (ex: useRitualStatusQuery)
- Store usage: keep only ui/session toggles in Zustand
- Rule: server state belongs to TanStack Query, not to Zustand

## 6. Route Ownership Map
- /login, /auth/callback -> auth
- /dashboard, /dashboard/ritual -> ritual
- /dashboard/synthesize, /summon -> summon
- /p/[id], /profile/settings -> persona
- /chat/[id] -> chat
- /social/compatibility -> social
- /s/[id], /s/[id]/thank-you -> ritual (public responder flow)

## 7. Incremental Execution Order
1. dashboard/synthesize
2. dashboard/practice
3. login
4. dashboard/ritual
5. dashboard root
6. remaining routes

## 8. Non-Ambiguous Coding Rules
- No new page-level hardcoded hex color values outside token files
- Keep one primary CTA per screen
- Respect reduced-motion preference for GSAP transitions
- Preserve current API signatures and analytics calls during ui refactor

## 9. Done Criteria Per Route
- lint and type-check pass
- token-based visual values applied
- loading/error/empty/success states explicit
- keyboard navigation and contrast checks pass
- route behavior and api contract unchanged
