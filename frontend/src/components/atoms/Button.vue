<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-disabled="disabled || loading"
    :aria-busy="loading"
    :class="[
      'btn',
      'transition-all duration-200 ease-out',
      'focus:outline-none focus:ring-4 focus:ring-primary/30',
      'active:scale-95',
      variantClass[variant],
      sizeClass[size],
      { 
        'opacity-60 cursor-not-allowed transform-none': disabled && !loading,
        'opacity-80 cursor-wait': loading 
      },
    ]"
    @click="$emit('click', $event)"
  >
    <!-- Loading State -->
    <span 
      v-if="loading" 
      class="inline-flex items-center mr-2"
      role="status" 
      aria-label="Loading"
    >
      <svg 
        class="animate-spin h-4 w-4" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </span>
    
    <!-- Button Content -->
    <span :class="{ 'opacity-60': loading }">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'light'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
})

defineEmits<{
  click: [event: MouseEvent]
}>()

const variantClass: Record<Props['variant'] & string, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  light: 'btn-light',
}

const sizeClass: Record<Props['size'] & string, string> = {
  sm: 'px-4 py-2 text-sm min-h-8',
  md: 'px-6 py-4 min-h-12',
  lg: 'px-8 py-4 text-lg min-h-14',
}
</script>
