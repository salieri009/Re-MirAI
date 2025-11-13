<template>
  <div class="w-full">
    <textarea
      v-if="type === 'textarea'"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="inputClasses"
      rows="4"
      @input="handleInput"
    />
    <input
      v-else
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="inputClasses"
      @input="handleInput"
    />
    <p v-if="error" class="mt-1 text-sm text-danger">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: string | number
  type?: 'text' | 'email' | 'textarea'
  placeholder?: string
  error?: string | null
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  error: null,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const inputClasses = computed(() => {
  const baseClasses = 'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed'
  
  const stateClasses = props.error
    ? 'border-danger focus:ring-danger focus:border-danger'
    : 'border-surface-border focus:ring-primary-500 focus:border-primary-500'
  
  return `${baseClasses} ${stateClasses}`
})

function handleInput(event: Event): void {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>

