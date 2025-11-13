<template>
  <CenteredLayout>
    <div v-if="loading" class="text-center py-12">
      <BaseSpinner size="lg" class="mx-auto mb-4" />
      <p class="text-body-md text-text-secondary">로딩 중...</p>
    </div>
    
    <div v-else-if="!submitted" class="space-y-6">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-h3 font-bold text-primary-600 mb-2">
          {{ creatorName }}님의 페르소나 만들기
        </h1>
        <p class="text-body-md text-text-secondary">
          친구에 대한 솔직한 답변을 작성해주세요
        </p>
      </div>
      
      <!-- Questions -->
      <form @submit.prevent="submitSurvey" class="space-y-4">
        <QuestionCard
          v-for="question in questions"
          :key="question.id"
          :question="question"
          v-model="answers[question.id]"
        />
        
        <div class="pt-4">
          <BaseButton
            type="submit"
            variant="primary"
            size="lg"
            class="w-full"
            :loading="isSubmitting"
            :disabled="!isFormComplete"
          >
            답변 제출하기
          </BaseButton>
        </div>
      </form>
    </div>
    
    <!-- Thank You State -->
    <div v-else class="text-center space-y-6">
      <div class="py-8">
        <svg class="w-20 h-20 mx-auto text-success mb-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        
        <h2 class="text-h3 font-bold text-success mb-2">
          답변 완료!
        </h2>
        <p class="text-body-lg text-text-secondary mb-8">
          {{ creatorName }}님의 페르소나 생성에 도움을 주셨습니다
        </p>
        
        <div class="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-6">
          <h3 class="text-h5 font-semibold text-primary-600 mb-2">
            당신도 해보세요!
          </h3>
          <p class="text-body-md text-text-secondary mb-4">
            친구들이 보는 당신의 모습을<br />
            AI 페르소나로 만나보세요
          </p>
          <BaseButton
            variant="primary"
            size="lg"
            @click="goToAuth"
          >
            내 페르소나 만들기
          </BaseButton>
        </div>
      </div>
    </div>
  </CenteredLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CenteredLayout from '@/layouts/CenteredLayout.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseSpinner from '@/components/base/BaseSpinner.vue'
import QuestionCard from '@/components/domain/survey/QuestionCard.vue'
import { getAnalysis, submitResponses } from '@/api/endpoints/analyses'
import { useUiStore } from '@/stores/ui'
import type { Question } from '@/types'

const route = useRoute()
const router = useRouter()
const uiStore = useUiStore()

const loading = ref(true)
const isSubmitting = ref(false)
const submitted = ref(false)
const creatorName = ref('')
const questions = ref<Question[]>([])
const answers = ref<Record<string, any>>({})

const analysisId = computed(() => route.params.analysisId as string)

const isFormComplete = computed(() => {
  return questions.value.every(q => {
    const answer = answers.value[q.id]
    return answer !== undefined && answer !== '' && answer !== null
  })
})

onMounted(async () => {
  try {
    const response = await getAnalysis(analysisId.value)
    creatorName.value = response.creatorName
    questions.value = response.questions
  } catch (error) {
    console.error('Failed to load survey:', error)
    uiStore.showNotification({
      message: '설문을 불러오는데 실패했습니다.',
      type: 'error',
    })
  } finally {
    loading.value = false
  }
})

async function submitSurvey(): Promise<void> {
  if (!isFormComplete.value) return
  
  isSubmitting.value = true
  
  try {
    await submitResponses(analysisId.value, answers.value)
    
    submitted.value = true
    
    uiStore.showNotification({
      message: '답변이 제출되었습니다!',
      type: 'success',
    })
  } catch (error) {
    console.error('Failed to submit survey:', error)
    uiStore.showNotification({
      message: '답변 제출에 실패했습니다.',
      type: 'error',
    })
  } finally {
    isSubmitting.value = false
  }
}

function goToAuth(): void {
  router.push('/auth')
}
</script>

