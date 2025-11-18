<template>
  <div class="min-h-screen bg-primary" style="padding: var(--container-padding);">
    <!-- Loading State with Skeleton UI (Nielsen: System Status Visibility) -->
    <div v-if="isLoading" class="space-y-8" role="status" aria-live="polite" aria-label="Loading dashboard">
      <LoadingSkeleton type="persona" />
      <div class="sr-only">Loading your dashboard...</div>
    </div>

    <!-- Error State (Nielsen: Error Recovery) -->
    <div v-else-if="error" class="card border-purple-500/50 bg-purple-500/10" role="alert" aria-live="assertive">
      <div class="flex items-center" style="gap: var(--element-spacing);">
        <svg class="flex-shrink-0 w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Error" role="img">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div class="flex-1">
          <h3 class="font-semibold text-purple-300 mb-1">Something went wrong</h3>
          <p class="text-purple-400 text-sm">{{ error }}</p>
          <button 
            @click="handleRetry" 
            class="mt-3 text-sm text-purple-300 hover:text-purple-200 underline focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Try again
          </button>
        </div>
      </div>
    </div>

    <!-- Main Dashboard Content: State-Driven Architecture -->
    <div v-else style="display: flex; flex-direction: column; gap: var(--section-spacing);">
      
      <!-- Header with Logo (KickoffLabs Compliance: Top-left placement, appropriate size) -->
      <header 
        class="flex items-center justify-between"
        style="margin-bottom: var(--element-spacing);"
        role="banner"
      >
        <Logo size="md" clickable @click="router.push('/')" aria-context="Navigation Logo" />
        <div class="flex items-center" style="gap: var(--element-spacing);">
          <span class="text-sm text-secondary">{{ user?.displayName }}</span>
          <Button 
            variant="ghost" 
            size="sm" 
            @click="handleLogout" 
            aria-label="Sign out"
          >
            Logout
          </Button>
        </div>
      </header>
      
      <!-- ============================================ -->
      <!-- GROUP A: Primary Status Block (Top-Priority) -->
      <!-- ============================================ -->
      <section 
        class="card" 
        style="padding: var(--card-padding);"
        role="region"
        aria-label="Your AI Persona status"
      >
        <!-- State: Ready -->
        <div v-if="personaStatus === 'ready' && persona" class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold text-white">Your AI Persona</h2>
            <div class="flex items-center space-x-1">
              <span class="w-2 h-2 bg-indigo-400 rounded-full"></span>
              <span class="text-sm text-indigo-400">Ready</span>
            </div>
          </div>
          <PersonaCard :persona="persona" size="compact" />
        </div>

        <!-- State: Creating/Generating -->
        <div v-else-if="personaStatus === 'creating' || personaStatus === 'generating'" class="text-center space-y-6 py-8">
          <LoadingSkeleton type="persona" />
          <div>
            <h2 class="text-xl font-semibold text-white mb-2">Creating Your Persona</h2>
            <p class="text-secondary">Your AI companion is being generated from collected feedback...</p>
          </div>
        </div>

        <!-- State: Empty (No Persona) -->
        <div v-else class="text-center space-y-6 py-8">
          <div class="w-32 h-32 mx-auto bg-gradient-to-br from-slate-700 to-slate-600 rounded-2xl flex items-center justify-center">
            <svg class="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-semibold text-white mb-2">Create Your First Persona</h2>
            <p class="text-secondary">Start collecting feedback to discover how your friends see you</p>
          </div>
        </div>
      </section>

      <!-- ============================================ -->
      <!-- GROUP B: Contextual Action Block (State-Based CTA) -->
      <!-- ============================================ -->
      <section 
        class="card" 
        style="padding: var(--card-padding);"
        role="region"
        aria-label="Next actions"
      >
        <!-- Action: Ready State -->
        <div v-if="personaStatus === 'ready' && persona" class="space-y-4">
          <Button 
            @click="goToRoom" 
            class="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            size="lg"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            Chat with Your Persona
          </Button>
        </div>

        <!-- Action: Creating/Generating State -->
        <div v-else-if="personaStatus === 'creating' || personaStatus === 'generating'" class="space-y-4">
          <!-- Feedback Collection Progress (if active) -->
          <div v-if="hasActiveSurvey" class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-white">Feedback Collection Progress</h3>
              <div class="text-right">
                <div class="text-sm text-secondary">Responses</div>
                <div class="font-semibold text-white">{{ currentSurvey?.responsesCount || 0 }}/{{ currentSurvey?.minimumResponses || 3 }}</div>
              </div>
            </div>

            <!-- Progress Bar -->
            <div class="space-y-3">
              <div class="flex justify-between items-center text-sm">
                <span class="text-secondary">Progress</span>
                <span class="font-medium text-white">{{ Math.round(feedbackProgress) }}%</span>
              </div>
              
              <div class="relative">
                <div class="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                  <div 
                    class="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
                    :style="{ width: `${feedbackProgress}%` }"
                  ></div>
                </div>
                
                <!-- Progress milestones -->
                <div class="flex justify-between mt-2">
                  <div class="flex items-center space-x-1" :class="(currentSurvey?.responsesCount || 0) >= 1 ? 'text-indigo-400' : 'text-slate-500'">
                    <span class="text-xs">●</span>
                    <span class="text-xs">1st</span>
                  </div>
                  <div class="flex items-center space-x-1" :class="(currentSurvey?.responsesCount || 0) >= 2 ? 'text-purple-400' : 'text-slate-500'">
                    <span class="text-xs">●</span>
                    <span class="text-xs">2nd</span>
                  </div>
                  <div class="flex items-center space-x-1" :class="(currentSurvey?.responsesCount || 0) >= 3 ? 'text-indigo-400' : 'text-slate-500'">
                    <span class="text-xs">●</span>
                    <span class="text-xs">Ready!</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Primary CTA: Share Survey Link -->
            <div class="space-y-4">
              <p class="text-sm text-secondary">Share your survey link to gather more responses:</p>
              <div class="flex gap-2">
                <input
                  :value="currentSurvey?.invitationUrl"
                  readonly
                  class="input flex-1 text-sm bg-slate-700/50 border-slate-600"
                />
                <Button variant="ghost" @click="copySurveyLink" class="px-3 text-indigo-400 hover:text-indigo-300">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                </Button>
              </div>
            </div>

            <!-- Secondary CTA: View Progress -->
            <Button 
              variant="ghost" 
              @click="goToSurveyHub" 
              class="w-full"
            >
              View Feedback Details
            </Button>
          </div>

          <!-- No Active Survey -->
          <div v-else class="text-center space-y-4 py-4">
            <p class="text-secondary">No active feedback collection. Create a survey to start gathering responses.</p>
            <Button 
              @click="createSurvey" 
              :loading="isCreatingSurvey" 
              class="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              Create Survey Link
            </Button>
          </div>
        </div>

        <!-- Action: Empty State -->
        <div v-else class="space-y-4">
          <Button 
            @click="createSurvey" 
            :loading="isCreatingSurvey" 
            class="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            size="lg"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Start Collecting Feedback
          </Button>
          <p class="text-sm text-secondary text-center">
            Create a survey and share it with friends to gather their honest perceptions about you.
          </p>
        </div>
      </section>

      <!-- ============================================ -->
      <!-- GROUP C: Supplemental Block (Bottom-Area, Large Spacing) -->
      <!-- ============================================ -->
      <section 
        class="card" 
        style="padding: var(--card-padding); margin-top: var(--space-10);"
        role="region"
        aria-label="Additional options"
      >
        <!-- User Header (Supplemental Info) -->
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
              <h3 class="text-lg font-semibold text-white" style="margin-bottom: var(--micro-spacing);">
                {{ user?.displayName }}
              </h3>
              <div class="flex items-center" style="gap: var(--text-spacing);">
                <span class="text-sm text-secondary">Points:</span>
                <div class="flex items-center" style="gap: var(--micro-spacing);">
                  <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Points" role="img">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span class="font-medium text-purple-400">
                    {{ user?.memoryCrystals || 0 }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
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
const surveyStore = useRitualStore() // Renamed from ritualStore for clarity

const isLoading = computed(() => authStore.isLoading || personaStore.isLoading || surveyStore.isLoading)
const error = computed(() => authStore.error || personaStore.error || surveyStore.error)
const user = computed(() => authStore.user)
const persona = computed(() => {
  if (personaStore.persona && 'status' in personaStore.persona && personaStore.persona.status === 'ready') {
    return personaStore.persona
  }
  return null
})
const personaStatus = computed(() => {
  if (!personaStore.persona) return 'empty'
  if ('status' in personaStore.persona) {
    const status = personaStore.persona.status
    // Map religious terms to neutral terms
    if (status === 'summoning') return 'creating'
    if (status === 'generating') return 'creating'
    return status
  }
  return 'ready'
})

// Survey-related computed properties (renamed from ritual)
const currentSurvey = computed(() => surveyStore.currentRitual)
const hasActiveSurvey = computed(() => surveyStore.hasActiveRitual)
const feedbackProgress = computed(() => surveyStore.responsesProgress)
const isCreatingSurvey = computed(() => surveyStore.isLoading)

// User initials for avatar
const userInitials = computed(() => {
  const name = user.value?.displayName || 'U'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
})

onMounted(async () => {
  await Promise.all([
    authStore.fetchUserProfile(),
    personaStore.fetchPersona(),
    surveyStore.fetchMyRitual(),
  ])
})

const createSurvey = async () => {
  try {
    await surveyStore.createRitual()
  } catch (err) {
    console.error('Failed to create survey:', err)
  }
}

const goToSurveyHub = () => {
  router.push('/ritual') // Keep route for now, but UI text is neutral
}

const goToRoom = () => {
  if (persona.value) {
    router.push(`/room/${persona.value.id}`)
  }
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const copySurveyLink = async () => {
  const url = currentSurvey.value?.invitationUrl
  if (url) {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = url
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
  }
}

const handleRetry = async () => {
  try {
    await Promise.all([
      authStore.fetchUserProfile(),
      personaStore.fetchPersona(),
      surveyStore.fetchMyRitual(),
    ])
  } catch (error) {
    console.error('Retry failed:', error)
  }
}
</script>

