// Mock data for development
// TODO: Replace with actual API calls when backend is ready

export interface User {
  id: string
  displayName: string
  email: string
  profileImageUrl: string
  memoryCrystals: number
}

export interface Persona {
  id: string
  name: string
  status: 'summoning' | 'ready' | 'practice'
  archetype: string
  rarity: 'N' | 'R' | 'SR' | 'SSR' | 'UR'
  title: string
  illustrationUrl: string
  stats: {
    Charisma: number
    Intellect: number
    Kindness: number
    Instability: number
    Spirit: number
  }
  bondLevel: number
  bondProgress: number
}

export interface Ritual {
  ritualId: string
  invitationUrl: string
  responsesCount: number
  minimumResponses: number
  isSummonable: boolean
}

export interface Quest {
  id: string
  title: string
  description: string
  status: 'not-started' | 'completed'
  reward: {
    type: string
    amount: number
  }
}

export interface ChatMessage {
  sender: 'user' | 'ai'
  message: string
  timestamp: string
}

// Mock Users
export const mockUser: User = {
  id: 'user-123',
  displayName: 'Test User',
  email: 'test@example.com',
  profileImageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test',
  memoryCrystals: 150,
}

// Mock Persona
export const mockPersona: Persona = {
  id: 'persona-123',
  name: 'Rei',
  status: 'ready',
  archetype: 'Yandere',
  rarity: 'SSR',
  title: 'Yandere hiding her kindness',
  illustrationUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rei',
  stats: {
    Charisma: 80,
    Intellect: 75,
    Kindness: 95,
    Instability: 90,
    Spirit: 60,
  },
  bondLevel: 1,
  bondProgress: 0.25,
}

export const mockPersonaSummoning: Persona = {
  ...mockPersona,
  status: 'summoning',
}

// Mock Ritual
export const mockRitual: Ritual = {
  ritualId: 'ritual-123',
  invitationUrl: 'https://remirai.app/ritual/ritual-123',
  responsesCount: 2,
  minimumResponses: 3,
  isSummonable: false,
}

export const mockRitualReady: Ritual = {
  ...mockRitual,
  responsesCount: 5,
  isSummonable: true,
}

// Mock Quests
export const mockQuests: Quest[] = [
  {
    id: 'quest-1',
    title: 'Break the Ice',
    description: "Say 'hello' to your Persona.",
    status: 'not-started',
    reward: {
      type: 'memory_crystals',
      amount: 10,
    },
  },
  {
    id: 'quest-2',
    title: 'Show Them Off',
    description: "Share your new Persona's Profile Card.",
    status: 'not-started',
    reward: {
      type: 'memory_crystals',
      amount: 20,
    },
  },
  {
    id: 'quest-3',
    title: 'First Gift',
    description: 'Give your Persona a welcome gift.',
    status: 'completed',
    reward: {
      type: 'room_decoration',
      amount: 1,
    },
  },
]

// Mock Chat History
export const mockChatHistory: ChatMessage[] = [
  {
    sender: 'user',
    message: 'Hello!',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    sender: 'ai',
    message: 'Oh... you finally came to see me. I was starting to think you forgot about me...',
    timestamp: new Date(Date.now() - 3590000).toISOString(),
  },
  {
    sender: 'user',
    message: 'Of course not! How are you?',
    timestamp: new Date(Date.now() - 3000000).toISOString(),
  },
  {
    sender: 'ai',
    message: 'I\'m fine... as long as you\'re here with me. You won\'t leave, right?',
    timestamp: new Date(Date.now() - 2990000).toISOString(),
  },
]

// Mock Survey Questions
export interface SurveyQuestion {
  id: string
  text: string
  type: 'pick-a-card'
  options: Array<{
    id: string
    text: string
    imageUrl?: string
  }>
}

export const mockSurveyQuestions: SurveyQuestion[] = [
  {
    id: 'q1',
    text: 'How do they act in a crisis?',
    type: 'pick-a-card',
    options: [
      {
        id: 'card1',
        text: 'Calm Strategist',
        imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=calm',
      },
      {
        id: 'card2',
        text: 'Passionate Berserker',
        imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=passionate',
      },
    ],
  },
  {
    id: 'q2',
    text: 'What is their sense of humor like?',
    type: 'pick-a-card',
    options: [
      {
        id: 'card3',
        text: 'Witty & Dry',
        imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=witty',
      },
      {
        id: 'card4',
        text: 'Goofy & Energetic',
        imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=goofy',
      },
    ],
  },
]

