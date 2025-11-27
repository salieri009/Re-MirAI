# Color Palette Plan (v2)

**Version:** 2.0.0  
**Last Updated:** 2025-11-27  
**Status:** ✅ Defined (Refactoring Required)

---

## The "Digital Mirror" Palette (3-Color System)

To ensure visual consistency and reduce cognitive load, Re:MirAI ver2 enforces a strict **3-color system** for all core UI elements.

### 1. Primary: Amethyst Purple (`#845EC2`)
- **Role:** Brand identity, primary backgrounds, hero sections.
- **Usage:**
  - Main background gradients
  - Primary buttons (hover state)
  - "Magic" elements (summoning circle, particles)
- **Token:** `--color-primary` / `bg-primary`

### 2. Accent: Mint Green (`#00C9A7`)
- **Role:** Success states, primary actions (CTAs), high-contrast highlights.
- **Usage:**
  - "Get Started" buttons
  - Success checkmarks
  - Active tab indicators
  - Progress bars
- **Token:** `--color-accent` / `text-accent`

### 3. Highlight: Light Lavender (`#C197FF`)
- **Role:** Subtle accents, borders, secondary text, glassmorphism effects.
- **Usage:**
  - Card borders
  - Secondary buttons
  - Icon glows
  - Text selection
- **Token:** `--color-highlight` / `border-highlight`

---

## Implementation Status & Gap Analysis

### Current State (`frontend/src/styles/tokens.css`)
The current implementation has a conflict between CSS variables and Tailwind config:

| Token | CSS Variable (`tokens.css`) | Tailwind Config (`tailwind.config.js`) | **Target Ver2** |
|-------|-----------------------------|----------------------------------------|-----------------|
| **Primary** | `#845ec2` (Purple) | `#00c9a7` (Teal) ⚠️ | **Purple (`#845EC2`)** |
| **Secondary**| `#00c9a7` (Teal) | - | **Mint Green (`#00C9A7`)** |
| **Accent** | `#f3c5ff` (Pink) | `#845EC2` (Purple) ⚠️ | **Mint Green (`#00C9A7`)** |
| **Highlight**| - | `#c197ff` (Lavender) | **Lavender (`#C197FF`)** |

> [!WARNING]
> **Critical Refactoring Needed:** The `tailwind.config.js` currently maps `primary` to Teal. This must be updated to map `primary` to Purple (`#845EC2`) to match the design system. Teal should be remapped to `accent`.

### Proposed HSL Token System

To support programmatic shade generation and opacity modifiers, we will migrate to HSL variables:

```css
:root {
  /* Core Palette (HSL) */
  --primary-h: 263;
  --primary-s: 48%;
  --primary-l: 56%;
  --color-primary: hsl(var(--primary-h), var(--primary-s), var(--primary-l));

  --accent-h: 170;
  --accent-s: 100%;
  --accent-l: 39%;
  --color-accent: hsl(var(--accent-h), var(--accent-s), var(--accent-l));

  --highlight-h: 264;
  --highlight-s: 100%;
  --highlight-l: 80%;
  --color-highlight: hsl(var(--highlight-h), var(--highlight-s), var(--highlight-l));
}
```

---

## Usage Guidelines

### Do's
- ✅ Use **Primary** for large background areas (with low opacity/gradients).
- ✅ Use **Accent** for the single most important action on a page.
- ✅ Use **Highlight** for borders and focus states.

### Don'ts
- ❌ Do not use "Pink" (`#f3c5ff`) from the old palette (replace with Highlight).
- ❌ Do not use "Cream" (`#fefedf`) for text (use white/gray scale).
- ❌ Do not mix Teal and Purple for the same hierarchy level.

---

## Accessibility (WCAG 2.1 AA)

- **Text on Primary:** White (`#FFFFFF`) passes AAA.
- **Text on Accent:** Black (`#000000`) passes AAA. White fails.
- **Text on Highlight:** Black (`#000000`) passes AAA.

**Linting Rule:**
```json
"stylelint": {
  "rules": {
    "color-no-hex": true,
    "declaration-property-value-allowed-list": {
      "color": ["/var\\(--color-/", "currentColor", "transparent"]
    }
  }
}
```
