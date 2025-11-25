// Authentication API
// TODO: Uncomment actual API calls when backend is ready
import apiClient from './client';
import {
  AuthResponse,
  User,
  MOCK_AUTH_RESPONSE,
  MOCK_USER
} from '@/lib/mock-data/auth';

export const authApi = {
  // Google OAuth login
  async googleLogin(idToken: string): Promise<AuthResponse> {
    // TODO: Uncomment when backend is ready
    /*
    const response = await apiClient.post('/v1/auth/google/login', {
      idToken
    });
    return response.data;
    */
    
    // Mock implementation (Demo Mode)
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_AUTH_RESPONSE), 800);
    });
  },

  // Refresh access token
  async refresh(refreshToken: string): Promise<{ accessToken: string }> {
    // TODO: Uncomment when backend is ready
    /*
    const response = await apiClient.post('/v1/auth/refresh', {
      refresh_token: refreshToken
    });
    return response.data;
    */
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => resolve({
        accessToken: 'new-mock-access-token'
      }), 300);
    });
  },

  // Logout
  async logout(): Promise<void> {
    // TODO: Uncomment when backend is ready
    /*
    await apiClient.post('/v1/auth/logout');
    */
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 200);
    });
  }
};




