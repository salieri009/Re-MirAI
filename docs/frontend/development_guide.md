# Re:MirAI Frontend Development Guide

## Getting Started

### Prerequisites
- **Node.js**: 18.0+ (LTS recommended)
- **npm**: 9.0+ or **pnpm**: 8.0+ (preferred)
- **Git**: Latest version
- **VS Code**: Recommended editor with Vue extensions

### Initial Setup
```bash
# Clone the repository
git clone <repository-url>
cd remirai-frontend

# Install dependencies
npm install
# or
pnpm install

# Copy environment configuration
cp .env.example .env.local

# Start development server
npm run dev
```

### Environment Configuration
```bash
# .env.local
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_USE_MOCK_DATA=true
VITE_GOOGLE_CLIENT_ID=your_development_client_id
```

---

## The Illusionist's Development Standards

> **Mission**: Implement pixel-perfect, accessible, and maintainable UI following Nielsen's Heuristics and 4-Point Grid System.

### Core Development Principles

#### 1. **4-Point Grid Compliance** (MANDATORY)
- All spacing MUST be divisible by 4px
- Always use design tokens, never hardcode spacing
- Verify alignment with browser dev tools

```vue
<!-- ✅ CORRECT: Using design tokens -->
<div style="padding: var(--card-padding); gap: var(--element-spacing);">

<!-- ❌ WRONG: Hardcoded spacing -->
<div class="p-5 gap-3">
```

#### 2. **Nielsen Heuristics Implementation** (MANDATORY)
- Every component must implement relevant heuristics
- Accessibility is not optional - WCAG 2.1 AA minimum
- Error states must include recovery actions

```vue
<!-- ✅ CORRECT: Nielsen-compliant loading state -->
<div 
  v-if="loading" 
  role="status" 
  aria-live="polite"
  aria-label="Loading persona data"
>
  <LoadingSkeleton type="persona" />
  <div class="sr-only">Loading your persona...</div>
</div>

<!-- ❌ WRONG: Generic spinner without context -->
<div v-if="loading">
  <LoadingSpinner />
</div>
```

#### 3. **Accessibility First** (MANDATORY)
- Every interactive element needs proper ARIA attributes
- Test with keyboard navigation
- Verify with screen reader

### Pre-Development Checklist

Before starting any feature:
- [ ] Review Nielsen Heuristics relevant to your feature
- [ ] Identify required ARIA attributes and roles
- [ ] Plan spacing using design token hierarchy
- [ ] Consider error states and recovery flows

---

## Enhanced Development Workflow

### Daily Development Process
1. **Pull Latest Changes**: `git pull origin main`
2. **Install New Dependencies**: `npm install` (if package.json changed)
3. **Start Development Server**: `npm run dev`
4. **Run Quality Checks**: 
   ```bash
   npm run type-check    # TypeScript validation
   npm run lint         # ESLint + accessibility rules
   npm run build        # Production build test
   ```
5. **Make Changes**: Follow The Illusionist's Standards above
6. **Accessibility Testing**: Manual keyboard + screen reader testing
7. **Test Changes**: Manual testing and component tests
8. **Commit Changes**: Use conventional commit format
9. **Push Changes**: `git push origin feature/branch-name`

### Branch Strategy
```
main (production-ready)
├── develop (integration branch)
├── feature/persona-chat-ui
├── feature/ritual-sharing
├── hotfix/auth-token-refresh
└── release/v1.2.0
```

### Commit Convention
```bash
# Format: type(scope): description

# Examples:
feat(persona): add chat message reactions
fix(auth): resolve token refresh loop  
style(ui): update button hover animations
docs(api): add endpoint documentation
test(persona): add unit tests for PersonaCard
```

---

## Code Standards & Best Practices

