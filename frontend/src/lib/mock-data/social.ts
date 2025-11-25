// Mock data for Social Features (F-005)
// TODO: Replace with actual API calls when backend is ready

export interface Compatibility {
  score: number;
  label: string;
  description: string;
}

export interface RoomVisit {
  persona: {
    id: string;
    name: string;
    archetype: string;
    stats: {
      charisma: number;
      intellect: number;
      kindness: number;
      energy: number;
    };
  };
  canVisit: boolean;
  compatibility?: Compatibility;
}

// Mock Compatibility
export const MOCK_COMPATIBILITY: Compatibility = {
  score: 85,
  label: 'Soulmates',
  description: 'Your high energy complements their calm nature perfectly.'
};

// Mock Room Visit
export const MOCK_ROOM_VISIT: RoomVisit = {
  persona: {
    id: 'persona-456',
    name: 'Alex',
    archetype: 'The Strategist',
    stats: {
      charisma: 72,
      intellect: 88,
      kindness: 65,
      energy: 60
    }
  },
  canVisit: true,
  compatibility: MOCK_COMPATIBILITY
};




