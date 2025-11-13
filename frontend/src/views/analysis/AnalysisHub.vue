<template>
  <DefaultLayout>
    <div class="max-w-2xl mx-auto space-y-6">
      <div class="text-center mb-8">
        <h1 class="text-h2 font-bold text-primary-600 mb-2">
          프로필 분석
        </h1>
        <p class="text-body-lg text-text-secondary">
          친구들의 답변을 모아 당신만의 AI 페르소나를 만드세요
        </p>
      </div>
      
      <!-- Initial State: Create Analysis -->
      <div v-if="analysisStore.status === 'idle'" class="text-center">
        <BaseCard>
          <div class="py-8">
            <svg class="w-20 h-20 mx-auto text-primary-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <h2 class="text-h4 font-semibold mb-2">프로필 분석 링크 만들기</h2>
            <p class="text-body-md text-text-secondary mb-6">
              친구들에게 공유할 링크를 생성합니다
            </p>
            <BaseButton
              variant="primary"
              size="lg"
              :loading="isCreating"
              @click="createAnalysis"
            >
              링크 생성하기
            </BaseButton>
          </div>
        </BaseCard>
      </div>
      
      <!-- Collecting State: Show Progress -->
      <template v-else-if="analysisStore.status === 'collecting'">
        <ShareLinkCard :url="analysisStore.shareUrl || ''" />
        <ResponseTracker
          :current="analysisStore.responseCount"
          :required="REQUIRED_RESPONSES"
        />
        
        <BaseCard>
          <div class="text-center py-4">
            <p class="text-body-md text-text-secondary mb-4">
              최소 {{ REQUIRED_RESPONSES }}명의 친구 답변이 필요합니다
            </p>
            <BaseButton
              variant="secondary"
              :disabled="true"
            >
              페르소나 생성하기
            </BaseButton>
          </div>
        </BaseCard>
      </template>
      
      <!-- Ready State: Generate Persona -->
      <template v-else-if="analysisStore.status === 'ready_to_generate'">
        <ShareLinkCard :url="analysisStore.shareUrl || ''" />
        <ResponseTracker
          :current="analysisStore.responseCount"
          :required="REQUIRED_RESPONSES"
        />
        
        <BaseCard>
          <div class="text-center py-8">
            <svg class="w-16 h-16 mx-auto text-success mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <h2 class="text-h4 font-semibold mb-2 text-success">준비 완료!</h2>
            <p class="text-body-md text-text-secondary mb-6">
              충분한 답변이 모였습니다. 이제 AI 페르소나를 생성할 수 있습니다!
            </p>
            <BaseButton
              variant="primary"
              size="lg"
              @click="goToReveal"
            >
              페르소나 생성하기
            </BaseButton>
          </div>
        </BaseCard>
      </template>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import ShareLinkCard from '@/components/domain/analysis/ShareLinkCard.vue'
import ResponseTracker from '@/components/domain/analysis/ResponseTracker.vue'
import { useAnalysisStore } from '@/stores/analysis'
import { useUiStore } from '@/stores/ui'

const router = useRouter()
const analysisStore = useAnalysisStore()
const uiStore = useUiStore()

const REQUIRED_RESPONSES = 5
const isCreating = ref(false)
let pollInterval: number | null = null

onMounted(async () => {
  // Try to fetch existing analysis status
  try {
    await analysisStore.fetchAnalysisStatus()
    
    // Start polling if in collecting state
    if (analysisStore.status === 'collecting') {
      startPolling()
    }
  } catch (error) {
    // No existing analysis, that's fine
    console.log('No existing analysis found')
  }
})

async function createAnalysis(): Promise<void> {
  isCreating.value = true
  
  try {
    await analysisStore.createNewAnalysis()
    
    uiStore.showNotification({
      message: '링크가 생성되었습니다!',
      type: 'success',
    })
    
    startPolling()
  } catch (error) {
    console.error('Failed to create analysis:', error)
    uiStore.showNotification({
      message: '링크 생성에 실패했습니다.',
      type: 'error',
    })
  } finally {
    isCreating.value = false
  }
}

function startPolling(): void {
  // Poll every 5 seconds
  pollInterval = window.setInterval(async () => {
    try {
      await analysisStore.fetchAnalysisStatus()
      
      // Stop polling if ready
      if (analysisStore.status === 'ready_to_generate' && pollInterval) {
        clearInterval(pollInterval)
        pollInterval = null
      }
    } catch (error) {
      console.error('Polling error:', error)
    }
  }, 5000)
}

function goToReveal(): void {
  router.push('/persona/reveal')
}
</script>

