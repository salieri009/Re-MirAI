<template>
  <div class="min-h-screen bg-primary flex items-center justify-center">
    <div class="card max-w-md w-full mx-4 animate-slide-up">
      <div class="text-center space-y-6">
        <!-- Logo (KickoffLabs Compliance: Center-top placement, appropriate size) -->
        <div class="flex justify-center" style="margin-bottom: var(--card-spacing);">
          <Logo size="lg" aria-context="Login Logo" />
        </div>
        <h1 class="text-3xl font-bold text-gradient">Welcome to Re:MirAI</h1>
        <p class="text-secondary">
          Sign in to create your AI persona
        </p>

        <div class="space-y-4 mt-8">
          <Button
            :loading="isLoading"
            size="lg"
            class="w-full"
            @click="handleGoogleLogin"
          >
            <svg class="w-5 h-5 mr-2 inline" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>

          <p class="text-xs text-muted text-center">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>

        <!-- KickoffLabs Compliance: Replaced red with purple (error states use purple) -->
        <div v-if="error" class="mt-4 p-4 bg-purple-900 bg-opacity-20 border border-purple-500 rounded-lg">
          <p class="text-purple-400 text-sm">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Button from '@/components/common/Button.vue'
import Logo from '@/components/common/Logo.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const isLoading = ref(false)
const error = ref<string | null>(null)

const handleGoogleLogin = async () => {
  isLoading.value = true
  error.value = null

  try {
    // TODO: Replace with actual Google OAuth
    // For demo, we'll use a mock token
    await authStore.loginWithGoogle()

    const redirect = (route.query.redirect as string) || '/dashboard'
    router.push(redirect)
  } catch (err) {
    error.value = 'Failed to sign in. Please try again.'
    console.error('Login error:', err)
  } finally {
    isLoading.value = false
  }
}
</script>