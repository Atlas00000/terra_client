'use client';

/**
 * React Query Provider for Terra Industries
 * 
 * Wraps the application to enable data fetching, caching, and state management.
 * Configured for optimal performance and developer experience.
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState } from 'react';

interface QueryProviderProps {
  children: ReactNode;
}

/**
 * Create Query Client with Terra Industries-specific configuration
 */
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Caching Strategy
        staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh
        gcTime: 10 * 60 * 1000, // 10 minutes - garbage collection (formerly cacheTime)
        
        // Refetching Strategy
        refetchOnWindowFocus: false, // Don't refetch when user returns to tab
        refetchOnReconnect: true, // Refetch when internet reconnects
        refetchOnMount: true, // Refetch when component mounts
        
        // Retry Strategy
        retry: (failureCount, error) => {
          // Don't retry on 4xx errors (client errors)
          const status = (error as any)?.status;
          if (status && status >= 400 && status < 500) {
            return false;
          }
          
          // Retry up to 1 time for network/server errors
          return failureCount < 1;
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        
        // Error Handling
        throwOnError: false, // Use error state instead of throwing
        
        // Network Mode
        networkMode: 'online', // Only fetch when online
      },
      mutations: {
        // Retry Strategy for Mutations (POST/PUT/DELETE)
        retry: false, // Don't retry mutations by default
        
        // Error Handling
        throwOnError: false,
        
        // Network Mode
        networkMode: 'online',
      },
    },
  });
}

// Browser-specific client (with singleton pattern)
let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: use singleton pattern to keep the same client
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }
    return browserQueryClient;
  }
}

/**
 * Query Provider Component
 * 
 * Wraps the application to provide React Query functionality.
 * Includes React Query DevTools in development mode.
 */
export function QueryProvider({ children }: QueryProviderProps) {
  // We use useState to ensure the client is created only once per browser session
  // This prevents creating new clients on every render
  const [queryClient] = useState(() => getQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      
      {/* React Query DevTools - only in development */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools
          initialIsOpen={false}
          position="bottom"
          buttonPosition="bottom-right"
        />
      )}
    </QueryClientProvider>
  );
}

/**
 * Export queryClient for use in Server Components or utilities
 * Note: This creates a new client each time - use sparingly
 */
export { getQueryClient };

