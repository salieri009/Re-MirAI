// Authentication API - Production Ready
import apiClient from './client';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: User;
}

export const authApi = {
  // Google OAuth login
  async googleLogin(idToken: string): Promise<AuthResponse> {
    const response = await apiClient.post('/auth/google/login', { idToken });
    return response.data;
  },

  // Refresh access token
  async refresh(refreshToken: string): Promise<{ accessToken: string }> {
    const response = await apiClient.post('/auth/refresh', { refreshToken });
    return response.data;
  },

  // Logout
  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  }
};
