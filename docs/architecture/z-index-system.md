# Z-Index System Documentation

## Overview

This document defines the z-index scale system used throughout the Re:MirAI frontend application. All z-index values should use CSS variables defined in `frontend/src/assets/main.css` to ensure consistency and prevent stacking context conflicts.

## Z-Index Scale

The z-index scale uses increments of 10 to allow flexibility for future additions:

```css
--z-base: 0;           /* Default stacking context */
--z-decorative: 1;     /* Background decorative elements */
--z-content: 10;        /* Main content containers */
--z-sticky: 20;        /* Sticky headers, navigation bars */
--z-dropdown: 30;      /* Dropdown menus, select options */
--z-overlay: 40;       /* Overlays, tooltips, popovers */
--z-modal: 50;         /* Modal dialogs */
--z-popover: 60;       /* Popovers over modals */
--z-toast: 70;         /* Toast notifications */
--z-maximum: 100;      /* Maximum z-index (rarely used) */
```

## Usage Guidelines

### 1. Always Use CSS Variables

**✅ Good:**
```html
<div style="z-index: var(--z-content);">
```

**❌ Bad:**
```html
<div style="z-index: 10;">
<div class="z-10">
```

### 2. Use Appropriate Level

- **Decorative elements** (blur circles, background patterns): `var(--z-decorative)`
- **Main content** (containers, cards): `var(--z-content)`
- **Sticky elements** (headers, nav bars): `var(--z-sticky)`
- **Dropdowns**: `var(--z-dropdown)`
- **Overlays/Tooltips**: `var(--z-overlay)`
- **Modals**: `var(--z-modal)`
- **Toasts**: `var(--z-toast)`

### 3. Avoid Inline Styles When Possible

Prefer CSS classes with CSS variables over inline styles:

```css
.content-container {
  z-index: var(--z-content);
}
```

### 4. Document Exceptions

If you must use a value outside the scale, document why:

```html
<!-- Exception: Needs to be above modal but below toast -->
<div style="z-index: 55;">
```

## Current Usage

### LandingView.vue
- Hero section container: `var(--z-content)` (10)
- How It Works container: `var(--z-content)` (10)
- SVG connection lines: `var(--z-decorative)` (1)
- Step numbers: `var(--z-content)` (10) - overlays on animated ping

### Other Pages
- All content containers: `var(--z-content)` (10)
- No modals or overlays currently implemented

## Future Considerations

When adding new UI elements, use the appropriate z-index level:

- **Navigation bar (sticky)**: `var(--z-sticky)` (20)
- **Dropdown menus**: `var(--z-dropdown)` (30)
- **Tooltips**: `var(--z-overlay)` (40)
- **Modal dialogs**: `var(--z-modal)` (50)
- **Toast notifications**: `var(--z-toast)` (70)

## Best Practices

1. **Never exceed 100** unless absolutely necessary
2. **Use increments of 10** to allow for future additions
3. **Document exceptions** when using values outside the scale
4. **Test stacking contexts** when adding new layered elements
5. **Avoid z-index wars** - restructure DOM if needed

## References

- CSS Variables: `frontend/src/assets/main.css`
- Z-Index Audit: `docs/architecture/z-index-audit.md`

