import { defineStore } from 'pinia';
import { authService, userService } from '@/services/api';
// Safe localStorage access
const getStoredToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('authToken') || '';
    }
    return '';
};
const setStoredToken = (token) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', token);
    }
};
const removeStoredToken = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
    }
};
export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: getStoredToken(),
        isLoading: false,
        error: null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.token && !!state.user,
    },
    actions: {
        async loginWithGoogle(googleToken) {
            this.isLoading = true;
            this.error = null;
            try {
                // TODO: Replace with actual Google OAuth when ready
                // For demo, we'll use a mock token
                const mockToken = googleToken || 'demo-google-token-' + Date.now();
                const response = await authService.googleLogin(mockToken);
                this.token = response.token;
                this.user = response.user;
                setStoredToken(this.token);
            }
            catch (error) {
                const err = error;
                this.error = err.response?.data?.message || 'Login failed';
                throw error;
            }
            finally {
                this.isLoading = false;
            }
        },
        async fetchUserProfile() {
            this.isLoading = true;
            try {
                const user = await userService.getMe();
                this.user = user;
            }
            catch (error) {
                const err = error;
                this.error = err.response?.data?.message || 'Failed to fetch user';
                throw error;
            }
            finally {
                this.isLoading = false;
            }
        },
        logout() {
            this.user = null;
            this.token = '';
            removeStoredToken();
        },
    },
});
