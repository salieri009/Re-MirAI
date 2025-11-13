import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types'
import { loginWithGoogle } from '@/api/endpoints/auth'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!(token.value && user.value))

  // Actions
  async function login(googleToken: string): Promise<void> {
    try {
      // Real API call (will use mock in Phase 1)
      const response = await loginWithGoogle(googleToken)
      
      // Store token and user
      token.value = response.jwt
      user.value = response.user
      
      // Persist to localStorage
      localStorage.setItem('auth_token', response.jwt)
      localStorage.setItem('user', JSON.stringify(response.user))
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  function logout(): void {
    // Clear state
    user.value = null
    token.value = null
    
    // Clear localStorage
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
    
    // Redirect to auth page
    window.location.href = '/auth'
  }

  async function initialize(): Promise<void> {
    // Check for existing token in localStorage
    const storedToken = localStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      try {
        token.value = storedToken
        user.value = JSON.parse(storedUser)
      } catch (error) {
        console.error('Failed to restore session:', error)
        logout()
      }
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    initialize,
  }
})

