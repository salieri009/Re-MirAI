import type { AuthSession } from '../types';

export const authMockSession: AuthSession = {
  accessToken: 'mock_access_token',
  refreshToken: 'mock_refresh_token',
  expiresIn: 3600,
  user: {
    id: 'user_mock_001',
    email: 'mirror@example.com',
    name: 'Mirror User',
  },
};
