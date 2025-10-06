import { createContext, useContext, type ReactNode } from 'react';
import type { User } from '~/types/user';

// Mock user data
const mockUser: User = {
  id: '1',
  firstName: 'João',
  lastName: 'Silva',
  email: 'joao@example.com',
  currentGroupId: null,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  avatar: 'https://thispersondoesnotexist.com/',
  familyAvatar: 'https://placebear.com/250/250',
  familyName: 'Os Silvas'
};

// User context interface
interface UserContextType {
  user: User;
}

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// User provider component
interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const value: UserContextType = {
    user: mockUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// Custom hook to use user context
export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

// Export context for advanced usage
export { UserContext };
