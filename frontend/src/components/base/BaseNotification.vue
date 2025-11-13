<template>
  <Transition name="notification">
    <div
      v-if="show"
      :class="notificationClasses"
      class="fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 max-w-md"
    >
      <!-- Icon -->
      <div class="flex-shrink-0">
        <svg
          v-if="type === 'success'"
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <svg
          v-else
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      
      <!-- Message -->
      <p class="flex-1 text-sm font-medium">{{ message }}</p>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  show: boolean
  message: string
  type: 'success' | 'error'
}

const props = defineProps<Props>()

const notificationClasses = computed(() => {
  return props.type === 'success'
    ? 'bg-success text-white'
    : 'bg-danger text-white'
})
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>

