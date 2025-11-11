<template>
  <div class="container-page">
    <div v-if="isLoading && chatHistory.length === 0" class="flex justify-center items-center min-h-screen">
      <LoadingSpinner size="lg" />
    </div>

    <div v-else class="max-w-4xl mx-auto space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gradient">Chat with {{ persona?.name || 'Your Persona' }}</h1>
          <p class="text-secondary">{{ persona?.archetype }} Type</p>
        </div>
        <Button variant="ghost" @click="goToRoom">Back to Room</Button>
      </div>

      <!-- Chat Messages -->
      <div class="card h-96 overflow-y-auto space-y-4" ref="chatContainer">
        <div
          v-for="(message, index) in chatHistory"
          :key="index"
          :class="[
            'flex',
            message.sender === 'user' ? 'justify-end' : 'justify-start',
          ]"
        >
          <div
            :class="[
              'max-w-xs md:max-w-md rounded-lg p-4',
              message.sender === 'user'
                ? 'bg-indigo-600 text-white'
                : 'bg-card text-white border border-gray-700',
            ]"
          >
            <p class="whitespace-pre-wrap">{{ message.message }}</p>
            <p class="text-xs opacity-70 mt-2">
              {{ formatTime(message.timestamp) }}
            </p>
          </div>
        </div>

        <div v-if="isSending" class="flex justify-start">
          <div class="bg-card rounded-lg p-4 border border-gray-700">
            <LoadingSpinner size="sm" />
          </div>
        </div>
      </div>

      <!-- Message Input -->
      <div class="card">
        <form @submit.prevent="sendMessage" class="flex gap-4">
          <input
            v-model="messageInput"
            type="text"
            placeholder="Type your message..."
            class="input flex-1"
            :disabled="isSending"
          />
          <Button type="submit" :disabled="!messageInput.trim() || isSending" :loading="isSending">
            Send
          </Button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import { usePersonaStore } from '@/stores/persona'
import Button from '@/components/common/Button.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const router = useRouter()
const personaStore = usePersonaStore()

const messageInput = ref('')
const isSending = ref(false)
const chatContainer = ref<HTMLElement | null>(null)

const isLoading = computed(() => personaStore.isLoading)
const persona = computed(() => {
  if (personaStore.persona && 'status' in personaStore.persona && personaStore.persona.status === 'ready') {
    return personaStore.persona
  }
  return null
})
const chatHistory = computed(() => personaStore.chatHistory)

onMounted(async () => {
  await personaStore.fetchChatHistory()
  scrollToBottom()
})

watch(chatHistory, () => {
  nextTick(() => {
    scrollToBottom()
  })
})

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const sendMessage = async () => {
  if (!messageInput.value.trim() || isSending.value) return

  const message = messageInput.value.trim()
  messageInput.value = ''

  isSending.value = true
  try {
    await personaStore.sendMessage(message)
  } catch (err) {
    console.error('Failed to send message:', err)
    messageInput.value = message // Restore message on error
  } finally {
    isSending.value = false
  }
}

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

const goToRoom = () => {
  if (persona.value) {
    router.push(`/room/${persona.value.id}`)
  }
}
</script>