### Vue Component Structure
```vue
<!-- ComponentName.vue -->
<script setup lang="ts">
// 1. Imports (external libs first, then internal)
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { usePersonaStore } from '@/stores/persona'
import type { Persona } from '@/types'

// 2. Props with TypeScript and defaults
interface Props {
  persona: Persona
  interactive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  interactive: true
})

// 3. Emits with TypeScript
interface Emits {
  click: [persona: Persona]
  update: [data: Partial<Persona>]
}

const emit = defineEmits<Emits>()

// 4. Composables and stores
const personaStore = usePersonaStore()
const { isLoading } = storeToRefs(personaStore)

// 5. Reactive state
const isHovered = ref(false)
const lastInteraction = ref<Date | null>(null)

// 6. Computed properties
const displayName = computed(() => 
  props.persona.name || 'Unknown Persona'
)

const cardClasses = computed(() => [
  'persona-card',
  `rarity-${props.persona.rarity}`,
  {
    'persona-card--interactive': props.interactive,
    'persona-card--hovered': isHovered.value
  }
])

// 7. Methods
function handleClick() {
  lastInteraction.value = new Date()
  emit('click', props.persona)
}

// 8. Lifecycle hooks
onMounted(() => {
  console.log(`PersonaCard mounted for ${props.persona.name}`)
})
</script>

<template>
  <!-- Always use semantic HTML -->
  <article 
    :class="cardClasses"
    :aria-label="`${persona.name} persona card`"
    @click="handleClick"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Component template with clear hierarchy -->
    <header class="persona-card__header">
      <img 
        :src="persona.illustrationUrl" 
        :alt="`${persona.name} illustration`"
        class="persona-card__image"
        loading="lazy"
      />
    </header>
    
    <main class="persona-card__content">
      <h3 class="persona-card__name">{{ displayName }}</h3>
      <p class="persona-card__title">{{ persona.title }}</p>
    </main>
  </article>
</template>

<style scoped>
/* Use CSS modules or scoped styles */
.persona-card {
  /* CSS custom properties for theming */
  --card-bg: var(--color-bg-secondary);
  --card-border: var(--color-border);
  --card-hover-transform: translateY(-4px);
  
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 0.75rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.persona-card--interactive:hover {
  transform: var(--card-hover-transform);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* Responsive design with mobile-first approach */
.persona-card__content {
  padding: 1rem;
  
  @media (min-width: 768px) {
    padding: 1.5rem;
  }
}

/* BEM methodology for class naming */
.persona-card__name {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.persona-card__title {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}
</style>
```

### TypeScript Best Practices

#### Type Definitions
```typescript
// types/index.ts
export interface Persona {
  readonly id: string
  name: string
  archetype: PersonaArchetype
  rarity: PersonaRarity
  title: string
  illustrationUrl: string
  stats: PersonaStats
  bondLevel: number
  bondProgress: number
  status: PersonaStatus
}

export type PersonaArchetype = 'Yandere' | 'Tsundere' | 'Kuudere' | 'Dandere'
export type PersonaRarity = 'N' | 'R' | 'SR' | 'SSR' | 'UR'
export type PersonaStatus = 'summoning' | 'ready' | 'failed' | 'practice'

export interface PersonaStats {
  charisma: number
  intellect: number  
  kindness: number
  instability: number
  spirit: number
}

// Use readonly for immutable data
export interface ApiResponse<T> {
  readonly data: T
  readonly status: number
  readonly message?: string
}
```

#### Composable Functions
```typescript
// composables/usePersonaInteraction.ts
import { ref, computed, watch } from 'vue'
import { usePersonaStore } from '@/stores/persona'
import type { Persona } from '@/types'

export function usePersonaInteraction(persona: Ref<Persona>) {
  const personaStore = usePersonaStore()
  
  // Local state
  const isInteracting = ref(false)
  const lastMessage = ref('')
  
  // Computed values
  const canInteract = computed(() => 
    persona.value.status === 'ready' && !isInteracting.value
  )
  
  const bondPercentage = computed(() => 
    Math.round(persona.value.bondProgress * 100)
  )
  
  // Methods with proper error handling
  async function sendMessage(message: string): Promise<string | null> {
    if (!canInteract.value) return null
    
    try {
      isInteracting.value = true
      lastMessage.value = message
      
      const response = await personaStore.chatWithPersona(message)
      return response
      
    } catch (error) {
      console.error('Failed to send message:', error)
      throw error
      
    } finally {
      isInteracting.value = false
    }
  }
  
  // Watchers for reactive side effects
  watch(() => persona.value.bondLevel, (newLevel, oldLevel) => {
    if (newLevel > oldLevel) {
      // Celebrate bond level increase
      console.log(`Bond level increased to ${newLevel}!`)
    }
  })
  
  return {
    // State (readonly)
    isInteracting: readonly(isInteracting),
    lastMessage: readonly(lastMessage),
    
    // Computed
    canInteract,
    bondPercentage,
    
    // Methods
    sendMessage
  }
}
```

### Store Management with Pinia

