/**
 * Auth Provider
 * 
 * React context provider for authentication state
 * Makes auth state available throughout the app
 */

'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { AuthUser } from '@/lib/auth';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  isLoggingIn: boolean;
  loginError: Error | null;
  isLoadingUser: boolean;
  refetchUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access auth context
 * Must be used within AuthProvider
 */
export function useAuthContext() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  
  return context;
}

