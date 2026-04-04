import type { SummonModeOption, SummonResult } from '../types';

export const summonMockResult: SummonResult = {
  personaId: 'persona_mock_001',
  personaName: 'Lumen',
  archetype: 'Mirror Sage',
  rarity: 'EPIC',
};

export const summonMockModeOptions: SummonModeOption[] = [
  {
    value: 'FATED',
    title: 'Fated Resonance',
    description: 'Pattern-led synthesis from collective ritual signal.',
    badge: 'Free',
  },
  {
    value: 'ALCHEMIC',
    title: 'Alchemic Shaping',
    description: 'Guided synthesis with stronger directional intent.',
    badge: 'Premium',
  },
];
