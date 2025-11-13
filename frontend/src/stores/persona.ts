import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Persona, Message } from '@/types'
import { generatePersona, getPersona, sendMessage, getChatHistory } from '@/api/endpoints/personas'

export const usePersonaStore = defineStore('persona', () => {
  // State
  const persona = ref<Persona | null>(null)
  const generationStatus = ref<'idle' | 'generating' | 'ready' | 'failed'>('idle')
  const chatHistory = ref<Message[]>([])

  // Actions
  async function generate(): Promise<void> {
    try {
      generationStatus.value = 'generating'
      
      // Real API call (will use mock in Phase 1)
      await generatePersona()
      
      // Start polling for completion
      await pollGenerationStatus()
    } catch (error) {
      console.error('Failed to generate persona:', error)
      generationStatus.value = 'failed'
      throw error
    }
  }

  async function pollGenerationStatus(): Promise<void> {
    const maxAttempts = 30
    const pollInterval = 2000 // 2 seconds
    
    for (let i = 0; i < maxAttempts; i++) {
      try {
        const response = await getPersona()
        
        if (response.generationStatus === 'ready') {
          persona.value = response.persona
          generationStatus.value = 'ready'
          return
        } else if (response.generationStatus === 'failed') {
          generationStatus.value = 'failed'
          throw new Error('Persona generation failed')
        }
        
        // Wait before next poll
        await new Promise(resolve => setTimeout(resolve, pollInterval))
      } catch (error) {
        console.error('Polling error:', error)
      }
    }
    
    // Timeout
    generationStatus.value = 'failed'
    throw new Error('Persona generation timeout')
  }

  async function fetchPersona(): Promise<void> {
    try {
      // Real API call (will use mock in Phase 1)
      const response = await getPersona()
      
      persona.value = response.persona
      generationStatus.value = response.generationStatus
    } catch (error) {
      console.error('Failed to fetch persona:', error)
      throw error
    }
  }

  async function sendChatMessage(message: string): Promise<void> {
    try {
      // Add user message to history
      const userMessage: Message = {
        sender: 'user',
        message,
        timestamp: new Date().toISOString(),
      }
      chatHistory.value.push(userMessage)
      
      // Real API call (will use mock in Phase 1)
      const response = await sendMessage(message)
      
      // Add AI response to history
      const aiMessage: Message = {
        sender: 'ai',
        message: response.reply,
        timestamp: new Date().toISOString(),
      }
      chatHistory.value.push(aiMessage)
    } catch (error) {
      console.error('Failed to send message:', error)
      throw error
    }
  }

  async function fetchChatHistory(): Promise<void> {
    try {
      // Real API call (will use mock in Phase 1)
      const response = await getChatHistory()
      
      chatHistory.value = response.messages
    } catch (error) {
      console.error('Failed to fetch chat history:', error)
      throw error
    }
  }

  function reset(): void {
    persona.value = null
    generationStatus.value = 'idle'
    chatHistory.value = []
  }

  return {
    persona,
    generationStatus,
    chatHistory,
    generate,
    fetchPersona,
    sendChatMessage,
    fetchChatHistory,
    reset,
  }
})

