// Base API Client
// TODO: Uncomment when backend is ready
import axios, { AxiosInstance, AxiosError } from 'axios';
// import { useAuthStore } from '@/stores/authStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000 // 30 second timeout
});

// Request interceptor: Add auth token
// TODO: Uncomment when backend is ready
/*
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
*/

// Response interceptor: Comprehensive error handling
// TODO: Uncomment when backend is ready
/*
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Network error (no response)
    if (!error.response) {
      console.error('Network connection lost. Please check your internet.');
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    switch (status) {
      case 401:
        // Unauthorized - try refresh token
        // const refreshToken = useAuthStore.getState().refreshToken;
        
        // if (refreshToken && !error.config._retry) {
        //   error.config._retry = true;
          
        //   try {
        //     // Attempt to refresh access token
        //     const response = await axios.post(
        //       `${API_URL}/v1/auth/refresh`,
        //       { refresh_token: refreshToken }
        //     );
            
        //     const { access_token } = response.data;
        //     useAuthStore.getState().setToken(access_token);
            
        //     // Retry original request with new token
        //     error.config.headers.Authorization = `Bearer ${access_token}`;
        //     return apiClient(error.config);
        //   } catch (refreshError) {
        //     // Refresh failed - logout user
        //     useAuthStore.getState().logout();
        //     window.location.href = '/login';
        //   }
        // } else {
        //   // No refresh token - logout
        //   useAuthStore.getState().logout();
        //   window.location.href = '/login';
        // }
        break;

      case 403:
        console.error('Access denied.');
        break;

      case 404:
        console.error('Resource not found.');
        break;

      case 429:
        console.error('Too many requests. Please wait.');
        break;

      case 500:
        console.error('Server error. Our team has been notified.');
        break;

      case 503:
        console.error('Service temporarily unavailable.');
        break;

      default:
        console.error('An unexpected error occurred.');
    }

    return Promise.reject(error);
  }
);
*/

export default apiClient;


