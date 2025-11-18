<template>
  <Card :variant="variant" size="lg">
    <!-- Header -->
    <template #header>
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-lg font-semibold text-slate-900">{{ personaName }}</h2>
          <p class="text-sm text-slate-600">{{ subtitle }}</p>
        </div>
        <div
          class="flex h-12 w-12 items-center justify-center rounded-full font-bold text-white"
          :style="{
            background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`,
          }"
        >
          {{ personaInitial }}
        </div>
      </div>
    </template>

    <!-- Main Content -->
    <div class="space-y-6">
      <!-- Type & Traits -->
      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <h3 class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Personality Type
          </h3>
          <p class="text-lg font-semibold text-slate-900">{{ stats.personalityType }}</p>
        </div>
        <div>
          <h3 class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Primary Trait
          </h3>
          <p class="text-lg font-semibold text-slate-900">{{ stats.primaryTrait }}</p>
        </div>
      </div>

      <!-- Dimension Scales -->
      <div class="space-y-3">
        <h3 class="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Personality Dimensions
        </h3>
        <div v-for="dimension in stats.dimensions" :key="dimension.name" class="space-y-1">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-slate-700">{{ dimension.name }}</span>
            <span class="text-xs text-slate-500">{{ dimension.percentage }}%</span>
          </div>
          <div class="h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              class="h-full transition-all duration-300"
              :style="{
                width: `${dimension.percentage}%`,
                background: `linear-gradient(90deg, ${dimension.color}, ${adjustBrightness(
                  dimension.color,
                  20
                )})`,
              }"
            />
          </div>
        </div>
      </div>

      <!-- Key Strengths -->
      <div v-if="stats.strengths?.length" class="space-y-2">
        <h3 class="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Key Strengths
        </h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="(strength, idx) in stats.strengths"
            :key="idx"
            class="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
          >
            <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            {{ strength }}
          </span>
        </div>
      </div>

      <!-- Growth Areas -->
      <div v-if="stats.growthAreas?.length" class="space-y-2">
        <h3 class="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Areas for Growth
        </h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="(area, idx) in stats.growthAreas"
            :key="idx"
            class="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700"
          >
            <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
            {{ area }}
          </span>
        </div>
      </div>

      <!-- Compatible Types (if provided) -->
      <div v-if="stats.compatibleTypes?.length" class="space-y-2">
        <h3 class="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Compatible With
        </h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="(type, idx) in stats.compatibleTypes"
            :key="idx"
            class="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
          >
            {{ type }}
          </span>
        </div>
      </div>

      <!-- Description -->
      <div v-if="stats.description" class="rounded-lg bg-slate-50 p-4">
        <p class="text-sm text-slate-700">{{ stats.description }}</p>
      </div>
    </div>

    <!-- Footer Actions -->
    <template v-if="showActions" #footer>
      <div class="flex gap-3">
        <Button variant="secondary" @click="$emit('share')">
          Share Profile
        </Button>
        <Button @click="$emit('compare')">
          Compare With Others
        </Button>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Card } from '../molecules'
import { Button } from '../atoms'

export interface PersonaDimension {
  name: string
  percentage: number
  color: string
}

export interface PersonaStatsData {
  personalityType: string
  primaryTrait: string
  dimensions: PersonaDimension[]
  strengths?: string[]
  growthAreas?: string[]
  compatibleTypes?: string[]
  description?: string
}

interface Props {
  personaName: string
  subtitle?: string
  stats: PersonaStatsData
  variant?: 'default' | 'primary' | 'success' | 'error' | 'warning'
  gradientStart?: string
  gradientEnd?: string
  showActions?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  subtitle: 'Personality Profile',
  variant: 'default',
  gradientStart: '#6366f1',
  gradientEnd: '#a855f7',
  showActions: true,
})

defineEmits<{
  share: []
  compare: []
}>()

const personaInitial = computed(() => {
  return props.personaName.charAt(0).toUpperCase()
})

/**
 * Adjust brightness of a hex color
 */
const adjustBrightness = (color: string, percent: number): string => {
  const num = parseInt(color.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = Math.min(255, (num >> 16) + amt)
  const G = Math.min(255, ((num >> 8) & 0x00ff) + amt)
  const B = Math.min(255, (num & 0x0000ff) + amt)
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`
}
</script>
