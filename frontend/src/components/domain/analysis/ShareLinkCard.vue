<template>
  <BaseCard>
    <h3 class="text-h5 font-semibold mb-4">친구들에게 공유하세요!</h3>
    <div class="flex gap-2">
      <BaseInput
        v-model="url"
        type="text"
        placeholder="Share URL"
        :disabled="true"
        class="flex-1"
      />
      <BaseButton variant="secondary" @click="copyToClipboard">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </BaseButton>
    </div>
    <p class="mt-2 text-sm text-text-secondary">
      이 링크를 친구들에게 공유하여 당신에 대한 분석을 받아보세요!
    </p>
  </BaseCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { useUiStore } from '@/stores/ui'

interface Props {
  url: string
}

const props = defineProps<Props>()
const uiStore = useUiStore()

const url = ref(props.url)

async function copyToClipboard(): Promise<void> {
  try {
    await navigator.clipboard.writeText(url.value)
    uiStore.showNotification({
      message: '링크가 클립보드에 복사되었습니다!',
      type: 'success',
    })
  } catch (error) {
    console.error('Failed to copy:', error)
    uiStore.showNotification({
      message: '복사에 실패했습니다.',
      type: 'error',
    })
  }
}
</script>

