import { defineStore } from 'pinia';
import api from '@/services/api';

interface User {
  id: string;
  email: string;
  name: string;
  google_id?: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem('authToken') || '',
    isLoading: false,
    error: null as string | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
  },
  actions: {
    async loginWithGoogle(googleToken: string) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await api.post('/auth/login', { token: googleToken });
        this.token = response.data.token;
        this.user = response.data.user;
        localStorage.setItem('authToken', this.token);
      } catch (error) {
        const err = error as { response?: { data?: { message?: string } } };
        this.error = err.response?.data?.message || 'Login failed';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    async fetchUserProfile() {
      this.isLoading = true;
      try {
        const response = await api.get('/users/me');
        this.user = response.data;
      } catch (error) {
        const err = error as { response?: { data?: { message?: string } } };
        this.error = err.response?.data?.message || 'Failed to fetch user';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    logout() {
      this.user = null;
      this.token = '';
      localStorage.removeItem('authToken');
    },
  },
});