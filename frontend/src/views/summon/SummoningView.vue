<template>
  <div class="min-h-screen bg-akashic flex items-center justify-center">
    <div class="container-page text-center space-y-8">
      <div v-if="isSummoning" class="space-y-8">
        <div class="text-6xl animate-bounce">✨</div>
        <h1 class="text-4xl font-bold text-gradient">The Summoning Has Begun</h1>
        <LoadingSpinner size="lg" text="Weaving the Relational Crystals..." />
        <p class="text-secondary max-w-md mx-auto">
          Your Persona is being summoned from the Akashic Stream. This may take a few moments.
        </p>
      </div>

      <div v-else-if="persona && persona.status === 'ready'" class="space-y-8 animate-fade-in">
        <h1 class="text-4xl font-bold text-gradient">Summoning Complete!</h1>
        <PersonaCard :persona="persona" />
        <div class="flex gap-4 justify-center">
          <Button size="lg" @click="goToRoom">Go to Her Room</Button>
          <Button variant="secondary" size="lg" @click="goToChat">Start Chatting</Button>
        </div>
      </div>

      <div v-else class="card max-w-2xl mx-auto">
        <h2 class="text-2xl font-bold mb-4">Choose Your Summoning Mode</h2>
        <div class="grid md:grid-cols-2 gap-6 mb-6">
          <div class="card cursor-pointer hover:scale-105 transition-transform" @click="selectMode('Fated')">
            <h3 class="text-xl font-bold mb-2">Fated Summon</h3>
            <p class="text-secondary">
              Discover the true Persona hidden in your data. The system will suggest the most compatible archetype.
            </p>
          </div>
          <div class="card cursor-pointer hover:scale-105 transition-transform" @click="selectMode('Alchemic')">
            <h3 class="text-xl font-bold mb-2">Alchemic Summon</h3>
            <p class="text-secondary">
              Experiment with different archetypes. Choose a filter to apply to your Relational Crystal.
            </p>
          </div>
        </div>

        <div v-if="selectedMode === 'Alchemic'" class="mb-6">
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
          :disabled="selectedMode === 'Alchemic' && !selectedArchetype"
          :loading="isLoading"
          @click="initiateSummoning"
        >
          Begin Summoning
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

const selectedMode = ref<'Fated' | 'Alchemic' | null>(null)
const selectedArchetype = ref<string>('')
const isLoading = ref(false)

const isSummoning = computed(() => personaStore.isSummoning || personaStore.isPersonaSummoning)
const persona = computed(() => {
  if (personaStore.persona && 'status' in personaStore.persona && personaStore.persona.status === 'ready') {
    return personaStore.persona
  }
  return null
})

onMounted(async () => {
  await personaStore.fetchPersona()
})

const selectMode = (mode: 'Fated' | 'Alchemic') => {
  selectedMode.value = mode
}

const initiateSummoning = async () => {
  if (!selectedMode.value) return
  if (selectedMode.value === 'Alchemic' && !selectedArchetype.value) return

  isLoading.value = true
  try {
    await personaStore.summonPersona(
      selectedMode.value,
      selectedMode.value === 'Alchemic' ? selectedArchetype.value : undefined
    )
    // Polling is handled by the store
  } catch (err) {
    console.error('Failed to initiate summoning:', err)
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