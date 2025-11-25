// Persona API (F-002)
// TODO: Uncomment actual API calls when backend is ready
import apiClient from './client';
import {
  Persona,
  PersonaSynthesisRequest,
  MOCK_PERSONA,
  MOCK_PERSONAS
} from '@/lib/mock-data/personas';

export const personaApi = {
  // FR-002.1~FR-002.4: Create Persona (Fated/Alchemic)
  async synthesize(request: PersonaSynthesisRequest): Promise<Persona> {
    // TODO: Uncomment when backend is ready
    /*
    const response = await apiClient.post('/v1/personas/synthesize', request);
    return response.data;
    */
    
    // Mock implementation - simulates 60s generation time
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_PERSONA), 2000); // Reduced for demo
    });
  },

  // Get persona list
  async list(): Promise<Persona[]> {
    // TODO: Uncomment when backend is ready
    /*
    const response = await apiClient.get('/v1/personas');
    return response.data;
    */
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_PERSONAS), 300);
    });
  },

  // Get persona details
  async get(id: string): Promise<Persona> {
    // TODO: Uncomment when backend is ready
    /*
    const response = await apiClient.get(`/v1/personas/${id}`);
    return response.data;
    */
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_PERSONA), 300);
    });
  },

  // FR-004.1: Generate persona card image
  async generateCard(id: string): Promise<{ imageUrl: string; publicProfileUrl: string; expiresAt: string }> {
    // TODO: Uncomment when backend is ready
    /*
    const response = await apiClient.post(`/v1/personas/${id}/card`);
    return response.data;
    */
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => resolve({
        imageUrl: 'https://cdn.remirai.app/cards/persona-123.png',
        publicProfileUrl: `https://remirai.app/p/${id}`,
        expiresAt: '2025-12-24T12:00:00Z'
      }), 1500);
    });
  }
};



