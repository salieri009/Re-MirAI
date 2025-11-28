# 4px Baseline Grid System (v2)

**Version:** 2.0.0  
**Last Updated:** 2025-11-27  
**Status:** ✅ Defined (Implemented)

---

## The 4px Principle

Re:MirAI uses a strict **4px baseline grid** for all spacing, sizing, and typography line-heights. This ensures vertical rhythm and consistent alignment across the application.

### Core Spacing Scale (`tokens.css`)

The spacing scale is defined in `frontend/src/styles/tokens.css` and mapped to Tailwind utilities.

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `--space-xs` | `0.25rem` | **4px** | Micro-spacing, icon gaps |
| `--space-sm` | `0.5rem` | **8px** | Component internal padding, button gaps |
| `--space-md` | `1.0rem` | **16px** | Standard padding, card gaps |
| `--space-lg` | `1.5rem` | **24px** | Section internal spacing |
| `--space-xl` | `2.0rem` | **32px** | Section margins, large gaps |
| `--space-2xl` | `3.0rem` | **48px** | Major section dividers |
| `--space-3xl` | `4.0rem` | **64px** | Hero section padding |

---

## Layout Grid

### Container Max-Widths
- **Mobile:** 100% (padding 16px)
- **Tablet:** 640px
- **Desktop:** 1024px
- **Wide:** 1280px

### Column System
- **Mobile:** 4 columns, 16px gutter
- **Tablet:** 8 columns, 24px gutter
- **Desktop:** 12 columns, 32px gutter

---

## Component Sizing Rules

All interactive elements must align to the 4px grid:

- **Buttons:** Height 40px (`h-10`) or 48px (`h-12`)
- **Inputs:** Height 48px (`h-12`)
- **Icons:** 20px (`w-5 h-5`) or 24px (`w-6 h-6`) inside 40px/48px touch targets
- **Cards:** Padding 24px (`p-6`) or 32px (`p-8`)

---

## Implementation Guide

### Tailwind Classes
Use standard Tailwind spacing classes which are already configured to the 4px scale:

```tsx
// Correct: Multiples of 4
<div className="p-4 gap-4"> // 16px padding, 16px gap
<div className="mt-8">      // 32px margin top

// Incorrect: Arbitrary values
<div className="p-[15px]">  // ❌ Off-grid
<div className="mt-3">      // ❌ 12px (3x4) is allowed but use sparingly
```

### Vertical Rhythm
Line heights should also be multiples of 4px where possible to maintain the baseline grid.

```css
.text-body {
  font-size: 16px;
  line-height: 24px; /* 6 * 4px */
}

.text-heading {
  font-size: 32px;
  line-height: 40px; /* 10 * 4px */
}
```
d spec underpins all feature docs housed in `docs/02-project-overview/features/`.
