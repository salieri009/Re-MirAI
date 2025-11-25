// Authentication Store (Zustand)
import { create } from 'zustand';
import { User } from '@/lib/mock-data/auth';

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
const loadFromStorage = (): Partial<AuthState> => {
  if (typeof window === 'undefined') return {};
  try {
    const stored = localStorage.getItem('auth-storage');
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const saveToStorage = (state: Partial<AuthState>) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('auth-storage', JSON.stringify(state));
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

