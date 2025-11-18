<template>
  <Card variant="default" size="lg">
    <!-- Header -->
    <template #header>
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-lg font-semibold text-slate-900">{{ title }}</h2>
          <p v-if="description" class="text-sm text-slate-600">{{ description }}</p>
        </div>
        <span class="text-xs font-medium text-indigo-600">
          {{ currentQuestion + 1 }} / {{ questions.length }}
        </span>
      </div>
    </template>

    <!-- Progress Bar -->
    <div v-if="showProgress" class="mb-6 h-1 bg-slate-200">
      <div
        class="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300"
        :style="{ width: `${progress}%` }"
      />
    </div>

    <!-- Current Question -->
    <div v-if="!isComplete" class="space-y-4">
      <div>
        <h3 class="mb-4 text-base font-medium text-slate-900">
          {{ currentQuestionData?.question }}
        </h3>

        <!-- Question Type: Text Input -->
        <FormField
          v-if="currentQuestionData?.type === 'text'"
          :id="`q-${currentQuestion}`"
          :model-value="formData[currentQuestion]"
          :type="currentQuestionData?.inputType || 'text'"
          :placeholder="currentQuestionData?.placeholder"
          :error="errors[currentQuestion]"
          :required="currentQuestionData?.required"
          @update:model-value="updateAnswer"
        />

        <!-- Question Type: Multiple Choice -->
        <div v-else-if="currentQuestionData?.type === 'choice'" class="space-y-2">
          <label
            v-for="(option, idx) in currentQuestionData?.options"
            :key="idx"
            class="flex items-center gap-3 rounded p-2 hover:bg-slate-50"
          >
            <input
              :id="`choice-${idx}`"
              type="radio"
              :value="option"
              :model-value="formData[currentQuestion]"
              :name="`question-${currentQuestion}`"
              class="h-4 w-4 border-slate-300 text-indigo-600 focus:ring-indigo-500"
              @update:model-value="updateAnswer"
            />
            <span class="text-sm text-slate-700">{{ option }}</span>
          </label>
        </div>

        <!-- Question Type: Checkbox (Multiple Select) -->
        <div v-else-if="currentQuestionData?.type === 'checkbox'" class="space-y-2">
          <label
            v-for="(option, idx) in currentQuestionData?.options"
            :key="idx"
            class="flex items-center gap-3 rounded p-2 hover:bg-slate-50"
          >
            <input
              :id="`checkbox-${idx}`"
              type="checkbox"
              :value="option"
              :checked="(formData[currentQuestion] as string[])?.includes(option)"
              :name="`question-${currentQuestion}`"
              class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              @change="updateMultiSelect($event, option)"
            />
            <span class="text-sm text-slate-700">{{ option }}</span>
          </label>
        </div>

        <!-- Question Type: Rating Scale -->
        <div v-else-if="currentQuestionData?.type === 'rating'" class="flex gap-2">
          <button
            v-for="i in (currentQuestionData?.scale || 5)"
            :key="i"
            :aria-pressed="formData[currentQuestion] === i"
            :class="[
              'h-10 w-10 rounded border-2 font-semibold transition-colors',
              formData[currentQuestion] === i
                ? 'border-indigo-600 bg-indigo-600 text-white'
                : 'border-slate-300 bg-white text-slate-900 hover:border-indigo-400',
            ]"
            @click="updateAnswer(i)"
          >
            {{ i }}
          </button>
        </div>
      </div>
    </div>

    <!-- Completion Message -->
    <div v-else class="space-y-4 text-center">
      <div class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <svg
          class="h-8 w-8 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-slate-900">{{ completionTitle }}</h3>
      <p class="text-sm text-slate-600">{{ completionMessage }}</p>
    </div>

    <!-- Footer Actions -->
    <template #footer>
      <div class="flex items-center justify-between gap-3">
        <Button
          v-if="!isComplete && currentQuestion > 0"
          variant="ghost"
          @click="previousQuestion"
        >
          ← Previous
        </Button>
        <div v-else />

        <Button
          v-if="!isComplete"
          :disabled="!canProceed"
          :loading="isSubmitting"
          @click="nextQuestion"
        >
          {{ currentQuestion === questions.length - 1 ? 'Complete' : 'Next' }} →
        </Button>
        <Button v-else variant="primary" @click="$emit('complete', formData)">
          {{ actionButtonLabel }}
        </Button>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Card, FormField } from '../molecules'
