<template>
  <div class="min-h-screen bg-primary flex items-center justify-center">
    <div class="container-page text-center space-y-8">
      <div v-if="isCreating" class="space-y-8">
        <!-- KickoffLabs Compliance: Replaced emoji with SVG icon -->
        <svg class="w-16 h-16 mx-auto text-indigo-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
        <h1 class="text-4xl font-bold text-gradient">Creating Your Persona</h1>
        <LoadingSpinner size="lg" text="Processing feedback data..." />
        <p class="text-secondary max-w-md mx-auto">
          Your Persona is being generated from collected feedback. This may take a few moments.
        </p>
      </div>

      <div v-else-if="persona && persona.status === 'ready'" class="space-y-8 animate-fade-in">
        <h1 class="text-4xl font-bold text-gradient">Persona Created!</h1>
        <PersonaCard :persona="persona" />
        <div class="flex gap-4 justify-center">
          <Button size="lg" @click="goToRoom">Go to Persona Room</Button>
          <Button variant="secondary" size="lg" @click="goToChat">Start Chatting</Button>
        </div>
      </div>

      <div v-else class="card max-w-2xl mx-auto">
        <h2 class="text-2xl font-bold mb-4">Choose Your Creation Mode</h2>
        <div class="grid md:grid-cols-2 gap-6 mb-6">
          <div class="card cursor-pointer hover:scale-105 transition-transform" @click="selectMode('Auto')">
            <h3 class="text-xl font-bold mb-2">Auto Mode</h3>
            <p class="text-secondary">
              Discover the true Persona hidden in your data. The system will suggest the most compatible archetype.
            </p>
          </div>
          <div class="card cursor-pointer hover:scale-105 transition-transform" @click="selectMode('Custom')">
            <h3 class="text-xl font-bold mb-2">Custom Mode</h3>
            <p class="text-secondary">
              Experiment with different archetypes. Choose a filter to apply to your feedback data.
            </p>
          </div>
        </div>

        <div v-if="selectedMode === 'Custom'" class="mb-6">
          <label class="block text-sm font-medium text-secondary mb-2">
            Select Archetype Filter
          </label>
          <select v-model="selectedArchetype" class="input">
            <option value="">Choose an archetype...</option>
            <option value="Tsundere">Tsundere</option>
            <option value="Yandere">Yandere</option>
            <option value="Kuudere">Kuudere</option>
            <option value="Genki">Genki</option>
            <!-- Add more archetypes -->
          </select>
        </div>

        <Button
          size="lg"
          :disabled="selectedMode === 'Custom' && !selectedArchetype"
          :loading="isLoading"
          @click="initiateCreation"
          class="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
        >
          Begin Creation
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePersonaStore } from '@/stores/persona'
import Button from '@/components/common/Button.vue'
import PersonaCard from '@/components/common/PersonaCard.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const router = useRouter()
const personaStore = usePersonaStore()

const selectedMode = ref<'Auto' | 'Custom' | null>(null)
const selectedArchetype = ref<string>('')
const isLoading = ref(false)

const isCreating = computed(() => personaStore.isSummoning || personaStore.isPersonaSummoning)
const persona = computed(() => {
  if (personaStore.persona && 'status' in personaStore.persona && personaStore.persona.status === 'ready') {
    return personaStore.persona
  }
  return null
})

onMounted(async () => {
  await personaStore.fetchPersona()
})

const selectMode = (mode: 'Auto' | 'Custom') => {
  selectedMode.value = mode
}

const initiateCreation = async () => {
  if (!selectedMode.value) return
  if (selectedMode.value === 'Custom' && !selectedArchetype.value) return

  isLoading.value = true
  try {
    // Map modes: Auto = 'Fated', Custom = 'Alchemic'
    const backendMode = selectedMode.value === 'Auto' ? 'Fated' : 'Alchemic'
    await personaStore.summonPersona(
      backendMode,
      selectedMode.value === 'Custom' ? selectedArchetype.value : undefined
    )
    // Polling is handled by the store
  } catch (err) {
    console.error('Failed to initiate creation:', err)
  } finally {
    isLoading.value = false
  }
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
</script>
