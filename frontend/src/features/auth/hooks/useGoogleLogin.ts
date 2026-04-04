'use client';

import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/stores/authStore';
import { toAuthSession } from '../adapters/auth.adapter';
import type { GoogleLoginInput } from '../types';

export function useGoogleLogin() {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: async (input: GoogleLoginInput) => {
      const response = await authApi.googleLogin(input.idToken);
      return toAuthSession(response);
    },
    onSuccess: (session) => {
      login(session.accessToken, session.refreshToken, session.user);
    },
  });
}
