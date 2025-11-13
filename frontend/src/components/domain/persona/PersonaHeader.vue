<template>
  <BaseCard>
    <div class="flex flex-col md:flex-row gap-6">
      <!-- Avatar Placeholder -->
      <div class="flex-shrink-0">
        <div class="w-32 h-32 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center">
          <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
      
      <!-- Info -->
      <div class="flex-1">
        <div class="flex items-center gap-3 mb-2">
          <h2 class="text-h3 font-bold">{{ persona.name }}</h2>
          <span
            :class="rarityClass"
            class="px-3 py-1 rounded-full text-sm font-bold"
          >
            {{ persona.rarity }}
          </span>
        </div>
        
        <p class="text-body-lg text-primary-600 font-medium mb-2">
          {{ persona.archetype }}
        </p>
        
        <p class="text-body-md text-text-secondary mb-4">
          {{ persona.title }}
        </p>
        
        <!-- Stats -->
        <div class="space-y-2">
          <div v-for="(value, key) in persona.stats" :key="key" class="flex items-center gap-3">
            <span class="text-sm font-medium text-text-primary w-20 capitalize">
              {{ translateStat(key) }}
            </span>
            <div class="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                class="bg-primary-500 h-full rounded-full"
                :style="{ width: `${value}%` }"
              />
            </div>
            <span class="text-sm font-medium text-text-secondary w-10 text-right">
              {{ value }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Persona } from '@/types'
import BaseCard from '@/components/base/BaseCard.vue'

interface Props {
  persona: Persona
}

const props = defineProps<Props>()

const rarityClass = computed(() => {
  const rarityColors: Record<string, string> = {
    N: 'bg-gray-400 text-white',
    R: 'bg-blue-400 text-white',
    SR: 'bg-purple-400 text-white',
    SSR: 'bg-yellow-400 text-white',
    UR: 'bg-gradient-to-r from-pink-500 to-yellow-500 text-white',
  }
  
  return rarityColors[props.persona.rarity] || rarityColors.N
})

function translateStat(key: string): string {
  const translations: Record<string, string> = {
    social: '사교성',
    creative: '창의력',
    logic: '논리력',
    chill: '여유',
    boldness: '대담함',
  }
  
  return translations[key] || key
}
</script>

