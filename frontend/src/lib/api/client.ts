// Base API Client - Connected to Backend
import axios, { AxiosInstance, AxiosError } from 'axios';
import { toast } from '@/lib/toast';
import { useAuthStore } from '@/stores/authStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000, // 30 second timeout
  withCredentials: true, // Enable cookies for auth
});

// Request interceptor: Add auth token from localStorage
apiClient.interceptors.request.use((config) => {
  // Prefer Zustand state, fall back to localStorage for hard refresh recovery.
  const token =
    typeof window !== 'undefined'
      ? useAuthStore.getState().token ?? localStorage.getItem('auth_token')
      : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: Comprehensive error handling + auto-refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const notifyError = (message: string) => {
      if (typeof window !== 'undefined') {
        toast.error(message);
      }
      return message;
    };

    // Network error (no response)
    if (!error.response) {
      const message = notifyError('Network connection lost. Please check your internet.');
      return Promise.reject(new Error(message));
    }

    const { status, data, config } = error.response;
    const originalRequest = config as any;

    switch (status) {
      case 401:
        // Unauthorized - attempt token refresh
        if (!originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            const refreshToken = typeof window !== 'undefined' 
              ? localStorage.getItem('auth_refresh_token') 
              : null;
            
            if (refreshToken) {
              // Attempt to refresh access token
              const response = await axios.post(
                `${API_URL}/auth/refresh`,
                { refreshToken }
              );
              
              const { accessToken } = response.data;
              
              // Update stored token
              localStorage.setItem('auth_token', accessToken);
              useAuthStore.getState().setToken(accessToken);
              
              // Retry original request with new token
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              return apiClient(originalRequest);
            }
          } catch (refreshError) {
            notifyError('Session expired. Please log in again.');
            // Refresh failed, redirect to login
            if (typeof window !== 'undefined') {
              useAuthStore.getState().logout();
              window.location.href = '/login';
            }
            return Promise.reject(refreshError);
          }
        }
        
        // Refresh already attempted, redirect to login
        if (typeof window !== 'undefined') {
          useAuthStore.getState().logout();
          window.location.href = '/login';
        }
        break;
          
      case 403:
        notifyError('Access denied.');
        break;

      case 404:
        notifyError('Resource not found.');
        break;

      case 429:
        notifyError('Too many requests. Please wait.');
        break;

      case 500:
        notifyError('Server error. Please try again in a moment.');
        break;

      case 503:
        notifyError('Service temporarily unavailable.');
        break;

      default:
        notifyError('An unexpected error occurred.');
    }

    return Promise.reject(error);
  }
);

export default apiClient;




