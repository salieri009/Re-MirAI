# Typography System (v2)

**Version:** 2.0.0  
**Last Updated:** 2025-11-27  
**Status:** ✅ Defined (Refactoring Required)

---

## Font Families

Re:MirAI uses a dual-font system to balance modern aesthetics with readability.

### 1. Display: Space Grotesk
- **Usage:** Headings, Hero titles, Big numbers, "Digital" elements.
- **Characteristics:** Geometric, quirky, tech-forward.
- **Weights:** Medium (500), Bold (700).
- **Token:** `font-display`

### 2. Body: Plus Jakarta Sans (or Inter)
- **Usage:** Body text, UI labels, Inputs, Long-form content.
- **Characteristics:** Clean, legible, neutral.
- **Weights:** Regular (400), Medium (500).
- **Token:** `font-sans`

> [!NOTE]
> **Implementation Note:** `tokens.css` currently defines `Inter` as the display font. This needs to be updated to `Space Grotesk` to match the "Digital Mirror" design.

---

## Type Scale (`tokens.css`)

The type scale is modular and responsive.

| Token | Size (rem) | Size (px) | Usage |
|-------|------------|-----------|-------|
| `--font-size-xs` | 0.75 | 12px | Captions, badges |
| `--font-size-sm` | 0.875 | 14px | UI labels, secondary text |
| `--font-size-base` | 1.0 | 16px | Body text, inputs |
| `--font-size-lg` | 1.125 | 18px | Large body, subtitles |
| `--font-size-xl` | 1.25 | 20px | Card titles |
| `--font-size-2xl` | 1.5 | 24px | Section headings (H3) |
| `--font-size-3xl` | 2.0 | 32px | Page titles (H2) |
| `--font-size-4xl` | 2.25 | 36px | Hero subtitles |
| `--font-size-5xl` | 3.0 | 48px | Hero titles (H1) |

---

## Usage Guidelines

### Headings
- **H1 (Hero):** Space Grotesk Bold, 48px+
- **H2 (Page):** Space Grotesk Bold, 32px
- **H3 (Section):** Space Grotesk Medium, 24px

### Body Text
- **Body:** Plus Jakarta Sans Regular, 16px, 1.5 line-height
- **Small:** Plus Jakarta Sans Regular, 14px, 1.4 line-height

### Interactive Elements
- **Buttons:** Space Grotesk Medium, 16px
- **Nav Items:** Space Grotesk Medium, 14px

---

## Accessibility

- **Contrast:** All text must meet WCAG AA contrast ratios (4.5:1).
- **Scaling:** All font sizes use `rem` units to respect user browser settings.
- **Line Height:** Body text uses `1.5` (150%) for readability.
 surface described in `docs/02-project-overview/features/`.
