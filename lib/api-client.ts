/**
 * API Client for Terra Industries Backend
 * 
 * Handles all HTTP requests to the backend API with:
 * - Automatic error handling
 * - Request/response interceptors
 * - Type-safe endpoints
 */

import axios, { AxiosError, AxiosInstance } from 'axios';

// Get API URL from environment
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// Create axios instance with default configuration
export const apiClient: AxiosInstance = axios.create({
  baseURL: `${API_URL}/api/v1`,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // For cookies/credentials
});

// Request interceptor (for auth tokens, etc.)
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available (from localStorage)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('terra_auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // Log requests in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error) => {
    console.error('[API] Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor (for error handling)
apiClient.interceptors.response.use(
  (response) => {
    // Log responses in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API] Response from ${response.config.url}:`, response.status);
    }
    return response;
  },
  (error: AxiosError) => {
    // Handle different error types
    if (!error.response) {
      // Network error (API down, no internet, etc.)
      console.warn('[API] Network error - using fallback data');
      
      // Show user-friendly message only in production
      if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
        console.warn('Unable to connect to server. Using cached data.');
      }
      
      return Promise.reject({
        type: 'NETWORK_ERROR',
        message: 'Unable to connect to server',
        originalError: error,
      });
    }

    // HTTP errors
    const status = error.response.status;
    const url = error.config?.url;

    switch (status) {
      case 401:
        // Unauthorized - log but don't auto-redirect (let components handle it)
        console.warn('[API] Unauthorized:', url);
        // Clear invalid token
        if (typeof window !== 'undefined') {
          localStorage.removeItem('terra_auth_token');
          localStorage.removeItem('terra_auth_user');
        }
        break;

      case 403:
        // Forbidden
        console.error('[API] Forbidden:', url);
        break;

      case 404:
        // Not found
        console.warn('[API] Not found:', url);
        break;

      case 429:
        // Rate limited
        console.warn('[API] Rate limited - too many requests');
        if (typeof window !== 'undefined') {
          console.warn('Please try again in a moment.');
        }
        break;

      case 500:
      case 502:
      case 503:
        // Server errors
        console.error('[API] Server error:', status, url);
        if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
          console.error('Service temporarily unavailable. Please try again later.');
        }
        break;

      default:
        console.error('[API] Error:', status, url);
    }

    return Promise.reject({
      type: 'HTTP_ERROR',
      status,
      message: error.response.data?.message || error.message,
      data: error.response.data,
      originalError: error,
    });
  }
);

/**
 * Helper function to check if error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  return (error as any)?.type === 'NETWORK_ERROR';
}

/**
 * Helper function to check if error is an HTTP error
 */
export function isHttpError(error: unknown): boolean {
  return (error as any)?.type === 'HTTP_ERROR';
}

/**
 * Helper function to get error message
 */
export function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error;
  if ((error as any)?.message) return (error as any).message;
  return 'An unexpected error occurred';
}

// Export for type safety
export type APIError = {
  type: 'NETWORK_ERROR' | 'HTTP_ERROR';
  status?: number;
  message: string;
  data?: unknown;
  originalError?: unknown;
};

