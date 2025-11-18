<template>
  <label 
    :for="htmlFor"
    :class="[
      'text-sm font-medium',
      disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
      colorClass[color]
    ]"
  >
    <slot />
    <span v-if="required" class="text-red-500 ml-1">*</span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  htmlFor?: string
  required?: boolean
  disabled?: boolean
  color?: 'default' | 'error' | 'success'
}

withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false,
  color: 'default',
})

const colorClass: Record<Props['color'] & string, string> = {
  default: 'text-on-light',
  error: 'text-red-500',
  success: 'text-green-500',
}
</script>
