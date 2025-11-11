<template>
  <div class="container-page">
    <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
      <LoadingSpinner size="lg" />
    </div>

    <div v-else-if="persona" class="max-w-2xl mx-auto space-y-8">
      <div class="card text-center">
        <h1 class="text-3xl font-bold text-gradient mb-2">{{ persona.name }}'s Persona</h1>
        <p class="text-secondary">Public Profile Card</p>
      </div>

      <PersonaCard :persona="persona" />

      <div class="card text-center space-y-4">
        <p class="text-secondary">Want to see what your friends think about you?</p>
        <Button @click="goToLogin">Find out how your friends see you</Button>
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
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import type { Persona } from '@/mocks/data'

const route = useRoute()
const router = useRouter()

const userId = route.params.userId as string
const persona = ref<Persona | null>(null)
const isLoading = ref(true)

onMounted(async () => {
  try {
    persona.value = await socialService.getPublicProfile(userId)
  } catch (err) {
    console.error('Failed to load public profile:', err)
  } finally {
    isLoading.value = false
  }
})

const goToLogin = () => {
  router.push('/login')
}
</script>