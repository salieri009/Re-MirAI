import type { User } from '@/lib/api/auth';

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: User;
}

export interface GoogleLoginInput {
  idToken: string;
}

export interface AuthViewModel {
  isAuthenticated: boolean;
  userName: string | null;
  userEmail: string | null;
}
