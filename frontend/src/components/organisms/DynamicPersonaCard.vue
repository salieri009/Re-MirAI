<template>
  <div class="dynamic-persona-card relative mx-auto max-w-md lg:max-w-lg">
    <!-- Card Container with Transform Effect -->
    <div 
      class="card relative transform transition-all duration-500 hover:scale-105"
      role="region"
      aria-live="polite"
      :aria-label="currentStateLabel"
    >
      <!-- State 1: Blurred Skeleton -->
      <div 
        v-if="currentState === 1"
        class="aspect-[3/4] bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-xl backdrop-blur-lg p-6 border border-indigo-500/30"
      >
        <div class="h-full flex flex-col justify-center items-center gap-6">
          <!-- Blurred Avatar Skeleton -->
          <div class="w-32 h-32 bg-white/10 rounded-full blur-md animate-pulse"></div>
          
          <!-- Loading Text -->
          <div class="text-center space-y-2">
            <p class="text-xl font-semibold text-white animate-pulse">
              Analyzing Persona...
            </p>
            <div class="flex gap-1 justify-center">
              <div class="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style="animation-delay: 0s;"></div>
              <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
              <div class="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style="animation-delay: 0.4s;"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- State 2: Keywords Flashing -->
      <div 
        v-else-if="currentState === 2"
        class="aspect-[3/4] bg-gradient-to-br from-indigo-600/30 to-purple-700/30 rounded-xl backdrop-blur-lg p-6 border border-indigo-500/50"
      >
        <div class="h-full flex flex-col justify-center items-center gap-8 relative overflow-hidden">
          <!-- Keyword Cloud -->
          <div class="absolute inset-0 flex flex-wrap justify-center items-center gap-4 p-8">
            <span 
              v-for="(keyword, index) in keywords" 
              :key="keyword"
              class="keyword-flash text-white font-semibold px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm"
              :style="{ 
                animationDelay: `${index * 0.3}s`,
                fontSize: `${1 + Math.random() * 0.5}rem`
              }"
            >
              {{ keyword }}
            </span>
          </div>
          
          <!-- Analyzing Text -->
          <div class="relative z-10 text-center">
            <p class="text-lg font-medium text-white">
              Processing traits...
            </p>
          </div>
        </div>
      </div>

      <!-- State 3: Analysis Complete (Obscured Avatar) -->
      <div 
        v-else-if="currentState === 3"
        class="aspect-[3/4] bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-6 text-white shadow-2xl"
      >
        <div class="h-full flex flex-col justify-between">
          <!-- Persona Avatar (Slightly Obscured) -->
          <div class="flex justify-center mb-4">
            <div class="relative w-32 h-32">
              <div class="absolute inset-0 bg-white/30 rounded-full blur-sm"></div>
              <div class="relative w-full h-full bg-white/20 rounded-full flex items-center justify-center">
                <svg class="w-16 h-16 text-white/80" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            </div>
          </div>
          
          <!-- Persona Details (Teaser) -->
          <div class="text-center space-y-3">
            <div class="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
              Analysis Complete
            </div>
            <h3 class="text-2xl font-bold">???</h3>
            <p class="text-sm opacity-90">Archetype: Hidden</p>
            <p class="text-xs opacity-75">Rarity: ???</p>
            
            <!-- Stats Preview (Blurred) -->
            <div class="grid grid-cols-2 gap-2 text-xs mt-4 blur-sm opacity-50">
              <div class="bg-white/10 rounded p-2">
                <div class="font-medium">Charisma</div>
                <div>???</div>
              </div>
              <div class="bg-white/10 rounded p-2">
                <div class="font-medium">Intellect</div>
                <div>???</div>
              </div>
            </div>
            
            <!-- CTA Hint -->
            <div class="pt-4">
              <p class="text-sm font-medium text-white/90">
                Click the button below to reveal ↓
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Decorative Floating Elements -->
      <div class="absolute -top-4 -left-4 w-3 h-3 bg-indigo-400 rounded-full opacity-60 animate-pulse" aria-hidden="true"></div>
      <div class="absolute -bottom-4 -right-4 w-2 h-2 bg-purple-400 rounded-full opacity-60 animate-pulse" style="animation-delay: 2s;" aria-hidden="true"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

// Animation state (1 = skeleton, 2 = keywords, 3 = complete)
const currentState = ref(1)

// Keywords for State 2
const keywords = ref(['Kind', 'A bit cold', 'Funny', 'Unknown', 'Mysterious', 'Caring'])

// Accessibility label
const currentStateLabel = computed(() => {
  switch (currentState.value) {
    case 1: return 'Analyzing persona data'
    case 2: return 'Processing personality traits'
    case 3: return 'Analysis complete, ready to reveal'
    default: return 'Persona card'
  }
})

// Animation timeline
const startAnimation = () => {
  currentState.value = 1
  
  setTimeout(() => {
    currentState.value = 2
    
    setTimeout(() => {
      currentState.value = 3
      
      setTimeout(() => {
        startAnimation()
      }, 1000)
    }, 1500)
  }, 500)
}

onMounted(() => {
  startAnimation()
})

onUnmounted(() => {
  // Cleanup if needed
})
</script>

<style scoped>
.keyword-flash {
  animation: flash 1.5s ease-in-out infinite;
}

@keyframes flash {
  0%, 100% {
    opacity: 0.3;
    transform: scale(0.95);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

.shimmer-text {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.2s ease-in-out;
  background-clip: text;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
