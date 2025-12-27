// Survey API (F-001) - Production Ready
import apiClient from './client';

export interface Survey {
  id: string;
  userId: string;
  status: string;
  title?: string;
  shareableLink: string;
  minResponses: number;
  responseCount: number;
  createdAt: string;
  expiresAt: string;
}

export interface SurveyStatus {
  id: string;
  status: string;
  responsesCount: number;
  canCreatePersona: boolean;
  threshold: number;
}

export interface SurveyQuestion {
  id: number;
  type: 'likert' | 'text' | 'choice' | 'scale';
  text: string;
  question?: string;
  options?: string[];
  scale?: {
    min: number;
    max: number;
  };
}

export interface SurveyDetail {
  id: string;
  title?: string;
  expiresAt: string;
  questions: SurveyQuestion[];
}

export const surveyApi = {
  // FR-001.1: Generate unique, shareable URL
  async create(title?: string): Promise<Survey> {
    const response = await apiClient.post('/surveys', { title });
    return response.data;
  },

  // Get my surveys (for dashboard)
  async getMySurveys(): Promise<Survey[]> {
    const response = await apiClient.get('/surveys/my');
    return response.data;
  },

  // Get survey details (public, for respondents)
  async get(linkOrId: string): Promise<SurveyDetail> {
    const response = await apiClient.get(`/surveys/${linkOrId}/public`);
    return response.data;
  },

  // FR-001.3: Submit answers without account
  async submitResponse(surveyId: string, answers: Record<string, any>): Promise<{ message: string }> {
    const fingerprintHash = await generateFingerprint();
    const response = await apiClient.post(`/surveys/${surveyId}/responses`, {
      answers,
      fingerprintHash,
    });
    return response.data;
  },

  // Get survey status (Owner only)
  async getStatus(id: string): Promise<SurveyStatus> {
    const response = await apiClient.get(`/surveys/${id}/status`);
    return response.data;
  }
};

// Browser fingerprint generation
async function generateFingerprint(): Promise<string> {
  const data = [
    navigator.userAgent,
    navigator.language,
    new Date().getTimezoneOffset(),
    screen.width,
    screen.height,
    screen.colorDepth,
  ].join('|');

  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}
