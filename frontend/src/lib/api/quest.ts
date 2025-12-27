// Gamification API (F-006) - Production Ready
// Note: Backend endpoints not yet implemented (F-006 is P2 priority)
import apiClient from './client';

export interface Quest {
  id: string;
  name: string;
  title?: string;
  description: string;
  type?: 'daily' | 'weekly' | 'achievement';
  reward: number;
  progress: number;
  target?: number;
  requirement: number;
  completed?: boolean;
  status: 'ACTIVE' | 'COMPLETED' | 'CLAIMED';
}

export interface Wallet {
  crystals: number;
  premium: boolean;
}

export const questApi = {
  // Get active quests
  async getActive(): Promise<Quest[]> {
    const response = await apiClient.get('/quests');
    return response.data;
  },

  // FR-006.1~FR-006.2: Claim quest reward
  async claim(questId: string): Promise<{ success: boolean; reward: number; newBalance: number }> {
    const response = await apiClient.post(`/quests/${questId}/claim`);
    return response.data;
  },

  // Get wallet balance
  async getWallet(): Promise<Wallet> {
    const response = await apiClient.get('/currency/balance');
    return response.data;
  }
};
