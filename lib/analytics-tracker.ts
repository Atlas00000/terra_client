/**
 * Analytics Tracker
 * 
 * Client-side analytics tracking utility
 * Sends events to backend analytics API
 */

import { apiClient } from './api-client';

export type AnalyticsEventType =
  | 'page_view'
  | 'product_view'
  | 'search'
  | 'button_click'
  | 'form_submit'
  | 'link_click'
  | 'download'
  | 'video_play';

export interface AnalyticsEvent {
  /**
   * Type of event
   */
  event: AnalyticsEventType;
  
  /**
   * Event properties
   */
  properties?: Record<string, any>;
  
  /**
   * Timestamp (auto-generated if not provided)
   */
  timestamp?: string;
  
  /**
   * Page URL (auto-captured if not provided)
   */
  url?: string;
  
  /**
   * Referrer URL
   */
  referrer?: string;
  
  /**
   * User agent
   */
  userAgent?: string;
}

/**
 * Analytics Tracker Class
 * Singleton for tracking events across the application
 */
class AnalyticsTracker {
  private queue: AnalyticsEvent[] = [];
  private isFlushingQueue = false;
  private flushInterval: NodeJS.Timeout | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      // Flush queue every 10 seconds
      this.flushInterval = setInterval(() => {
        this.flush();
      }, 10000);

      // Flush on page unload
      window.addEventListener('beforeunload', () => {
        this.flush();
      });
    }
  }

  /**
   * Track an analytics event
   */
  track(event: AnalyticsEventType, properties?: Record<string, any>) {
    if (typeof window === 'undefined') return;

    const analyticsEvent: AnalyticsEvent = {
      event,
      properties,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      referrer: document.referrer || undefined,
      userAgent: navigator.userAgent,
    };

    this.queue.push(analyticsEvent);

    // Flush immediately for critical events
    if (['form_submit', 'button_click'].includes(event)) {
      this.flush();
    }
  }

  /**
   * Track page view
   */
  trackPageView(pageName?: string, properties?: Record<string, any>) {
    this.track('page_view', {
      page_name: pageName || document.title,
      page_path: window.location.pathname,
      ...properties,
    });
  }

  /**
   * Track product view
   */
  trackProductView(productName: string, productId?: string, properties?: Record<string, any>) {
    this.track('product_view', {
      product_name: productName,
      product_id: productId,
      ...properties,
    });
  }

  /**
   * Track search query
   */
  trackSearch(query: string, resultsCount?: number, properties?: Record<string, any>) {
    this.track('search', {
      search_query: query,
      results_count: resultsCount,
      ...properties,
    });
  }

  /**
   * Track button/link clicks
   */
  trackClick(elementName: string, elementType: 'button' | 'link', properties?: Record<string, any>) {
    this.track(elementType === 'link' ? 'link_click' : 'button_click', {
      element_name: elementName,
      element_type: elementType,
      ...properties,
    });
  }

  /**
   * Flush queued events to backend
   */
  async flush() {
    if (this.isFlushingQueue || this.queue.length === 0) {
      return;
    }

    this.isFlushingQueue = true;
    const eventsToSend = [...this.queue];
    this.queue = [];

    try {
      // Send to backend analytics API
      // Note: This endpoint would need to be created on the backend
      // For now, we'll just log in development
      if (process.env.NODE_ENV === 'development') {
        console.log('[Analytics] Tracked events:', eventsToSend);
      }

      // Uncomment when backend analytics endpoint is ready
      // await apiClient.post('/analytics/track', {
      //   events: eventsToSend,
      // });
    } catch (error) {
      console.error('[Analytics] Failed to send events:', error);
      // Re-queue failed events (up to a limit to prevent memory issues)
      if (this.queue.length < 100) {
        this.queue = [...eventsToSend, ...this.queue];
      }
    } finally {
      this.isFlushingQueue = false;
    }
  }

  /**
   * Clear all queued events
   */
  clear() {
    this.queue = [];
  }

  /**
   * Stop the tracker and clear interval
   */
  destroy() {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
      this.flushInterval = null;
    }
    this.flush(); // Final flush
  }
}

// Export singleton instance
export const analytics = new AnalyticsTracker();

// Helper function for direct tracking
export function trackEvent(event: AnalyticsEventType, properties?: Record<string, any>) {
  analytics.track(event, properties);
}

export function trackPageView(pageName?: string, properties?: Record<string, any>) {
  analytics.trackPageView(pageName, properties);
}

export function trackProductView(productName: string, productId?: string, properties?: Record<string, any>) {
  analytics.trackProductView(productName, productId, properties);
}

export function trackSearch(query: string, resultsCount?: number, properties?: Record<string, any>) {
  analytics.trackSearch(query, resultsCount, properties);
}

