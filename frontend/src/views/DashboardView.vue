<template>
  <div class="container-page">
    <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
      <LoadingSpinner size="lg" text="Loading your dashboard..." />
    </div>

    <div v-else-if="error" class="card bg-red-900 bg-opacity-20 border-red-500">
      <p class="text-red-400">{{ error }}</p>
    </div>

    <div v-else class="space-y-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gradient">Welcome back, {{ user?.displayName }}</h1>
          <p class="text-secondary mt-2">Memory Crystals: {{ user?.memoryCrystals }}</p>
        </div>
        <Button variant="ghost" @click="handleLogout">Logout</Button>
      </div>

      <!-- Persona Status -->
      <div v-if="personaStatus === 'summoning'" class="card">
        <div class="text-center space-y-4">
          <LoadingSpinner text="Summoning your Persona..." />
          <p class="text-secondary">The ritual is in progress. Please wait...</p>
        </div>
      </div>

      <div v-else-if="personaStatus === 'ready' && persona" class="card">
        <h2 class="text-2xl font-bold mb-4">Your Persona</h2>
        <PersonaCard :persona="persona" />
        <div class="mt-6 flex gap-4">
          <Button @click="goToRoom">Visit Room</Button>
          <Button variant="secondary" @click="goToChat">Start Chat</Button>
        </div>
      </div>

      <div v-else class="card">
        <div class="text-center space-y-6">
          <div class="w-64 h-64 mx-auto bg-card rounded-lg flex items-center justify-center blur-sm">
            <p class="text-secondary">Persona Card Placeholder</p>
          </div>
          <div>
            <h2 class="text-2xl font-bold mb-2">No Persona Yet</h2>
            <p class="text-secondary mb-6">Create a ritual to summon your Persona</p>
            <Button @click="goToRitual">Create Your Survey Link</Button>
          </div>
        </div>
      </div>

      <!-- Ritual Status -->
      <div v-if="hasActiveRitual" class="card">
        <h2 class="text-2xl font-bold mb-4">Ritual Status</h2>
        <div class="space-y-4">
          <div>
            <div class="flex justify-between mb-2">
              <span class="text-secondary">Responses</span>
              <span class="font-bold">
              {{ currentRitual?.responsesCount }} / {{ currentRitual?.minimumResponses }}
            </span>
            </div>
            <div class="h-4 progress-bg rounded-full overflow-hidden">
              <div
                class="h-full progress-mystical rounded-full transition-all"
                :style="{ width: `${responsesProgress}%` }"
              ></div>
            </div>
          </div>

          <div v-if="canSummon" class="mt-6">
            <Button @click="goToSummon">Begin Summoning</Button>
          </div>
          <div v-else class="mt-6">
            <p class="text-secondary mb-4">Share this link to get more responses:</p>
            <div class="flex gap-2 items-center">
              <input
                :value="currentRitual?.invitationUrl"
                readonly
                class="input flex-1"
              />
              <ShareButton :url="currentRitual?.invitationUrl || ''" />
            </div>
          </div>
        </div>
      </div>

      <div v-else class="card">
        <h2 class="text-2xl font-bold mb-4">Start Your Ritual</h2>
        <p class="text-secondary mb-6">
          Create a survey link and share it with your friends to gather perceptions.
          You need at least 3 responses to summon your Persona.
        </p>
        <Button @click="createRitual" :loading="isCreatingRitual">
          Create Your Survey Link
        </Button>
      </div>
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
import ShareButton from '@/components/common/ShareButton.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

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

const goToChat = () => {
  if (persona.value) {
    router.push(`/chat/${persona.value.id}`)
  }
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>