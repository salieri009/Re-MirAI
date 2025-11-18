# KickoffLabs Branding & Logo Compliance

**Last Updated:** 2025-11-18  
**Version:** 1.0.0  
**Status:** Active  
**Reference:** [KickoffLabs: Landing Page Design - Branding & Logos](https://kickofflabs.com/blog/landing-page-fonts-colors/#branding--logos)

---

## Overview

This document ensures compliance with KickoffLabs branding and logo guidelines across all Re:MirAI pages.

---

## Branding & Logo Guidelines (KickoffLabs)

### Core Principles

1. **Logo Size**: Should be appropriate and not overwhelming
   - Not too large (doesn't dominate the page)
   - Not too small (maintains brand visibility)
   - Consistent across all pages

2. **Logo Placement**: Strategic positioning
   - Top-left or center-top for maximum visibility
   - Consistent placement across all pages
   - Doesn't interfere with content hierarchy

3. **Logo Consistency**: 
   - Same logo version across all pages
   - Consistent styling (colors, effects)
   - Maintains brand recognition

4. **Brand Elements**:
   - Logo should complement, not compete with content
   - Brand colors should align with logo
   - Typography should support brand identity

---

## Current Implementation Audit

### Landing Page (`LandingView.vue`)

**Current State:**
```vue
<div class="text-2xl font-bold text-gradient" role="img" aria-label="Re:MirAI Logo">
  Re:MirAI
</div>
```

**Issues:**
- ❌ Text-based logo (no actual logo image)
- ❌ Size: `text-2xl` (24px) - may be too small for brand visibility
- ✅ Placement: Centered (good for hero section)
- ✅ Consistent styling with gradient

**Recommendations:**
1. Create actual logo image/component
2. Increase size to `text-3xl` or `text-4xl` for better visibility
3. Maintain centered placement in hero
4. Add logo to header/navigation for consistency

### Login Page (`LoginView.vue`)

**Current State:**
- No logo visible in current implementation
- Only "Welcome to Re:MirAI" text

**Issues:**
- ❌ Missing logo entirely
- ❌ No brand visibility on authentication page

**Recommendations:**
1. Add logo above "Welcome to Re:MirAI"
2. Size: `text-3xl` (30px) for clear visibility
3. Placement: Center-top of card

### Dashboard (`DashboardView.vue`)

**Current State:**
- No logo in header
- Only user avatar and name

**Issues:**
- ❌ Missing logo in navigation/header
- ❌ No consistent brand presence

**Recommendations:**
1. Add logo to header (left side)
2. Size: `text-xl` or `text-2xl` (20-24px) for header
3. Placement: Left side, before user info

---

## Compliance Requirements

### Logo Size Standards

| Location | Recommended Size | Tailwind Class | Rationale |
|----------|-----------------|---------------|-----------|
| **Hero Section** | 30-36px | `text-3xl` or `text-4xl` | High visibility, brand prominence |
| **Header/Navigation** | 20-24px | `text-xl` or `text-2xl` | Visible but not overwhelming |
| **Footer** | 16-20px | `text-lg` or `text-xl` | Supporting brand presence |
| **Card/Modal** | 24-30px | `text-2xl` or `text-3xl` | Context-appropriate size |

### Logo Placement Standards

1. **Hero Section (Landing Page)**
   - Placement: Center-top, above headline
   - Spacing: `var(--subsection-spacing)` (32px) below logo
   - Alignment: Centered

2. **Header/Navigation**
   - Placement: Top-left (standard web convention)
   - Spacing: `var(--element-spacing)` (16px) from left edge
   - Alignment: Left-aligned

3. **Login/Auth Pages**
   - Placement: Center-top of card
   - Spacing: `var(--card-spacing)` (16px) above title
   - Alignment: Centered

4. **Footer**
   - Placement: Center or left-aligned
   - Spacing: Standard footer spacing
   - Alignment: Context-dependent

### Logo Consistency Rules

1. **Same Styling Across Pages**
   - Same font family (Inter + Poppins)
   - Same gradient effect (Fuchsia/Pink)
   - Same weight (bold)

2. **Color Consistency**
   - Primary: Fuchsia/Pink gradient (`#d946ef` to `#c026d3`)
   - Alternative: Solid Fuchsia/Pink for light backgrounds
   - Never use different colors for logo

3. **Effects Consistency**
   - Same gradient effect everywhere
   - Same hover effects (if interactive)
   - Same animation (if any)

---

## Implementation Plan

### Phase 1: Create Logo Component ✅

**File:** `frontend/src/components/common/Logo.vue`

```vue
<template>
  <div 
    :class="[
      'font-bold text-gradient',
      sizeClass[size],
      { 'cursor-pointer': clickable }
    ]"
    role="img"
    :aria-label="`Re:MirAI ${ariaContext}`"
    @click="handleClick"
  >
    Re:MirAI
  </div>
</template>

<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  clickable?: boolean
  ariaContext?: string
}

withDefaults(defineProps<Props>(), {
  size: 'md',
  clickable: false,
  ariaContext: 'Logo'
})

const sizeClass = {
  sm: 'text-lg',    // 18px - Footer
  md: 'text-2xl',   // 24px - Header
  lg: 'text-3xl',   // 30px - Hero, Cards
  xl: 'text-4xl'    // 36px - Large Hero
}

const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  if (props.clickable) {
    emit('click')
  }
}
</script>
```

### Phase 2: Update All Pages

#### Landing Page
- ✅ Logo already present
- ⚠️ Increase size to `text-3xl` or `text-4xl`
- ✅ Maintain centered placement

#### Login Page
- ❌ Add logo above "Welcome to Re:MirAI"
- Size: `text-3xl` (30px)
- Placement: Center-top

#### Dashboard
- ❌ Add logo to header (left side)
- Size: `text-xl` or `text-2xl` (20-24px)
- Placement: Left side, before user info

#### Other Pages
- Add logo to header/navigation consistently
- Maintain same size and styling

### Phase 3: Create Logo Image (Future)

**Recommendation:** Create actual logo image/icon
- SVG format for scalability
- Fuchsia/Pink gradient
- Simple, recognizable design
- Works at all sizes

---

## Compliance Checklist

### Logo Implementation
- [ ] Logo component created
- [ ] Consistent sizing across pages
- [ ] Consistent placement across pages
- [ ] Consistent styling (colors, effects)
- [ ] Proper accessibility (aria-label)

### Brand Consistency
- [ ] Same logo version everywhere
- [ ] Brand colors align with logo
- [ ] Typography supports brand
- [ ] Logo doesn't compete with content

### Size Compliance
- [ ] Hero: 30-36px (text-3xl or text-4xl)
- [ ] Header: 20-24px (text-xl or text-2xl)
- [ ] Footer: 16-20px (text-lg or text-xl)
- [ ] Cards: 24-30px (text-2xl or text-3xl)

### Placement Compliance
- [ ] Hero: Center-top, above headline
- [ ] Header: Top-left (standard)
- [ ] Login: Center-top of card
- [ ] Footer: Center or left-aligned

---

## Current Status

### ✅ Compliant
- Logo styling (gradient, font)
- Logo placement in hero (centered)
- Brand consistency (same text everywhere)

### ⚠️ Needs Improvement
- Logo size in hero (may be too small)
- Missing logo in header/navigation
- Missing logo in login page
- No actual logo image (text-only)

### ❌ Non-Compliant
- Inconsistent logo presence across pages
- No logo component for reusability

---

## Action Items

### Immediate (This Week)
1. Create `Logo.vue` component
2. Increase hero logo size to `text-3xl` or `text-4xl`
3. Add logo to login page
4. Add logo to dashboard header

### Short-term (This Sprint)
5. Add logo to all page headers
6. Create logo image/icon (SVG)
7. Standardize logo sizes across all pages
8. Document logo usage in style guide

### Long-term (Next Sprint)
9. Create logo variations (light/dark)
10. Add logo animation (subtle)
11. Create logo usage guidelines document

---

## References

- [KickoffLabs: Landing Page Design - Branding & Logos](https://kickofflabs.com/blog/landing-page-fonts-colors/#branding--logos)
- [Design System](frontend/design_system.md)
- [Component Library](frontend/component_library.md)

---

**Maintained by:** Design Team  
**Last Reviewed:** 2025-11-18  
**Next Review:** 2026-02-18

