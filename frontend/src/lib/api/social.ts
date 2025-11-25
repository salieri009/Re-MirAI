// Social API (F-005)
// TODO: Uncomment actual API calls when backend is ready
import apiClient from './client';
import {
  Compatibility,
  RoomVisit,
  MOCK_COMPATIBILITY,
  MOCK_ROOM_VISIT
} from '@/lib/mock-data/social';

export const socialApi = {
  // FR-005.1: Calculate compatibility score
  async getCompatibility(targetPersonaId: string): Promise<Compatibility> {
    // TODO: Uncomment when backend is ready
    /*
    const response = await apiClient.get('/v1/social/compatibility', {
      params: { targetPersonaId }
    });
    return response.data;
    */
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_COMPATIBILITY), 500);
    });
  },

  // FR-005.3: Visit friend's room
  async visitRoom(userId: string): Promise<RoomVisit> {
    // TODO: Uncomment when backend is ready
    /*
    const response = await apiClient.get(`/v1/social/rooms/${userId}`);
    return response.data;
    */
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_ROOM_VISIT), 300);
    });
  }
};