#### Store Structure
```typescript
// stores/persona.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { personaService } from '@/services/api'
import type { Persona, ChatMessage } from '@/types'

export const usePersonaStore = defineStore('persona', () => {
  // State - use refs for reactive data
  const persona = ref<Persona | null>(null)
  const chatHistory = ref<ChatMessage[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  
  // Getters - use computed for derived state
  const hasPersona = computed(() => !!persona.value)
  const isPersonaReady = computed(() => 
    persona.value?.status === 'ready'
  )
  const bondLevel = computed(() => 
    persona.value?.bondLevel || 0
  )
  
  // Actions - async functions for API calls
  async function fetchPersona(): Promise<void> {
    try {
      isLoading.value = true
      error.value = null
      
      const data = await personaService.getPersona()
      persona.value = data
      
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch persona'
      console.error('Fetch persona error:', err)
      
    } finally {
      isLoading.value = false
    }
  }
  
  async function chatWithPersona(message: string): Promise<string> {
    if (!isPersonaReady.value) {
      throw new Error('Persona is not ready for chat')
    }
    
    try {
      // Add user message to history immediately
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'user',
        message,
        timestamp: new Date()
      }
      chatHistory.value.push(userMessage)
      
      // Get AI response
      const response = await personaService.chatWithPersona(message)
      
      // Add AI response to history
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai', 
        message: response,
        timestamp: new Date()
      }
      chatHistory.value.push(aiMessage)
      
      return response
      
    } catch (err) {
      // Remove user message if request failed
      chatHistory.value.pop()
      throw err
    }
  }
  
  // Mutations - direct state updates
  function clearError(): void {
    error.value = null
  }
  
  function resetPersona(): void {
    persona.value = null
    chatHistory.value = []
    error.value = null
  }
  
  return {
    // State (readonly for external access)
    persona: readonly(persona),
    chatHistory: readonly(chatHistory),
    isLoading: readonly(isLoading),
    error: readonly(error),
    
    // Getters
    hasPersona,
    isPersonaReady,
    bondLevel,
    
    // Actions
    fetchPersona,
    chatWithPersona,
    clearError,
    resetPersona
  }
})
```

---

## Styling Guidelines

### CSS Architecture
```scss
// Use CSS custom properties for theming
:root {
  /* Color system */
  --color-primary: #6366f1;
  --color-secondary: #8b5cf6;
  
  /* Spacing scale */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  
  /* Typography scale */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
}

/* Component-specific custom properties */
.persona-card {
  --card-padding: var(--space-lg);
  --card-radius: 0.75rem;
  --card-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-primary: #0a0e27;
    --color-text-primary: #ffffff;
  }
}
```

### Responsive Design Patterns
```scss
// Mobile-first responsive design
.component {
  /* Mobile styles (default) */
  padding: var(--space-md);
  
  /* Tablet and up */
  @media (min-width: 768px) {
    padding: var(--space-lg);
  }
  
  /* Desktop and up */
  @media (min-width: 1024px) {
    padding: var(--space-xl);
  }
}

/* Container query support (future) */
.persona-card {
  container-type: inline-size;
  
  @container (min-width: 300px) {
    .persona-card__title {
      font-size: var(--text-lg);
    }
  }
}
```

### Animation Guidelines
```scss
/* Consistent timing functions */
:root {
  --ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
  --ease-in-out-quart: cubic-bezier(0.77, 0, 0.175, 1);
}

/* Performance-optimized animations */
.animate-slide-up {
  transform: translateY(20px);
  opacity: 0;
  animation: slideUp 0.3s var(--ease-out-quad) forwards;
}

@keyframes slideUp {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  .animate-slide-up {
    animation: none;
    transform: none;
    opacity: 1;
  }
}
```

---

## Testing Strategy

### Component Testing
```typescript
// Button.spec.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Button from '@/components/common/Button.vue'

describe('Button', () => {
  it('renders with correct variant class', () => {
    const wrapper = mount(Button, {
      props: { variant: 'primary' }
    })
    
    expect(wrapper.classes()).toContain('btn-primary')
  })
  
  it('emits click event when clicked', async () => {
    const wrapper = mount(Button)
    
    await wrapper.trigger('click')
    
    expect(wrapper.emitted('click')).toHaveLength(1)
  })
  
  it('shows loading state correctly', () => {
    const wrapper = mount(Button, {
      props: { loading: true }
    })
    
    expect(wrapper.find('[data-testid="loading-spinner"]')).toBeTruthy()
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
  
  it('handles keyboard navigation', async () => {
    const wrapper = mount(Button)
    
    await wrapper.trigger('keydown.enter')
    
    expect(wrapper.emitted('click')).toHaveLength(1)
  })
})
```

