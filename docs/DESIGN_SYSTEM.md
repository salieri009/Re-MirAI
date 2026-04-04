# Re:MirAI DESIGN SYSTEM

## 1. 방향성
- Light-first, readable, accessible
- "Digital Mirror" 컨셉 + 과도하지 않은 신비감
- 정보 전달 명확성 우선

## 2. Palette (Small Switch Palette v2)
- Background Mist: #e6ebf8
- Primary Fuchsia: #d946ef
- Text Anchor: #334155
- 보조 색상: Blue 계열(상황별 링크/보조 CTA)

## 3. 타이포그래피
- 본문 가독성 최우선(중간 굵기, 충분한 line-height)
- 제목은 계층이 명확해야 하며 장식보다 정보 구조를 우선

## 4. 컴포넌트 원칙
- CTA는 화면당 1개 우선 강조
- 상태 컴포넌트(loading/error/empty/success) 표준화
- 카드/배지/모달의 간격 규칙 통일

## 5. 인터랙션 원칙
- GSAP 모션은 의미가 있는 전환(합성/리빌/온보딩)에 집중
- 반복/장식 모션 최소화
- reduce motion 사용자 배려

## 6. 접근성
- 명도 대비 확보(WCAG AA 이상 목표)
- 키보드 탐색 가능
- 중요한 상태는 색상+텍스트 동시 전달

## 7. 브랜딩 일관성
- Ritual, Persona, Summon 용어를 UI와 문서에 동일하게 사용
- 공유 결과물(카드, 캡션, CTA)의 톤앤매너 일관 유지
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
