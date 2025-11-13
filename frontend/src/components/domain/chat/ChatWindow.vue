<template>
  <div class="flex flex-col h-full bg-surface-card rounded-lg border border-surface-border">
    <!-- Chat History -->
    <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-4">
      <ChatMessage
        v-for="(msg, index) in messages"
        :key="index"
        :message="msg"
      />
      
      <!-- Empty State -->
      <div v-if="messages.length === 0" class="flex items-center justify-center h-full">
        <p class="text-text-secondary text-center">
          아직 메시지가 없습니다.<br />
          대화를 시작해보세요!
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import type { Message } from '@/types'
import ChatMessage from './ChatMessage.vue'

interface Props {
  messages: Message[]
}

const props = defineProps<Props>()

const chatContainer = ref<HTMLElement | null>(null)

// Auto-scroll to bottom when new messages arrive
watch(
  () => props.messages.length,
  async () => {
    await nextTick()
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  }
)
</script>

