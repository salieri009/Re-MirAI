// Social API (F-005) - Production Ready
// Note: Backend endpoints not yet implemented (F-005 is P2 priority)
import apiClient from './client';

export interface Compatibility {
  score: number;
  label: string;
  description: string;
}

export interface RoomVisit {
  userId: string;
  username: string;
  personas: Array<{
    id: string;
    name: string;
    archetype: string;
  }>;
  compatibility?: Compatibility;
}

export const socialApi = {
  // FR-005.1: Calculate compatibility score
  async getCompatibility(targetPersonaId: string): Promise<Compatibility> {
    const response = await apiClient.get('/social/compatibility', {
      params: { targetPersonaId }
    });
    return response.data;
  },

  // FR-005.3: Visit friend's room
  async visitRoom(userId: string): Promise<RoomVisit> {
    const response = await apiClient.get(`/social/rooms/${userId}`);
    return response.data;
  }
};
