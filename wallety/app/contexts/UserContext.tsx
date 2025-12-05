import { createContext, useContext } from 'react';
import type { User } from '~/types/user';

export interface UserContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  refreshUser: () => Promise<void>;
  logout: () => void;
  login: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);