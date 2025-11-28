// Base API Client - Connected to Backend
import axios, { AxiosInstance, AxiosError } from 'axios';

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
  // Get token from localStorage (set by auth module)
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: Comprehensive error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Network error (no response)
    if (!error.response) {
      console.error('Network connection lost. Please check your internet.');
      return Promise.reject(new Error('Network error'));
    }

    const { status, data } = error.response;

    switch (status) {
      case 401:
        // Unauthorized - redirect to login
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
        }
        break;
          
        //   try {
        //     // Attempt to refresh access token
        //     const response = await axios.post(
      
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

export default apiClient;




