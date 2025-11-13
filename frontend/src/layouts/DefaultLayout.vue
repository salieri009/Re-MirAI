<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-surface-card border-b border-surface-border">
      <div class="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
        <router-link to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg" />
          <span class="text-h5 font-bold text-primary-600">Persona AI</span>
        </router-link>
        
        <div v-if="authStore.isAuthenticated" class="flex items-center gap-4">
          <span class="text-body-sm text-text-secondary">
            {{ authStore.user?.displayName }}
          </span>
          <BaseButton variant="secondary" size="sm" @click="handleLogout">
            로그아웃
          </BaseButton>
        </div>
      </div>
    </header>
    
    <!-- Main Content -->
    <main class="flex-1 max-w-screen-xl w-full mx-auto px-4 py-8">
      <slot />
    </main>
    
    <!-- Footer -->
    <footer class="bg-surface-card border-t border-surface-border py-6">
      <div class="max-w-screen-xl mx-auto px-4 text-center text-body-sm text-text-secondary">
        <p>&copy; 2025 Persona AI. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import BaseButton from '@/components/base/BaseButton.vue'

const authStore = useAuthStore()

function handleLogout(): void {
  authStore.logout()
}
</script>

