<template>
  <CenteredLayout>
    <div class="text-center space-y-6">
      <!-- Logo -->
      <div class="flex justify-center">
        <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
          <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
        </div>
      </div>
      
      <!-- Title -->
      <div>
        <h1 class="text-h2 font-bold text-primary-600 mb-2">
          로그인
        </h1>
        <p class="text-body-md text-text-secondary">
          Google 계정으로 간편하게 시작하세요
        </p>
      </div>
      
      <!-- Login Button -->
      <div class="pt-4">
        <GoogleLoginButton />
      </div>
      
      <!-- Additional Info -->
      <p class="text-body-sm text-text-secondary">
        로그인하면 <a href="#" class="text-primary-600 hover:underline">서비스 약관</a> 및
        <a href="#" class="text-primary-600 hover:underline">개인정보 처리방침</a>에 동의하게 됩니다.
      </p>
    </div>
  </CenteredLayout>
</template>

<script setup lang="ts">
import CenteredLayout from '@/layouts/CenteredLayout.vue'
import GoogleLoginButton from '@/components/domain/auth/GoogleLoginButton.vue'
</script>

