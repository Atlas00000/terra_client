/**
 * useSearch Hook
 * 
 * Global search across all entities (products, news, inquiries, RFQs)
 * Returns categorized search results
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS, buildEndpoint } from '@/lib/api-endpoints';
import { GlobalSearchResultsDTO } from '@/types/api';

interface UseSearchOptions {
  /**
   * Whether to enable the query (default: true)
   */
  enabled?: boolean;
  
  /**
   * Limit results per category
   */
  limit?: number;
}

interface UseSearchReturn {
  /**
   * Categorized search results
   */
  results: GlobalSearchResultsDTO | null;
  
  /**
   * Whether the search is loading
   */
  isLoading: boolean;
  
  /**
   * Whether there was an error
   */
  isError: boolean;
  
  /**
   * The error object (if any)
   */
  error: Error | null;
  
  /**
   * Refetch function
   */
  refetch: () => void;
}

/**
 * Hook for global search functionality
 * 
 * @param query - Search query string
 * @param options - Additional options
 * 
 * @example
 * ```tsx
 * const { results, isLoading } = useSearch('artemis');
 * 
 * if (isLoading) return <Loading />;
 * 
 * return (
 *   <div>
 *     <h3>Products: {results?.products.length}</h3>
 *     <h3>News: {results?.news.length}</h3>
 *   </div>
 * );
 * ```
 */
export function useSearch(
  query: string,
  options: UseSearchOptions = {}
): UseSearchReturn {
  const { enabled = true, limit } = options;

  const searchQuery = useQuery({
    queryKey: ['search', query, limit],
    queryFn: async () => {
      if (!query || query.length < 2) {
        return {
          products: [],
          news: [],
          inquiries: [],
          rfqs: [],
        };
      }

      const endpoint = buildEndpoint(API_ENDPOINTS.SEARCH.GLOBAL, {
        q: query,
        limit,
      });

      const response = await apiClient.get<GlobalSearchResultsDTO>(endpoint);
      return response.data;
    },
    enabled: enabled && query.length >= 2,
    staleTime: 30 * 1000, // 30 seconds (search results can change frequently)
    retry: 1,
  });

  return {
    results: searchQuery.data || null,
    isLoading: searchQuery.isLoading,
    isError: searchQuery.isError,
    error: searchQuery.error,
    refetch: searchQuery.refetch,
  };
}

/**
 * Hook for searching specific entity types
 * 
 * @param query - Search query string
 * @param entityType - Type of entity to search (products, news, inquiries, rfqs)
 * 
 * @example
 * ```tsx
 * const { results, isLoading } = useEntitySearch('drone', 'products');
 * ```
 */
export function useEntitySearch(
  query: string,
  entityType: 'products' | 'news' | 'inquiries' | 'rfqs',
  options: UseSearchOptions = {}
) {
  const { enabled = true, limit = 10 } = options;

  return useQuery({
    queryKey: ['search', entityType, query, limit],
    queryFn: async () => {
      if (!query || query.length < 2) {
        return [];
      }

      const endpoints = {
        products: API_ENDPOINTS.SEARCH.PRODUCTS,
        news: API_ENDPOINTS.SEARCH.NEWS,
        inquiries: API_ENDPOINTS.SEARCH.INQUIRIES,
        rfqs: API_ENDPOINTS.SEARCH.RFQS,
      };

      const endpoint = buildEndpoint(endpoints[entityType], {
        q: query,
        limit,
      });

      const response = await apiClient.get(endpoint);
      return response.data;
    },
    enabled: enabled && query.length >= 2,
    staleTime: 30 * 1000,
    retry: 1,
  });
}

