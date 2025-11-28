// Survey API (F-001) - Connected to Backend
import apiClient from './client';
import {
  Survey,
  SurveyStatus,
  SurveyDetail,
} from '@/lib/mock-data/surveys';

export const surveyApi = {
  // FR-001.1: Generate unique, shareable URL
  async create(title?: string): Promise<Survey> {
    const response = await apiClient.post('/v1/surveys', { title });
    return response.data;
  },

  // Get my surveys (for dashboard)
  async getMySurveys(): Promise<Survey[]> {
    const response = await apiClient.get('/v1/surveys/my');
    return response.data;
  },

  // Get survey details (public, for respondents)
  async get(linkOrId: string): Promise<SurveyDetail> {
    const response = await apiClient.get(`/v1/surveys/${linkOrId}/public`);
    return response.data;
  },

  // FR-001.3: Submit answers without account
  async submitResponse(surveyId: string, answers: Record<string, any>): Promise<{ message: string }> {
    // Generate browser fingerprint for anonymous tracking
    const fingerprintHash = await generateFingerprint();
    
    const response = await apiClient.post(`/v1/surveys/${surveyId}/responses`, {
      answers,
      fingerprintHash,
    });
    return response.data;
  },

  // Get survey status (Owner only)
  async getStatus(id: string): Promise<SurveyStatus> {
    const response = await apiClient.get(`/v1/surveys/${id}/status`);
    return response.data;
  }
};

// Simple browser fingerprint generation
async function generateFingerprint(): Promise<string> {
  const data = [
    navigator.userAgent,
    navigator.language,
    new Date().getTimezoneOffset(),
    screen.width,
    screen.height,
    screen.colorDepth,
  ].join('|');
  
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}




