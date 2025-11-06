/**
 * useSearchSuggestions Hook
 * 
 * Provides autocomplete suggestions for search queries
 * Useful for search-as-you-type functionality
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS, buildEndpoint } from '@/lib/api-endpoints';
import { SearchSuggestionDTO } from '@/types/api';

interface UseSearchSuggestionsOptions {
  /**
   * Whether to enable the query (default: true)
   */
  enabled?: boolean;
  
  /**
   * Maximum number of suggestions to return
   */
  limit?: number;
}

interface UseSearchSuggestionsReturn {
  /**
   * Array of search suggestions
   */
  suggestions: SearchSuggestionDTO[];
  
  /**
   * Whether suggestions are loading
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
}

/**
 * Hook for search autocomplete suggestions
 * 
 * @param query - Search query string
 * @param options - Additional options
 * 
 * @example
 * ```tsx
 * const { suggestions, isLoading } = useSearchSuggestions(inputValue);
 * 
 * return (
 *   <div>
 *     {suggestions.map(suggestion => (
 *       <div key={suggestion.text}>
 *         {suggestion.text} ({suggestion.type})
 *       </div>
 *     ))}
 *   </div>
 * );
 * ```
 */
export function useSearchSuggestions(
  query: string,
  options: UseSearchSuggestionsOptions = {}
): UseSearchSuggestionsReturn {
  const { enabled = true, limit = 5 } = options;

  const suggestionsQuery = useQuery({
    queryKey: ['search-suggestions', query, limit],
    queryFn: async () => {
      if (!query || query.length < 2) {
        return [];
      }

      const endpoint = buildEndpoint(API_ENDPOINTS.SEARCH.SUGGESTIONS, {
        q: query,
        limit,
      });

      const response = await apiClient.get<SearchSuggestionDTO[]>(endpoint);
      return response.data || [];
    },
    enabled: enabled && query.length >= 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  return {
    suggestions: suggestionsQuery.data || [],
    isLoading: suggestionsQuery.isLoading,
    isError: suggestionsQuery.isError,
    error: suggestionsQuery.error,
  };
}

/**
 * Hook for popular/trending search queries
 * Can be used to show suggestions when search is empty
 */
export function usePopularSearches(limit: number = 5) {
  return useQuery({
    queryKey: ['popular-searches', limit],
    queryFn: async () => {
      // This would come from analytics data
      // For now, return static popular searches
      return [
        { text: 'Artemis UAV', type: 'product' as const },
        { text: 'Archer VTOL', type: 'product' as const },
        { text: 'Latest news', type: 'news' as const },
        { text: 'Armored vehicles', type: 'product' as const },
        { text: 'Defense technology', type: 'news' as const },
      ];
    },
    staleTime: 60 * 60 * 1000, // 1 hour (popular searches change slowly)
  });
}

