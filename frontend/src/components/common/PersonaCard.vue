<template>
  <div class="card persona-card">
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
</template>

<script setup lang="ts">
import type { Persona } from '@/mocks/data'

interface Props {
  persona: Persona
  showStats?: boolean
  showBond?: boolean
  showRarity?: boolean
}

withDefaults(defineProps<Props>(), {
  showStats: true,
  showBond: true,
  showRarity: true,
})

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
  @apply transition-transform duration-300 hover:scale-105;
}
</style>