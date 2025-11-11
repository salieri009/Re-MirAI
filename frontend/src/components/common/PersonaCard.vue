<template>
  <div class="persona-card" :class="isCompact ? 'card-compact' : 'card'">
    <!-- Compact Layout -->
    <div v-if="isCompact" class="flex items-center space-x-4">
      <div class="relative flex-shrink-0">
        <img
          :src="persona.illustrationUrl"
          :alt="persona.name"
          class="w-16 h-16 object-cover rounded-lg"
        />
        <div
          v-if="showRarity"
          :class="[
            'absolute -top-1 -right-1 w-6 h-6 rounded-full text-xs font-bold text-white flex items-center justify-center',
            getRarityClass(persona.rarity),
          ]"
        >
          {{ persona.rarity.charAt(0) }}
        </div>
      </div>
      
      <div class="flex-1 min-w-0">
        <h3 class="text-lg font-semibold text-white truncate">{{ persona.name }}</h3>
        <p class="text-secondary text-sm truncate">{{ persona.title }}</p>
        <div class="flex items-center space-x-2 mt-1">
          <span class="text-indigo-400 text-xs">{{ persona.archetype }}</span>
          <div v-if="showBond" class="flex items-center space-x-1 text-xs">
            <span class="text-secondary">Lv.</span>
            <span class="text-indigo-400 font-medium">{{ persona.bondLevel }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Full Layout -->
    <div v-else>
      <div class="relative">
        <img
          :src="persona.illustrationUrl"
          :alt="persona.name"
          class="w-full h-64 object-cover rounded-lg mb-4"
        />
        <div
          v-if="showRarity"
          :class="[
            'absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold text-white',
            getRarityClass(persona.rarity),
          ]"
        >
          {{ persona.rarity }}
        </div>
      </div>

      <div class="space-y-2">
        <h3 class="text-2xl font-bold text-gradient">{{ persona.name }}</h3>
        <p class="text-secondary text-sm">{{ persona.title }}</p>
        <p class="text-indigo-400 text-xs">{{ persona.archetype }} Type</p>

      <div v-if="showStats" class="mt-4 space-y-2">
        <div
          v-for="(value, stat) in persona.stats"
          :key="stat"
          class="flex items-center justify-between"
        >
          <span class="text-sm text-secondary">{{ stat }}</span>
          <div class="flex-1 mx-4 h-2 progress-bg rounded-full overflow-hidden">
            <div
              :class="['h-full rounded-full transition-all', getStatClass(stat)]"
              :style="{ width: `${value}%` }"
            ></div>
          </div>
          <span class="text-sm font-medium w-12 text-right">{{ value }}</span>
        </div>
      </div>

        <div v-if="showBond" class="mt-4 pt-4 border-t border-gray-700">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-secondary">Bond Level</span>
            <span class="text-sm font-bold text-indigo-400">Lv. {{ persona.bondLevel }}</span>
          </div>
          <div class="h-2 progress-bg rounded-full overflow-hidden">
            <div
              class="h-full progress-mystical rounded-full transition-all"
              :style="{ width: `${persona.bondProgress * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Persona } from '@/mocks/data'

interface Props {
  persona: Persona
  size?: 'full' | 'compact'
  showStats?: boolean
  showBond?: boolean
  showRarity?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'full',
  showStats: true,
  showBond: true,
  showRarity: true,
})

const isCompact = computed(() => props.size === 'compact')

const getRarityClass = (rarity: string) => {
  const rarityMap: Record<string, string> = {
    N: 'rarity-n',
    R: 'rarity-r',
    SR: 'rarity-sr',
    SSR: 'rarity-ssr',
    UR: 'rarity-ur',
  }
  return rarityMap[rarity] || 'rarity-n'
}

const getStatClass = (stat: string) => {
  const statMap: Record<string, string> = {
    Charisma: 'stat-charisma',
    Intellect: 'stat-intellect',
    Kindness: 'stat-kindness',
    Instability: 'stat-instability',
    Spirit: 'stat-spirit',
  }
  return statMap[stat] || 'stat-charisma'
}
</script>

<style scoped>
.persona-card {
  @apply transition-transform duration-300;
}

.card {
  @apply hover:scale-105;
}

.card-compact {
  background-color: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(51, 65, 85, 0.5);
  border-radius: 0.75rem;
  padding: 1rem;
  transition: all 0.3s ease;
}

.card-compact:hover {
  background-color: rgba(30, 41, 59, 0.7);
  border-color: rgba(71, 85, 105, 0.5);
}
</style>