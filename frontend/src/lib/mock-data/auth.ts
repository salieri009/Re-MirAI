// Mock data for Authentication
// TODO: Replace with actual API calls when backend is ready

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

// Mock User (Demo Mode)
export const MOCK_USER: User = {
  id: 'user-123',
  email: 'demo@remirai.app',
  name: 'Demo User'
};

// Mock Auth Response
export const MOCK_AUTH_RESPONSE: AuthResponse = {
  accessToken: 'mock-access-token',
  refreshToken: 'mock-refresh-token',
  user: MOCK_USER
};


