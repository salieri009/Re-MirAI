import { defineStore } from 'pinia';
import api from '@/services/api';

interface Persona {
  id: string;
  name: string;
  description: string;
  image_url?: string;
  status: 'generating' | 'ready' | 'failed';
  created_at: string;
}

interface ChatMessage {
  id: string;
  message: string;
  reply: string;
  timestamp: string;
}

export const usePersonaStore = defineStore('persona', {
  state: () => ({
    persona: null as Persona | null,
    chatHistory: [] as ChatMessage[],
    isLoading: false,
    error: null as string | null,
    pollingInterval: null as number | null,
  }),
  actions: {
    async generatePersona() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await api.post('/personas/me');
        this.persona = response.data;
        if (this.persona?.status === 'generating') {
          this.startPolling();
        }
      } catch (error) {
        const err = error as { response?: { data?: { message?: string } } };
        this.error = err.response?.data?.message || 'Failed to generate persona';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    async fetchPersona() {
      try {
        const response = await api.get('/personas/me');
        this.persona = response.data;
        if (this.persona?.status === 'ready') {
          this.stopPolling();
        }
      } catch (error) {
        const err = error as { response?: { data?: { message?: string } } };
        this.error = err.response?.data?.message || 'Failed to fetch persona';
      }
    },
    startPolling() {
      this.pollingInterval = window.setInterval(() => {
        this.fetchPersona();
      }, 5000); // Poll every 5 seconds
    },
    stopPolling() {
      if (this.pollingInterval) {
        clearInterval(this.pollingInterval);
        this.pollingInterval = null;
      }
    },
    async sendChatMessage(message: string) {
      this.isLoading = true;
      try {
        const response = await api.post('/personas/me/chat', { message });
        const chatMessage: ChatMessage = {
          id: Date.now().toString(),
          message,
          reply: response.data.reply,
          timestamp: new Date().toISOString(),
        };
        this.chatHistory.push(chatMessage);
        return response.data.reply;
      } catch (error) {
        const err = error as { response?: { data?: { message?: string } } };
        this.error = err.response?.data?.message || 'Failed to send message';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    clearChatHistory() {
      this.chatHistory = [];
    },
  },
});