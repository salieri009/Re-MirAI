<template>
  <BaseCard>
    <h3 class="text-h5 font-semibold mb-4">응답 현황</h3>
    
    <!-- Progress Bar -->
    <div class="mb-4">
      <div class="flex justify-between text-sm text-text-secondary mb-2">
        <span>진행 상황</span>
        <span>{{ current }} / {{ required }}</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          class="bg-primary-600 h-full rounded-full transition-all duration-500"
          :style="{ width: `${progress}%` }"
        />
      </div>
    </div>
    
    <!-- Memory Shards Visualization -->
    <div class="flex gap-2 flex-wrap">
      <div
        v-for="index in required"
        :key="index"
        :class="shardClasses(index)"
        class="w-12 h-12 rounded-lg border-2 transition-all duration-300 flex items-center justify-center"
      >
        <svg
          v-if="index <= current"
          class="w-6 h-6 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseCard from '@/components/base/BaseCard.vue'

interface Props {
  current: number
  required: number
}

const props = withDefaults(defineProps<Props>(), {
  required: 5,
})

const progress = computed(() => {
  return Math.min((props.current / props.required) * 100, 100)
})

function shardClasses(index: number): string {
  if (index <= props.current) {
    return 'bg-primary-600 border-primary-700'
  }
  return 'bg-gray-100 border-gray-300'
}
</script>

