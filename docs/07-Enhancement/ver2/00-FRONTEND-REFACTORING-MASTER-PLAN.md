# Frontend Refactoring Master Plan (Ver2) - ACTIONABLE IMPLEMENTATION GUIDE

**Version:** 2.1.0  
**Last Updated:** 2025-11-27  
**Status:** 🔧 **READY FOR EXECUTION**  
**Estimated Implementation Time:** 6-8 Sprints (12-16 weeks)

> [!IMPORTANT]
> **This document is the single source of truth for the Ver2 "Digital Mirror" Refactoring.** It consolidates requirements from all 7 core page enhancement documents and the 4 design system specifications.

---

## Executive Summary

The Ver2 Refactoring aims to transform the current MVP into a premium "Digital Mirror" experience. This involves three parallel tracks of work:

1.  **Design System Unification**: Enforcing the 3-color palette, 4px grid, and dual-font typography.
2.  **Animation Integration**: Implementing the 45+ specified micro-interactions and state machines.
3.  **Feature Compliance**: Ensuring all 6 core features (F-001~F-006) are fully represented in the UI.

**Key Technical Goals**:
- 🎨 **Consistency**: 100% adherence to 3-color palette (Purple/Mint/Lavender).
- ⚡ **Performance**: 60fps animations using GSAP/Canvas, <2.5KB tokens CSS.
- ♿ **Accessibility**: WCAG 2.1 AA compliance (Reduced Motion, Screen Readers).

---

## Phase 1: Foundation - The "Digital Mirror" Design System (Sprint 1-2)

**Objective**: Establish the core tokens and global styles before touching page components.

### 1.1 Color System Migration (Priority: P0)
**Source**: `docs/07-Enhancement/ver2/09-Color-Palette-Plan.md`

- [ ] **Refactor `tokens.css`**:
  - Remove all 5-color legacy variables.
  - Implement **HSL 3-color system**:
    - Primary: Amethyst Purple (`#845EC2`)
    - Accent: Mint Green (`#00C9A7`)
    - Highlight: Light Lavender (`#C197FF`)
  - **Action**: Run find-and-replace for `#f3c5ff` (Pink) → `#c197ff` (Lavender).
- [ ] **Update `tailwind.config.js`**:
  - Remap `colors.primary` to Purple.
  - Remap `colors.accent` to Mint.
- [ ] **Add Stylelint Rules**: Enforce strict color usage (no hex codes in components).

### 1.2 Typography & Grid (Priority: P0)
**Source**: `docs/07-Enhancement/ver2/10-4px-Baseline-Grid-System.md`, `11-Typography-System.md`

- [ ] **Font Migration**:
  - Replace `Inter` with **Plus Jakarta Sans** (Body).
  - Add **Space Grotesk** (Display/Headings).
- [ ] **Spacing Audit**:
  - Enforce 4px baseline grid in `tokens.css` (`--space-xs` = 4px).
  - Audit all `m-*`, `p-*`, `gap-*` classes to ensure they use Tailwind scale (no arbitrary values like `p-[13px]`).

---

## Phase 2: Core Architecture & Shared Components (Sprint 3)

**Objective**: Build the reusable scaffolding for the application.

### 2.1 Layout Systems (Priority: P1)
**Source**: `docs/07-Enhancement/ver2/04-Chat-Page-Enhancement.md`

- [ ] **Create `AppShell.tsx`**:
  - 3-column layout support (Nav + Content + Sidebar).
  - Responsive behavior (Collapsible sidebars on mobile).
- [ ] **Create `NavigationSidebar.tsx`**:
  - Unified navigation for Chat, Dashboard, Survey Hub.
  - Active state styling using Mint Green accent.

### 2.2 Shared Atoms (Priority: P1)
**Source**: `docs/07-Enhancement/ver2/README.md` (Component Reusability)

- [ ] **`ArchetypeBadge.tsx`**: Unified badge for Summoning/Persona/Chat.
- [ ] **`TraitPill.tsx`**: Standardized pill for stats.
- [ ] **`ShareModal.tsx`**: Reusable React Portal modal with GSAP entrance animations.

---

## Phase 3: Page Implementation & Animation (Sprint 4-7)

**Objective**: Implement page-specific enhancements and animations.

### 3.1 Landing Page (Sprint 4)
**Source**: `docs/07-Enhancement/ver2/01-Landing-Page-Enhancement.md`
- [ ] **Design**: Implement "Digital Mirror" hero section.
- [ ] **Animation**:
  - Particle Background (Canvas).
  - Hero Text Stagger (GSAP).
  - Scroll-triggered feature cards.

### 3.2 Login Page (Sprint 4)
**Source**: `docs/07-Enhancement/ver2/02-Login-Page-Enhancement.md`
- [ ] **Design**: "Sacred Threshold" card layout.
- [ ] **Animation**:
  - Card Entrance (Float up).
  - Trust Badge Pulse.
  - Loading State Carousel (7s loop).

### 3.3 Summoning Page (Sprint 5)
**Source**: `docs/07-Enhancement/ver2/07-Summoning-Page-Enhancement.md`
- [ ] **Logic**: Implement `useSummoningAnimation` state machine hook.
- [ ] **Animation**:
  - Stage 1: Ambient Particles.
  - Stage 2: Alchemic Mode (Vortex).
  - Stage 3: The Reveal (Explosion + Card Blur).

### 3.4 Persona Room (Sprint 5)
**Source**: `docs/07-Enhancement/ver2/05-Persona-Room-Page-Enhancement.md`
- [ ] **Design**: "The Gallery" layout.
- [ ] **Animation**:
  - Quest Completion Celebration (Confetti/Glow).
  - Radar Chart Bloom.
  - Share Modal Entrance.

### 3.5 Chat Page (Sprint 6)
**Source**: `docs/07-Enhancement/ver2/04-Chat-Page-Enhancement.md`
- [ ] **Design**: 3-column "Sacred Conversation" layout.
- [ ] **Animation**:
  - Message Entrance (Slide + Fade).
  - Typing Indicator (Bounce).
  - Bond Level Up (Glow effect).

### 3.6 Survey Ecosystem (Sprint 6)
**Source**: `08-Survey-Page-Enhancement.md`, `06-Survey-Hub-Page-Enhancement.md`
- [ ] **Survey Page**: Live URL preview animation.
- [ ] **Survey Hub**: Dashboard card stagger entrance.

---

## Phase 4: Quality Assurance & Polish (Sprint 8)

**Objective**: Ensure production readiness.

### 4.1 Accessibility (Priority: P0)
**Source**: `docs/07-Enhancement/ver2/12-Feature-Compliance-Review.md`

- [ ] **Reduced Motion**: Verify `useReducedMotion` hook disables all GSAP/Canvas animations.
- [ ] **Screen Readers**: Verify `useAnnouncement` hook announces state changes (e.g., "Persona Summoned").
- [ ] **Keyboard Nav**: Ensure all interactive elements have visible focus states (Highlight color).

### 4.2 Performance (Priority: P1)
- [ ] **Bundle Size**: Ensure `tokens.css` < 3KB.
- [ ] **Animation Budget**: Verify max 5 concurrent GSAP animations.
- [ ] **Canvas Optimization**: Check `requestAnimationFrame` cleanup in `useEffect`.

---

## Immediate Next Steps

1.  **Execute Phase 1.1**: Refactor `tokens.css` to the 3-color system.
2.  **Execute Phase 1.2**: Update fonts and grid settings.
3.  **Begin Phase 2.1**: Build the `AppShell` component.

*Refer to individual enhancement documents for specific code snippets and implementation details.*
