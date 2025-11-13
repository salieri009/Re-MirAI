<template>
  <CenteredLayout>
    <div class="text-center space-y-6">
      <div class="text-9xl font-bold text-primary-600">404</div>
      <h1 class="text-h2 font-bold text-text-primary">
        페이지를 찾을 수 없습니다
      </h1>
      <p class="text-body-lg text-text-secondary">
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
      </p>
      <BaseButton variant="primary" size="lg" @click="goHome">
        홈으로 돌아가기
      </BaseButton>
    </div>
  </CenteredLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import CenteredLayout from '@/layouts/CenteredLayout.vue'
import BaseButton from '@/components/base/BaseButton.vue'

const router = useRouter()

function goHome(): void {
  router.push('/')
}
</script>

