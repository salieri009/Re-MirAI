// Mock data for Persona System (F-002)
// TODO: Replace with actual API calls when backend is ready

export interface PersonaStats {
  charisma: number;
  intellect: number;
  kindness: number;
  energy: number;
  [key: string]: number; // Index signature for dynamic access
}

export interface Persona {
  id: string;
  name: string;
  archetype: string;
  rarity?: 'N' | 'R' | 'SR' | 'SSR';
  stats: PersonaStats;
  greeting?: string;
  createdAt: string;
  avatar?: string; // Optional avatar URL
  traits?: string[]; // Optional persona traits/essence
}

export interface PersonaSynthesisRequest {
  surveyId: string;
  mode: 'FATED' | 'ALCHEMIC';
  modifiers?: {
    archetype?: string;
  };
}

// Mock Persona - State 3: Active Persona
export const MOCK_PERSONA: Persona = {
  id: '770e8400-e29b-41d4-a716-446655441111',
  name: 'Luna',
  archetype: 'The Mystic',
  rarity: 'SR',
  stats: {
    charisma: 85,
    intellect: 92,
    kindness: 70,
    energy: 45
  },
  greeting: 'Oh, it\'s you. The stars foretold your arrival.',
  createdAt: '2025-11-24T12:30:00Z'
};

// Mock Persona List
export const MOCK_PERSONAS: Persona[] = [
  MOCK_PERSONA,
  {
    id: '880e8400-e29b-41d4-a716-446655442222',
    name: 'Alex',
    archetype: 'The Strategist',
    rarity: 'R',
    stats: {
      charisma: 72,
      intellect: 88,
      kindness: 65,
      energy: 60
    },
    greeting: 'Let\'s analyze this situation together.',
    createdAt: '2025-11-23T10:00:00Z'
  }
];




