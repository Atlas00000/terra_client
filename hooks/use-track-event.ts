/**
 * useTrackEvent Hook
 * 
 * React hook for tracking analytics events
 * Provides convenient tracking functions for components
 */

'use client';

import { useCallback, useEffect } from 'react';
import { analytics, AnalyticsEventType } from '@/lib/analytics-tracker';
import { usePathname } from 'next/navigation';

/**
 * Hook for tracking analytics events
 * 
 * @example
 * ```tsx
 * const { trackEvent, trackPageView } = useTrackEvent();
 * 
 * // Track custom event
 * trackEvent('button_click', { button_name: 'Download Brochure' });
 * 
 * // Track page view (usually automatic)
 * trackPageView('Product Page');
 * ```
 */
export function useTrackEvent() {
  const pathname = usePathname();

  // Track page view on mount and pathname change
  useEffect(() => {
    analytics.trackPageView(document.title, {
      page_path: pathname,
    });
  }, [pathname]);

  const trackEvent = useCallback(
    (event: AnalyticsEventType, properties?: Record<string, any>) => {
      analytics.track(event, properties);
    },
    []
  );

  const trackPageView = useCallback(
    (pageName?: string, properties?: Record<string, any>) => {
      analytics.trackPageView(pageName, properties);
    },
    []
  );

  const trackProductView = useCallback(
    (productName: string, productId?: string, properties?: Record<string, any>) => {
      analytics.trackProductView(productName, productId, properties);
    },
    []
  );

  const trackSearch = useCallback(
    (query: string, resultsCount?: number, properties?: Record<string, any>) => {
      analytics.trackSearch(query, resultsCount, properties);
    },
    []
  );

  const trackClick = useCallback(
    (elementName: string, elementType: 'button' | 'link', properties?: Record<string, any>) => {
      analytics.trackClick(elementName, elementType, properties);
    },
    []
  );

  return {
    trackEvent,
    trackPageView,
    trackProductView,
    trackSearch,
    trackClick,
  };
}

/**
 * Hook for automatic product view tracking
 * Tracks when a product page is viewed
 * 
 * @example
 * ```tsx
 * function ArtemisPage() {
 *   useTrackProductView('Artemis', productId);
 *   // ... rest of component
 * }
 * ```
 */
export function useTrackProductView(productName: string, productId?: string) {
  useEffect(() => {
    if (productName) {
      analytics.trackProductView(productName, productId);
    }
  }, [productName, productId]);
}

/**
 * Hook for automatic search tracking
 * Tracks search queries and results
 * 
 * @example
 * ```tsx
 * const { results } = useSearch(query);
 * useTrackSearch(query, results?.length);
 * ```
 */
export function useTrackSearch(query: string, resultsCount?: number) {
  useEffect(() => {
    if (query && query.length >= 2) {
      const timer = setTimeout(() => {
        analytics.trackSearch(query, resultsCount);
      }, 500); // Debounce to avoid tracking every keystroke

      return () => clearTimeout(timer);
    }
  }, [query, resultsCount]);
}

