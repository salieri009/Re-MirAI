import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createAnalysis, getAnalysisStatus } from '@/api/endpoints/analyses'

export const useAnalysisStore = defineStore('analysis', () => {
  // State
  const analysisId = ref<string | null>(null)
  const shareUrl = ref<string | null>(null)
  const responseCount = ref<number>(0)
  const status = ref<'idle' | 'collecting' | 'ready_to_generate'>('idle')

  // Actions
  async function createNewAnalysis(): Promise<void> {
    try {
      // Real API call (will use mock in Phase 1)
      const response = await createAnalysis()
      
      analysisId.value = response.analysisId
      shareUrl.value = response.shareUrl
      status.value = 'collecting'
      responseCount.value = 0
    } catch (error) {
      console.error('Failed to create analysis:', error)
      throw error
    }
  }

  async function fetchAnalysisStatus(): Promise<void> {
    try {
      // Real API call (will use mock in Phase 1)
      const response = await getAnalysisStatus()
      
      analysisId.value = response.analysisId
      responseCount.value = response.responseCount
      status.value = response.status
    } catch (error) {
      console.error('Failed to fetch analysis status:', error)
      throw error
    }
  }

  function reset(): void {
    analysisId.value = null
    shareUrl.value = null
    responseCount.value = 0
    status.value = 'idle'
  }

  return {
    analysisId,
    shareUrl,
    responseCount,
    status,
    createNewAnalysis,
    fetchAnalysisStatus,
    reset,
  }
})

