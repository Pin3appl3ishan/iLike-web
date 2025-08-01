import type { Dispatch, SetStateAction } from 'react';
import type { User, LoginCredentials, RegisterData } from '@/services/userService';

export interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<{ user: User }>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export type { User };
