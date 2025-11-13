import apiClient from '../client'
import type {
  GetPersonaResponse,
  SendMessageRequest,
  SendMessageResponse,
  GetChatHistoryResponse,
} from '../types'

export async function generatePersona(): Promise<void> {
  await apiClient.post('/personas/generate')
}

export async function getPersona(): Promise<GetPersonaResponse> {
  const response = await apiClient.get<GetPersonaResponse>('/personas/me')
  return response.data
}

export async function sendMessage(message: string): Promise<SendMessageResponse> {
  const response = await apiClient.post<SendMessageResponse>('/personas/me/chat', {
    message,
  } as SendMessageRequest)
  
  return response.data
}

export async function getChatHistory(
  limit: number = 20,
  before?: number
): Promise<GetChatHistoryResponse> {
  const params: any = { limit }
  if (before) {
    params.before = before
  }
  
  const response = await apiClient.get<GetChatHistoryResponse>('/personas/me/chat', {
    params,
  })
  
  return response.data
}

