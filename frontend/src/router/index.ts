import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'welcome',
    component: () => import('@/views/WelcomePage.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/auth/AuthPage.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/analysis',
    name: 'analysis-hub',
    component: () => import('@/views/analysis/AnalysisHub.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/survey/:analysisId',
    name: 'survey',
    component: () => import('@/views/survey/SurveyPage.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/persona/reveal',
    name: 'persona-reveal',
    component: () => import('@/views/reveal/PersonaReveal.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/persona/chat',
    name: 'persona-chat',
    component: () => import('@/views/persona/PersonaChat.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundPage.vue'),
    meta: { requiresAuth: false },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Navigation Guard
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.meta.requiresAuth as boolean

  // Check if route requires authentication
  if (requiresAuth && !authStore.isAuthenticated) {
    // Store intended destination
    const intendedPath = to.fullPath
    localStorage.setItem('intended_path', intendedPath)
    
    // Redirect to auth
    next('/auth')
  } else if (to.path === '/auth' && authStore.isAuthenticated) {
    // If already authenticated and trying to access auth page, redirect to analysis
    next('/analysis')
  } else {
    // Allow navigation
    next()
  }
})

export default router

