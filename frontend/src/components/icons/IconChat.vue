<!-- 3D Chat/Dialogue Icon - 3dicons.co Style -->
<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 120 120" 
    :width="size" 
    :height="size"
    class="icon-chat"
    aria-hidden="true"
  >
    <defs>
      <!-- 3D Gradients -->
      <linearGradient id="chat-main" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#d946ef;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#c026d3;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#a21caf;stop-opacity:1" />
      </linearGradient>
      <linearGradient id="chat-light" x1="20%" y1="20%" x2="80%" y2="80%">
        <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.7" />
        <stop offset="100%" style="stop-color:#f5d0fe;stop-opacity:0.1" />
      </linearGradient>
      <filter id="chat-3d-shadow">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
        <feOffset dx="0" dy="5" result="offsetblur"/>
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.35"/>
        </feComponentTransfer>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <!-- Shadow -->
    <ellipse cx="60" cy="92" rx="40" ry="5" fill="#4a044e" opacity="0.3"/>
    
    <!-- Chat Bubble (3D depth) -->
    <path 
      d="M 25 40 Q 25 28 35 28 L 75 28 Q 85 28 85 40 L 85 65 Q 85 75 75 75 L 55 75 L 45 88 L 48 75 L 35 75 Q 25 75 25 65 Z" 
      fill="#701a75" 
      filter="url(#chat-3d-shadow)"
    />
    <path 
      d="M 25 38 Q 25 26 35 26 L 75 26 Q 85 26 85 38 L 85 63 Q 85 73 75 73 L 55 73 L 45 86 L 48 73 L 35 73 Q 25 73 25 63 Z" 
      fill="url(#chat-main)"
    />
    
    <!-- Inner Glow -->
    <path 
      d="M 30 38 Q 30 31 37 31 L 73 31 Q 80 31 80 38 L 80 63 Q 80 68 75 68 L 55 68 L 48 78 L 50 68 L 37 68 Q 30 68 30 63 Z" 
      fill="url(#chat-light)"
      opacity="0.3"
    />
    
    <!-- Chat Lines (3D effect) -->
    <rect x="38" y="42" width="34" height="3" rx="1.5" fill="white" opacity="0.7"/>
    <rect x="38" y="52" width="26" height="3" rx="1.5" fill="white" opacity="0.6"/>
    <rect x="38" y="62" width="30" height="3" rx="1.5" fill="white" opacity="0.5"/>
    
    <!-- 3D Highlight -->
    <ellipse cx="40" cy="38" rx="10" ry="8" fill="white" opacity="0.4"/>
    
    <!-- Decorative Dots -->
    <circle cx="65" cy="42" r="2" fill="#fae8ff" opacity="0.8"/>
    <circle cx="70" cy="42" r="2" fill="#f5d0fe" opacity="0.7"/>
    <circle cx="75" cy="42" r="2" fill="#f0abfc" opacity="0.6"/>
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
.icon-chat {
  filter: drop-shadow(0 4px 8px rgba(168, 85, 247, 0.4));
}
</style>

