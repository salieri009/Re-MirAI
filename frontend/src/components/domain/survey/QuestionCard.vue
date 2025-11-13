<template>
  <BaseCard>
    <h3 class="text-body-lg font-semibold mb-4">{{ question.text }}</h3>
    
    <!-- Text Input -->
    <BaseInput
      v-if="question.type === 'text'"
      v-model="answer"
      type="textarea"
      placeholder="답변을 입력하세요..."
      @update:model-value="emitAnswer"
    />
    
    <!-- Scale/Choice Options -->
    <div v-else-if="question.type === 'scale' || question.type === 'choice'" class="space-y-2">
      <label
        v-for="(option, index) in question.options"
        :key="index"
        class="flex items-center p-3 border border-surface-border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
        :class="{ 'bg-primary-50 border-primary-500': answer === String(index) }"
      >
        <input
          v-model="answer"
          type="radio"
          :name="`question-${question.id}`"
          :value="String(index)"
          class="mr-3"
          @change="emitAnswer"
        />
        <span class="text-body-md">{{ option }}</span>
      </label>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Question } from '@/types'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseInput from '@/components/base/BaseInput.vue'

interface Props {
  question: Question
  modelValue?: string | number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  answer: [payload: { questionId: string; value: any }]
}>()

const answer = ref<string | number>(props.modelValue || '')

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== undefined) {
      answer.value = newValue
    }
  }
)

function emitAnswer(): void {
  emit('update:modelValue', answer.value)
  emit('answer', {
    questionId: props.question.id,
    value: answer.value,
  })
}
</script>

