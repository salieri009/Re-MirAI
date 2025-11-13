<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <BaseSpinner v-if="loading" :size="spinnerSize" class="mr-2" />
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseSpinner from './BaseSpinner.vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
})

defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
    danger: 'bg-danger text-white hover:bg-red-600 focus:ring-red-500',
  }
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }
  
  return `${baseClasses} ${variantClasses[props.variant]} ${sizeClasses[props.size]}`
})

const spinnerSize = computed(() => {
  const sizeMap = {
    sm: 'sm' as const,
    md: 'sm' as const,
    lg: 'md' as const,
  }
  return sizeMap[props.size]
})
</script>

