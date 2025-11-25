// Gamification API (F-006)
// TODO: Uncomment actual API calls when backend is ready
import apiClient from './client';
import {
  Quest,
  Wallet,
  MOCK_QUESTS,
  MOCK_WALLET
} from '@/lib/mock-data/quests';

export const questApi = {
  // Get active quests
  async getActive(): Promise<Quest[]> {
    // TODO: Uncomment when backend is ready
    /*
    const response = await apiClient.get('/v1/quests');
    return response.data;
    */
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_QUESTS), 300);
    });
  },

  // FR-006.1~FR-006.2: Claim quest reward
  async claim(questId: string): Promise<{ success: boolean; reward: number; newBalance: number }> {
    // TODO: Uncomment when backend is ready
    /*
    const response = await apiClient.post(`/v1/quests/${questId}/claim`);
    return response.data;
    */
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => resolve({
        success: true,
        reward: 50,
        newBalance: 100
      }), 500);
    });
  },

  // Get wallet balance
  async getWallet(): Promise<Wallet> {
    // TODO: Uncomment when backend is ready
    /*
    const response = await apiClient.get('/v1/currency/balance');
    return response.data;
    */
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_WALLET), 200);
    });
  }
};




