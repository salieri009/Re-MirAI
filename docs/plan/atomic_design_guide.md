# Atomic Design Pattern Implementation

## Overview

Re:MirAI frontend now follows **Atomic Design Pattern**, a methodology for creating scalable and maintainable design systems. This approach breaks UI components into five distinct levels:

## Directory Structure

```
frontend/src/components/
├── atoms/           # Basic building blocks
├── molecules/       # Simple combinations
├── organisms/       # Complex components
├── templates/       # Page layouts
└── pages/          # Full pages (in views/)
```

## The Five Levels of Atomic Design

### 1. **ATOMS** (`src/components/atoms/`)

The most basic UI elements that cannot be broken down further without losing their meaning.

**Current Atoms:**
- `Button.vue` - Interactive button with variants (primary, secondary, ghost, light) and sizes (sm, md, lg)
- `Logo.vue` - Re:MirAI branding element with responsive sizing
- `LoadingSpinner.vue` - Animated loading indicator
- `LoadingSkeleton.vue` - Placeholder skeleton loaders for different contexts

**Key Characteristics:**
- ✅ Single responsibility
- ✅ Highly reusable
- ✅ No dependencies on other components (except other atoms)
- ✅ Presentational/dumb components
- ✅ Receive all data via props

**Usage Example:**
```vue
<script setup>
import { Button, Logo, LoadingSpinner } from '@/components/atoms'
</script>

<template>
  <Logo size="lg" clickable @click="goHome" />
  <Button variant="primary" size="lg" @click="handleClick">
    Click Me
  </Button>
  <LoadingSpinner v-if="loading" size="md" text="Loading..." />
</template>
```

---

### 2. **MOLECULES** (`src/components/molecules/`)

Groups of atoms bonded together to form small, functional units.

**Current Molecules:**
- `ShareButton.vue` - Composite button group for sharing (Twitter, WhatsApp, Instagram, copy link)

**Key Characteristics:**
- ✅ Composed of 2+ atoms
- ✅ Reusable functional units
- ✅ Simple logic (toggle, visibility, basic interactions)
- ✅ Still mostly presentational
- ✅ Do not own their own state (state from parent)

**Future Molecules:**
- `FormField` - Label + Input + Error message
- `Card` - Container with header, body, footer
- `Header` - Logo + Navigation + Auth button
- `SearchInput` - Input field + search icon + suggestions

**Usage Example:**
```vue
<script setup>
import { ShareButton } from '@/components/molecules'
</script>

<template>
  <ShareButton 
    url="https://remirAI.com/persona/abc123"
    title="Check out my Persona!"
  />
</template>
```

---

### 3. **ORGANISMS** (`src/components/organisms/`)

More complex UI sections composed of molecules and/or atoms. They perform specific functions or display significant parts of a UI.

**Current Organisms:**
- `DynamicPersonaCard.vue` - Complex persona display with 3-state animation (skeleton → keywords → complete)

**Key Characteristics:**
- ✅ Composed of molecules and atoms
- ✅ Complex, feature-rich functionality
- ✅ Handle business logic and data transformation
- ✅ Often connected to Pinia stores
- ✅ Require sophisticated prop/event interfaces
- ✅ May fetch or manipulate data

**Future Organisms:**
- `SurveyForm` - Multi-question form with validation
- `PersonaStats` - Stats display with charts
- `Navigation` - Full navigation system with dropdowns
- `PickCardQuestion` - Gamified question card selector
- `ResultTeaser` - Persona preview with CTA

**Usage Example:**
```vue
<script setup>
import { DynamicPersonaCard } from '@/components/organisms'
</script>

<template>
  <DynamicPersonaCard />
</template>
```

---

### 4. **TEMPLATES** (`src/components/templates/`)

Page-level components that provide layout structure and wireframes. They contain the structural arrangement of organisms, molecules, and atoms, but no actual content.

**Key Characteristics:**
- ✅ Define page layout structure
- ✅ Use named slots for content regions
- ✅ Contain multiple sections/organisms
- ✅ No business logic
- ✅ Reusable across multiple pages

**Future Templates:**
- `LandingTemplate` - Hero section + features + CTA sections
- `DashboardTemplate` - Sidebar + main content area + header
- `AuthTemplate` - Centered form layout for login/signup
- `RitualTemplate` - Multi-step ritual process layout

**Usage Example:**
```vue
<!-- LandingTemplate.vue -->
<template>
  <div>
    <slot name="header" />
    <slot name="hero" />
    <slot name="features" />
    <slot name="cta" />
    <slot name="footer" />
  </div>
</template>

<!-- LandingView.vue (inherits from template) -->
<LandingTemplate>
  <template #header>
    <Header />
  </template>
  <template #hero>
    <HeroSection />
  </template>
  <!-- ... etc ... -->
</LandingTemplate>
```

