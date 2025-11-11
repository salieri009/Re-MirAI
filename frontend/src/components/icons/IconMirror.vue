<!-- 3D Mirror Icon - 3dicons.co Style -->
<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 120 120" 
    :width="size" 
    :height="size"
    class="icon-mirror"
    aria-hidden="true"
  >
    <defs>
      <!-- 3D Gradient for depth -->
      <linearGradient id="mirror-main" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#7c3aed;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#6366f1;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#4f46e5;stop-opacity:1" />
      </linearGradient>
      <linearGradient id="mirror-light" x1="30%" y1="20%" x2="70%" y2="80%">
        <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.6" />
        <stop offset="100%" style="stop-color:#a5b4fc;stop-opacity:0.2" />
      </linearGradient>
      <linearGradient id="mirror-shadow" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" style="stop-color:#1e1b4b;stop-opacity:0" />
        <stop offset="100%" style="stop-color:#1e1b4b;stop-opacity:0.5" />
      </linearGradient>
      <filter id="mirror-3d-shadow">
        <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
        <feOffset dx="0" dy="6" result="offsetblur"/>
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.4"/>
        </feComponentTransfer>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <!-- Shadow -->
    <ellipse cx="60" cy="95" rx="35" ry="6" fill="url(#mirror-shadow)" opacity="0.4"/>
    
    <!-- Mirror Frame (3D) -->
    <ellipse cx="60" cy="60" rx="38" ry="48" fill="#312e81" filter="url(#mirror-3d-shadow)"/>
    <ellipse cx="60" cy="58" rx="38" ry="48" fill="url(#mirror-main)"/>
    
    <!-- Mirror Glass -->
    <ellipse cx="60" cy="58" rx="32" ry="42" fill="#1e1b4b" opacity="0.3"/>
    <ellipse cx="60" cy="58" rx="30" ry="40" fill="url(#mirror-light)"/>
    
    <!-- 3D Highlight -->
    <ellipse cx="50" cy="40" rx="18" ry="24" fill="white" opacity="0.35"/>
    <ellipse cx="48" cy="35" rx="10" ry="15" fill="white" opacity="0.5"/>
    
    <!-- Decorative Sparkles -->
    <circle cx="40" cy="35" r="2" fill="#a5b4fc" opacity="0.8"/>
    <circle cx="75" cy="40" r="3" fill="#c7d2fe" opacity="0.6"/>
    <circle cx="45" cy="75" r="2" fill="#e0e7ff" opacity="0.7"/>
  </svg>
</template>

<script setup lang="ts">
interface Props {
  size?: number
}

withDefaults(defineProps<Props>(), {
  size: 64
})
</script>

<style scoped>
.icon-mirror {
  filter: drop-shadow(0 4px 8px rgba(139, 92, 246, 0.4));
}
</style>

