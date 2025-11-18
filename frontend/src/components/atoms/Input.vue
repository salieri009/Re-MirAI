<template>
  <input
    :type="type"
    :value="modelValue"
    :disabled="disabled"
    :placeholder="placeholder"
    :aria-label="ariaLabel"
    :aria-invalid="error ? 'true' : 'false'"
    :class="[
      'w-full px-4 py-2 rounded-lg border-2 transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-indigo-500/30',
      'placeholder:text-slate-400',
      disabled ? 'bg-slate-100 cursor-not-allowed opacity-60' : 'bg-white',
      error
        ? 'border-red-500 focus:border-red-500'
        : 'border-slate-200 focus:border-indigo-500'
    ]"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    @blur="$emit('blur')"
    @focus="$emit('focus')"
  />
</template>

<script setup lang="ts">
interface Props {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  modelValue?: string | number
  placeholder?: string
  disabled?: boolean
  error?: boolean
  ariaLabel?: string
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  modelValue: '',
  placeholder: '',
  disabled: false,
  error: false,
})

defineEmits<{
  'update:modelValue': [value: string]
  blur: []
  focus: []
}>()
</script>
