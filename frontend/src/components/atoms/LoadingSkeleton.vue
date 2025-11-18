<template>
  <div class="space-y-4 animate-pulse">
    <!-- Header skeleton -->
    <div v-if="type === 'header'" class="flex items-center justify-between">
      <div class="space-y-2">
        <div class="h-8 bg-slate-700 rounded w-48"></div>
        <div class="h-4 bg-slate-700 rounded w-32"></div>
      </div>
      <div class="h-10 bg-slate-700 rounded w-20"></div>
    </div>

    <!-- Card skeleton -->
    <div v-else-if="type === 'card'" class="card">
      <div class="space-y-4">
        <div class="h-6 bg-slate-700 rounded w-32"></div>
        <div class="flex items-center space-x-4">
          <div class="w-16 h-16 bg-slate-700 rounded-full"></div>
          <div class="flex-1 space-y-2">
            <div class="h-4 bg-slate-700 rounded w-24"></div>
            <div class="h-3 bg-slate-700 rounded w-32"></div>
          </div>
        </div>
        <div class="h-10 bg-slate-700 rounded w-full"></div>
      </div>
    </div>

    <!-- Persona card skeleton -->
    <div v-else-if="type === 'persona'" class="card">
      <div class="space-y-4">
        <div class="h-6 bg-slate-700 rounded w-24"></div>
        <div class="aspect-[3/4] bg-slate-700 rounded-lg"></div>
        <div class="space-y-2">
          <div class="h-4 bg-slate-700 rounded w-32"></div>
          <div class="h-3 bg-slate-700 rounded w-20"></div>
          <div class="grid grid-cols-2 gap-2">
            <div class="h-8 bg-slate-700 rounded"></div>
            <div class="h-8 bg-slate-700 rounded"></div>
          </div>
        </div>
        <div class="h-10 bg-slate-700 rounded w-full"></div>
      </div>
    </div>

    <!-- Progress skeleton -->
    <div v-else-if="type === 'progress'" class="card">
      <div class="space-y-4">
        <div class="h-6 bg-slate-700 rounded w-32"></div>
        <div class="space-y-2">
          <div class="flex justify-between">
            <div class="h-4 bg-slate-700 rounded w-16"></div>
            <div class="h-4 bg-slate-700 rounded w-8"></div>
          </div>
          <div class="h-2 bg-slate-700 rounded-full"></div>
        </div>
        <div class="h-10 bg-slate-700 rounded w-full"></div>
      </div>
    </div>

    <!-- Default skeleton -->
    <div v-else class="bg-slate-700 rounded" :class="sizeClass"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type?: 'header' | 'card' | 'persona' | 'progress' | 'default'
  size?: 'sm' | 'md' | 'lg' | 'full'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'md'
})

const sizeClass = computed(() => {
  const sizes = {
    sm: 'h-4 w-16',
    md: 'h-6 w-32',
    lg: 'h-8 w-48',
    full: 'h-10 w-full'
  }
  return sizes[props.size]
})
</script>
