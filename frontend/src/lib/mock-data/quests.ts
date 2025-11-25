// Mock data for Gamification System (F-006)
// TODO: Replace with actual API calls when backend is ready

export interface Quest {
  id: string;
  name: string;
  description: string;
  progress: number;
  requirement: number;
  reward: number;
  status: 'ACTIVE' | 'COMPLETED' | 'CLAIMED';
}

export interface Wallet {
  balance: number;
  currency: 'MEMORY_CRYSTALS';
}

// Mock Quests
export const MOCK_QUESTS: Quest[] = [
  {
    id: 'quest-1',
    name: 'Create Your First Survey',
    description: 'Generate your first survey link and share it with friends',
    progress: 1,
    requirement: 1,
    reward: 50,
    status: 'COMPLETED'
  },
  {
    id: 'quest-2',
    name: 'Receive 5 Responses',
    description: 'Get 5 friends to complete your survey',
    progress: 2,
    requirement: 5,
    reward: 100,
    status: 'ACTIVE'
  },
  {
    id: 'quest-3',
    name: 'Share Your Persona',
    description: 'Share your persona card on social media',
    progress: 0,
    requirement: 1,
    reward: 75,
    status: 'ACTIVE'
  },
  {
    id: 'quest-4',
    name: 'Chat 10 Times',
    description: 'Have 10 conversations with your persona',
    progress: 4,
    requirement: 10,
    reward: 50,
    status: 'ACTIVE'
  }
];

// Mock Wallet
export const MOCK_WALLET: Wallet = {
  balance: 50,
  currency: 'MEMORY_CRYSTALS'
};



