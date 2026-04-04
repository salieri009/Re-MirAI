'use client';

import { useQuery } from '@tanstack/react-query';
import { surveyApi } from '@/lib/api/survey';
import { toRitualStatusView } from '../adapters/ritual.adapter';

export function useRitualStatus(surveyId: string | null) {
  return useQuery({
    queryKey: ['rituals', 'status', surveyId],
    enabled: Boolean(surveyId),
    queryFn: async () => {
      const response = await surveyApi.getStatus(surveyId as string);
      return toRitualStatusView(response);
    },
  });
}
