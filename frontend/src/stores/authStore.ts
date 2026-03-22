// Authentication Store (Zustand)
import { create } from 'zustand';
import { User } from '@/lib/api/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (token: string, refreshToken: string, user: User) => void;
  logout: () => void;
  setToken: (token: string) => void;
}

// Simple localStorage persistence
const TOKEN_STORAGE_KEY = 'auth_token';
const REFRESH_TOKEN_STORAGE_KEY = 'auth_refresh_token';
const USER_STORAGE_KEY = 'auth_user';

const loadFromStorage = (): Partial<AuthState> => {
  if (typeof window === 'undefined') return {};
  try {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
    const userJson = localStorage.getItem(USER_STORAGE_KEY);
    const user = userJson ? JSON.parse(userJson) : null;
    
    return {
      token: token || null,
      refreshToken: refreshToken || null,
      user: user || null,
      isAuthenticated: !!(token && user)
    };
  } catch {
    return {};
  }
};

const saveToStorage = (state: Partial<AuthState>) => {
  if (typeof window === 'undefined') return;
  try {
    if (state.token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, state.token);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
    
    if (state.refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, state.refreshToken);
    } else {
      localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
    }
    
    if (state.user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(state.user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  } catch {
    // Ignore storage errors
  }
};

const initialState = loadFromStorage();

export const useAuthStore = create<AuthState>((set) => ({
  user: initialState.user || null,
  token: initialState.token || null,
  refreshToken: initialState.refreshToken || null,
  isAuthenticated: initialState.isAuthenticated || false,
  login: (token, refreshToken, user) => {
    const newState = {
      token,
      refreshToken,
      user,
      isAuthenticated: true
    };
    set(newState);
    saveToStorage(newState);
  },
  logout: () => {
    const newState = {
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false
    };
    set(newState);
    saveToStorage(newState);
  },
  setToken: (token) => {
    set({ token });
    saveToStorage({ token });
  }
}));

