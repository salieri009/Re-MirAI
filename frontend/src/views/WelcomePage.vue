<template>
  <CenteredLayout>
    <div class="text-center space-y-8">
      <!-- Logo/Icon -->
      <div class="flex justify-center">
        <div class="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
          <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
        </div>
      </div>
      
      <!-- Hero Text -->
      <div>
        <h1 class="text-display font-bold text-primary-600 mb-4">
          Persona AI
        </h1>
        <p class="text-h4 text-text-primary mb-2">
          친구들이 만드는 나만의 AI 페르소나
        </p>
        <p class="text-body-lg text-text-secondary">
          친구들의 시선으로 바라본 당신의 모습을<br />
          AI 캐릭터로 만나보세요!
        </p>
      </div>
      
      <!-- Features -->
      <div class="grid gap-4 text-left">
        <div class="flex gap-3 items-start">
          <div class="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-text-primary">친구들의 평가</h3>
            <p class="text-body-sm text-text-secondary">링크를 공유하고 친구들의 솔직한 답변을 받아보세요</p>
          </div>
        </div>
        
        <div class="flex gap-3 items-start">
          <div class="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-secondary-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-text-primary">AI 페르소나 생성</h3>
            <p class="text-body-sm text-text-secondary">답변을 기반으로 독특한 AI 캐릭터가 생성됩니다</p>
          </div>
        </div>
        
        <div class="flex gap-3 items-start">
          <div class="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-text-primary">대화하기</h3>
            <p class="text-body-sm text-text-secondary">생성된 AI와 대화하며 자신을 새롭게 발견하세요</p>
          </div>
        </div>
      </div>
      
      <!-- CTA -->
      <div class="pt-4">
        <BaseButton
          variant="primary"
          size="lg"
          class="w-full"
          @click="goToAuth"
        >
          시작하기
        </BaseButton>
      </div>
    </div>
  </CenteredLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import CenteredLayout from '@/layouts/CenteredLayout.vue'
import BaseButton from '@/components/base/BaseButton.vue'

const router = useRouter()

function goToAuth(): void {
  router.push('/auth')
}
</script>

