import apiClient from '../client'
import type { GoogleLoginRequest, GoogleLoginResponse } from '../types'

export async function loginWithGoogle(googleToken: string): Promise<GoogleLoginResponse> {
  const response = await apiClient.post<GoogleLoginResponse>('/auth/google-login', {
    token: googleToken,
  } as GoogleLoginRequest)
  
  return response.data
}

