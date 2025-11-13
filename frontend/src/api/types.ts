// API Request and Response Types

import type { User, Persona, Message } from '@/types'

// Auth API
export interface GoogleLoginRequest {
  token: string
}

export interface GoogleLoginResponse {
  jwt: string
  user: User
}

// Analysis API
export interface CreateAnalysisResponse {
  analysisId: string
  shareUrl: string
}

export interface AnalysisStatusResponse {
  analysisId: string
  responseCount: number
  status: 'collecting' | 'ready_to_generate'
}

export interface GetAnalysisResponse {
  analysisId: string
  creatorName: string
  questions: Array<{
    id: string
    text: string
    type: 'text' | 'scale' | 'choice'
    options?: string[]
  }>
}

export interface SubmitResponsesRequest {
  answers: Record<string, any>
}

// Persona API
export interface GetPersonaResponse {
  persona: Persona
  generationStatus: 'generating' | 'ready' | 'failed'
}

export interface SendMessageRequest {
  message: string
}

export interface SendMessageResponse {
  reply: string
}

export interface GetChatHistoryResponse {
  messages: Message[]
  nextCursor: number | null
}

// Social API
export interface PublicPersonaResponse {
  name: string
  archetype: string
  rarity: string
  title: string
  avatarUrl: string | null
}

export interface ChemistryReportResponse {
  score: number
  summary: string
}

// Error Response
export interface ApiError {
  error: {
    code: string
    message: string
  }
}

