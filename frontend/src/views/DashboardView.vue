<template>
  <div class="min-h-screen bg-akashic" style="padding: var(--container-padding);">
    <!-- Loading State with Skeleton UI (Nielsen: System Status Visibility) -->
    <div v-if="isLoading" class="space-y-8" role="status" aria-live="polite" aria-label="Loading dashboard">
      <LoadingSkeleton type="header" />
      <LoadingSkeleton type="persona" />
      <LoadingSkeleton type="progress" />
      <div class="sr-only">Loading your dashboard...</div>
    </div>

    <!-- Error State (Nielsen: Error Recovery) -->
    <div v-else-if="error" class="card border-red-500/50 bg-red-500/10" role="alert" aria-live="assertive">
      <div class="flex items-center" style="gap: var(--element-spacing);">
        <div class="flex-shrink-0 text-red-400 text-xl" role="img" aria-label="Error">⚠️</div>
        <div class="flex-1">
          <h3 class="font-semibold text-red-300 mb-1">Something went wrong</h3>
          <p class="text-red-400 text-sm">{{ error }}</p>
          <button 
            @click="handleRetry" 
            class="mt-3 text-sm text-red-300 hover:text-red-200 underline focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Try again
          </button>
        </div>
      </div>
    </div>

    <!-- Main Dashboard Content (4-Point Grid Applied) -->
    <div v-else style="display: flex; flex-direction: column; gap: var(--section-spacing);">
      <!-- User Header Section (Nielsen: User Control & Freedom) -->
      <header 
        class="card bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/20" 
        style="padding: var(--card-padding);"
        role="banner"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center" style="gap: var(--element-spacing);">
            <div 
              class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg" 
              role="img" 
              :aria-label="`Avatar for ${user?.displayName}`"
            >
              {{ userInitials }}
            </div>
            <div>
              <h1 class="text-xl font-semibold text-white" style="margin-bottom: var(--micro-spacing);">
                Welcome back, {{ user?.displayName }}
              </h1>
              <div class="flex items-center" style="gap: var(--text-spacing);">
                <span class="text-sm text-secondary">Energy Points:</span>
                <div class="flex items-center" style="gap: var(--micro-spacing);">
                  <span class="text-yellow-400" role="img" aria-label="Energy">⚡</span>
                  <span class="font-medium text-yellow-400" aria-label="Current energy points">
                    {{ user?.memoryCrystals || 0 }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Logout Button (Nielsen: User Control) -->
          <Button 
            variant="ghost" 
            size="sm" 
            @click="handleLogout" 
            class="text-muted hover:text-white"
            aria-label="Sign out of your account"
          >
            <svg 
              class="w-4 h-4" 
              style="margin-right: var(--tight-spacing);" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            Logout
          </Button>
        </div>
      </header>

      <!-- Persona Section (Nielsen: Aesthetic & Minimalist Design) -->
      <section 
        class="grid lg:grid-cols-2" 
        style="gap: var(--card-spacing);"
        role="main"
        aria-label="Persona management section"
      >
        <!-- Persona Status Card -->
        <div 
          class="card hover:shadow-xl transition-shadow duration-300" 
          style="padding: var(--card-padding);"
          role="region"
          aria-label="Your AI Persona status"
        >
          <!-- Summoning State -->
          <div v-if="personaStatus === 'summoning'" class="text-center space-y-6 py-8">
            <div class="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-semibold text-white mb-2">Persona Summoning</h2>
              <p class="text-secondary">Your AI companion is being forged from collected perceptions...</p>
            </div>
          </div>

          <!-- Ready State -->
          <div v-else-if="personaStatus === 'ready' && persona" class="space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold text-white">Your AI Persona</h2>
              <div class="flex items-center space-x-1">
                <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                <span class="text-sm text-green-400">Ready</span>
              </div>
            </div>
            <PersonaCard :persona="persona" size="compact" />
            <Button @click="goToRoom" class="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
              Enter Persona Room
            </Button>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center space-y-6 py-8">
            <div class="w-32 h-32 mx-auto bg-gradient-to-br from-slate-700 to-slate-600 rounded-2xl flex items-center justify-center">
              <svg class="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-semibold text-white mb-2">Create Your First Persona</h2>
              <p class="text-secondary mb-6">Start a ritual to discover how your friends see you</p>
              <Button @click="goToRitual" class="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                Begin Ritual
              </Button>
            </div>
          </div>
        </div>

        <!-- Ritual Progress Card -->
        <div class="card hover:shadow-xl transition-shadow duration-300">
          <div v-if="hasActiveRitual" class="space-y-6">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold text-white">Ritual Progress</h2>
              <div class="text-right">
                <div class="text-sm text-secondary">Responses</div>
                <div class="font-semibold text-white">{{ currentRitual?.responsesCount || 0 }}/3</div>
              </div>
            </div>

            <!-- Enhanced Progress Bar -->
            <div class="space-y-3">
              <div class="flex justify-between items-center text-sm">
                <span class="text-secondary">Progress</span>
                <span class="font-medium text-white">{{ Math.round(responsesProgress) }}%</span>
              </div>
              
              <div class="relative">
                <div class="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                  <div 
                    class="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out"
                    :style="{ width: `${responsesProgress}%` }"
                  ></div>
                </div>
                
                <!-- Progress milestones -->
                <div class="flex justify-between mt-2">
                  <div class="flex items-center space-x-1" :class="(currentRitual?.responsesCount || 0) >= 1 ? 'text-green-400' : 'text-slate-500'">
                    <span class="text-xs">●</span>
                    <span class="text-xs">1st</span>
                  </div>
                  <div class="flex items-center space-x-1" :class="(currentRitual?.responsesCount || 0) >= 2 ? 'text-green-400' : 'text-slate-500'">
                    <span class="text-xs">●</span>
                    <span class="text-xs">2nd</span>
                  </div>
                  <div class="flex items-center space-x-1" :class="(currentRitual?.responsesCount || 0) >= 3 ? 'text-green-400' : 'text-slate-500'">
                    <span class="text-xs">●</span>
                    <span class="text-xs">Ready!</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Section -->
            <div v-if="canSummon" class="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-4">
              <div class="flex items-center space-x-3 mb-3">
                <span class="text-green-400">✨</span>
                <span class="font-medium text-green-400">Ready for Summoning!</span>
              </div>
              <Button @click="goToSummon" class="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                Begin Summoning Ritual
              </Button>
            </div>
            
            <div v-else class="space-y-4">
              <p class="text-sm text-secondary">Share your ritual link to gather more responses:</p>
              <div class="flex gap-2">
                <input
                  :value="currentRitual?.invitationUrl"
                  readonly
                  class="input flex-1 text-sm bg-slate-700/50 border-slate-600"
                />
                <Button variant="ghost" @click="copyRitualLink" class="px-3 text-indigo-400 hover:text-indigo-300">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
          
          <!-- No Active Ritual -->
          <div v-else class="text-center space-y-6 py-8">
            <div class="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
              <svg class="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"/>
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-semibold text-white mb-2">Start Your Ritual</h2>
              <p class="text-secondary mb-6 max-w-sm mx-auto">
                Create a survey link and share it with friends to gather their honest perceptions about you.
              </p>
              <Button @click="createRitual" :loading="isCreatingRitual" class="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                Create Survey Link
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { usePersonaStore } from '@/stores/persona'
import { useRitualStore } from '@/stores/ritual'
import Button from '@/components/common/Button.vue'
import PersonaCard from '@/components/common/PersonaCard.vue'
import LoadingSkeleton from '@/components/common/LoadingSkeleton.vue'

const router = useRouter()
const authStore = useAuthStore()
const personaStore = usePersonaStore()
const ritualStore = useRitualStore()

const isLoading = computed(() => authStore.isLoading || personaStore.isLoading || ritualStore.isLoading)
const error = computed(() => authStore.error || personaStore.error || ritualStore.error)
const user = computed(() => authStore.user)
const persona = computed(() => {
  if (personaStore.persona && 'status' in personaStore.persona && personaStore.persona.status === 'ready') {
    return personaStore.persona
  }
  return null
})
const personaStatus = computed(() => {
  if (!personaStore.persona) return null
  if ('status' in personaStore.persona) {
    return personaStore.persona.status
  }
  return 'ready'
})
const currentRitual = computed(() => ritualStore.currentRitual)
const hasActiveRitual = computed(() => ritualStore.hasActiveRitual)
const canSummon = computed(() => ritualStore.canSummon)
const responsesProgress = computed(() => ritualStore.responsesProgress)
const isCreatingRitual = computed(() => ritualStore.isLoading)

// User initials for avatar
const userInitials = computed(() => {
  const name = user.value?.displayName || 'U'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
})

onMounted(async () => {
  await Promise.all([
    authStore.fetchUserProfile(),
    personaStore.fetchPersona(),
    ritualStore.fetchMyRitual(),
  ])
})

const createRitual = async () => {
  try {
    await ritualStore.createRitual()
  } catch (err) {
    console.error('Failed to create ritual:', err)
  }
}

const goToRitual = () => {
  router.push('/ritual')
}

const goToSummon = () => {
  router.push('/summon')
}

const goToRoom = () => {
  if (persona.value) {
    router.push(`/room/${persona.value.id}`)
  }
}

const _goToChat = () => {
  if (persona.value) {
    router.push(`/chat/${persona.value.id}`)
  }
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const copyRitualLink = async () => {
  const url = currentRitual.value?.invitationUrl
  if (url) {
    try {
      await navigator.clipboard.writeText(url)
      // You could add a toast notification here
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = url
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
  }
}

// Nielsen Heuristic: Help users recover from errors
const handleRetry = async () => {
  try {
    await Promise.all([
      authStore.fetchUserProfile(),
      personaStore.fetchPersona(),
      ritualStore.fetchMyRitual(),
    ])
  } catch (error) {
    console.error('Retry failed:', error)
  }
}
</script>