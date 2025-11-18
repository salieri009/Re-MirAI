<template>
  <p 
    v-if="message"
    class="text-xs text-red-500 font-medium mt-1"
    role="alert"
    aria-live="polite"
  >
    {{ message }}
  </p>
</template>

<script setup lang="ts">
interface Props {
  message?: string
}

withDefaults(defineProps<Props>(), {
  message: '',
})
</script>
