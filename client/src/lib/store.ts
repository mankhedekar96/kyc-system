import { create } from 'zustand';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}


interface AuthState {
  user: User | null;
  isAdmin: boolean;
  setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAdmin: false,
  setUser: (user) => {
    set({ user, isAdmin: user?.role === "admin" })
  },
  signOut: async () => {
    localStorage.removeItem('authToken');
    set({ user: null, isAdmin: false });
  },
}));