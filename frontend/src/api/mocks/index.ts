import MockAdapter from 'axios-mock-adapter'
import type { AxiosInstance } from 'axios'
import mockUser from './data/user.json'
import mockPersona from './data/persona.json'
import mockQuestions from './data/questions.json'
import mockChatHistory from './data/chatHistory.json'

const MOCK_DELAY = 800 // Simulated network delay in ms

export function setupMockApi(axiosInstance: AxiosInstance) {
  const mock = new MockAdapter(axiosInstance, { delayResponse: MOCK_DELAY })

  // Auth endpoints
  mock.onPost('/auth/google-login').reply(200, {
    jwt: 'mock-jwt-token-12345',
    user: mockUser,
  })

  // Analysis endpoints
  mock.onPost('/analyses').reply(201, {
    analysisId: 'mock-analysis-789',
    shareUrl: `${window.location.origin}/survey/mock-analysis-789`,
  })

  let mockResponseCount = 0
  mock.onGet('/analyses/me').reply(() => {
    mockResponseCount = Math.min(mockResponseCount + 1, 5)
    const status = mockResponseCount >= 3 ? 'ready_to_generate' : 'collecting'
    
    return [200, {
      analysisId: 'mock-analysis-789',
      responseCount: mockResponseCount,
      status,
    }]
  })

  mock.onGet(/\/analyses\/[\w-]+$/).reply(() => {
    return [200, {
      analysisId: 'mock-analysis-789',
      creatorName: '테스트 유저',
      questions: mockQuestions,
    }]
  })

  mock.onPost(/\/analyses\/[\w-]+\/responses/).reply(201, {
    success: true,
  })

  // Persona endpoints
  let personaGenerating = false
  mock.onPost('/personas/generate').reply(() => {
    personaGenerating = true
    
    // Simulate generation completion after 3 seconds
    setTimeout(() => {
      personaGenerating = false
    }, 3000)
    
    return [202, {}]
  })

  mock.onGet('/personas/me').reply(() => {
    if (personaGenerating) {
      return [200, {
        persona: null,
        generationStatus: 'generating',
      }]
    }
    
    return [200, {
      persona: mockPersona,
      generationStatus: 'ready',
    }]
  })

  mock.onPost('/personas/me/chat').reply(() => {
    // Simple canned responses
    const responses = [
      '흥... 그래서?',
      '뭐, 나쁘진 않네...',
      '별로 관심 없는데... 아니, 그냥 들어주는 거야!',
      '알았어, 알았다고!',
      '...괜찮아.',
    ]
    
    const reply = responses[Math.floor(Math.random() * responses.length)]
    
    return [200, { reply }]
  })

  mock.onGet('/personas/me/chat').reply(200, {
    messages: mockChatHistory,
    nextCursor: null,
  })

  // Social endpoints
  mock.onGet(/\/social\/profiles\/[\w-]+$/).reply(200, {
    name: mockPersona.name,
    archetype: mockPersona.archetype,
    rarity: mockPersona.rarity,
    title: mockPersona.title,
    avatarUrl: mockPersona.avatarUrl,
  })

  mock.onGet('/social/chemistry').reply(200, {
    score: 85,
    summary: '서로 다른 성격이지만 조화를 이루는 관계입니다!',
  })

  console.log('🎭 Mock API initialized')
}

