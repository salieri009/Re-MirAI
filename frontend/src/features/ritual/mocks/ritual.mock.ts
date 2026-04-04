import type { RitualStatusView, RitualSummary } from '../types';

export const ritualMockList: RitualSummary[] = [
  {
    id: 'ritual_mock_001',
    title: 'How my friends see me',
    status: 'COLLECTING',
    shareableLink: 'https://example.com/s/ritual_mock_001',
    progressPercent: 67,
  },
];

export const ritualMockStatus: RitualStatusView = {
  id: 'ritual_mock_001',
  status: 'READY',
  canSummon: true,
  responsesCount: 3,
  threshold: 3,
};
