/**
 * useAuth Hook
 * 
 * React hook for authentication operations
 * Manages login, logout, and auth state
 */

'use client';

import { useState, useCallback, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { authManager, AuthUser } from '@/lib/auth';
import { AuthResponseDTO } from '@/types/api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface UseAuthReturn {
  /**
   * Current authenticated user (null if not logged in)
   */
  user: AuthUser | null;
  
  /**
   * Whether user is authenticated
   */
  isAuthenticated: boolean;
  
  /**
   * Whether user has admin role
   */
  isAdmin: boolean;
  
  /**
   * Login function
   */
  login: (credentials: LoginCredentials) => Promise<void>;
  
  /**
   * Logout function
   */
  logout: () => void;
  
  /**
   * Whether login is in progress
   */
  isLoggingIn: boolean;
  
  /**
   * Login error (if any)
   */
  loginError: Error | null;
  
  /**
   * Whether user data is loading
   */
  isLoadingUser: boolean;
  
  /**
   * Refetch current user data
   */
  refetchUser: () => void;
}

/**
 * Hook for authentication operations
 * 
 * @example
 * ```tsx
 * const { user, isAuthenticated, login, logout } = useAuth();
 * 
 * const handleLogin = async () => {
 *   try {
 *     await login({ email: 'admin@example.com', password: 'password' });
 *     router.push('/admin/dashboard');
 *   } catch (error) {
 *     console.error('Login failed:', error);
 *   }
 * };
 * ```
 */
export function useAuth(): UseAuthReturn {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<AuthUser | null>(() => authManager.getUser());

  // Fetch current user data if token exists
  const { data: currentUser, isLoading: isLoadingUser, refetch: refetchUser } = useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      const token = authManager.getToken();
      if (!token || authManager.isTokenExpired(token)) {
        return null;
      }

      try {
        const response = await apiClient.get<AuthUser>(API_ENDPOINTS.AUTH.ME);
        const userData = response.data;
        authManager.setUser(userData);
        return userData;
      } catch (error) {
        // Token invalid or expired
        authManager.clearToken();
        return null;
      }
    },
    enabled: !!authManager.getToken(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await apiClient.post<AuthResponseDTO>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );
      return response.data;
    },
    onSuccess: (data) => {
      // Store token and user data
      authManager.login(data.accessToken, data.user);
      setUser(data.user);
      
      // Invalidate queries to refetch with new auth
      queryClient.invalidateQueries({ queryKey: ['current-user'] });
    },
    onError: (error) => {
      // Clear any stale auth data
      authManager.clearToken();
      setUser(null);
    },
  });

  const handleLogin = useCallback(
    async (credentials: LoginCredentials) => {
      const result = await loginMutation.mutateAsync(credentials);
      // Force update the local user state immediately
      setUser(result.user);
      return result;
    },
    [loginMutation]
  );

  const handleLogout = useCallback(() => {
    authManager.logout();
    setUser(null);
    queryClient.clear();
    router.push('/admin/login');
  }, [router, queryClient]);

  // Use the most up-to-date user state
  const effectiveUser = currentUser || user;

  return {
    user: effectiveUser,
    isAuthenticated: !!effectiveUser && authManager.isAuthenticated(),
    isAdmin: !!effectiveUser && authManager.isAdmin(),
    login: handleLogin,
    logout: handleLogout,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    isLoadingUser,
    refetchUser,
  };
}

/**
 * Hook to require authentication
 * Redirects to login if not authenticated
 * 
 * @example
 * ```tsx
 * function AdminPage() {
 *   const { user, isLoading } = useRequireAuth();
 *   
 *   if (isLoading) return <Loading />;
 *   
 *   return <div>Welcome {user.email}</div>;
 * }
 * ```
 */
export function useRequireAuth(): { user: AuthUser; isLoading: boolean } {
  const router = useRouter();
  const { user, isAuthenticated, isLoadingUser } = useAuth();

  // Use useEffect to avoid calling router.push during render
  useEffect(() => {
    if (!isLoadingUser && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isLoadingUser, isAuthenticated, router]);

  return {
    user: user!,
    isLoading: isLoadingUser || !user,
  };
}

