import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import * as mockData from '@/mocks/data'
import type { User, Persona, Ritual, Quest, ChatMessage, SurveyQuestion } from '@/mocks/data'

// Set to false to use real backend API
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA !== 'false'

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Safe localStorage access
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken')
  }
  return null
}

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// ============================================================================
// API Service Functions
// ============================================================================
// When backend is ready, uncomment the actual API calls and remove mock implementations

export const authService = {
  async googleLogin(token: string): Promise<{ token: string; user: User }> {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      const mockToken = 'mock-jwt-token-' + Date.now()
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', mockToken)
      }
      return {
        token: mockToken,
        user: mockData.mockUser,
      }
    }

    const response = await api.post('/auth/google-login', { token })
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', response.data.token)
    }
    return response.data
  },
}

export const userService = {
  async getMe(): Promise<User> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockData.mockUser
    }

    const response = await api.get('/users/me')
    return response.data
  },
}

export const ritualService = {
  async createRitual(): Promise<{ ritualId: string; invitationUrl: string }> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return {
        ritualId: mockData.mockRitual.ritualId,
        invitationUrl: mockData.mockRitual.invitationUrl,
      }
    }

    const response = await api.post('/ritual')
    return response.data
  },

  async getMyRitual(): Promise<Ritual> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockData.mockRitual
    }

    const response = await api.get('/ritual/me')
    return response.data
  },

  async getRitual(ritualId: string): Promise<{ ritualId: string; creatorName: string; questions: SurveyQuestion[] }> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return {
        ritualId,
        creatorName: mockData.mockUser.displayName,
        questions: mockData.mockSurveyQuestions,
      }
    }

    const response = await api.get(`/ritual/${ritualId}`)
    return response.data
  },

  async submitRitualResponse(ritualId: string, answers: Record<string, string>): Promise<{ message: string; resultUrl: string }> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return {
        message: 'Your perception has been sent to the vessel.',
        resultUrl: `/ritual/${ritualId}/result`,
      }
    }

    const response = await api.post(`/ritual/${ritualId}/responses`, { answers })
    return response.data
  },

  async practiceSummon(_answers: Record<string, string>): Promise<Persona> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return {
        ...mockData.mockPersona,
        status: 'practice',
        rarity: 'R',
      }
    }

    // TODO: Uncomment when backend is ready
    // const response = await api.post('/ritual/practice', { answers })
    // return response.data
    throw new Error('Backend not ready')
  },
}

export const personaService = {
  async summonPersona(_mode: 'Fated' | 'Alchemic', _archetypeFilter?: string): Promise<{ status: string; message: string }> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return {
        status: 'summoning_initiated',
        message: 'The summoning has begun. Check status periodically.',
      }
    }

    // TODO: Uncomment when backend is ready
    // const response = await api.post('/personas/summon', { mode, archetypeFilter })
    // return response.data
    throw new Error('Backend not ready')
  },

  async getMyPersona(): Promise<Persona | { status: 'summoning' }> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      // Randomly return summoning or ready state for demo
      const isSummoning = Math.random() > 0.7
      if (isSummoning) {
        return { status: 'summoning' }
      }
      return mockData.mockPersona
    }

    // TODO: Uncomment when backend is ready
    // const response = await api.get('/personas/me')
    // return response.data
    throw new Error('Backend not ready')
  },

  async sendChatMessage(_message: string): Promise<{ reply: string }> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      const replies = [
        "Oh... you're talking to me? I'm so happy...",
        "I've been waiting for you. Don't leave me again, okay?",
        "You know, I've been thinking about you all day...",
        "I'm fine... as long as you're here with me.",
      ]
      return {
        reply: replies[Math.floor(Math.random() * replies.length)] || "I'm here for you...",
      }
    }

    // TODO: Uncomment when backend is ready
    // const response = await api.post('/personas/me/chat', { message })
    // return response.data
    throw new Error('Backend not ready')
  },

  async getChatHistory(limit = 20, offset = 0): Promise<{ history: ChatMessage[] }> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return {
        history: mockData.mockChatHistory.slice(offset, offset + limit),
      }
    }

    // TODO: Uncomment when backend is ready
    // const response = await api.get(`/personas/me/chat?limit=${limit}&offset=${offset}`)
    // return response.data
    throw new Error('Backend not ready')
  },
}

export const questService = {
  async getMyQuests(): Promise<{ quests: Quest[] }> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return {
        quests: mockData.mockQuests,
      }
    }

    // TODO: Uncomment when backend is ready
    // const response = await api.get('/quests/me')
    // return response.data
    throw new Error('Backend not ready')
  },

  async completeQuest(questId: string): Promise<{ message: string; reward: { type: string; amount: number } }> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const quest = mockData.mockQuests.find((q) => q.id === questId)
      return {
        message: 'Quest completed!',
        reward: quest?.reward || { type: 'memory_crystals', amount: 10 },
      }
    }

    // TODO: Uncomment when backend is ready
    // const response = await api.post(`/quests/${questId}/complete`)
    // return response.data
    throw new Error('Backend not ready')
  },
}

export const socialService = {
  async getPublicProfile(_userId: string): Promise<Persona> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockData.mockPersona
    }

    // TODO: Uncomment when backend is ready
    // const response = await api.get(`/social/profile/${userId}`)
    // return response.data
    throw new Error('Backend not ready')
  },

  async getCompatibility(_otherUserId: string): Promise<{ chemistryScore: number; analysis: string }> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return {
        chemistryScore: 95,
        analysis: "A classic case of 'energetic person melts the ice queen.'",
      }
    }

    // TODO: Uncomment when backend is ready
    // const response = await api.get(`/social/compatibility?otherUserId=${otherUserId}`)
    // return response.data
    throw new Error('Backend not ready')
  },
}

export default api