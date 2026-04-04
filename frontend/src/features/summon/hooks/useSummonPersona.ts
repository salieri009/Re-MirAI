'use client';

import { useMutation } from '@tanstack/react-query';
import { personaApi } from '@/lib/api/persona';
import { toSummonResult } from '../adapters/summon.adapter';
import type { SummonCommand } from '../types';

export function useSummonPersona() {
  return useMutation({
    mutationFn: async (command: SummonCommand) => {
      const persona = await personaApi.synthesize(command);
      return {
        result: toSummonResult(persona),
        persona,
      };
    },
  });
}
