# 4px Baseline Grid System

**Version:** 1.0.0  
**Last Updated:** 2025-01-27  
**Status:** Active  
**Reference:** [The 4px Baseline Grid](https://uxdesign.cc/the-4px-baseline-grid-89485012dea6)

---

## Overview

The 4px baseline grid is a design system principle where all spacing, sizing, and measurements are multiples of 4px. This ensures visual consistency, alignment, and a harmonious visual rhythm across the entire interface.

## Core Principles

1. **All spacing values must be multiples of 4px**
   - Padding: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, etc.
   - Margin: Same as padding
   - Gap: Same as padding

2. **All element dimensions must be multiples of 4px**
   - Width: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, etc.
   - Height: Same as width
   - Min/Max dimensions: Same rule applies

3. **Border radius must be multiples of 4px**
   - 4px, 8px, 12px, 16px, 20px, 24px, 32px, etc.

4. **Typography alignment**
   - Font sizes can be any value, but line-height should create 4px-aligned baselines
   - Line-height should result in text that aligns to the 4px grid
   - Example: 16px font with 1.5 line-height = 24px (aligned to 4px grid)

5. **Shadow offsets must be multiples of 4px**
   - X offset: 0px, 4px, 8px, 12px, 16px, 20px, etc.
   - Y offset: Same as X offset
   - Blur radius: Can be any value (doesn't affect alignment)

## Spacing Scale

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `--space-0` | `0` | 0px | No spacing |
| `--space-xs` | `4px` | 4px | Tight spacing, icons |
| `--space-sm` | `8px` | 8px | Small gaps, compact layouts |
| `--space-md` | `16px` | 16px | Standard spacing |
| `--space-lg` | `24px` | 24px | Section spacing |
| `--space-xl` | `32px` | 32px | Large gaps |
| `--space-2xl` | `48px` | 48px | Section breaks |
| `--space-3xl` | `64px` | 64px | Major sections |
| `--space-4xl` | `96px` | 96px | Hero sections |
| `--space-5xl` | `128px` | 128px | Page-level spacing |

## Border Radius Scale

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `--radius-none` | `0` | 0px | Square corners |
| `--radius-sm` | `4px` | 4px | Small elements, badges |
| `--radius-md` | `8px` | 8px | Buttons, inputs |
| `--radius-lg` | `12px` | 12px | Cards, containers |
| `--radius-xl` | `16px` | 16px | Large cards |
| `--radius-2xl` | `24px` | 24px | Hero elements |
| `--radius-full` | `9999px` | - | Pills, circles |

## Typography Alignment

### Font Sizes (Can be any value)
- `12px` (0.75rem) - xs
- `14px` (0.875rem) - sm
- `16px` (1rem) - base
- `18px` (1.125rem) - lg
- `20px` (1.25rem) - xl
- `24px` (1.5rem) - 2xl
- `30px` (1.875rem) - 3xl → **Change to 32px**
- `36px` (2.25rem) - 4xl
- `48px` (3rem) - 5xl

### Line Heights (Must create 4px-aligned baselines)

For 4px baseline alignment:
- **16px font**: Use line-height 1.5 = 24px (aligned)
- **18px font**: Use line-height 1.333 = 24px (aligned)
- **20px font**: Use line-height 1.2 = 24px (aligned)
- **24px font**: Use line-height 1.333 = 32px (aligned)
- **32px font**: Use line-height 1.25 = 40px (aligned) or 1.5 = 48px (aligned)

## Shadow Offsets

All shadow X and Y offsets must be multiples of 4px:

```css
/* ✅ Correct */
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.1);

/* ❌ Incorrect */
box-shadow: 0 5px 6px rgba(0, 0, 0, 0.1);  /* 5px is not a multiple of 4 */
box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);  /* 3px is not a multiple of 4 */
```

## Implementation Checklist

### Design Tokens
- [x] Spacing scale uses 4px multiples
- [x] Border radius uses 4px multiples
- [ ] Font sizes adjusted where needed (30px → 32px)
- [ ] Line heights create 4px-aligned baselines
- [ ] Shadow offsets are 4px multiples

### CSS Files
- [ ] All hardcoded padding values are 4px multiples
- [ ] All hardcoded margin values are 4px multiples
- [ ] All hardcoded gap values are 4px multiples
- [ ] All width/height values are 4px multiples
- [ ] All border-radius values are 4px multiples
- [ ] All shadow offsets are 4px multiples

### Components
- [ ] All component spacing uses design tokens
- [ ] All component dimensions are 4px multiples
- [ ] All component border-radius uses tokens
- [ ] Typography aligns to 4px baseline

## Common Violations to Fix

1. **Font Size: 30px (1.875rem)**
   - **Fix:** Change to 32px (2rem) for 4px alignment

2. **Border Radius: 12px**
   - **Status:** ✅ Already a multiple of 4px (3 × 4px)

3. **Line Height: 1.6**
   - **Fix:** Adjust to create 4px-aligned baselines
   - Example: 16px font with 1.6 line-height = 25.6px → Change to 1.5 = 24px

4. **Shadow: `0 1px 2px`**
   - **Fix:** Change to `0 4px 4px` or `0 0 4px`

5. **Hardcoded Values**
   - Replace all hardcoded spacing with design tokens
   - Ensure all hardcoded values are multiples of 4px

## Tools & Validation

### CSS Linting
Use a linter rule to check for non-4px values:
```css
/* Example: Check for non-4px padding/margin */
padding: 5px; /* ❌ Should be 4px or 8px */
margin: 10px; /* ❌ Should be 8px or 12px */
```

### Visual Inspection
1. Enable browser grid overlay (4px spacing)
2. Check element alignment
3. Verify text baselines align to grid

## Benefits

1. **Visual Consistency**: All elements align perfectly
2. **Faster Development**: Clear spacing system
3. **Better Collaboration**: Designers and developers use same system
4. **Scalability**: Easy to maintain and extend
5. **Professional Polish**: Clean, organized appearance

---

## References

- [The 4px Baseline Grid - UX Design](https://uxdesign.cc/the-4px-baseline-grid-89485012dea6)
- [Material Design 8px Grid](https://material.io/design/layout/spacing-methods.html)
- [8-Point Grid System](https://spec.fm/specifics/8-pt-grid)

