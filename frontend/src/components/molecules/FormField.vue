<template>
  <div class="w-full">
    <Label
      v-if="label"
      :html-for="id"
      :required="required"
      :disabled="disabled"
      :color="error ? 'error' : 'default'"
    >
      {{ label }}
    </Label>
    
    <Input
      :id="id"
      :type="type"
      :model-value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :error="!!error"
      :aria-label="ariaLabel || label"
      :aria-describedby="error ? `${id}-error` : undefined"
      @update:model-value="$emit('update:modelValue', $event)"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
    />
    
    <ErrorText
      :id="`${id}-error`"
      :message="error"
    />
    
    <p v-if="hint" class="text-xs text-slate-500 mt-1">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { Label, Input, ErrorText } from '../atoms'

interface Props {
  id: string
  label?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  modelValue?: string | number
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: string
  hint?: string
  ariaLabel?: string
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  modelValue: '',
  placeholder: '',
  disabled: false,
  required: false,
  error: '',
  hint: '',
})

defineEmits<{
  'update:modelValue': [value: string]
  blur: []
  focus: []
}>()
</script>
