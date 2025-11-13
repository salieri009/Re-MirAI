import axios from 'axios'
import type { AxiosInstance } from 'axios'

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor: Inject authentication token
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response Interceptor: Handle global errors
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      const status = error.response.status
      
      // Auth errors (401/403)
      if (status === 401 || status === 403) {
        // Clear token and redirect to login
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')
        window.location.href = '/auth'
      }
      
      // Server errors (5xx)
      if (status >= 500) {
        console.error('Server error:', error.response.data)
      }
    }
    
    return Promise.reject(error)
  }
)

export default apiClient

