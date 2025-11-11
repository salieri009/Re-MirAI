<!-- 3D Star Icon - Inspired by 3dicons.co -->
<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 100 100" 
    :width="size" 
    :height="size"
    class="icon-star"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="star-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#fbbf24;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#f59e0b;stop-opacity:1" />
      </linearGradient>
      <filter id="star-shadow">
        <feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.4"/>
      </filter>
    </defs>
    
    <!-- Star Shape -->
    <path 
      d="M 50 10 L 55 35 L 80 35 L 60 50 L 65 75 L 50 60 L 35 75 L 40 50 L 20 35 L 45 35 Z" 
      fill="url(#star-gradient)" 
      filter="url(#star-shadow)"
    />
    
    <!-- Highlight -->
    <path 
      d="M 50 10 L 55 35 L 50 30 Z" 
      fill="white" 
      opacity="0.6"
    />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  size?: number
}

withDefaults(defineProps<Props>(), {
  size: 24
})
</script>

<style scoped>
.icon-star {
  filter: drop-shadow(0 2px 4px rgba(251, 191, 36, 0.5));
}
</style>

