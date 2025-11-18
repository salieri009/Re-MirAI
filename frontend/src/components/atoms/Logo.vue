<template>
  <div 
    :class="[
      'font-bold text-gradient',
      sizeClass[size],
      { 'cursor-pointer': clickable }
    ]"
    role="img"
    :aria-label="`Re:MirAI ${ariaContext}`"
    @click="handleClick"
  >
    Re:MirAI
  </div>
</template>

<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  clickable?: boolean
  ariaContext?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  clickable: false,
  ariaContext: 'Logo'
})

const emit = defineEmits<{
  click: []
}>()

const sizeClass: Record<Props['size'] & string, string> = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-3xl',
  xl: 'text-4xl'
}

const handleClick = () => {
  if (props.clickable) {
    emit('click')
  }
}
</script>
