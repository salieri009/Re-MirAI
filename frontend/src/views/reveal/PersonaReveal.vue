<template>
  <DefaultLayout>
    <div class="max-w-2xl mx-auto">
      <!-- Generating State -->
      <div v-if="personaStore.generationStatus === 'generating'" class="text-center py-12">
        <div class="mb-8">
          <!-- Gacha-style Animation -->
          <div class="relative w-40 h-40 mx-auto mb-8">
            <div class="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full animate-pulse" />
            <div class="absolute inset-4 bg-white rounded-full flex items-center justify-center">
              <BaseSpinner size="lg" />
            </div>
          </div>
          
          <h2 class="text-h2 font-bold text-primary-600 mb-4 animate-pulse">
            페르소나 생성 중...
          </h2>
          <p class="text-body-lg text-text-secondary">
            친구들의 답변을 분석하고 있습니다
          </p>
        </div>
      </div>
      
      <!-- Reveal State -->
      <div v-else-if="personaStore.generationStatus === 'ready' && personaStore.persona" class="text-center py-12">
        <div class="mb-8 animate-reveal">
          <!-- Success Icon with Rarity Effect -->
          <div class="relative w-40 h-40 mx-auto mb-8">
            <div :class="rarityGlowClass" class="absolute inset-0 rounded-full blur-xl opacity-75" />
            <div class="relative w-40 h-40 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center">
              <svg class="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
            </div>
          </div>
          
          <div class="mb-6">
            <div class="inline-block px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full text-white font-bold text-h4 mb-4">
              {{ personaStore.persona.rarity }}
            </div>
            
            <h2 class="text-h1 font-bold text-primary-600 mb-2">
              {{ personaStore.persona.name }}
            </h2>
            <p class="text-h4 text-secondary-600 mb-2">
              {{ personaStore.persona.archetype }}
            </p>
            <p class="text-body-lg text-text-secondary italic">
              "{{ personaStore.persona.title }}"
            </p>
          </div>
          
          <!-- Quick Stats Preview -->
          <BaseCard class="max-w-md mx-auto mb-6">
            <div class="grid grid-cols-5 gap-2 text-center">
              <div v-for="(value, key) in personaStore.persona.stats" :key="key">
                <div class="text-h5 font-bold text-primary-600">{{ value }}</div>
                <div class="text-caption text-text-secondary capitalize">
                  {{ translateStat(key) }}
                </div>
              </div>
            </div>
          </BaseCard>
        </div>
        
        <BaseButton
          variant="primary"
          size="lg"
          @click="goToChat"
        >
          대화 시작하기
        </BaseButton>
      </div>
      
      <!-- Error State -->
      <div v-else-if="personaStore.generationStatus === 'failed'" class="text-center py-12">
        <svg class="w-20 h-20 mx-auto text-danger mb-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
        <h2 class="text-h3 font-bold text-danger mb-2">생성 실패</h2>
        <p class="text-body-md text-text-secondary mb-6">
          페르소나 생성에 실패했습니다. 다시 시도해주세요.
        </p>
        <BaseButton variant="primary" @click="retry">
          다시 시도
        </BaseButton>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseSpinner from '@/components/base/BaseSpinner.vue'
import { usePersonaStore } from '@/stores/persona'

const router = useRouter()
const personaStore = usePersonaStore()

const rarityGlowClass = computed(() => {
  const rarityColors: Record<string, string> = {
    N: 'bg-gray-400',
    R: 'bg-blue-400',
    SR: 'bg-purple-400',
    SSR: 'bg-yellow-400',
    UR: 'bg-pink-500',
  }
  
  return rarityColors[personaStore.persona?.rarity || 'N'] || rarityColors.N
})

onMounted(async () => {
  // Start generation
  try {
    await personaStore.generate()
    
    // Auto-navigate after 3 seconds
    setTimeout(() => {
      if (personaStore.generationStatus === 'ready') {
        goToChat()
      }
    }, 3000)
  } catch (error) {
    console.error('Generation failed:', error)
  }
})

function translateStat(key: string): string {
  const translations: Record<string, string> = {
    social: '사교',
    creative: '창의',
    logic: '논리',
    chill: '여유',
    boldness: '대담',
  }
  
  return translations[key] || key
}

function goToChat(): void {
  router.push('/persona/chat')
}

function retry(): void {
  router.push('/analysis')
}
</script>

<style scoped>
@keyframes reveal {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-reveal {
  animation: reveal 0.8s ease-out;
}
</style>