---

### 5. **PAGES** (`src/views/`)

Full page components that inherit from templates and provide actual content.

**Current Pages:**
- `LandingView.vue` - Landing page implementing V3 Persuasion Architecture
- `DashboardView.vue` - User dashboard
- `auth/` - Authentication pages
- `ritual/` - Ritual/survey pages
- `chat/` - Chat interface pages
- `social/` - Social sharing pages
- `summon/` - Summoning/creation pages
- `survey/` - Survey pages
- `room/` - Persona chat room pages

---

## Import Pattern: Barrel Exports

Each atomic level has an `index.ts` file that exports all components, making imports cleaner:

```typescript
// ❌ Before: Deep path imports
import Button from '@/components/common/Button.vue'
import DynamicPersonaCard from '@/components/DynamicPersonaCard.vue'

// ✅ After: Clean barrel imports
import { Button, Logo } from '@/components/atoms'
import { ShareButton } from '@/components/molecules'
import { DynamicPersonaCard } from '@/components/organisms'
```

---

## Migration Checklist

- [x] Create atomic directory structure
- [x] Move atoms (Button, Logo, LoadingSpinner, LoadingSkeleton)
- [x] Create molecules directory and ShareButton
- [x] Move DynamicPersonaCard to organisms
- [x] Create index.ts barrel files for each level
- [x] Update LandingView imports to use new structure
- [x] Remove old component locations
- [ ] Update remaining views to use new imports
- [ ] Create templates for common page layouts
- [ ] Add additional molecules (FormField, Card, Header, etc.)
- [ ] Add additional organisms (SurveyForm, PersonaStats, Navigation, etc.)
- [ ] Write component unit tests
- [ ] Update component documentation in Storybook

---

## Best Practices

### When Creating New Components

1. **Determine the Level:**
   - Is it a basic UI element? → **ATOM**
   - Is it a combination of atoms? → **MOLECULE**
   - Is it complex with business logic? → **ORGANISM**
   - Is it a page layout? → **TEMPLATE**
   - Is it a full page? → **PAGE**

2. **Follow Single Responsibility:** Each component should have one clear purpose.

3. **Use Proper Props Validation:**
   ```typescript
   interface Props {
     size?: 'sm' | 'md' | 'lg'
     variant?: 'primary' | 'secondary'
     disabled?: boolean
   }
   
   withDefaults(defineProps<Props>(), {
     size: 'md',
     variant: 'primary',
     disabled: false,
   })
   ```

4. **Emit Events Explicitly:**
   ```typescript
   defineEmits<{
     click: [event: MouseEvent]
     change: [value: string]
   }>()
   ```

5. **Use Accessibility Attributes:**
   ```html
   <button
     :aria-label="label"
     :aria-disabled="disabled"
     :aria-busy="loading"
   >
   ```

6. **Avoid Crossing Levels:** Atoms should not depend on molecules, molecules should not depend on organisms, etc.

---

## File Organization Example

```typescript
// ✅ Good: Respects atomic hierarchy
// atoms/Button.vue imports nothing from other components
// molecules/ShareButton.vue imports from atoms/
// organisms/SurveyForm.vue imports from atoms/ and molecules/
// views/LandingView.vue imports from all levels

// ❌ Bad: Crosses hierarchy
// atoms/Button.vue imports from molecules/
// This creates circular dependencies and breaks the hierarchy
```

---

## Performance Benefits

1. **Tree Shaking:** Import only what you use
2. **Code Splitting:** Easier to identify code that can be lazy-loaded
3. **Testing:** Each level is independently testable
4. **Maintainability:** Clear component responsibilities
5. **Scalability:** Easy to add new features without breaking existing code
6. **Documentation:** Self-documenting component hierarchy

---

## Next Steps

1. **Create FormField Molecule** for the survey form
2. **Create Card Molecule** for generic content containers
3. **Create Navigation Organism** for site navigation
4. **Create SurveyForm Organism** for ritual surveys
5. **Create Templates** for common page layouts
6. **Migrate remaining imports** in all view files
7. **Add Component Tests** using Vitest
8. **Set up Storybook** for component documentation and visual testing

---

## References

- [Atomic Design by Brad Frost](https://bradfrost.com/blog/post/atomic-web-design/)
- [Vue 3 Components Best Practices](https://vuejs.org/guide/best-practices/component-design.html)
- [Component Organization Patterns](https://martinfowler.com/articles/micro-frontends.html)
