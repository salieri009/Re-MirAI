// Mock data for Chat Interface (F-003)
// TODO: Replace with actual API calls when backend is ready

export interface ChatMessage {
  id: string;
  sender: 'USER' | 'AI';
  content: string;
  createdAt: string;
}

export interface ChatHistory {
  messages: ChatMessage[];
}

// Mock Chat History
export const MOCK_CHAT_HISTORY: ChatHistory = {
  messages: [
    {
      id: 'msg-1',
      sender: 'USER',
      content: 'Hello!',
      createdAt: '2025-11-24T12:35:00Z'
    },
    {
      id: 'msg-2',
      sender: 'AI',
      content: 'Oh, it\'s you. The stars foretold your arrival.',
      createdAt: '2025-11-24T12:35:02Z'
    },
    {
      id: 'msg-3',
      sender: 'USER',
      content: 'How are you today?',
      createdAt: '2025-11-24T12:36:00Z'
    },
    {
      id: 'msg-4',
      sender: 'AI',
      content: 'I am doing well, thank you for asking! The cosmic energies are aligned today.',
      createdAt: '2025-11-24T12:36:03Z'
    }
  ]
};




