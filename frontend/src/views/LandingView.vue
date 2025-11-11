<template>
  <div class="min-h-screen bg-akashic">
    <!-- Hero Section (Nielsen: Aesthetic & Minimalist Design) -->
    <section 
      class="relative overflow-hidden min-h-screen flex items-center" 
      role="main"
      aria-label="Welcome to Re:MirAI"
    >
      <!-- Background Visual Elements -->
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20"></div>
      <div class="absolute top-20 left-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" aria-hidden="true"></div>
      <div class="absolute bottom-20 right-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;" aria-hidden="true"></div>
      
      <div class="container-page relative z-10" style="padding: var(--container-padding);">
        <div class="grid lg:grid-cols-2 items-center" style="gap: var(--section-spacing);">
          <!-- Left Column: Content (4-Point Grid Applied) -->
          <div 
            class="text-center lg:text-left animate-fade-in" 
            style="display: flex; flex-direction: column; gap: var(--subsection-spacing);"
          >
            <!-- Company Logo/Brand -->
            <div class="flex justify-center lg:justify-start">
              <div class="text-2xl font-bold text-gradient" role="img" aria-label="Re:MirAI Logo">Re:MirAI</div>
            </div>
            
            <!-- Main Headline (Nielsen: Match system and real world) -->
            <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Discover Your
              <span class="text-gradient block shimmer-text">True Self</span>
            </h1>
            
            <!-- Description (Nielsen: Help users understand) -->
            <p 
              class="text-xl md:text-2xl text-secondary max-w-lg mx-auto lg:mx-0"
              role="doc-subtitle"
            >
              AI Persona created from how your friends actually see you.
            </p>
            
            <!-- Primary CTA (Nielsen: User Control & Freedom) -->
            <div 
              class="flex flex-col sm:flex-row justify-center lg:justify-start" 
              style="gap: var(--element-spacing);"
              role="group"
              aria-label="Get started options"
            >
              <Button 
                size="lg" 
                class="text-lg" 
                @click="goToLogin"
                aria-describedby="start-description"
              >
                Start Discovery
              </Button>
              <Button 
                variant="ghost" 
                size="lg" 
                class="text-lg" 
                @click="scrollToHowItWorks"
                aria-describedby="how-it-works-description"
              >
                See How
              </Button>
            </div>
            
            <!-- Screen Reader Descriptions -->
            <div class="sr-only">
              <div id="start-description">Begin creating your AI persona by signing up</div>
              <div id="how-it-works-description">Learn about the process of creating your AI persona</div>
            </div>
            
            <!-- Social Proof (Nielsen: Help users trust the system) -->
            <div 
              class="flex items-center justify-center lg:justify-start text-sm text-muted" 
              style="gap: var(--card-spacing);"
              role="group"
              aria-label="Social proof"
            >
              <div class="flex items-center" style="gap: var(--text-spacing);">
                <div class="flex" style="gap: calc(var(--micro-spacing) * -1);">
                  <div 
                    class="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full border-2 border-white"
                    role="img"
                    aria-label="User avatar"
                  ></div>
                  <div 
                    class="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full border-2 border-white"
                    role="img"
                    aria-label="User avatar"
                  ></div>
                  <div 
                    class="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full border-2 border-white"
                    role="img"
                    aria-label="User avatar"
                  ></div>
                </div>
                <span aria-label="1000 plus personas have been created">1000+ Personas Created</span>
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

    <!-- How It Works Section (Nielsen: Help users understand) -->
    <section 
      id="how-it-works" 
      class="bg-gradient-to-b from-transparent to-indigo-900/10" 
      style="padding: var(--section-spacing) 0;"
      role="region"
      aria-labelledby="how-it-works-heading"
    >
      <div class="container-page" style="padding: 0 var(--container-padding);">
        <!-- Section Header -->
        <div 
          class="text-center" 
          style="display: flex; flex-direction: column; gap: var(--subsection-spacing); margin-bottom: var(--section-spacing);"
        >
          <h2 id="how-it-works-heading" class="text-4xl md:text-5xl font-bold text-gradient">
            How It Works
          </h2>
          <p class="text-xl text-secondary max-w-2xl mx-auto">
            Three simple steps to discover your authentic self through AI
          </p>
        </div>
        
        <!-- Process Steps -->
        <div 
          class="grid md:grid-cols-3 relative" 
          style="gap: var(--subsection-spacing);"
          role="list"
          aria-label="Process steps"
        >
          <!-- Step Connectors -->
          <div class="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-indigo-500/50 to-purple-500/50 transform -translate-y-1/2 z-0"></div>
          <div class="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-purple-500/50 to-pink-500/50 transform -translate-y-1/2 z-0"></div>
          
          <!-- Step 1 (Nielsen: Recognition rather than recall) -->
          <div 
            class="card text-center relative z-10 hover:scale-105 transition-transform duration-300" 
            style="display: flex; flex-direction: column; gap: var(--card-spacing); padding: var(--card-padding);"
            role="listitem"
            tabindex="0"
          >
            <div 
              class="w-16 h-16 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg"
              role="img"
              aria-label="Step 1"
            >
              1
            </div>
            <div class="text-4xl" role="img" aria-label="Crystal ball">🔮</div>
            <h3 class="text-xl font-bold text-white">Create Your Ritual</h3>
            <p class="text-secondary">Set up a personalized survey to gather insights from your friends</p>
          </div>
          
          <!-- Step 2 -->
          <div 
            class="card text-center relative z-10 hover:scale-105 transition-transform duration-300" 
            style="display: flex; flex-direction: column; gap: var(--card-spacing); padding: var(--card-padding);"
            role="listitem"
            tabindex="0"
          >
            <div 
              class="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg"
              role="img"
              aria-label="Step 2"
            >
              2
            </div>
            <div class="text-4xl" role="img" aria-label="Diamond">💎</div>
            <h3 class="text-xl font-bold text-white">Collect Perceptions</h3>
            <p class="text-secondary">Your friends share how they truly see your personality</p>
          </div>
          
          <!-- Step 3 -->
          <div 
            class="card text-center relative z-10 hover:scale-105 transition-transform duration-300" 
            style="display: flex; flex-direction: column; gap: var(--card-spacing); padding: var(--card-padding);"
            role="listitem"
            tabindex="0"
          >
            <div 
              class="w-16 h-16 mx-auto bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg"
              role="img"
              aria-label="Step 3"
            >
              3
            </div>
            <div class="text-4xl" role="img" aria-label="Sparkles">✨</div>
            <h3 class="text-xl font-bold text-white">Meet Your Persona</h3>
            <p class="text-secondary">Discover your AI companion, crafted from authentic relationships</p>
          </div>
        </div>
        
        <!-- Bottom CTA (Nielsen: Consistency across pages) -->
        <div class="text-center" style="margin-top: var(--section-spacing);">
          <Button 
            size="lg" 
            class="text-lg" 
            @click="goToLogin"
            aria-label="Start creating your AI persona journey"
          >
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