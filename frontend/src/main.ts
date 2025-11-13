import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import apiClient from './api/client'
import { setupMockApi } from './api/mocks'
import { useAuthStore } from './stores/auth'

// Import global styles
import './styles/main.css'

// Initialize Mock API if enabled
if (import.meta.env.VITE_MOCK_API === 'true') {
  setupMockApi(apiClient)
}

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize auth store to restore session
const authStore = useAuthStore()
authStore.initialize()

app.mount('#app')
