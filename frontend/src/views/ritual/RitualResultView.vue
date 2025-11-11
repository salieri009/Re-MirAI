<template>
  <div class="container-page">
    <div class="max-w-2xl mx-auto space-y-8">
      <div class="card text-center">
        <h1 class="text-3xl font-bold text-gradient mb-4">Ritual Complete!</h1>
        <p class="text-secondary mb-6">
          Your perception has been sent to the vessel. Here's the result:
        </p>
      </div>

      <div v-if="persona" class="card">
        <PersonaCard :persona="persona" />
      </div>

      <div class="card text-center space-y-6">
        <h2 class="text-2xl font-bold">You've helped summon their Persona.</h2>
        <p class="text-secondary">Now, it's your turn. Begin your own summoning ritual.</p>
        <div class="flex gap-4 justify-center">
          <Button size="lg" @click="goToLanding">Begin Your Ritual</Button>
          <Button variant="ghost" size="lg" @click="goToLogin">Sign In</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { socialService } from '@/services/api'
import Button from '@/components/common/Button.vue'
import PersonaCard from '@/components/common/PersonaCard.vue'
import type { Persona } from '@/mocks/data'

const route = useRoute()
const router = useRouter()

const ritualId = route.params.ritualId as string
const persona = ref<Persona | null>(null)

onMounted(async () => {
  // TODO: Fetch the actual persona from the ritual result
  // For now, we'll use mock data
  try {
    // This would be: const userId = await getUserIdFromRitual(ritualId)
    // persona.value = await socialService.getPublicProfile(userId)
    persona.value = null // Placeholder
  } catch (err) {
    console.error('Failed to load persona result:', err)
  }
})

const goToLanding = () => {
  router.push('/')
}

const goToLogin = () => {
  router.push('/login')
}
</script>