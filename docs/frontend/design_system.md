# Re:MirAI Frontend Design System

> *"The mirror reflects your soul. What image do you cast in others?"*

## Design Philosophy

Re:MirAI's design system embodies the mystical essence of AI persona summoning through a sophisticated, modern interface that balances technological precision with emotional depth.

### Core Design Principles

#### 1. **Mystical Minimalism**
- Clean, uncluttered layouts that let the magical elements shine
- Strategic use of negative space to create breathing room
- Focus on essential elements while maintaining visual hierarchy

#### 2. **Emotional Resonance** 
- Colors and animations that evoke wonder, connection, and intimacy
- UI patterns that reflect the personal nature of the relationships being explored
- Visual metaphors that connect to the spiritual/mystical summoning theme

#### 3. **Progressive Revelation**
- Information architecture that gradually reveals complexity
- Onboarding flow that educates while enchanting
- UI states that clearly communicate system status and user progress

#### 4. **Accessibility & Inclusivity**
- High contrast ratios for readability
- Clear visual hierarchies and intuitive navigation
- Responsive design that works across all devices

---

## Color System

### Primary Palette

```css
:root {
  /* Dark Mystical Backgrounds */
  --color-bg-primary: #0a0e27;    /* Deep cosmic blue */
  --color-bg-secondary: #1a1f3a;  /* Elevated surface */
  --color-bg-accent: #2d1b4e;     /* Purple accent background */
  
  /* Text Hierarchy */
  --color-text-primary: #ffffff;     /* Primary text */
  --color-text-secondary: #a0aec0;   /* Secondary text */
  --color-text-muted: rgba(160, 174, 192, 0.8); /* Muted text */
  
  /* Interactive Elements */
  --color-accent: #6d28d9;        /* Primary purple */
  --color-accent-hover: #7c3aed;  /* Hover state */
  --color-border: rgba(79, 70, 229, 0.5);      /* Subtle borders */
  --color-border-light: rgba(79, 70, 229, 0.2); /* Light borders */
}
```

### Persona Rarity System
Inspired by gacha games, each persona rarity has its distinct color language:

- **N (Normal)**: `#9ca3af` - Neutral gray, common and approachable
- **R (Rare)**: `#60a5fa` - Sky blue, reliable and trustworthy  
- **SR (Super Rare)**: `#a78bfa` - Lavender purple, special and valued
- **SSR (Super Super Rare)**: `#f59e0b` - Golden amber, precious and coveted
- **UR (Ultra Rare)**: `#ef4444` - Ruby red, legendary and powerful

### Persona Stats Colors
Each personality dimension has its own thematic color:

- **Charisma**: `#4f46e5` - Royal purple (leadership, magnetism)
- **Intellect**: `#06b6d4` - Cyan blue (logic, wisdom)
- **Kindness**: `#10b981` - Emerald green (growth, compassion)
- **Instability**: `#ec4899` - Hot pink (passion, unpredictability)
- **Spirit**: `#f59e0b` - Bright orange (energy, vitality)

---

## Typography

### Font Families
- **Primary**: Inter - Clean, readable, modern sans-serif
- **Display**: Poppins - Friendly, rounded for headings and hero text
- **System Fallback**: system-ui, sans-serif

### Type Scale
```css
/* Headings */
h1: 3rem (48px) - Hero titles, landing page
h2: 2.25rem (36px) - Section headers  
h3: 1.5rem (24px) - Card titles, subsections
h4: 1.25rem (20px) - Component labels

/* Body Text */
Large: 1.125rem (18px) - Hero descriptions
Base: 1rem (16px) - Primary body text  
Small: 0.875rem (14px) - Secondary text, captions
```

### Text Hierarchy
- **Primary Text**: High contrast white for main content
- **Secondary Text**: Medium contrast gray for supporting info
- **Muted Text**: Low contrast for metadata and less important details

---

## Component System

### Buttons

#### Primary Button (`btn-primary`)
- **Use Case**: Main actions (Begin Ritual, Summon Persona)
- **Style**: Indigo background with hover effects
- **Psychology**: Confidence, forward momentum

#### Secondary Button (`btn-secondary`) 
- **Use Case**: Supporting actions (View Profile, Settings)
- **Style**: Purple background, slightly less prominent
- **Psychology**: Support without overwhelming

#### Ghost Button (`btn-ghost`)
- **Use Case**: Tertiary actions (Cancel, Learn More)
- **Style**: Transparent with colored border
- **Psychology**: Available but non-intrusive

### Cards (`card`)
- **Foundation**: Semi-transparent backgrounds with subtle borders
- **Effect**: Glassmorphism with backdrop blur
- **Purpose**: Create depth and hierarchy while maintaining the mystical atmosphere
- **Shadow**: Soft purple glow to enhance the magical feeling

