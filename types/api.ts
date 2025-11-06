/**
 * API Type Definitions for Terra Industries Backend
 * 
 * These types match the backend DTOs and database models.
 * Keep in sync with server/src/modules/*/dto/*.dto.ts
 */

// ==================== COMMON TYPES ====================

/**
 * Standard paginated response wrapper
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * Standard API response wrapper
 */
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// ==================== NEWS / STORIES ====================

/**
 * News Story from backend
 * Maps to: server/prisma/schema.prisma - NewsStory model
 */
export interface NewsStoryDTO {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  authorId: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt: string | null;
  featuredImageId: string | null;
  category: string | null;
  tags: string[];
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  
  // Relations (when included)
  author?: UserDTO;
  featuredImage?: MediaFileDTO;
}

/**
 * News story statistics
 */
export interface NewsStatsDTO {
  total: number;
  published: number;
  draft: number;
  archived: number;
  totalViews: number;
}

// ==================== PRODUCTS ====================

/**
 * Product Specification from backend
 * Maps to: server/prisma/schema.prisma - ProductSpecification model
 */
export interface ProductSpecificationDTO {
  id: string;
  productName: string;
  category: string;
  specifications: Record<string, any>; // JSON field
  performanceMetrics: Record<string, any>; // JSON field
  technicalDetails: Record<string, any>; // JSON field
  mediaGalleryIds: string[];
  createdById: string;
  createdAt: string;
  updatedAt: string;
  
  // Relations (when included)
  createdBy?: UserDTO;
}

/**
 * Product statistics
 */
export interface ProductStatsDTO {
  total: number;
  byCategory: Record<string, number>;
}

// ==================== USERS ====================

/**
 * User from backend (admin user)
 * Maps to: server/prisma/schema.prisma - User model
 */
export interface UserDTO {
  id: string;
  email: string;
  fullName: string | null;
  role: string;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
  // Note: passwordHash is never sent to frontend
}

/**
 * Auth response (login/refresh)
 */
export interface AuthResponseDTO {
  user: UserDTO;
  accessToken: string;
  expiresIn: string;
}

// ==================== INQUIRIES (CRM) ====================

/**
 * Inquiry (lead) from backend
 * Maps to: server/prisma/schema.prisma - Inquiry model
 */
export interface InquiryDTO {
  id: string;
  inquiryType: string;
  fullName: string;
  email: string;
  phone: string | null;
  company: string | null;
  country: string;
  message: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  leadScore: number; // 0-100
  assignedToId: string | null;
  metadata: Record<string, any> | null;
  source: string;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
  updatedAt: string;
  
  // Relations (when included)
  assignedTo?: UserDTO;
  rfqs?: RfqRequestDTO[];
}

/**
 * Inquiry statistics
 */
export interface InquiryStatsDTO {
  total: number;
  newInquiries: number;
  inProgress: number;
  highPriority: number;
}

// ==================== RFQ (REQUEST FOR QUOTE) ====================

/**
 * RFQ Request from backend
 * Maps to: server/prisma/schema.prisma - RfqRequest model
 */
export interface RfqRequestDTO {
  id: string;
  inquiryId: string | null;
  productCategory: string;
  quantity: number | null;
  budgetRange: string | null;
  timeline: string | null;
  requirements: string | null;
  specifications: Record<string, any> | null;
  status: 'pending' | 'quoted' | 'won' | 'lost';
  quoteAmount: string | null; // Decimal as string
  quoteSentAt: string | null;
  decisionDate: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  
  // Relations (when included)
  inquiry?: InquiryDTO;
}

/**
 * RFQ statistics
 */
export interface RfqStatsDTO {
  total: number;
  pending: number;
  quoted: number;
  won: number;
  lost: number;
  totalValue: number;
}

// ==================== MEDIA ====================

/**
 * Media File from backend
 * Maps to: server/prisma/schema.prisma - MediaFile model
 */
export interface MediaFileDTO {
  id: string;
  fileName: string;
  fileType: string;
  mimeType: string;
  fileSize: string; // BigInt as string
  storagePath: string;
  publicUrl: string;
  width: number | null;
  height: number | null;
  altText: string | null;
  caption: string | null;
  tags: string[];
  uploadedById: string;
  entityType: string | null;
  entityId: string | null;
  createdAt: string;
  
  // Relations (when included)
  uploadedBy?: UserDTO;
}

/**
 * Media statistics
 */
