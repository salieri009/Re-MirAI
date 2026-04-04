import type { Survey, SurveyDetail, SurveyStatus } from '@/lib/api/survey';

export interface RitualSummary {
  id: string;
  title: string;
  status: string;
  shareableLink: string;
  progressPercent: number;
}

export interface RitualPublicDetail {
  id: string;
  title: string;
  expiresAt: string;
  questionCount: number;
}

export interface RitualStatusView {
  id: string;
  status: string;
  canSummon: boolean;
  responsesCount: number;
  threshold: number;
}

export type RitualSource = Survey | SurveyDetail | SurveyStatus;
