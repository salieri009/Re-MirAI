# Landing Page Animation Design

**Date:** 2025-11-18  
**Prompt Reference:** `P_Anim_AkashicFlow_Subtle_Perf`  
**Component:** `LandingView.vue`

---

## Overview

Landing Page의 배경 애니메이션은 XML 프롬프트 `P_Anim_AkashicFlow_Subtle_Perf`의 원칙을 따라 설계되었습니다.

**핵심 목적:**
1. '익명'의 '인식 데이터'가 '흐르고 있다'는 Re:MirAI의 핵심 테마를 은유
2. 사용자의 '집중력'과 '몰입감'을 강화
3. 신비로운 기술의 느낌을 전달

---

## Design Principles

### 1. Subtlety (미묘함)

- **원칙:** 애니메이션은 **'거의 인지할 수 없는(barely perceptible)'** 수준
- **구현:**
  - Opacity: 0.25-0.4 (매우 낮은 투명도)
  - Animation duration: 30-60초 (극도로 느린 속도)
  - Transform 변화: 1-2% (미세한 움직임)
  - 사용자의 시선은 100% 콘텐츠에 고정, 배경은 부차적

### 2. Performance (성능)

- **Core Web Vitals 준수:**
  - `CLS` (Cumulative Layout Shift): 0에 가까운 영향
  - `TBT` (Total Blocking Time): 최소화
  - `FCP` (First Contentful Paint): 영향 없음
- **최적화 기법:**
  - `will-change` 속성: 애니메이션되는 요소에만 제한적으로 사용
  - GPU 가속: `transform`, `opacity`만 애니메이션
  - `backface-visibility: hidden`: 렌더링 최적화
  - 모바일 60fps 유지, CPU/GPU 부하 최소화

### 3. Accessibility (A11y)

- **`prefers-reduced-motion` 준수:**
  ```css
  @media (prefers-reduced-motion: reduce) {
    .fluidic-bg {
      animation: none;
      opacity: 0.15;
    }
  }
  ```
- **ARIA 속성:** `aria-hidden="true"`로 스크린 리더에서 제외

---

## Animation Architecture

### Layer 1: Fluidic Background (L1_Fluidic_Background)

**목적:** 정적 그라데이션을 '살아있는' 공간으로 변환

**구현:**
- **Gradient Mesh:** 유기적인 색상 유동 (60초 주기)
  - Radial gradients를 사용한 색상 혼합
  - `background-position` 애니메이션으로 색상 이동
  - Mix-blend-mode: overlay로 자연스러운 혼합

- **Noise Layer:** 미세한 텍스처 (40초 주기)
  - CSS repeating-linear-gradient로 노이즈 시뮬레이션
  - Perlin/Simplex noise 효과를 CSS로 근사
  - Mix-blend-mode: soft-light로 부드러운 효과

- **Warping Effect:** 유체 왜곡 (45초 주기)
  - Transform translate와 scale로 미세한 움직임
  - Opacity 변화로 깊이감 추가

### Layer 2: Floating Particles

**목적:** 신비로운 분위기 강화

**구현:**
- Small particles (1-2.5px): 8-13초 주기
- Medium particles (3-4px): 15-18초 주기
- `will-change: transform`으로 성능 최적화
- 다양한 animation-delay로 자연스러운 움직임

### Layer 3: Background Orbs

**목적:** 대형 배경 요소로 깊이감 제공

**구현:**
- Large orbs (32-48px): blur-3xl로 부드러운 효과
- Pulse animation으로 미세한 크기 변화
- Opacity: 0.1 (매우 낮은 투명도)

---

## Technical Implementation

### CSS Animations

```css
/* Fluidic Background Warping (45s cycle) */
@keyframes fluidWarp {
  0%, 100% { transform: translate(0%, 0%) scale(1); opacity: 0.3; }
  25% { transform: translate(2%, -1%) scale(1.02); opacity: 0.35; }
  50% { transform: translate(-1%, 1%) scale(0.98); opacity: 0.3; }
  75% { transform: translate(1%, -0.5%) scale(1.01); opacity: 0.33; }
}

/* Color Shift (60s cycle) */
@keyframes colorShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Noise Flow (40s cycle) */
@keyframes noiseFlow {
  0% { transform: translate(0, 0) rotate(0deg); filter: blur(0px); }
  33% { transform: translate(10px, -5px) rotate(0.5deg); filter: blur(1px); }
  66% { transform: translate(-8px, 8px) rotate(-0.3deg); filter: blur(0.5px); }
  100% { transform: translate(0, 0) rotate(0deg); filter: blur(0px); }
}
```

### Performance Optimizations

1. **GPU Acceleration:**
   - `transform`과 `opacity`만 애니메이션
   - `will-change: transform` 제한적 사용
   - `backface-visibility: hidden`

2. **Reduced Motion Support:**
   - `@media (prefers-reduced-motion: reduce)` 완전 준수
   - 애니메이션 비활성화 시 정적 배경 유지

3. **Layer Management:**
   - `z-index: var(--z-decorative)` 사용
   - `pointer-events: none`으로 인터랙션 방해 없음

---

## Color Scheme

**Figma Color Scheme 41: Festive Eve**
- Primary: Blue (#3b82f6)
- Secondary: Purple (#7c3aed)
- Background: Light gray (#f8fafc)

**Animation Colors:**
- Gradient mesh: rgba(59, 130, 246, 0.15) ~ rgba(124, 58, 237, 0.15)
- Noise layer: rgba(59, 130, 246, 0.03) ~ rgba(124, 58, 237, 0.03)
- Particles: primary-400/30 ~ secondary-500/30

---

## Future Enhancements

### WebGL Shader (Optional, Advanced)

현재는 CSS 기반 구현이지만, 향후 성능이 더 필요할 경우:

1. **WebGL Shader:**
   - Simplex/Perlin Noise 기반 셰이더
   - 더 정교한 유체 시뮬레이션
   - GPU에서 직접 처리로 CPU 부하 제로

2. **Canvas 2D (Alternative):**
   - 최적화된 canvas 렌더링
   - RequestAnimationFrame 기반
   - 모바일 성능 고려

---

## Testing Checklist

- [ ] Core Web Vitals 측정 (Lighthouse)
- [ ] 모바일 60fps 유지 확인
- [ ] `prefers-reduced-motion` 테스트
- [ ] 다양한 화면 크기에서 성능 확인
- [ ] 배터리 소모량 측정 (모바일)
- [ ] 접근성 검증 (WCAG 2.1)

---

**Design Completed:** 2025-11-18  
**Next Review:** After performance testing

