// Domain Types

export interface User {
  id: string
  googleId: string
  email: string
  displayName: string
  profileImageUrl: string | null
  credits: number
  createdAt: string
}

export interface Analysis {
  id: string
  userId: string
  isActive: boolean
  createdAt: string
}

export interface Question {
  id: string
  text: string
  type: 'text' | 'scale' | 'choice'
  options?: string[]
}

export interface AnalysisResponse {
  id: string
  analysisId: string
  answers: Record<string, any>
  submittedAt: string
}

export type PersonaArchetype = 
  | 'Tsundere' 
  | 'Kuudere' 
  | 'Yandere' 
  | 'Dandere' 
  | 'Genki' 
  | 'Deredere'

export type PersonaRarity = 'N' | 'R' | 'SR' | 'SSR' | 'UR'

export interface PersonaStats {
  social: number
  creative: number
  logic: number
  chill: number
  boldness: number
}

export interface Persona {
  id: string
  userId: string
  name: string
  archetype: PersonaArchetype
  rarity: PersonaRarity
  title: string
  status: 'generating' | 'ready' | 'failed'
  stats: PersonaStats
  avatarUrl: string | null
  bondLevel: number
  bondProgress: number
  createdAt: string
}

export interface Message {
  id?: number
  personaId?: string
  sender: 'user' | 'ai'
  message: string
  timestamp: string
}

export interface ChemistryReport {
  score: number
  summary: string
}

