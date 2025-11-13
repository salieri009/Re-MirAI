<script setup lang="ts">
import { computed } from 'vue'
import { useUiStore } from '@/stores/ui'
import BaseNotification from '@/components/base/BaseNotification.vue'

const uiStore = useUiStore()

const showNotification = computed(() => !!uiStore.notification)
const notificationMessage = computed(() => uiStore.notification?.message || '')
const notificationType = computed(() => uiStore.notification?.type || 'success')
</script>

<template>
  <div id="app">
    <RouterView />
    
    <!-- Global Notification -->
    <BaseNotification
      :show="showNotification"
      :message="notificationMessage"
      :type="notificationType"
    />
  </div>
</template>

<style>
/* Global styles are handled in styles/main.css */
</style>