### Store Testing
```typescript
// persona.store.spec.ts
import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { usePersonaStore } from '@/stores/persona'
import { personaService } from '@/services/api'

// Mock the API service
vi.mock('@/services/api', () => ({
  personaService: {
    getPersona: vi.fn(),
    chatWithPersona: vi.fn()
  }
}))

describe('Persona Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  
  it('fetches persona successfully', async () => {
    const mockPersona = { 
      id: '1', 
      name: 'Test Persona',
      status: 'ready'
    }
    
    vi.mocked(personaService.getPersona).mockResolvedValue(mockPersona)
    
    const store = usePersonaStore()
    await store.fetchPersona()
    
    expect(store.persona).toEqual(mockPersona)
    expect(store.isLoading).toBe(false)
  })
  
  it('handles fetch error gracefully', async () => {
    const errorMessage = 'Network error'
    vi.mocked(personaService.getPersona).mockRejectedValue(new Error(errorMessage))
    
    const store = usePersonaStore()
    await store.fetchPersona()
    
    expect(store.error).toBe(errorMessage)
    expect(store.persona).toBeNull()
  })
})
```

### E2E Testing Setup
```typescript
// e2e/persona-flow.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Persona Creation Flow', () => {
  test('complete persona creation journey', async ({ page }) => {
    // Navigate to app
    await page.goto('/')
    
    // Click "Begin the Ritual"
    await page.click('[data-testid="begin-ritual-btn"]')
    
    // Mock Google OAuth
    await page.route('**/auth/google-login', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          token: 'mock-token',
          user: { id: '1', displayName: 'Test User' }
        })
      })
    })
    
    // Complete authentication
    await page.click('[data-testid="google-login-btn"]')
    
    // Verify dashboard loaded
    await expect(page.locator('h1')).toContainText('Welcome back')
    
    // Create ritual
    await page.click('[data-testid="create-ritual-btn"]')
    
    // Verify ritual created
    await expect(page.locator('[data-testid="ritual-link"]')).toBeVisible()
  })
})
```

---

## Performance Optimization

### Bundle Analysis
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist

# Performance budgets in package.json
{
  "bundlesize": [
    {
      "path": "./dist/assets/*.js",
      "maxSize": "250kb"
    },
    {
      "path": "./dist/assets/*.css", 
      "maxSize": "50kb"
    }
  ]
}
```

### Code Splitting Strategy
```typescript
// router/index.ts - Route-based splitting
const routes = [
  {
    path: '/persona/:id',
    component: () => import('@/views/persona/PersonaDetail.vue')
  },
  {
    path: '/ritual',
    component: () => import('@/views/ritual/RitualHub.vue')
  }
]

// Dynamic imports for large components
const PersonaCard = defineAsyncComponent(() =>
  import('@/components/persona/PersonaCard.vue')
)

// Preload critical routes
router.beforeEach((to, from, next) => {
  if (to.name === 'dashboard') {
    import('@/views/DashboardView.vue')
  }
  next()
})
```

### Image Optimization
```vue
<template>
  <!-- Responsive images with lazy loading -->
  <picture>
    <source 
      :srcset="`${persona.illustrationUrl}?w=400&format=webp 400w,
                ${persona.illustrationUrl}?w=800&format=webp 800w`"
      type="image/webp"
    />
    <img 
      :src="`${persona.illustrationUrl}?w=400`"
      :alt="persona.name"
      loading="lazy"
      class="persona-illustration"
    />
  </picture>
</template>
```

---

## Debugging & Development Tools

### Vue DevTools Setup
```typescript
// main.ts
if (import.meta.env.DEV) {
  // Enable Vue DevTools in development
  app.config.performance = true
}
```

### Console Debugging
```typescript
// Debug utilities
export const debug = {
  log: (message: string, data?: any) => {
    if (import.meta.env.DEV) {
      console.log(`[Debug] ${message}`, data)
    }
  },
  
  store: (storeName: string, state: any) => {
    if (import.meta.env.DEV) {
      console.group(`[Store] ${storeName}`)
      console.log('State:', state)
      console.groupEnd()
    }
  }
}

// Usage in components
debug.log('Persona loaded', persona.value)
debug.store('Auth', authStore.$state)
```

### Network Debugging
```typescript
// API debugging interceptor
api.interceptors.request.use(request => {
  if (import.meta.env.DEV) {
    console.log(`[API] ${request.method?.toUpperCase()} ${request.url}`)
  }
  return request
})

api.interceptors.response.use(
  response => {
    if (import.meta.env.DEV) {
      console.log(`[API] Response:`, response.data)
    }
    return response
  },
  error => {
    if (import.meta.env.DEV) {
      console.error(`[API] Error:`, error)
    }
    return Promise.reject(error)
  }
)
```

This comprehensive development guide ensures consistent, maintainable, and performant code across the Re:MirAI frontend application.
