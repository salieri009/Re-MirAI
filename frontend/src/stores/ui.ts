import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Notification {
  message: string
  type: 'success' | 'error'
}

export const useUiStore = defineStore('ui', () => {
  // State
  const isLoading = ref<boolean>(false)
  const notification = ref<Notification | null>(null)

  // Actions
  function setLoading(status: boolean): void {
    isLoading.value = status
  }

  function showNotification(config: Notification): void {
    notification.value = config
    
    // Auto-clear after 5 seconds
    setTimeout(() => {
      clearNotification()
    }, 5000)
  }

  function clearNotification(): void {
    notification.value = null
  }

  return {
    isLoading,
    notification,
    setLoading,
    showNotification,
    clearNotification,
  }
})

