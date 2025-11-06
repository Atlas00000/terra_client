/**
 * Authentication Utility
 * 
 * Client-side JWT token management and auth helpers
 * Handles login, logout, token storage, and auth state
 */

'use client';

import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'terra_auth_token';
const USER_KEY = 'terra_auth_user';

export interface JWTPayload {
  sub: string; // User ID
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export interface AuthUser {
  id: string;
  email: string;
  fullName: string | null;
  role: string;
  isActive: boolean;
}

/**
 * Auth utility class for managing authentication state
 */
class AuthManager {
  /**
   * Store JWT token in localStorage
   */
  setToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * Get JWT token from localStorage
   */
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Remove JWT token from localStorage
   */
  clearToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  /**
   * Store user data in localStorage
   */
  setUser(user: AuthUser): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  /**
   * Get user data from localStorage
   */
  getUser(): AuthUser | null {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  /**
   * Decode JWT token to get payload
   */
  decodeToken(token: string): JWTPayload | null {
    try {
      return jwtDecode<JWTPayload>(token);
    } catch {
      return null;
    }
  }

  /**
   * Check if token is expired
   */
  isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded) return true;

    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    return !this.isTokenExpired(token);
  }

  /**
   * Check if user has admin role
   */
  isAdmin(): boolean {
    const user = this.getUser();
    return user?.role === 'admin';
  }

  /**
   * Get auth header for API requests
   */
  getAuthHeader(): { Authorization: string } | {} {
    const token = this.getToken();
    if (!token || this.isTokenExpired(token)) {
      return {};
    }
    return { Authorization: `Bearer ${token}` };
  }

  /**
   * Logout user (clear all auth data)
   */
  logout(): void {
    this.clearToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login';
    }
  }

  /**
   * Login user (store token and user data)
   */
  login(token: string, user: AuthUser): void {
    this.setToken(token);
    this.setUser(user);
  }

  /**
   * Get token expiry time
   */
  getTokenExpiry(): Date | null {
    const token = this.getToken();
    if (!token) return null;

    const decoded = this.decodeToken(token);
    if (!decoded) return null;

    return new Date(decoded.exp * 1000);
  }

  /**
   * Get time until token expires (in seconds)
   */
  getTimeUntilExpiry(): number | null {
    const expiry = this.getTokenExpiry();
    if (!expiry) return null;

    const now = new Date();
    return Math.max(0, Math.floor((expiry.getTime() - now.getTime()) / 1000));
  }
}

// Export singleton instance
export const authManager = new AuthManager();

// Export helper functions
export function isAuthenticated(): boolean {
  return authManager.isAuthenticated();
}

export function isAdmin(): boolean {
  return authManager.isAdmin();
}

export function getAuthToken(): string | null {
  return authManager.getToken();
}

export function getAuthUser(): AuthUser | null {
  return authManager.getUser();
}

export function logout(): void {
  authManager.logout();
}

export function login(token: string, user: AuthUser): void {
  authManager.login(token, user);
}

