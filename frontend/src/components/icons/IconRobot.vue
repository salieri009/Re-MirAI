<!-- 3D Robot/AI Icon - 3dicons.co Style -->
<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 120 120" 
    :width="size" 
    :height="size"
    class="icon-robot"
    aria-hidden="true"
  >
    <defs>
      <!-- 3D Robot Gradients -->
      <linearGradient id="robot-main" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#fb7185;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#f43f5e;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#e11d48;stop-opacity:1" />
      </linearGradient>
      <linearGradient id="robot-body" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#fb923c;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#f97316;stop-opacity:1" />
      </linearGradient>
      <radialGradient id="robot-light" cx="30%" cy="30%">
        <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.8" />
        <stop offset="100%" style="stop-color:#ffffff;stop-opacity:0" />
      </radialGradient>
      <filter id="robot-3d-shadow">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
        <feOffset dx="0" dy="5" result="offsetblur"/>
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
    <ellipse cx="60" cy="98" rx="35" ry="5" fill="#450a0a" opacity="0.3"/>
    
    <!-- Robot Head (3D) -->
    <rect x="38" y="32" width="44" height="38" rx="6" fill="#7f1d1d" filter="url(#robot-3d-shadow)"/>
    <rect x="38" y="30" width="44" height="38" rx="6" fill="url(#robot-main)"/>
    
    <!-- Head 3D Highlight -->
    <rect x="40" y="32" width="15" height="15" rx="3" fill="url(#robot-light)" opacity="0.4"/>
    
    <!-- Robot Eyes (3D glowing) -->
    <circle cx="50" cy="48" r="6" fill="#1e3a8a" opacity="0.8"/>
    <circle cx="70" cy="48" r="6" fill="#1e3a8a" opacity="0.8"/>
    <circle cx="50" cy="48" r="5" fill="#3b82f6"/>
    <circle cx="70" cy="48" r="5" fill="#3b82f6"/>
    <circle cx="48" cy="46" r="2.5" fill="#60a5fa"/>
    <circle cx="68" cy="46" r="2.5" fill="#60a5fa"/>
    <circle cx="47" cy="45" r="1.5" fill="white" opacity="0.9"/>
    <circle cx="67" cy="45" r="1.5" fill="white" opacity="0.9"/>
    
    <!-- Antenna -->
    <rect x="58" y="18" width="4" height="14" rx="2" fill="#be123c"/>
    <circle cx="60" cy="15" r="5" fill="#fda4af"/>
    <circle cx="60" cy="14" r="3" fill="#fb7185"/>
    <circle cx="59" cy="13" r="2" fill="white" opacity="0.7"/>
    
    <!-- Robot Body (3D) -->
    <rect x="43" y="72" width="34" height="22" rx="4" fill="#7c2d12" filter="url(#robot-3d-shadow)"/>
    <rect x="43" y="70" width="34" height="22" rx="4" fill="url(#robot-body)"/>
    
    <!-- Body Details (3D panels) -->
    <rect x="48" y="76" width="24" height="3" rx="1.5" fill="white" opacity="0.6"/>
    <rect x="48" y="82" width="18" height="3" rx="1.5" fill="white" opacity="0.5"/>
    <circle cx="67" cy="83" r="2" fill="#fca5a5" opacity="0.8"/>
    
    <!-- Body 3D Highlight -->
    <rect x="45" y="72" width="10" height="8" rx="2" fill="url(#robot-light)" opacity="0.3"/>
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
.icon-robot {
  filter: drop-shadow(0 4px 8px rgba(236, 72, 153, 0.4));
}
</style>

