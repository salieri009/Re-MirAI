# Re:MirAI Small Switch Palette Adoption Plan

**Version:** 1.0.1  
**Last Updated:** 2025-11-25  
**Status:** Planned (Phase 1.5 alignment)  
**Owner:** Design Systems / Frontend  

---

## 1. Overview

To keep the multi-page journey cohesive while elevating readability, we are standardizing on the **Small Switch Palette**. 

**Expert Review Update (v1.0.1):** Following an accessibility audit, the "Anchor" role has been split to ensure WCAG 2.1 AA compliance. The original accent (`#697fac`) is too light for body text (3.8:1 ratio) and is now reserved for decoration. A new **Text Anchor** (`#334155`) has been introduced for readability.

| Role | HEX | Usage |
|------|-----|-------|
| **Primary Hue** | `#d946ef` | Brand-defining fuchsia (CTA, hero glow, key gradients) |
| **Canvas / Mist** | `#e6ebf8` | Soft background wash for cards, sections, wizard shells |
| **Accent (Deco)** | `#697fac` | **Decoration Only:** Borders, icons, large headings (>18pt) |
| **Text Anchor** | `#334155` | **Readability:** Body text, labels, subheaders (Contrast 7:1+) |

Every enhancement document in `@07-Enhancement` must reference this palette when outlining new UI/animation work. This plan explains how to phase in the palette without regressing the shipped GSAP experiences.

---

## 2. Token-Level Updates

### 2.1 CSS Tokens (`frontend/src/styles/tokens.css`)
- Map existing primary variables to the palette:
  - `--color-primary` → `#d946ef`
  - `--color-bg-secondary` / `--color-surface-alt` → `#e6ebf8`
  - `--color-accent` → `#697fac` (Decoration)
  - **NEW:** `--color-text-secondary` → `#334155` (Readability fix)
- Update gradient helpers inside `design-tokens.ts` to blend `primary` → `accent`.
- Add motion-presets (shadow glows) that interpolate between primary + accent for GSAP ease functions.

### 2.2 Theming Hooks
- Extend `useAccessibility` to expose `accentColor` so components such as `TrustBadge`, `SurveyLinkCard`, and `TopicSuggestion` can adapt without manual imports.

---

## 3. Page-by-Page Application Plan

| Page | Palette Application | Notes |
|------|---------------------|-------|
| Landing (`01-Landing-Page-Enhancement.md`) | Hero background gradient `#d946ef → #e6ebf8`, mirror glass highlights use `#697fac`. | Maintain CTA glow intensity; update Feature Showcase cards to the mist background. |
| Login (`02-Login-Page-Enhancement.md`) | Auth card outline + trust badges use `#697fac`; canvas wash `#e6ebf8`. | **CRITICAL:** Badge text must use `#334155` to pass AA contrast. |
| Dashboard (`03-Dashboard-Page-Enhancement.md`) | State cards adopt `#e6ebf8` surfaces with primary CTA + accent typography. | `actionPulse` uses accent glow to avoid overstimulating users already seeing primary in hero. |
| Chat (`04-Chat-Page-Enhancement.md`) | Message bubbles remain neutral; headers + reaction pills use accent; share modals adopt mist background. | Typing indicator dots tint from accent → primary. |
| Persona Room (`05-Persona-Room-Page-Enhancement.md`) | Persona stats grid uses accent text; hero gradient uses all three hues. | Quests adopt background `#e6ebf8` with primary progress fill. |
| Ritual Hub (`06-Ritual-Hub-Page-Enhancement.md`) | Progress bars → primary, cards → mist. Share CTA uses accent border to signal secondary action. | Keep success badge green to preserve semantic color. |
| Summoning (`07-Summoning-Page-Enhancement.md`) | Stage backgrounds shift `primary → accent`, sparkles use lighter mist tint. | Reduced-motion path can swap to static gradient background. |
| Survey (`08-Survey-Page-Enhancement.md`) | Wizard shell `#e6ebf8`, Likert selected state `#d946ef`, hover/outline `#697fac`. | Ensure focus rings remain visible on mist surfaces. |

---

## 4. Implementation Sequence

1. **Tokens & Design Guide (Week 3 Day 1)**
   - Update `tokens.css`, `design-tokens.ts`, and document gradients in `00-MASTER-IMPLEMENTATION-GUIDE.md`.
   - **Action:** Define `--color-text-secondary` as `#334155`.
2. **Foundational Components (Week 3 Day 2)**
   - Buttons, Badges, Cards adopt new variables to minimize page duplication.
3. **Page-Specific Pass (Week 3 Day 3-4)**
   - Follow table above; update CSS modules + GSAP timelines.
4. **QA & Accessibility (Week 3 Day 5)**
   - Run contrast checker, reduced-motion verification, screenshot audits.

---

## 5. Acceptance Criteria

- ✅ All primary call-to-actions render in `#d946ef`.
- ✅ Surfaces that require low contrast (cards, sections) use `#e6ebf8` and still meet AA text contrast.
- ✅ Accent `#697fac` is used **only** for decoration (borders, icons).
- ✅ Body text uses `#334155` (Text Anchor) to ensure readability.
- ✅ Updated palette references are documented in each page-specific enhancement doc (Purpose-Driven UX + Visual Hierarchy sections).
- ✅ Design tokens + master guide versions are bumped to 1.0.2+ to reflect the palette rollout.

---

## 6. Dependencies & Risks

- Requires coordination with GSAP timelines to avoid clashing animation colors.
- Need design sign-off before updating marketing assets or favicon.
- Ensure theming changes do not regress bundle size (avoid duplicating gradients per component).

Once this plan is executed, Re:MirAI's visual identity will remain consistent across the eight-page journey while aligning with the requested Small Switch Palette.

