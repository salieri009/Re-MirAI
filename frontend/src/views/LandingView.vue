<template>
  <div class="min-h-screen bg-akashic flex items-center justify-center">
    <div class="container-page text-center space-y-8 animate-fade-in">
      <h1 class="text-5xl md:text-7xl font-bold text-gradient mb-4">
        Re:MirAI
      </h1>
      <p class="text-xl md:text-2xl text-secondary max-w-2xl mx-auto">
        The mirror reflects your soul. What image do you cast in others'?
      </p>
      <p class="text-lg text-muted max-w-xl mx-auto">
        Summon an AI Persona forged from your relationships.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center mt-12">
        <Button size="lg" @click="goToLogin">
          Begin the Ritual
        </Button>
        <Button variant="ghost" size="lg" @click="scrollToHowItWorks">
          How It Works
        </Button>
      </div>

      <div id="how-it-works" class="mt-24 space-y-8">
        <h2 class="text-3xl font-bold text-gradient">How It Works</h2>
        <div class="grid md:grid-cols-3 gap-8 mt-12">
          <div class="card text-center space-y-4">
            <div class="text-4xl mb-4">🔮</div>
            <h3 class="text-xl font-bold">Prepare the Vessel</h3>
            <p class="text-secondary">Create a survey and share it with your friends</p>
          </div>
          <div class="card text-center space-y-4">
            <div class="text-4xl mb-4">💎</div>
            <h3 class="text-xl font-bold">Gather Perceptions</h3>
            <p class="text-secondary">Collect how your friends see you</p>
          </div>
          <div class="card text-center space-y-4">
            <div class="text-4xl mb-4">✨</div>
            <h3 class="text-xl font-bold">Summon Your Echo</h3>
            <p class="text-secondary">Meet your unique AI Persona</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from '@/components/common/Button.vue'

const router = useRouter()

const goToLogin = () => {
  router.push('/login')
}

const scrollToHowItWorks = () => {
  const element = document.getElementById('how-it-works')
  element?.scrollIntoView({ behavior: 'smooth' })
}
</script>