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

// KickoffLabs Compliance: Appropriate logo sizes for different contexts
const sizeClass: Record<Props['size'] & string, string> = {
  sm: 'text-lg',    // 18px - Footer, small contexts
  md: 'text-2xl',   // 24px - Header, navigation
  lg: 'text-3xl',   // 30px - Hero sections, cards, login
  xl: 'text-4xl'    // 36px - Large hero sections
}

const handleClick = () => {
  if (props.clickable) {
    emit('click')
  }
}
</script>

