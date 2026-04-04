import type { Survey, SurveyDetail, SurveyStatus } from '@/lib/api/survey';
import type { RitualPublicDetail, RitualStatusView, RitualSummary } from '../types';

export function toRitualSummary(survey: Survey): RitualSummary {
  const safeThreshold = Math.max(survey.minResponses, 1);
  const progressPercent = Math.min(100, Math.round((survey.responseCount / safeThreshold) * 100));

  return {
    id: survey.id,
    title: survey.title?.trim() || 'Untitled Ritual',
    status: survey.status,
    shareableLink: survey.shareableLink,
    progressPercent,
  };
}

export function toRitualPublicDetail(survey: SurveyDetail): RitualPublicDetail {
  return {
    id: survey.id,
    title: survey.title?.trim() || 'Ritual',
    expiresAt: survey.expiresAt,
    questionCount: survey.questions.length,
  };
}

export function toRitualStatusView(status: SurveyStatus): RitualStatusView {
  return {
    id: status.id,
    status: status.status,
    canSummon: status.canCreatePersona,
    responsesCount: status.responsesCount,
    threshold: status.threshold,
  };
}
