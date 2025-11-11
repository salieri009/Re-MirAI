import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('@/views/LandingView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/ritual',
      name: 'ritual',
      component: () => import('@/views/ritual/RitualHubView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/summon',
      name: 'summon',
      component: () => import('@/views/summon/SummoningView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/room/:personaId?',
      name: 'persona-room',
      component: () => import('@/views/room/PersonaRoomView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/chat/:personaId?',
      name: 'chat',
      component: () => import('@/views/chat/ChatView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/survey/:ritualId',
      name: 'survey',
      component: () => import('@/views/survey/SurveyView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/ritual/:ritualId/result',
      name: 'ritual-result',
      component: () => import('@/views/ritual/RitualResultView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/profile/:userId',
      name: 'public-profile',
      component: () => import('@/views/social/PublicProfileView.vue'),
      meta: { requiresAuth: false },
    },
  ],
})

// Navigation guard
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
