# Typography System

**Version:** 1.0.0  
**Last Updated:** 2025-01-27  
**Status:** Active

---

## Overview

Re:MirAI uses a purpose-driven typography system with three font families, each serving a specific role in the user experience.

## Font Families

### 1. Display Font: Poppins
**Role:** Brand & Headlines  
**Usage:** Page titles, hero headlines, persona names, major section headers  
**Emotion:** Bold, confident, magical  
**CSS Variable:** `--font-display`

```css
font-family: var(--font-display);
/* 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif */
```

**When to use:**
- Hero section headlines
- Page titles
- Persona names
- Major section headers (h1, h2)
- CTA button text

### 2. Body Font: Inter
**Role:** Readability & Content  
**Usage:** Body text, descriptions, labels, UI elements  
**Emotion:** Clear, trustworthy, approachable  
**CSS Variable:** `--font-body`

```css
font-family: var(--font-body);
/* 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif */
```

**When to use:**
- Body paragraphs
- Descriptions
- Labels
- Button labels (secondary)
- Form inputs
- Navigation items

### 3. Tech Font: Space Mono
**Role:** Accent (The Tech) - Data & Analysis  
**Usage:** Numeric data, stats, echoes count, analysis results  
**Emotion:** Technical, precise, AI-powered  
**CSS Variable:** `--font-tech`

```css
font-family: var(--font-tech);
/* 'Space Mono', 'Courier New', monospace */
```

**When to use:**
- Echoes count (responsesCount)
- Persona stats values
- Progress percentages
- Numeric thresholds
- Analysis data
- Technical metrics

**Rationale:** Space Mono gives a "tech behind the magic" feeling, emphasizing that persona analysis results are powered by AI technology, not just magic.

## Typography Scale

All font sizes follow the 4px baseline grid where possible:

| Token | Size | Pixels | Usage |
|-------|------|--------|-------|
| `--font-size-xs` | `0.75rem` | 12px | Small labels, captions |
| `--font-size-sm` | `0.875rem` | 14px | Secondary text, badges |
| `--font-size-base` | `1rem` | 16px | Body text |
| `--font-size-lg` | `1.125rem` | 18px | Emphasized body |
| `--font-size-xl` | `1.25rem` | 20px | Subheadings |
| `--font-size-2xl` | `1.5rem` | 24px | Section headers |
| `--font-size-3xl` | `2rem` | 32px | Page titles |
| `--font-size-4xl` | `2.25rem` | 36px | Hero subheadings |
| `--font-size-5xl` | `3rem` | 48px | Hero headlines |

## Implementation Examples

### Echoes Count (Dashboard)
```tsx
<span className={styles.counter}>
  {surveyStatus?.responsesCount ?? 0}
</span>
```

```css
.counter {
  font-family: var(--font-tech, 'Space Mono', monospace);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.05em;
}
```

### Persona Stats
```tsx
<span className={styles.statValue}>{value}</span>
```

```css
.statValue {
  font-family: var(--font-tech, 'Space Mono', monospace);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.05em;
}
```

### Stats Panel Values
```css
.value {
  font-family: var(--font-tech, 'Space Mono', monospace);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.05em;
}
```

## Letter Spacing

Space Mono benefits from slight letter spacing adjustments:

- **Tech font (Space Mono):** `letter-spacing: 0.05em` - Improves readability
- **Display font (Poppins):** Default or `letter-spacing: -0.02em` for large sizes
- **Body font (Inter):** Default letter spacing

## Components Using Space Mono

1. **DashboardStateView**
   - Echoes counter (`counter` class)
   - Threshold display (`threshold` class)

2. **PersonaCard**
   - Stat values (`statValue` class)

3. **StatsPanel**
   - Stat values (`value` class)

4. **PersonaPreview**
   - Stat row values (when numeric data is displayed)

## Design Rationale

**Why Space Mono for Data?**
- Creates visual distinction between "magic" (Poppins) and "technology" (Space Mono)
- Emphasizes that persona analysis is AI-powered
- Monospace font suggests precision and data accuracy
- Adds a subtle "tech" accent without overwhelming the magical theme

**Visual Hierarchy:**
1. **Poppins** (Display) - Magic, wonder, brand
2. **Inter** (Body) - Trust, clarity, content
3. **Space Mono** (Tech) - Data, analysis, precision

---

## References

- [Google Fonts - Space Mono](https://fonts.google.com/specimen/Space+Mono)
- [Typography in Design Systems](https://www.designsystems.com/typography-guide/)