### Form Elements (`input`)
- **Design**: Consistent with card styling
- **Focus States**: Indigo glow on interaction
- **Accessibility**: Clear labels and sufficient contrast

---

## Animation & Motion

### Animation Principles
1. **Purposeful**: Every animation serves a functional purpose
2. **Smooth**: 60fps performance with hardware acceleration
3. **Contextual**: Motion that reflects the mystical theme

### Key Animations

#### Fade In (`animate-fade-in`)
- **Duration**: 0.5s ease-in-out
- **Use**: Page transitions, content reveals
- **Feel**: Gentle appearance, respectful of user attention

#### Slide Up (`animate-slide-up`)
- **Duration**: 0.5s ease-out  
- **Use**: Modal appearances, form submissions
- **Feel**: Content emerging from below, natural upward motion

#### Glow Effect (`animate-glow`)
- **Duration**: 2s infinite alternate
- **Use**: Highlighting important elements, mystical effects
- **Feel**: Pulsing energy, magical presence

#### Float Animation (`animate-float`)
- **Duration**: 3s ease-in-out infinite
- **Use**: Decorative elements, persona cards
- **Feel**: Weightless, ethereal presence

### Micro-interactions
- **Hover States**: Subtle scale and color transitions (200ms)
- **Click Feedback**: Brief scale down (100ms) for tactile feel
- **Loading States**: Smooth spinning indicators with appropriate messaging

---

## Layout System

### Container Strategy
```css
.container-page {
  max-width: 7xl (1280px);
  margin: 0 auto;
  padding: 2rem 1rem; /* Mobile first */
}

@media (sm) { padding: 2rem 1.5rem; }
@media (lg) { padding: 2rem 2rem; }
```

### Grid System
- **Mobile First**: Single column layouts that expand upward
- **Breakpoints**: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- **Cards**: Responsive grid that maintains aspect ratios

### Spacing Scale
Based on Tailwind's 4px base unit:
- **xs**: 0.25rem (4px) - Tight spacing
- **sm**: 0.5rem (8px) - Small gaps  
- **md**: 1rem (16px) - Standard spacing
- **lg**: 1.5rem (24px) - Section spacing
- **xl**: 2rem (32px) - Large separations

---

## Responsive Design

### Mobile-First Approach
All components are designed mobile-first and progressively enhanced:

1. **Mobile (320px+)**: Single column, large touch targets
2. **Tablet (768px+)**: Two-column layouts, refined spacing  
3. **Desktop (1024px+)**: Multi-column, hover states, larger typography
4. **Wide (1280px+)**: Maximum content width, enhanced animations

### Touch Considerations
- **Minimum Target Size**: 44px × 44px (iOS guideline)
- **Gesture Support**: Swipe navigation where appropriate
- **Safe Areas**: Respect device notches and rounded corners

---

## Accessibility Standards

### WCAG 2.1 AA Compliance
- **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Keyboard Navigation**: Full functionality via keyboard
- **Screen Readers**: Semantic HTML and ARIA labels
- **Motion**: Respect user's motion preferences

### Focus Management
- **Visible Focus Indicators**: Clear blue outline (--color-accent)
- **Focus Trapping**: Modals and overlays properly manage focus
- **Skip Links**: Allow navigation to main content

### Color Independence
- **Never Color Only**: Information conveyed through multiple means
- **Pattern Support**: Icons and shapes supplement color coding
- **High Contrast Mode**: Compatible with OS accessibility features

---

## Performance Guidelines

### Optimization Strategies
1. **Critical CSS**: Above-the-fold styles inlined
2. **Image Optimization**: WebP with fallbacks, responsive sizes
3. **Code Splitting**: Lazy load non-critical components
4. **Animation Performance**: Use `transform` and `opacity` only

### Loading States
- **Skeleton Screens**: For content-heavy pages
- **Spinner Components**: For short operations (< 2 seconds)
- **Progress Indicators**: For multi-step processes

### Bundle Size Targets
- **CSS Bundle**: < 50KB compressed
- **Initial JS**: < 200KB compressed  
- **Total Page Weight**: < 1MB on first load

---

## Design Tokens

All design values are stored as CSS custom properties and Tailwind config, enabling:
- **Consistent Application**: Same values across all components
- **Easy Updates**: Change once, apply everywhere
- **Theme Variants**: Potential for light/dark mode toggle
- **Developer Handoff**: Clear documentation of all values

This system ensures that Re:MirAI maintains its mystical, professional appearance while providing an intuitive and accessible user experience across all devices and interaction methods.
