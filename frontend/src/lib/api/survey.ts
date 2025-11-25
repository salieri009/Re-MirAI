// Survey API (F-001)
// TODO: Uncomment actual API calls when backend is ready
import apiClient from './client';
import {
  Survey,
  SurveyStatus,
  SurveyDetail,
  MOCK_SURVEY_CREATED,
  MOCK_SURVEY_STATUS_AWAITING,
  MOCK_SURVEY_STATUS_READY,
  MOCK_SURVEY_STATUS_COMPLETED,
  MOCK_SURVEY_DETAIL
} from '@/lib/mock-data/surveys';

export const surveyApi = {
  // FR-001.1: Generate unique, shareable URL
  async create(): Promise<Survey> {
    // TODO: Uncomment when backend is ready
    /*
    const response = await apiClient.post('/v1/surveys');
    return response.data;
    */
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_SURVEY_CREATED), 500);
    });
  },

  // Get survey details
  async get(id: string): Promise<SurveyDetail> {
    // TODO: Uncomment when backend is ready
    /*
    const response = await apiClient.get(`/v1/surveys/${id}`);
    return response.data;
    */
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_SURVEY_DETAIL), 300);
    });
  },

  // FR-001.3: Submit answers without account
  async submitResponse(surveyId: string, answers: Record<string, number>): Promise<{ message: string }> {
    // TODO: Uncomment when backend is ready
    /*
    const response = await apiClient.post(`/v1/surveys/${surveyId}/responses`, {
      answers,
      fingerprint: 'browser_fingerprint_hash' // TODO: Generate actual fingerprint
    });
    return response.data;
    */
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => resolve({ message: '응답이 제출되었습니다.' }), 500);
    });
  },

  // Get survey status (Owner only)
  async getStatus(id: string): Promise<SurveyStatus> {
    // TODO: Uncomment when backend is ready
    /*
    const response = await apiClient.get(`/v1/surveys/${id}/status`);
    return response.data;
    */
    
    // Mock implementation - returns different states for demo
    return new Promise((resolve) => {
      // You can change this to test different states:
      // MOCK_SURVEY_STATUS_AWAITING, MOCK_SURVEY_STATUS_READY, MOCK_SURVEY_STATUS_COMPLETED
      setTimeout(() => resolve(MOCK_SURVEY_STATUS_AWAITING), 300);
    });
  }
};




