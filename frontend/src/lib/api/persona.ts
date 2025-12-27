// Persona API (F-002) - Production Ready
import apiClient from './client';

export interface PersonaStats {
  charisma: number;
  intellect: number;
  kindness: number;
  energy: number;
}

export interface Persona {
  id: string;
  name: string;
  archetype: string;
  rarity: 'N' | 'R' | 'SR' | 'SSR' | 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
  stats: PersonaStats;
  greeting?: string;
  bondLevel?: number;
  createdAt: string;
}

export interface PersonaDetail extends Persona {
  systemPrompt: string;
  surveyId?: string;
}

export type SynthesisMode = 'FATED' | 'ALCHEMIC';

export interface PersonaSynthesisRequest {
  surveyId: string;
  mode: SynthesisMode;
  modifiers?: {
    archetype?: string;
  };
}

export const personaApi = {
  // FR-002.1~FR-002.4: Create Persona (Fated/Alchemic)
  async synthesize(request: PersonaSynthesisRequest): Promise<Persona> {
    const response = await apiClient.post('/personas/synthesize', request);
    return response.data;
  },

  // Get persona list
  async list(): Promise<Persona[]> {
    const response = await apiClient.get('/personas');
    return response.data;
  },

  // Get persona details
  async get(id: string): Promise<PersonaDetail> {
    const response = await apiClient.get(`/personas/${id}`);
    return response.data;
  },

  // FR-004.1: Generate persona card image
  async generateCard(id: string): Promise<{ imageUrl: string; publicProfileUrl: string; expiresAt: string }> {
    const response = await apiClient.post(`/personas/${id}/card`);
    return response.data;
  }
};
