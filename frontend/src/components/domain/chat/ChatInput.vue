<template>
  <div class="p-4 border-t border-surface-border bg-surface-card">
    <form @submit.prevent="handleSubmit" class="flex gap-2">
      <BaseInput
        v-model="inputMessage"
        type="text"
        placeholder="메시지를 입력하세요..."
        class="flex-1"
        :disabled="isSending"
      />
      <BaseButton
        type="submit"
        variant="primary"
        :disabled="!inputMessage.trim() || isSending"
        :loading="isSending"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </BaseButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'

const emit = defineEmits<{
  send: [message: string]
}>()

const inputMessage = ref('')
const isSending = ref(false)

async function handleSubmit(): Promise<void> {
  if (!inputMessage.value.trim() || isSending.value) return
  
  const message = inputMessage.value.trim()
  inputMessage.value = ''
  isSending.value = true
  
  try {
    emit('send', message)
  } finally {
    // Reset after a short delay to show loading state
    setTimeout(() => {
      isSending.value = false
    }, 500)
  }
}
</script>

