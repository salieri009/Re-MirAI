// Chat API (F-003) - Production Ready
import apiClient from './client';

export interface ChatMessage {
  id: string;
  sender: 'USER' | 'AI';
  content: string;
  createdAt: string;
}

export interface ChatSession {
  id: string;
  personaId: string;
  personaName: string;
  startedAt: string;
  lastMsgAt: string;
}

export interface ChatHistory {
  sessionId: string;
  messages: ChatMessage[];
}

export const chatApi = {
  // Get all chat sessions
  async getSessions(): Promise<ChatSession[]> {
    const response = await apiClient.get('/chats/sessions');
    return response.data;
  },

  // Start or get existing session with persona
  async startSession(personaId: string): Promise<ChatSession> {
    const response = await apiClient.post('/chats/sessions', { personaId });
    return response.data;
  },

  // FR-003.3: Load conversation history
  async getHistory(sessionId: string, limit = 20): Promise<ChatHistory> {
    const response = await apiClient.get(`/chats/${sessionId}/history`, {
      params: { limit }
    });
    return response.data;
  },

  // FR-003.1: Send message (REST alternative to WebSocket)
  async sendMessage(sessionId: string, content: string): Promise<{
    userMessage: ChatMessage;
    aiMessage: ChatMessage;
  }> {
    const response = await apiClient.post(`/chats/${sessionId}/messages`, { content });
    return response.data;
  },

  // Get bond level for persona
  async getBondLevel(personaId: string): Promise<{ level: number; progress: number; nextLevelAt: number }> {
    const response = await apiClient.get(`/personas/${personaId}`);
    const persona = response.data;
    return {
      level: Math.floor(persona.bondLevel / 10) + 1,
      progress: persona.bondLevel % 10 * 10,
      nextLevelAt: (Math.floor(persona.bondLevel / 10) + 1) * 100
    };
  }
};

// WebSocket connection for real-time chat
export function createChatWebSocket(
  sessionId: string,
  onMessage: (message: ChatMessage) => void,
  onError?: (error: Error) => void
): WebSocket | null {
  const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001';

  try {
    const socket = new WebSocket(`${wsUrl}/chat`);

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: 'chat:join', sessionId }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'chat:response') {
        onMessage(data.message);
      }
    };

    socket.onerror = (error) => {
      onError?.(new Error('WebSocket error'));
    };

    return socket;
  } catch (error) {
    onError?.(error as Error);
    return null;
  }
}
