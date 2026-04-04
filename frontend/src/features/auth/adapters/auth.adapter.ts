import type { AuthResponse } from '@/lib/api/auth';
import type { AuthSession, AuthViewModel } from '../types';

export function toAuthSession(response: AuthResponse): AuthSession {
  return {
    accessToken: response.accessToken,
    refreshToken: response.refreshToken,
    expiresIn: response.expiresIn,
    user: response.user,
  };
}

export function toAuthViewModel(params: {
  isAuthenticated: boolean;
  userName?: string | null;
  userEmail?: string | null;
}): AuthViewModel {
  return {
    isAuthenticated: params.isAuthenticated,
    userName: params.userName ?? null,
    userEmail: params.userEmail ?? null,
  };
}
