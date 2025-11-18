<template>
  <div
    :class="[
      'rounded-lg border transition-all duration-200',
      variantClasses,
      sizeClasses,
      {
        'cursor-pointer hover:shadow-lg': clickable,
        'shadow-md': elevated,
      },
    ]"
    :role="clickable ? 'button' : undefined"
    :tabindex="clickable ? 0 : undefined"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space="handleClick"
  >
    <div v-if="$slots.header" class="border-b px-4 py-3 sm:px-6">
      <slot name="header" />
    </div>

    <div :class="['px-4 py-3 sm:px-6', contentClass]">
      <slot />
    </div>

    <div v-if="$slots.footer" class="border-t px-4 py-3 sm:px-6">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'primary' | 'success' | 'error' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  elevated?: boolean
  clickable?: boolean
  contentClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  elevated: false,
  clickable: false,
  contentClass: '',
})

const emit = defineEmits<{
  click: []
}>()

const variantClasses = computed(() => {
  const variants = {
    default: 'bg-white border-slate-200 text-slate-900',
    primary: 'bg-indigo-50 border-indigo-200 text-indigo-900',
    success: 'bg-green-50 border-green-200 text-green-900',
    error: 'bg-red-50 border-red-200 text-red-900',
    warning: 'bg-amber-50 border-amber-200 text-amber-900',
  }
  return variants[props.variant]
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'min-h-12',
    md: 'min-h-16',
    lg: 'min-h-24',
  }
  return sizes[props.size]
})

const handleClick = () => {
  if (props.clickable) {
    emit('click')
  }
}
</script>
