<template>
  <svg
    class="icon-robot"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <rect x="7" y="9" width="10" height="10" rx="1" ry="1"/>
    <circle cx="12" cy="12" r="2"/>
    <line x1="12" y1="2" x2="12" y2="4"/>
    <line x1="12" y1="20" x2="12" y2="22"/>
    <line x1="2" y1="12" x2="4" y2="12"/>
    <line x1="20" y1="12" x2="22" y2="12"/>
  </svg>
</template>

<script setup lang="ts">
interface Props {
  size?: number | string
}

withDefaults(defineProps<Props>(), {
  size: 24,
})
</script>

<style scoped>
.icon-robot {
  display: inline-block;
  vertical-align: -0.125em;
}
</style>
