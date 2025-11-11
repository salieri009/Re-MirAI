<template>
  <div class="container-page">
    <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
      <LoadingSpinner size="lg" />
    </div>

    <div v-else-if="persona" class="space-y-8">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gradient">{{ persona.name }}'s Room</h1>
        <Button variant="ghost" @click="goToDashboard">Back to Dashboard</Button>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <!-- Persona Display -->
        <div class="md:col-span-2">
          <div class="card">
            <PersonaCard :persona="persona" />
          </div>
        </div>

        <!-- Actions & Quests -->
        <div class="space-y-6">
          <div class="card">
            <h2 class="text-xl font-bold mb-4">Actions</h2>
            <div class="space-y-3">
              <Button class="w-full" @click="goToChat">Chat with {{ persona.name }}</Button>
              <Button variant="secondary" class="w-full" @click="sharePersona">Share Profile Card</Button>
            </div>
          </div>

          <div class="card">
            <h2 class="text-xl font-bold mb-4">First Steps</h2>
            <div v-if="questsLoading" class="text-center py-4">
              <LoadingSpinner size="sm" />
            </div>
            <div v-else class="space-y-3">
              <div
                v-for="quest in activeQuests"
                :key="quest.id"
                class="p-3 bg-card rounded-lg border border-gray-700"
              >
                <h3 class="font-bold mb-1">{{ quest.title }}</h3>
                <p class="text-sm text-secondary mb-2">{{ quest.description }}</p>
                <div class="flex items-center justify-between">
                  <span class="text-xs text-indigo-400">
                    Reward: {{ quest.reward.amount }} {{ quest.reward.type }}
                  </span>
                  <Button size="sm" variant="ghost" @click="completeQuest(quest.id)">
                    Complete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePersonaStore } from '@/stores/persona'
import { useQuestStore } from '@/stores/quest'
import Button from '@/components/common/Button.vue'
import PersonaCard from '@/components/common/PersonaCard.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const router = useRouter()
const personaStore = usePersonaStore()
const questStore = useQuestStore()

const isLoading = computed(() => personaStore.isLoading)
const persona = computed(() => {
  if (personaStore.persona && 'status' in personaStore.persona && personaStore.persona.status === 'ready') {
    return personaStore.persona
  }
  return null
})
const activeQuests = computed(() => questStore.activeQuests)
const questsLoading = computed(() => questStore.isLoading)

onMounted(async () => {
  await Promise.all([
    personaStore.fetchPersona(),
    questStore.fetchQuests(),
  ])
})

const goToChat = () => {
  if (persona.value) {
    router.push(`/chat/${persona.value.id}`)
  }
}

const goToDashboard = () => {
  router.push('/dashboard')
}

const sharePersona = () => {
  // TODO: Implement share functionality
  alert('Share functionality coming soon!')
}

const completeQuest = async (questId: string) => {
  try {
    await questStore.completeQuest(questId)
  } catch (err) {
    console.error('Failed to complete quest:', err)
  }
}
</script>