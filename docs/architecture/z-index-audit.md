# Z-Index Audit and System

## Current Z-Index Usage

### Found Issues

1. **Inconsistent z-index values**:
   - `z-10` (Tailwind class = `z-index: 10`) used for containers
   - `z-index: 1` (inline style) used for SVG connection lines
   - `relative z-10` used for step numbers

2. **No z-index system defined**: No CSS variables or documented scale

3. **Potential conflicts**: Multiple elements using same z-index values

## Current Usage Locations

### LandingView.vue
- Line 15: `z-10` - Hero section container
- Line 155: `z-10` - How It Works section container
- Line 216: `z-index: 1` (inline) - SVG connection lines
- Lines 250, 298, 346: `relative z-10` - Step numbers (overlay on animated ping)

## Recommended Z-Index Scale

Following best practices, establish a z-index scale with clear hierarchy:

```css
/* Z-Index Scale (increments of 10 for flexibility) */
--z-base: 0;           /* Default stacking context */
--z-decorative: 1;     /* Background decorative elements */
--z-content: 10;       /* Main content containers */
--z-sticky: 20;        /* Sticky headers/navigation */
--z-dropdown: 30;      /* Dropdown menus */
--z-overlay: 40;       /* Overlays, tooltips */
--z-modal: 50;         /* Modal dialogs */
--z-popover: 60;       /* Popovers, dropdowns over modals */
--z-toast: 70;         /* Toast notifications */
--z-maximum: 100;      /* Maximum z-index (rarely used) */
```

## Best Practices

1. **Use CSS variables** for z-index values
2. **Increment by 10** to allow for future additions
3. **Document hierarchy** clearly
4. **Avoid inline styles** - use Tailwind classes or CSS variables
5. **Reserve high values** (50+) for modals, overlays, and critical UI elements

## Issues to Fix

1. Replace inline `z-index: 1` with CSS variable or Tailwind class
2. Standardize all z-index values to use the scale
3. Add z-index variables to main.css
4. Update components to use the new system

