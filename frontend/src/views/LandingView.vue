<template>
  <div class="min-h-screen bg-akashic">
    <!-- Hero Section -->
    <section class="relative overflow-hidden min-h-screen flex items-center">
      <!-- Background Visual Elements -->
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20"></div>
      <div class="absolute top-20 left-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      
      <div class="container-page relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Column: Content -->
          <div class="space-y-8 text-center lg:text-left animate-fade-in">
            <!-- Company Logo/Brand -->
            <div class="flex justify-center lg:justify-start">
              <div class="text-2xl font-bold text-gradient">Re:MirAI</div>
            </div>
            
            <!-- Main Headline (5-7 words as per UX Planet) -->
            <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Discover Your
              <span class="text-gradient block shimmer-text">True Self</span>
            </h1>
            
            <!-- Description (20 words max as per UX Planet) -->
            <p class="text-xl md:text-2xl text-secondary max-w-lg mx-auto lg:mx-0">
              AI Persona created from how your friends actually see you.
            </p>
            
            <!-- Primary CTA (actionable verb as per UX Planet) -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" class="text-lg px-8 py-4" @click="goToLogin">
                Start Discovery
              </Button>
              <Button variant="ghost" size="lg" class="text-lg px-8 py-4" @click="scrollToHowItWorks">
                See How
              </Button>
            </div>
            
            <!-- Social Proof -->
            <div class="flex items-center justify-center lg:justify-start space-x-6 text-sm text-muted">
              <div class="flex items-center space-x-2">
                <div class="flex -space-x-2">
                  <div class="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full border-2 border-white"></div>
                  <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full border-2 border-white"></div>
                  <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full border-2 border-white"></div>
                </div>
                <span>1000+ Personas Created</span>
              </div>
            </div>
          </div>
          
          <!-- Right Column: Hero Image/Visual -->
          <div class="relative animate-slide-up">
            <div class="relative mx-auto max-w-md lg:max-w-lg">
              <!-- Main Persona Card Mockup -->
              <div class="card relative transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div class="aspect-[3/4] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-xl p-6 text-white">
                  <div class="h-full flex flex-col justify-between">
                    <!-- Persona Image Placeholder -->
                    <div class="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
                      <svg class="w-12 h-12 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    
                    <!-- Persona Details -->
                    <div class="text-center space-y-3">
                      <h3 class="text-lg font-semibold">Your AI Persona</h3>
                      <div class="text-sm opacity-90">Archetype: Mysterious Sage</div>
                      <div class="text-xs opacity-75">Rarity: SSR ⭐⭐⭐</div>
                      
                      <!-- Stats Preview -->
                      <div class="grid grid-cols-2 gap-2 text-xs mt-4">
                        <div class="bg-white/10 rounded p-2">
                          <div class="text-blue-200">Charisma</div>
                          <div class="font-bold">85</div>
                        </div>
                        <div class="bg-white/10 rounded p-2">
                          <div class="text-green-200">Kindness</div>
                          <div class="font-bold">92</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Floating Elements -->
              <div class="absolute -top-4 -left-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-xl animate-float shadow-lg">
                ✨
              </div>
              <div class="absolute -bottom-4 -right-4 w-10 h-10 bg-pink-400 rounded-full flex items-center justify-center text-lg animate-float shadow-lg" style="animation-delay: 3s;">
                💎
              </div>
              <div class="absolute top-1/2 -right-8 w-8 h-8 bg-indigo-400 rounded-full flex items-center justify-center text-sm animate-bounce opacity-75">
                🌟
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section id="how-it-works" class="py-24 bg-gradient-to-b from-transparent to-indigo-900/10">
      <div class="container-page">
        <div class="text-center space-y-8 mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gradient">How It Works</h2>
          <p class="text-xl text-secondary max-w-2xl mx-auto">
            Three simple steps to discover your authentic self through AI
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8 relative">
          <!-- Step Connectors -->
          <div class="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-indigo-500/50 to-purple-500/50 transform -translate-y-1/2 z-0"></div>
          <div class="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-purple-500/50 to-pink-500/50 transform -translate-y-1/2 z-0"></div>
          
          <!-- Step 1 -->
          <div class="card text-center space-y-6 relative z-10 hover:scale-105 transition-transform duration-300">
            <div class="w-16 h-16 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg">
              1
            </div>
            <div class="text-4xl mb-4">🔮</div>
            <h3 class="text-xl font-bold text-white">Create Your Ritual</h3>
            <p class="text-secondary">Set up a personalized survey to gather insights from your friends</p>
          </div>
          
          <!-- Step 2 -->
          <div class="card text-center space-y-6 relative z-10 hover:scale-105 transition-transform duration-300">
            <div class="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg">
              2
            </div>
            <div class="text-4xl mb-4">💎</div>
            <h3 class="text-xl font-bold text-white">Collect Perceptions</h3>
            <p class="text-secondary">Your friends share how they truly see your personality</p>
          </div>
          
          <!-- Step 3 -->
          <div class="card text-center space-y-6 relative z-10 hover:scale-105 transition-transform duration-300">
            <div class="w-16 h-16 mx-auto bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg">
              3
            </div>
            <div class="text-4xl mb-4">✨</div>
            <h3 class="text-xl font-bold text-white">Meet Your Persona</h3>
            <p class="text-secondary">Discover your AI companion, crafted from authentic relationships</p>
          </div>
        </div>
        
        <!-- Bottom CTA -->
        <div class="text-center mt-16">
          <Button size="lg" class="text-lg px-10 py-4" @click="goToLogin">
            Start Your Journey
          </Button>
        </div>
      </div>
    </section>
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