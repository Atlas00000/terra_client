import { z } from 'zod'

/**
 * Environment variable schema with validation
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_API_URL: z.string().url().optional(),
  NEXT_PUBLIC_VERCEL_ANALYTICS_ID: z.string().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  NEXT_PUBLIC_ENABLE_ANALYTICS: z
    .string()
    .transform((val) => val === 'true')
    .optional()
    .default('false'),
  NEXT_TELEMETRY_DISABLED: z.string().optional(),
})

/**
 * Validates and returns environment variables
 * Throws an error if validation fails
 */
function getEnv() {
  const env = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_VERCEL_ANALYTICS_ID: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS,
    NEXT_TELEMETRY_DISABLED: process.env.NEXT_TELEMETRY_DISABLED,
  }

  const parsed = envSchema.safeParse(env)

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors)
    throw new Error('Invalid environment variables. Check .env.example for required variables.')
  }

  return parsed.data
}

/**
 * Validated environment configuration
 * Use this instead of process.env for type safety
 */
export const config = getEnv()

/**
 * Application constants
 * Centralized configuration for the application
 */
export const APP_CONFIG = {
  name: 'Terra Industries',
  description: 'Advanced Defense Technology & Aerospace Solutions',
  version: '0.1.0',
  
  // File upload limits
  maxImageSize: 5 * 1024 * 1024, // 5MB
  maxDocumentSize: 10 * 1024 * 1024, // 10MB
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
  allowedDocumentTypes: ['application/pdf', 'application/msword'],
  
  // Contact information
  supportEmail: 'support@terraindustries.com',
  salesEmail: 'sales@terraindustries.com',
  
  // Products
  products: ['archer', 'artemis', 'duma', 'iroko', 'kallon'] as const,
} as const

/**
 * Type-safe product names
 */
export type ProductName = typeof APP_CONFIG.products[number]

/**
 * Check if code is running in production
 */
export const isProduction = config.NODE_ENV === 'production'

/**
 * Check if code is running in development
 */
export const isDevelopment = config.NODE_ENV === 'development'

/**
 * Check if code is running in test environment
 */
export const isTest = config.NODE_ENV === 'test'