import { Button } from '../atoms'

export interface Question {
  type: 'text' | 'choice' | 'checkbox' | 'rating'
  question: string
  placeholder?: string
  inputType?: 'text' | 'email' | 'tel' | 'number'
  options?: string[]
  scale?: number
  required?: boolean
  validator?: (value: unknown) => boolean | string
}

interface Props {
  title: string
  description?: string
  questions: Question[]
  showProgress?: boolean
  completionTitle?: string
  completionMessage?: string
  actionButtonLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  showProgress: true,
  completionTitle: 'Survey Complete!',
  completionMessage: 'Thank you for completing this survey.',
  actionButtonLabel: 'Continue',
})

const emit = defineEmits<{
  complete: [formData: Record<number, unknown>]
  questionChanged: [questionIndex: number]
}>()

// State
const currentQuestion = ref(0)
const isComplete = ref(false)
const isSubmitting = ref(false)
const formData = ref<Record<number, unknown>>({})
const errors = ref<Record<number, string>>({})

// Computed
const currentQuestionData = computed(() => props.questions[currentQuestion.value])

const progress = computed(() => {
  const total = props.questions.length
  const answered = currentQuestion.value + 1
  return (answered / total) * 100
})

const canProceed = computed(() => {
  const question = currentQuestionData.value
  const answer = formData.value[currentQuestion.value]

  if (question?.required && !answer) {
    return false
  }

  if (question?.validator) {
    const validationResult = question.validator(answer)
    return validationResult === true
  }

  return true
})

// Methods
const updateAnswer = (value: unknown) => {
  formData.value[currentQuestion.value] = value
  errors.value[currentQuestion.value] = ''
  validateQuestion(currentQuestion.value)
}

const updateMultiSelect = (event: Event, option: string) => {
  const target = event.target as HTMLInputElement
  const current = (formData.value[currentQuestion.value] as string[]) || []

  if (target.checked) {
    formData.value[currentQuestion.value] = [...current, option]
  } else {
    formData.value[currentQuestion.value] = current.filter((item) => item !== option)
  }

  errors.value[currentQuestion.value] = ''
}

const validateQuestion = (index: number) => {
  const question = props.questions[index]
  const answer = formData.value[index]

  if (question?.required && !answer) {
    errors.value[index] = 'This field is required'
    return false
  }

  if (question?.validator) {
    const result = question.validator(answer)
    if (result !== true) {
      errors.value[index] = typeof result === 'string' ? result : 'Invalid answer'
      return false
    }
  }

  errors.value[index] = ''
  return true
}

const nextQuestion = async () => {
  if (!validateQuestion(currentQuestion.value)) {
    return
  }

  if (currentQuestion.value === props.questions.length - 1) {
    // Last question - complete the survey
    isSubmitting.value = true
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate submission
    isComplete.value = true
    isSubmitting.value = false
  } else {
    // Move to next question
    currentQuestion.value++
    emit('questionChanged', currentQuestion.value)
  }
}

const previousQuestion = () => {
  if (currentQuestion.value > 0) {
    currentQuestion.value--
    emit('questionChanged', currentQuestion.value)
  }
}

// Watch for external question changes
watch(
  () => props.questions.length,
  () => {
    // Reset if questions change
    currentQuestion.value = 0
    isComplete.value = false
    formData.value = {}
    errors.value = {}
  }
)
</script>