export interface MediaStatsDTO {
  total: number;
  images: number;
  documents: number;
  totalSize: string; // Bytes as string
}

// ==================== EMAIL QUEUE ====================

/**
 * Email Queue item from backend
 * Maps to: server/prisma/schema.prisma - EmailQueue model
 */
export interface EmailQueueDTO {
  id: string;
  toEmail: string;
  fromEmail: string | null;
  subject: string;
  bodyHtml: string | null;
  bodyText: string | null;
  templateName: string | null;
  templateData: Record<string, any> | null;
  status: 'pending' | 'sent' | 'failed';
  attempts: number;
  lastAttemptAt: string | null;
  sentAt: string | null;
  errorMessage: string | null;
  createdAt: string;
}

/**
 * Email statistics
 */
export interface EmailStatsDTO {
  total: number;
  pending: number;
  sent: number;
  failed: number;
}

// ==================== ACTIVITY LOGS ====================

/**
 * Activity Log from backend
 * Maps to: server/prisma/schema.prisma - ActivityLog model
 */
export interface ActivityLogDTO {
  id: string;
  userId: string | null;
  action: string;
  entityType: string | null;
  entityId: string | null;
  changes: Record<string, any> | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
  
  // Relations (when included)
  user?: UserDTO;
}

// ==================== ANALYTICS ====================

/**
 * Dashboard overview metrics
 */
export interface DashboardMetricsDTO {
  inquiries: {
    total: number;
    new: number;
    inProgress: number;
    closed: number;
    trend: 'up' | 'down' | 'stable';
    changePercent: number;
  };
  rfqs: {
    total: number;
    pending: number;
    quoted: number;
    won: number;
    lost: number;
    winRate: number;
  };
  revenue: {
    total: number;
    thisMonth: number;
    lastMonth: number;
    trend: 'up' | 'down' | 'stable';
  };
}

/**
 * Lead distribution analytics
 */
export interface LeadDistributionDTO {
  byCountry: Array<{ country: string; count: number }>;
  byType: Array<{ type: string; count: number }>;
  byLeadScore: Array<{ range: string; count: number }>;
}

/**
 * Performance metrics
 */
export interface PerformanceMetricsDTO {
  averageResponseTime: number; // hours
  averageQuoteTime: number; // hours
}

/**
 * Timeline data point
 */
export interface TimelineDataPointDTO {
  date: string; // ISO date
  count: number;
}

// ==================== SEARCH ====================

/**
 * Global search results
 */
export interface GlobalSearchResultsDTO {
  inquiries: InquiryDTO[];
  rfqs: RfqRequestDTO[];
  news: NewsStoryDTO[];
  products: ProductSpecificationDTO[];
}

/**
 * Search suggestion
 */
export interface SearchSuggestionDTO {
  text: string;
  type: 'company' | 'product' | 'news';
}

// ==================== HEALTH ====================

/**
 * Health check response
 */
export interface HealthCheckDTO {
  status: 'ok' | 'degraded' | 'down';
  timestamp: string;
  service: string;
  version: string;
  environment: string;
}

// ==================== QUERY PARAMETERS ====================

/**
 * Common pagination params
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

/**
 * News query parameters
 */
export interface NewsQueryParams extends PaginationParams {
  status?: 'draft' | 'published' | 'archived';
  category?: string;
  tags?: string[];
  search?: string;
}

/**
 * Product query parameters
 */
export interface ProductQueryParams extends PaginationParams {
  category?: string;
  search?: string;
}

/**
 * Inquiry query parameters
 */
export interface InquiryQueryParams extends PaginationParams {
  status?: string;
  leadScore?: number;
  country?: string;
  assignedTo?: string;
  search?: string;
}

/**
 * RFQ query parameters
 */
export interface RfqQueryParams extends PaginationParams {
  status?: string;
  productCategory?: string;
  search?: string;
}

/**
 * Search query parameters
 */
export interface SearchQueryParams {
  q: string; // Query string
  limit?: number;
}

// ==================== TYPE ALIASES FOR FRONTEND ====================

/**
 * Aliases for cleaner imports in frontend code
 */
export type ProductSpecification = ProductSpecificationDTO;
export type ProductSpecificationAPI = ProductSpecificationDTO;
export type NewsStory = NewsStoryDTO;
export type User = UserDTO;
export type Inquiry = InquiryDTO;
export type RfqRequest = RfqRequestDTO;
export type MediaFile = MediaFileDTO;
export type ActivityLog = ActivityLogDTO;

