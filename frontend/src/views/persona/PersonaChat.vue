<template>
  <DefaultLayout>
    <div v-if="loading" class="text-center py-12">
      <BaseSpinner size="lg" class="mx-auto mb-4" />
      <p class="text-body-md text-text-secondary">페르소나를 불러오는 중...</p>
    </div>
    
    <div v-else-if="personaStore.persona" class="space-y-6">
      <!-- Persona Header -->
      <PersonaHeader :persona="personaStore.persona" />
      
      <!-- Chat Interface -->
      <div class="grid lg:grid-cols-1 gap-6">
        <BaseCard class="p-0 overflow-hidden">
          <div class="h-[600px] flex flex-col">
            <!-- Chat Window -->
            <div class="flex-1 overflow-hidden">
              <ChatWindow :messages="personaStore.chatHistory" />
            </div>
            
            <!-- Chat Input -->
            <ChatInput @send="handleSendMessage" />
          </div>
        </BaseCard>
      </div>
    </div>
    
    <div v-else class="text-center py-12">
      <p class="text-body-lg text-text-secondary mb-6">
        페르소나를 찾을 수 없습니다.
      </p>
      <BaseButton variant="primary" @click="goToAnalysis">
        분석 페이지로 돌아가기
      </BaseButton>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseSpinner from '@/components/base/BaseSpinner.vue'
import PersonaHeader from '@/components/domain/persona/PersonaHeader.vue'
import ChatWindow from '@/components/domain/chat/ChatWindow.vue'
import ChatInput from '@/components/domain/chat/ChatInput.vue'
import { usePersonaStore } from '@/stores/persona'
import { useUiStore } from '@/stores/ui'

const router = useRouter()
const personaStore = usePersonaStore()
const uiStore = useUiStore()

const loading = ref(true)

onMounted(async () => {
  try {
    // Fetch persona if not already loaded
    if (!personaStore.persona) {
      await personaStore.fetchPersona()
    }
    
    // Fetch chat history if empty
    if (personaStore.chatHistory.length === 0) {
      await personaStore.fetchChatHistory()
    }
  } catch (error) {
    console.error('Failed to load persona:', error)
    uiStore.showNotification({
      message: '페르소나를 불러오는데 실패했습니다.',
      type: 'error',
    })
  } finally {
    loading.value = false
  }
})

async function handleSendMessage(message: string): Promise<void> {
  try {
    await personaStore.sendChatMessage(message)
  } catch (error) {
    console.error('Failed to send message:', error)
    uiStore.showNotification({
      message: '메시지 전송에 실패했습니다.',
      type: 'error',
    })
  }
}

function goToAnalysis(): void {
  router.push('/analysis')
}
</script>

