<template>
  <div class="container-page">
    <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
      <LoadingSpinner size="lg" text="Loading survey..." />
    </div>

    <div v-else-if="error" class="card bg-red-900 bg-opacity-20 border-red-500">
      <p class="text-red-400">{{ error }}</p>
    </div>

    <div v-else-if="questions.length > 0 && currentQuestion" class="max-w-2xl mx-auto space-y-8">
      <div class="card text-center">
        <h1 class="text-3xl font-bold text-gradient mb-2">The Ritual</h1>
        <p class="text-secondary">
          You are contributing a perception for {{ creatorName }}'s summoning ritual.
        </p>
        <p class="text-indigo-400 mt-2 font-medium">Complete the ritual to see the result!</p>
      </div>

      <div class="card">
        <div class="mb-6">
          <div class="text-sm text-secondary mb-2">
            Question {{ currentQuestionIndex + 1 }} of {{ questions.length }}
          </div>
          <h2 class="text-2xl font-bold mb-6">{{ currentQuestion.text }}</h2>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <div
            v-for="option in currentQuestion.options"
            :key="option.id"
            class="card cursor-pointer hover:scale-105 transition-transform border-2"
            :class="selectedAnswer === option.id ? 'border-indigo-500' : 'border-gray-700'"
            @click="selectAnswer(option.id)"
          >
            <img
              v-if="option.imageUrl"
              :src="option.imageUrl"
              :alt="option.text"
              class="w-full h-32 object-cover rounded-lg mb-3"
            />
            <p class="font-medium text-center">{{ option.text }}</p>
          </div>
        </div>

        <div class="mt-6 flex justify-between">
          <Button
            variant="ghost"
            :disabled="currentQuestionIndex === 0"
            @click="previousQuestion"
          >
            Previous
          </Button>
          <Button
            :disabled="!selectedAnswer"
            @click="nextQuestion"
          >
            {{ currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next' }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRitualStore } from '@/stores/ritual'
import Button from '@/components/common/Button.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import type { SurveyQuestion } from '@/mocks/data'

const route = useRoute()
const router = useRouter()
const ritualStore = useRitualStore()

const ritualId = route.params.ritualId as string
const creatorName = ref('')
const questions = ref<SurveyQuestion[]>([])
const currentQuestionIndex = ref(0)
const answers = ref<Record<string, string>>({})
const selectedAnswer = ref<string>('')
const isLoading = ref(true)
const error = ref<string | null>(null)

const currentQuestion = computed(() => {
  if (questions.value.length > 0 && currentQuestionIndex.value < questions.value.length) {
    return questions.value[currentQuestionIndex.value]
  }
  return null
})

onMounted(async () => {
  try {
    const response = await ritualStore.fetchRitual(ritualId)
    creatorName.value = response.creatorName
    questions.value = response.questions
    // Restore previous answer if exists
    if (currentQuestion.value) {
      selectedAnswer.value = answers.value[currentQuestion.value.id] || ''
    }
  } catch (err) {
    error.value = 'Failed to load survey'
    console.error('Failed to load survey:', err)
  } finally {
    isLoading.value = false
  }
})

const selectAnswer = (optionId: string) => {
  selectedAnswer.value = optionId
  if (currentQuestion.value?.id) {
    answers.value[currentQuestion.value.id] = optionId
  }
}

const nextQuestion = async () => {
  if (!selectedAnswer.value || !currentQuestion.value) return

  answers.value[currentQuestion.value.id] = selectedAnswer.value

  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++
    const nextQuestion = currentQuestion.value
    selectedAnswer.value = nextQuestion ? answers.value[nextQuestion.id] || '' : ''
  } else {
    // Submit
    await submitSurvey()
  }
}

const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
    const prevQuestion = currentQuestion.value
    selectedAnswer.value = prevQuestion ? answers.value[prevQuestion.id] || '' : ''
  }
}

const submitSurvey = async () => {
  isLoading.value = true
  try {
    const response = await ritualStore.submitResponse(ritualId, answers.value)
    router.push(response.resultUrl)
  } catch (err) {
    error.value = 'Failed to submit survey'
    console.error('Failed to submit survey:', err)
  } finally {
    isLoading.value = false
  }
}
</script>