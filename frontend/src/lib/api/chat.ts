// Chat API (F-003)
// TODO: Uncomment actual API calls when backend is ready
import apiClient from './client';
// import { io, Socket } from 'socket.io-client';
// import { useAuthStore } from '@/stores/authStore';
import {
  ChatHistory,
  ChatMessage,
  MOCK_CHAT_HISTORY
} from '@/lib/mock-data/chat';

export const chatApi = {
  // FR-003.3: Load conversation history (last 10 turns)
  async getHistory(personaId: string, limit = 10): Promise<ChatHistory> {
    // TODO: Uncomment when backend is ready
    /*
    const response = await apiClient.get(`/v1/chats/${personaId}/history`, {
      params: { limit }
    });
    return response.data;
    */
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_CHAT_HISTORY), 300);
    });
  },

  // FR-003.1: Send message (mock - real implementation uses WebSocket)
  async sendMessage(personaId: string, content: string): Promise<ChatMessage> {
    // TODO: Implement WebSocket connection when backend is ready
    /*
    // Real implementation would use WebSocket:
    // socket.emit('chat:message', { sessionId: personaId, content });
    */
    
    // Mock implementation - simulates AI response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: `msg-${Date.now()}`,
          sender: 'AI',
          content: `Mock response to: "${content}"`,
          createdAt: new Date().toISOString()
        });
      }, 1500);
    });
  }
};

// WebSocket connection for real-time chat
// TODO: Uncomment when backend is ready
/*
export function connectChat(personaId: string): Socket {
  const socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001', {
    auth: {
      token: useAuthStore.getState().token
    },
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
    timeout: 10000
  });

  socket.on('connect', () => {
    console.log('✅ Connected to chat');
    socket.emit('join', { personaId });
  });

  socket.on('disconnect', (reason) => {
    console.log('❌ Disconnected:', reason);
    
    if (reason === 'io server disconnect') {
      const newToken = useAuthStore.getState().token;
      socket.auth = { token: newToken };
      socket.connect();
    }
  });

  socket.on('connect_error', (error) => {
    console.error('Connection error:', error.message);
  });

  socket.on('reconnect', (attemptNumber) => {
    console.log(`✅ Reconnected after ${attemptNumber} attempts`);
    socket.emit('join', { personaId });
  });

  socket.on('reconnect_failed', () => {
    console.error('❌ Reconnection failed after all attempts');
  });

  return socket;
}
*/


