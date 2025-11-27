# Doc 13 – ver2 Frontend Audit (Current vs Target)

This note captures the gap between the existing App Router implementation in `frontend/src/app/**` and the ver2 enhancement specifications in the `/docs/07-Enhancement/ver2` series. It will guide subsequent refactor tasks.

---

## 1. Design System Baseline
1. **Current:** `frontend/src/design-tokens.ts` already defines the unified purple/mint palette, but typography sizing, 4px grid spacing, and responsive scale tokens are scattered across CSS modules (`frontend/src/styles/tokens.css`, `global.css`) without centralized enforcement.
2. **ver2 Requirements:** `00-FRONTEND-REFACTORING-MASTER-PLAN.md` + `10-4px-Baseline-Grid-System.md` call for a single source of truth for spacing (increments of 4px), typography stacks (Plus Jakarta Sans weights 400/500/700/800), and animation durations. Need tokenized spacing scale, typography map, and Tailwind/custom utility alignment.

## 2. Landing Page (`frontend/src/app/page.tsx`)
1. **Current:** Page composes `Header`, `InteractiveHero`, `HowItWorks`, `Features`, `Footer` with CSS module `page.module.css`. Lacks stage-based storytelling, gradient background layers, and interactive summon teaser referenced in `01-Landing-Page-Enhancement.md`.
2. **Gaps vs ver2:** Need cinematic hero (GSAP scenes, persona preview carousel), ritual timeline CTA, trust metrics, and unified skeleton loaders. Buttons and card spacing still use ad-hoc values (e.g., 32px) instead of 4px grid.

## 3. Login Page (`frontend/src/app/login/page.tsx`)
1. **Current:** MirrorCanvas background + trust badges + GoogleAuthButton. Good micro-interactions via `gsap`, but layout still centered card only.
2. **Gaps:** `02-Login-Page-Enhancement.md` expects split-screen layout, progress tracker (3-step), security checklist, and failure recovery modals. Need to align colors to `trust` palette and reuse new CTA/button variants from shared library.

## 4. Dashboard (`frontend/src/app/dashboard/page.tsx` + organisms)
1. **Current:** Sidebar + ChatArea + RightPanel components with limited states. Sidebar icons static, RightPanel shows placeholder stats.
2. **Gaps:** `03-Dashboard-Page-Enhancement.md` + `Ritual Timeline` spec demand stage badges, synth progress cards, live ritual timeline, and action buttons with contextual states. Need skeleton loading, state view transitions, and highlight gradients per doc.

## 5. Chat (`frontend/src/app/chat/[id]/page.tsx` + molecules/organisms)
1. **Current:** Chat layout supports conversation but missing persona aura, emotional meter, and ritual-linked prompts.
2. **Gaps:** `04-Chat-Page-Enhancement.md` defines dual-column layout (chat + context), typing aura animation, suggestion chips, and pinned ritual cards. Need reorganized grid + micro-interaction hook.

## 6. Persona Room (`frontend/src/app/p/[id]/page.tsx`)
1. **Current:** Basic profile view with stats and quests; CSS modules not aligned to new gradient system.
2. **Gaps:** `05-Persona-Room-Page-Enhancement.md` requires multi-section layout (Bonding Meter, Memory Gallery, Quest Board) with GSAP entrance, timeline micro-interactions, and cross-links to Summoning/Survey data.

## 7. Survey Hub & Survey (`frontend/src/app/s/**`, `/dashboard/ritual`, `/dashboard/synthesize`)
1. **Current:** Pages exist but limited to simple cards and forms; no progress ring, track list, or template cards.
2. **Gaps:** `06-Survey-Hub-Page-Enhancement.md` + `08-Survey-Page-Enhancement.md` describe multi-column dashboards, template selector, status chips, and contextual tips. Need consistent empty/loading state components and progress indicator atoms.

## 8. Summoning (`frontend/src/app/summon/page.tsx` & `/dashboard/synthesize`)
1. **Current:** Preliminary implementation, lacking tri-stage ritual. No state machine, particle canvas, archetype selection, or reveal animation.
2. **Gaps:** `07-Summoning-Page-Enhancement.md` mandates PRE_SYNTHESIS → ALCHEMIC_MODE → REVEAL flow, GSAP + Canvas animations, archetype cards, progress bar, screen reader announcements, reduced-motion fallbacks, and CTA to Persona Room.

## 9. Feature Compliance & QA
1. Need checklist to map each ver2 file (01–12) to actual components, plus regression plan (lint, unit/visual tests). No current documentation ties implementation back to `12-Feature-Compliance-Review.md`.

---

Next steps follow the refactor plan: align design tokens, extract shared components/animations, then tackle each page stack (landing/login, dashboard/chat, persona/survey, summoning) before final compliance + QA.

