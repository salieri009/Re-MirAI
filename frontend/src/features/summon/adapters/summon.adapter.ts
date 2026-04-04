import type { Persona } from '@/lib/api/persona';
import type { SummonModeOption, SummonResult } from '../types';

export function toSummonResult(persona: Persona): SummonResult {
  return {
    personaId: persona.id,
    personaName: persona.name,
    archetype: persona.archetype,
    rarity: persona.rarity,
  };
}

export function getSummonModeOptions(): SummonModeOption[] {
  return [
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
}
