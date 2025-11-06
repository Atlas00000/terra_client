/**
 * API Endpoints for Terra Industries Backend
 * 
 * Centralized endpoint constants for type-safe API calls.
 * All endpoints are relative to /api/v1 (handled by apiClient).
 */

export const API_ENDPOINTS = {
  // ==================== PUBLIC ENDPOINTS ====================
  
  /**
   * News/Stories endpoints
   */
  NEWS: {
    /**
     * Get all published news stories
     * Query params: status, category, limit, page
     */
    LIST: '/news',
    
    /**
     * Get featured news stories (for company page)
     * Returns most recent published stories
     */
    FEATURED: '/news/featured',
    
    /**
     * Get single story by ID
     */
    BY_ID: (id: string) => `/news/${id}`,
    
    /**
     * Get single story by slug (SEO-friendly URL)
     */
    BY_SLUG: (slug: string) => `/news/slug/${slug}`,
    
    /**
     * Increment view count (Week 3)
     */
    VIEW: (id: string) => `/news/${id}/view`,
  },

  /**
   * Product Specifications endpoints
   */
  PRODUCTS: {
    /**
     * Get all product specifications
     * Query params: category, limit, page
     */
    LIST: '/product-specs',
    
    /**
     * Get product specs by category
     * Categories: artemis, archer, iroko, duma, kallon
     */
    BY_CATEGORY: (category: string) => `/product-specs/category/${category}`,
    
    /**
     * Get single product spec by ID
     */
    BY_ID: (id: string) => `/product-specs/${id}`,
  },

  /**
   * Search endpoints (Week 3)
   */
  SEARCH: {
    /**
     * Global search across all entities
     * Query params: q (query string)
     */
    GLOBAL: '/search/global',
    
    /**
     * Search autocomplete suggestions
     * Query params: q (query string)
     */
    SUGGESTIONS: '/search/suggestions',
    
    /**
     * Search specific entities
     */
    INQUIRIES: '/search/inquiries',
    RFQS: '/search/rfqs',
    NEWS: '/search/news',
    PRODUCTS: '/search/products',
  },

  /**
   * Health check
   */
  HEALTH: '/health',

  // ==================== PROTECTED ENDPOINTS (Week 4-5) ====================
  
  /**
   * Authentication endpoints
   */
  AUTH: {
    /**
     * Admin login
     */
    LOGIN: '/auth/login',
    
    /**
     * Get current user profile
     */
    ME: '/auth/me',
    
    /**
     * Refresh JWT token
     */
    REFRESH: '/auth/refresh',
  },

  /**
   * Inquiries (CRM) endpoints
   */
  INQUIRIES: {
    /**
     * List all inquiries (paginated)
     * Query params: status, leadScore, country, page, limit
     */
    LIST: '/inquiries',
    
    /**
     * Get inquiry statistics
     */
    STATS: '/inquiries/stats',
    
    /**
     * Get single inquiry
     */
    BY_ID: (id: string) => `/inquiries/${id}`,
    
    /**
     * Update inquiry
     */
    UPDATE: (id: string) => `/inquiries/${id}`,
    
    /**
     * Delete inquiry
     */
    DELETE: (id: string) => `/inquiries/${id}`,
  },

  /**
   * RFQ (Request for Quote) endpoints
   */
  RFQ: {
    /**
     * List all RFQs (paginated)
     * Query params: status, productCategory, page, limit
     */
    LIST: '/rfq',
    
    /**
     * Get RFQ statistics
     */
    STATS: '/rfq/stats',
    
    /**
     * Export RFQs to CSV
     */
    EXPORT: '/rfq/export',
    
    /**
     * Get single RFQ
     */
    BY_ID: (id: string) => `/rfq/${id}`,
    
    /**
     * Update RFQ
     */
    UPDATE: (id: string) => `/rfq/${id}`,
    
    /**
     * Send quote for RFQ
     */
    SEND_QUOTE: (id: string) => `/rfq/${id}/quote`,
  },

  /**
   * News CMS endpoints (admin)
   */
  NEWS_ADMIN: {
    /**
     * Create news story
     */
    CREATE: '/news',
    
    /**
     * Get all stories (including drafts)
     */
    LIST_ALL: '/news',
    
    /**
     * Get news statistics
     */
    STATS: '/news/stats',
    
    /**
     * Update story
     */
    UPDATE: (id: string) => `/news/${id}`,
    
    /**
     * Delete story
     */
    DELETE: (id: string) => `/news/${id}`,
    
    /**
     * Publish story
     */
    PUBLISH: (id: string) => `/news/${id}/publish`,
    
    /**
     * Unpublish story
     */
    UNPUBLISH: (id: string) => `/news/${id}/unpublish`,
  },

  /**
   * Product Specifications CMS endpoints (admin)
   */
  PRODUCTS_ADMIN: {
    /**
     * Create product specification
     */
    CREATE: '/product-specs',
    
    /**
     * Get product statistics
     */
    STATS: '/product-specs/stats',
    
    /**
     * Update product spec
     */
    UPDATE: (id: string) => `/product-specs/${id}`,
    
    /**
     * Delete product spec
     */
    DELETE: (id: string) => `/product-specs/${id}`,
  },

  /**
   * Media Management endpoints
   */
  MEDIA: {
    /**
     * List all media files
     * Query params: type, limit, page
     */
    LIST: '/media',
    
    /**
     * Upload file to R2
     */
    UPLOAD: '/media/upload',
    
    /**
     * Get media statistics
     */
    STATS: '/media/stats',
    
    /**
     * Get single file
     */
    BY_ID: (id: string) => `/media/${id}`,
    
    /**
     * Update file metadata
     */
    UPDATE: (id: string) => `/media/${id}`,
    
    /**
     * Delete file
     */
    DELETE: (id: string) => `/media/${id}`,
  },

  /**
   * Email Queue endpoints
   */
  EMAIL: {
    /**
     * Get email queue (pending, sent, failed)
     */
    QUEUE: '/email/queue',
    
    /**
     * Get email by ID
     */
    BY_ID: (id: string) => `/email/${id}`,
    
    /**
     * Retry failed email
     */
    RETRY: (id: string) => `/email/${id}/retry`,
    
    /**
     * Get email statistics
     */
    STATS: '/email/stats',
  },

  /**
   * Analytics endpoints
   */
  ANALYTICS: {
    /**
     * Dashboard overview metrics
     */
    OVERVIEW: '/analytics/dashboard',
    
    /**
     * Sales insights
     */
    SALES: '/analytics/sales',
    
    /**
     * Lead distribution analytics
     */
    INQUIRIES: '/analytics/inquiries',
    
    /**
     * Performance metrics
     */
    PERFORMANCE: '/analytics/performance',
    
    /**
     * Business trends
     */
    TRENDS: '/analytics/trends',
    
    /**
     * Timeline data (inquiries/RFQs over time)
     */
    TIMELINE_INQUIRIES: '/analytics/timeline/inquiries',
    TIMELINE_RFQS: '/analytics/timeline/rfqs',
    
    /**
     * Lead pipeline
     */
    LEADS: '/analytics/leads',
    
    /**
     * Content performance
     */
    NEWS_PERFORMANCE: '/analytics/news',
    PRODUCT_PERFORMANCE: '/analytics/products',
  },

  /**
   * Activity Logs endpoints
   */
  ACTIVITY_LOGS: {
    /**
     * Get activity logs (audit trail)
     * Query params: userId, action, entityType, page, limit
     */
    LIST: '/activity-logs',
    
    /**
     * Get recent activity
     */
    RECENT: '/activity-logs/recent',
  },
} as const;

// Type helper for endpoint functions
export type EndpointFunction<T extends any[] = any[]> = (...args: T) => string;

/**
 * Helper to build query string from params
 */
export function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * Helper to build full endpoint with query params
 * 
 * @example
 * buildEndpoint(API_ENDPOINTS.NEWS.LIST, { status: 'published', limit: 10 })
 * // Returns: '/news?status=published&limit=10'
 */
export function buildEndpoint(
  endpoint: string,
  params?: Record<string, any>
): string {
  if (!params) return endpoint;
  return `${endpoint}${buildQueryString(params)}`;
}

