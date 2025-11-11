# Re:MirAI Frontend Technical Implementation Guide

## Technology Stack Overview

### Core Framework
- **Vue 3.4+** with Composition API for reactive state management
- **TypeScript 5.0+** for type safety and developer experience  
- **Vite 5.0+** for fast development and optimized builds
- **Vue Router 4** for single-page application navigation

### Styling & Design
- **Tailwind CSS 3.3+** for utility-first styling
- **PostCSS** for CSS processing and optimization
- **CSS Custom Properties** for dynamic theming
- **GSAP** (planned) for advanced animations

### State Management & API
- **Pinia** for centralized state management
- **Axios** for HTTP client with interceptors
- **Mock Data System** for development and testing

---

## Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Stylesheets and static resources
│   │   ├── main.css       # Global styles and CSS variables
│   │   ├── base.css       # CSS reset and base styles
│   │   └── logo.svg       # Brand assets
│   ├── components/        # Reusable Vue components
│   │   ├── common/        # Shared components (Button, Card, etc.)
│   │   └── icons/         # SVG icon components
│   ├── views/             # Page-level components
│   │   ├── auth/          # Authentication pages
│   │   ├── ritual/        # Survey creation and management
│   │   ├── summon/        # Persona summoning experience
│   │   ├── room/          # Persona interaction hub
│   │   ├── chat/          # Conversation interface
│   │   ├── social/        # Public profiles and sharing
│   │   └── survey/        # Survey participation
│   ├── stores/            # Pinia state stores
│   │   ├── auth.ts        # Authentication state
│   │   ├── persona.ts     # Persona data and interactions
│   │   ├── ritual.ts      # Survey creation state
│   │   └── quest.ts       # Achievement system
│   ├── services/          # API integration layer
│   │   └── api.ts         # HTTP client and service methods
│   ├── mocks/             # Development data
│   │   └── data.ts        # Mock API responses
│   ├── router/            # Navigation configuration
│   │   └── index.ts       # Route definitions and guards
│   ├── types/             # TypeScript definitions
│   ├── utils/             # Helper functions
│   └── main.ts            # Application entry point
├── .env.example           # Environment variable template
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.ts         # Vite build configuration
└── package.json           # Dependencies and scripts
```

---

## Environment Configuration

### Development Environment Variables
```bash
# .env.local
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_USE_MOCK_DATA=true
VITE_GOOGLE_CLIENT_ID=your_development_client_id
VITE_APP_NAME=Re:MirAI
VITE_APP_VERSION=1.0.0
```

### Production Environment Variables
```bash
# .env.production
VITE_API_BASE_URL=https://api.remirai.app/api/v1
VITE_USE_MOCK_DATA=false
VITE_GOOGLE_CLIENT_ID=your_production_client_id
VITE_APP_NAME=Re:MirAI
VITE_APP_VERSION=1.0.0
```

### Environment Type Safety
```typescript
// env.d.ts
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_USE_MOCK_DATA: string
  readonly VITE_GOOGLE_CLIENT_ID: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

---

## State Management Architecture

### Pinia Store Pattern
```typescript
// stores/auth.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '@/services/api'
import type { User } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const displayName = computed(() => user.value?.displayName || 'User')

  // Actions
  async function login(googleToken: string) {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await authService.googleLogin(googleToken)
      
      user.value = response.user
      token.value = response.token
      
      // Persist token
      localStorage.setItem('authToken', response.token)
      
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Login failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('authToken')
  }

  return {
    // State
    user: readonly(user),
    token: readonly(token), 
    isLoading: readonly(isLoading),
    error: readonly(error),
    
    // Getters
    isAuthenticated,
    displayName,
    
    // Actions
    login,
    logout
  }
})
```

### Store Composition Pattern
```typescript
// composables/useAuth.ts
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

export function useAuth() {
  const authStore = useAuthStore()
  
  // Reactive refs
  const { user, isAuthenticated, isLoading, error } = storeToRefs(authStore)
  
  // Actions
  const { login, logout } = authStore
  
  return {
    // State
    user,
    isAuthenticated, 
    isLoading,
    error,
    
    // Actions
    login,
    logout
  }
}
```

---

## API Integration Strategy

### HTTP Client Configuration
```typescript
// services/api.ts
import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle token expiration
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

### Mock Data System
```typescript
// services/api.ts (continued)
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA !== 'false'

