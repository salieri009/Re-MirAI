'use client';

import { useQuery } from '@tanstack/react-query';
import { surveyApi } from '@/lib/api/survey';
import { toRitualSummary } from '../adapters/ritual.adapter';

export function useMyRituals() {
  return useQuery({
    queryKey: ['rituals', 'mine'],
    queryFn: async () => {
      const surveys = await surveyApi.getMySurveys();
      return surveys.map(toRitualSummary);
    },
  });
}
