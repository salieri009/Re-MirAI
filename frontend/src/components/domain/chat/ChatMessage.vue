<template>
  <div :class="messageContainerClass">
    <div :class="messageBubbleClass">
      <p class="text-body-md whitespace-pre-wrap">{{ message.message }}</p>
      <span class="text-caption text-gray-500 mt-1 block">
        {{ formattedTime }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Message } from '@/types'

interface Props {
  message: Message
}

const props = defineProps<Props>()

const messageContainerClass = computed(() => {
  return props.message.sender === 'user'
    ? 'flex justify-end'
    : 'flex justify-start'
})

const messageBubbleClass = computed(() => {
  const baseClasses = 'max-w-[70%] px-4 py-3 rounded-lg'
  
  if (props.message.sender === 'user') {
    return `${baseClasses} bg-primary-600 text-white`
  } else {
    return `${baseClasses} bg-gray-100 text-text-primary`
  }
})

const formattedTime = computed(() => {
  const date = new Date(props.message.timestamp)
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  })
})
</script>

