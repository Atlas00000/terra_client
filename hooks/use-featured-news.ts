/**
 * Use Featured News Hook
 * 
 * React Query hook for fetching featured news from the backend API.
 * Includes automatic fallback to static data if API is unavailable.
 */

import { useQuery } from '@tanstack/react-query';
import { apiClient, isNetworkError } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { NewsStoryDTO } from '@/types/api';
import {
  transformNewsStories,
  sortNewsByDate,
  filterPublishedNews,
  FrontendNewsItem,
} from '@/lib/transformers/news-transformer';
import { FALLBACK_NEWS } from '@/lib/fallback-data/news';

/**
 * Fetch featured news from backend
 */
async function fetchFeaturedNews(): Promise<FrontendNewsItem[]> {
  try {
    // Call backend API
    const response = await apiClient.get<NewsStoryDTO[]>(
      API_ENDPOINTS.NEWS.FEATURED
    );

    const stories = response.data;

    // Filter published stories only
    const publishedStories = filterPublishedNews(stories);

    // Sort by date (newest first)
    const sortedStories = sortNewsByDate(publishedStories);

    // Take top 5 stories
    const featuredStories = sortedStories.slice(0, 5);

    // Transform to frontend format
    const transformed = transformNewsStories(featuredStories);

    if (process.env.NODE_ENV === 'development') {
      console.log('[useFeaturedNews] Fetched', transformed.length, 'stories from API');
    }

    return transformed;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[useFeaturedNews] API error, using fallback data:', error);
    }

    // Let React Query handle the error and use fallback data
    throw error;
  }
}

/**
 * Hook to fetch and manage featured news
 * 
 * Features:
 * - Automatic fallback to static data on error
 * - Caching with 5-minute freshness
 * - Loading and error states
 * - Automatic retries on network errors
 * 
 * @example
 * ```tsx
 * function NewsComponent() {
 *   const { data: news, isLoading, error } = useFeaturedNews();
 *   
 *   if (isLoading) return <Skeleton />;
 *   
 *   return <NewsList items={news} />;
 * }
 * ```
 */
export function useFeaturedNews() {
  return useQuery({
    // Query key for caching
    queryKey: ['news', 'featured'],

    // Fetch function
    queryFn: fetchFeaturedNews,

    // Fallback data (used immediately on error)
    placeholderData: FALLBACK_NEWS.slice(0, 5),

    // Caching strategy
    staleTime: 5 * 60 * 1000, // 5 minutes - how long data stays fresh
    gcTime: 10 * 60 * 1000, // 10 minutes - how long cached data is kept

    // Retry strategy
    retry: (failureCount, error) => {
      // Network errors - retry once
      if (isNetworkError(error)) {
        return failureCount < 1;
      }
      // HTTP errors - don't retry
      return false;
    },

    // Options
    refetchOnWindowFocus: false, // Don't refetch when user returns to tab
    refetchOnMount: false, // Don't refetch when component remounts
    refetchOnReconnect: true, // Refetch when internet reconnects
  });
}

/**
 * Hook to fetch all published news
 * (For future use - Week 2 or 3)
 */
export function usePublishedNews(limit: number = 10) {
  return useQuery({
    queryKey: ['news', 'published', limit],
    queryFn: async () => {
      const response = await apiClient.get<NewsStoryDTO[]>(
        API_ENDPOINTS.NEWS.LIST,
        {
          params: {
            status: 'published',
            limit,
          },
        }
      );

      const stories = response.data;
      const sorted = sortNewsByDate(stories);
      return transformNewsStories(sorted);
    },
    placeholderData: FALLBACK_NEWS.slice(0, limit),
    staleTime: 5 * 60 * 1000,
    enabled: typeof window !== 'undefined', // Only run in browser
  });
}

/**
 * Hook to fetch single news story by slug
 * (For future use - Week 3)
 */
export function useNewsBySlug(slug: string | null) {
  return useQuery({
    queryKey: ['news', 'slug', slug],
    queryFn: async () => {
      if (!slug) throw new Error('Slug is required');

      const response = await apiClient.get<NewsStoryDTO>(
        API_ENDPOINTS.NEWS.BY_SLUG(slug)
      );

      return transformNewsStories([response.data])[0];
    },
    enabled: !!slug, // Only run if slug is provided
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

