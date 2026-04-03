# Re:MirAI Frontend Design Pattern Refactor Playbook

## 1. Goal
- Establish one design source of truth based on Small Switch Palette v2.
- Replace ad-hoc page styling with reusable primitives and variant-based components.
- Keep product flows stable while improving visual consistency and maintainability.

## 2. Source Of Truth
- Palette authority: Small Switch Palette v2.
- Token authority: frontend/src/lib/styles.ts and frontend/src/styles/tokens.css.
- Component composition authority: Page -> Section -> Organism -> Molecule -> Atom.

## 3. Palette Contract (v2)
- Background Mist: #e6ebf8
- Primary Fuchsia: #d946ef
- Text Anchor: #334155
- Supporting dark anchor for depth overlays: #1e293b
- Supporting success for positive states: #10b981
- Supporting danger for error states: #ef4444

## 4. Refactor Rules
1. No new hardcoded page-level hex colors except in token files.
1. No large inline style objects in pages when equivalent primitive/component exists.
1. Variants first: visual differences should be encoded as variant props, not repeated style blocks.
1. Motion must respect reduced motion and use shared easing/duration constants.
1. Auth, survey, and synthesize flows cannot change API contract behavior.

## 5. Primitive Targets
- Section: spacing, max-width, semantic wrapper.
- Card: default, elevated, glass, interactive variants.
- Flex: direction/align/justify/gap with typed props.
- Grid: responsive columns and gap presets.

## 6. Page Execution Order
1. dashboard/synthesize
1. dashboard/practice
1. login
1. dashboard/ritual
1. dashboard root and remaining pages

## 7. Definition Of Done Per Page
1. TypeScript and lint pass.
1. No new hardcoded color escapes.
1. Uses token references for major visual values.
1. Reduced-motion behavior remains valid.
1. Existing API and analytics signatures are preserved.

## 8. Verification Checklist
1. Static: npm run lint and npx tsc --noEmit
1. Functional: login, ritual, synthesize, dashboard navigation smoke test
1. Visual: desktop/tablet/mobile responsive check
1. Accessibility: keyboard focus and contrast check on primary CTA and text blocks

## 9. Non-goals
- Backend API or DB schema changes.
- Deployment pipeline changes.
- Rebranding beyond v2 palette and approved typography system.