export const authService = {
  async googleLogin(token: string): Promise<{ token: string; user: User }> {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockUser = {
        id: 'mock-user-id',
        displayName: 'Test User',
        email: 'test@example.com',
        profileImageUrl: 'https://via.placeholder.com/100',
        memoryCrystals: 150
      }
      
      const mockToken = 'mock-jwt-token-' + Date.now()
      localStorage.setItem('authToken', mockToken)
      
      return { user: mockUser, token: mockToken }
    }

    const response = await api.post('/auth/google-login', { token })
    localStorage.setItem('authToken', response.data.token)
    return response.data
  }
}
```

### Service Layer Pattern
```typescript
// services/api.ts (continued)
export const personaService = {
  async summonPersona(mode: string, archetypeFilter?: string): Promise<void> {
    const payload = { mode, ...(archetypeFilter && { archetypeFilter }) }
    
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 2000))
      return
    }
    
    await api.post('/personas/summon', payload)
  },

  async getPersona(): Promise<Persona | null> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500))
      return mockPersona
    }
    
    const response = await api.get('/personas/me')
    return response.data.status === 'ready' ? response.data : null
  },

  async chatWithPersona(message: string): Promise<string> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 800))
      return generateMockResponse(message)
    }
    
    const response = await api.post('/personas/me/chat', { message })
    return response.data.reply
  }
}
```

---

## Routing & Navigation

### Route Configuration
```typescript
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: () => import('@/views/LandingView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'login', 
    component: () => import('@/views/auth/LoginView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/ritual',
    name: 'ritual',
    component: () => import('@/views/ritual/RitualHubView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/summon',
    name: 'summon',
    component: () => import('@/views/summon/SummoningView.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})
```

### Route Transitions
```vue
<!-- App.vue -->
<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
```

---

## Component Development Patterns

### Composition API Best Practices
```vue
<!-- components/common/PersonaCard.vue -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Persona } from '@/types'

// Props with TypeScript
interface Props {
  persona: Persona
  interactive?: boolean
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  interactive: true,
  compact: false
})

// Emits with TypeScript
interface Emits {
  click: [persona: Persona]
  share: [persona: Persona]
}

const emit = defineEmits<Emits>()

// Computed properties
const rarityClass = computed(() => `rarity-${props.persona.rarity.toLowerCase()}`)
const cardClass = computed(() => [
  'persona-card',
  rarityClass.value,
  {
    'persona-card--interactive': props.interactive,
    'persona-card--compact': props.compact
  }
])

// Local state
const isHovered = ref(false)

// Event handlers
function handleClick() {
  if (props.interactive) {
    emit('click', props.persona)
  }
}

function handleShare() {
  emit('share', props.persona)
}
</script>

<template>
  <div 
    :class="cardClass"
    @click="handleClick"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Component template -->
  </div>
</template>
```

### Composable Functions
```typescript
// composables/usePersonaStats.ts
import { computed } from 'vue'
import type { PersonaStats } from '@/types'

export function usePersonaStats(stats: PersonaStats) {
  const statEntries = computed(() => 
    Object.entries(stats).map(([key, value]) => ({
      name: key,
      value,
      percentage: (value / 100) * 100,
      color: getStatColor(key)
    }))
  )

  const dominantStat = computed(() => 
    statEntries.value.reduce((prev, current) => 
      (prev.value > current.value) ? prev : current
    )
  )

  const statAverage = computed(() => {
    const values = Object.values(stats)
    return values.reduce((sum, val) => sum + val, 0) / values.length
  })

  function getStatColor(statName: string): string {
    const colorMap = {
      charisma: 'var(--color-stat-charisma)',
      intellect: 'var(--color-stat-intellect)', 
      kindness: 'var(--color-stat-kindness)',
      instability: 'var(--color-stat-instability)',
      spirit: 'var(--color-stat-spirit)'
    }
    return colorMap[statName.toLowerCase()] || '#6b7280'
  }

  return {
    statEntries,
    dominantStat,
    statAverage,
    getStatColor
  }
}
```

---

## Build & Deployment Configuration

### Vite Configuration
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: true,
    
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          ui: ['@headlessui/vue', 'heroicons']
        }
      }
    }
  },
  
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
```

### Build Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build", 
    "preview": "vite preview",
    "type-check": "vue-tsc --noEmit",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix",
    "format": "prettier --write src/"
  }
}
```

### Production Optimization
```typescript
// Build optimizations
export default defineConfig({
  build: {
    // Tree shaking
    rollupOptions: {
      external: ['vue', 'vue-router', 'pinia'],
      output: {
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          pinia: 'Pinia'
        }
      }
    },
    
    // Asset optimization
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    
    // Chunk size warnings
    chunkSizeWarningLimit: 1000
  }
})
```

---

## Testing Strategy

### Component Testing Setup
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    globals: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
```

### Test Utilities
```typescript
// src/test-setup.ts
import { config } from '@vue/test-utils'
import { createPinia } from 'pinia'

// Global test configuration
config.global.plugins = [createPinia()]

// Mock implementation
global.localStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn()
}
```

### Component Test Example
```typescript
// components/__tests__/Button.spec.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Button from '@/components/common/Button.vue'

describe('Button Component', () => {
  it('renders correctly', () => {
    const wrapper = mount(Button, {
      props: { variant: 'primary' },
      slots: { default: 'Click me' }
    })
    
    expect(wrapper.text()).toBe('Click me')
    expect(wrapper.classes()).toContain('btn-primary')
  })

  it('emits click event', async () => {
    const wrapper = mount(Button)
    
    await wrapper.trigger('click')
    
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('shows loading state', () => {
    const wrapper = mount(Button, {
      props: { loading: true }
    })
    
    expect(wrapper.find('.loading-spinner')).toBeTruthy()
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})
```

---

This technical implementation guide provides the foundation for building, maintaining, and scaling the Re:MirAI frontend application with modern Vue.js best practices and performance optimizations.
