import type { Persona, SynthesisMode } from '@/lib/api/persona';

export interface SummonCommand {
  surveyId: string;
  mode: SynthesisMode;
}

export interface SummonResult {
  personaId: string;
  personaName: string;
  archetype: string;
  rarity: Persona['rarity'];
}

export interface SummonModeOption {
  value: SynthesisMode;
  title: string;
  description: string;
  badge: string;
}
