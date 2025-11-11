import { defineStore } from 'pinia';
import { personaService } from '@/services/api';
export const usePersonaStore = defineStore('persona', {
    state: () => ({
        persona: null,
        chatHistory: [],
        isLoading: false,
        isSummoning: false,
        error: null,
    }),
    getters: {
        isPersonaReady: (state) => {
            return state.persona && 'status' in state.persona && state.persona.status === 'ready';
        },
        isPersonaSummoning: (state) => {
            return state.persona && 'status' in state.persona && state.persona.status === 'summoning';
        },
    },
    actions: {
        async fetchPersona() {
            this.isLoading = true;
            this.error = null;
            try {
                const persona = await personaService.getMyPersona();
                this.persona = persona;
            }
            catch (error) {
                const err = error;
                this.error = err.response?.data?.message || 'Failed to fetch persona';
                throw error;
            }
            finally {
                this.isLoading = false;
            }
        },
        async summonPersona(mode, archetypeFilter) {
            this.isSummoning = true;
            this.error = null;
            try {
                await personaService.summonPersona(mode, archetypeFilter);
                // Start polling for status
                this.startPollingPersonaStatus();
            }
            catch (error) {
                const err = error;
                this.error = err.response?.data?.message || 'Failed to initiate summoning';
                this.isSummoning = false;
                throw error;
            }
        },
        startPollingPersonaStatus() {
            const pollInterval = setInterval(async () => {
                try {
                    const persona = await personaService.getMyPersona();
                    this.persona = persona;
                    if ('status' in persona && persona.status === 'ready') {
                        clearInterval(pollInterval);
                        this.isSummoning = false;
                    }
                }
                catch (error) {
                    console.error('Error polling persona status:', error);
                    clearInterval(pollInterval);
                    this.isSummoning = false;
                }
            }, 3000); // Poll every 3 seconds
            // Stop polling after 5 minutes
            setTimeout(() => {
                clearInterval(pollInterval);
                this.isSummoning = false;
            }, 300000);
        },
        async sendMessage(message) {
            try {
                const response = await personaService.sendChatMessage(message);
                // Add user message and AI response to history
                const userMessage = {
                    sender: 'user',
                    message,
                    timestamp: new Date().toISOString(),
                };
                const aiMessage = {
                    sender: 'ai',
                    message: response.reply,
                    timestamp: new Date().toISOString(),
                };
                this.chatHistory.push(userMessage, aiMessage);
            }
            catch (error) {
                const err = error;
                this.error = err.response?.data?.message || 'Failed to send message';
                throw error;
            }
        },
        async fetchChatHistory() {
            this.isLoading = true;
            try {
                const response = await personaService.getChatHistory();
                this.chatHistory = response.history;
            }
            catch (error) {
                const err = error;
                this.error = err.response?.data?.message || 'Failed to fetch chat history';
                throw error;
            }
            finally {
                this.isLoading = false;
            }
        },
    },
});
