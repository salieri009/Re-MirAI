# Color Palette Audit - KickoffLabs Compliance

## Current Violation Status

**❌ NOT COMPLIANT** - We are using **9+ distinct colors** on the Landing Page, which violates the KickoffLabs rule of **1-3 colors maximum**.

## Color Usage Analysis

### Landing Page (`LandingView.vue`)

**Current Colors Used:**
1. **Indigo** (`indigo-500`, `indigo-600`, `indigo-400`, `indigo-300`, `indigo-900`) - Primary CTA, step 1, badges
2. **Purple** (`purple-500`, `purple-600`, `purple-400`, `purple-900`) - Step 2, gradients, accents
3. **Pink** (`pink-500`, `pink-600`, `pink-900`, `rose-500`, `rose-600`) - Step 3, gradients
4. **Green** (`green-400`, `green-500`, `green-300`) - Trust indicators, checkmarks, success states
5. **Blue** (`blue-400`, `blue-200`, `blue-300`) - Trust indicators, status text
6. **Red** (`red-500`, `red-300`) - Problem section X marks, error states
7. **Cyan** (`cyan-300`) - Status indicators
8. **Yellow** (`yellow-300`) - Status indicators
9. **Slate/Gray** (`slate-800`, `slate-700`, `slate-600`, `gray-700`) - Backgrounds, borders (neutral)

**Total: 9 distinct colors** ❌ (Should be 1-3)

### Other Pages

- **Dashboard**: Uses indigo, purple, green (success), red (error) - **4 colors** ❌
- **Persona Room**: Uses indigo, green (success), red (error), slate - **4 colors** ❌
- **Chat**: Uses indigo, gray - **2 colors** ✅
- **Survey**: Uses indigo, red (error), gray - **3 colors** ✅ (borderline)

## KickoffLabs Rule

> "As a general rule you should limit the number of colors on your page to 1 to 3 colors."

> "You will want one color to act as your call-to-action. This would be your buttons, for instance. This color should be a strong color that stands out."

> "If you're not a designer stick with only using 1 to 2 colors on your page"

## Proposed Solution

### Option 1: Strict Compliance (1-2 Colors)
- **Primary CTA Color**: Indigo-Purple gradient (keep as is)
- **Remove**: Green, Blue, Red, Cyan, Yellow, Pink
- **Replace with**: 
  - Use indigo/purple variations for all indicators
  - Use white/gray for neutral states
  - Use opacity/transparency for visual hierarchy

### Option 2: Practical Compliance (2-3 Colors)
- **Primary CTA Color**: Indigo-Purple gradient
- **Secondary Color**: Keep one accent color (e.g., purple OR pink, not both)
- **Neutral**: Slate/Gray for backgrounds (doesn't count as "color")
- **Remove**: Green, Blue, Red, Cyan, Yellow
- **System States**: Use indigo/purple with opacity for success/error states

### Recommended: Option 2 (2-3 Colors)

**Color Palette:**
1. **Primary CTA**: Indigo-Purple gradient (`indigo-500` → `purple-600`)
2. **Accent**: Purple only (remove pink, consolidate to purple)
3. **Neutral**: Slate/Gray (backgrounds, borders - doesn't count)

**Changes Needed:**
- Replace green checkmarks with indigo/purple checkmarks
- Replace blue indicators with indigo/purple
- Replace red X marks with indigo/purple with different styling (e.g., outline)
- Remove cyan and yellow status colors
- Consolidate pink to purple (use purple for step 3 instead of pink)
- Use opacity variations of indigo/purple for different states

## Implementation Plan

### Phase 1: Landing Page
1. Replace green trust indicators (lines 178, 182, 186) with indigo/purple
2. Replace blue trust indicators with indigo/purple
3. Replace red X marks (lines 391, 398, 405) with indigo/purple outline style
4. Replace green checkmarks (lines 419, 426, 433) with indigo/purple
5. Consolidate pink to purple in step 3
6. Remove cyan/yellow status colors (lines 366, 370)

### Phase 2: Other Pages
1. Dashboard: Replace green success with indigo/purple opacity
2. Persona Room: Replace green success with indigo/purple opacity
3. Keep error states minimal (use red only for critical errors, or use indigo with warning icon)

### Phase 3: Update Design System
1. Update CSS variables to reflect 2-color palette
2. Create utility classes for state colors using indigo/purple opacity
3. Update component library documentation

## Compliance Target

**Goal**: Maximum 2-3 colors per page
- **Primary CTA**: Indigo-Purple gradient
- **Accent**: Purple (variations)
- **Neutral**: Slate/Gray (backgrounds - doesn't count)

## References

- [KickoffLabs: Limit Your Color Palette](https://kickofflabs.com/blog/landing-page-fonts-colors/#limit-your-color-palette)
- Current compliance doc: `docs/architecture/kickofflabs-compliance.md`

