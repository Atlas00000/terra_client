/**
 * Product Specification Transformer
 * 
 * Transforms raw API product specification data into frontend-friendly format
 */

import { ProductSpecification, ProductSpecificationAPI } from '@/types/api';

/**
 * Transform single product specification from API format to frontend format
 */
export function transformProductSpec(
  apiProduct: ProductSpecificationAPI
): ProductSpecification {
  return {
    id: apiProduct.id,
    productName: apiProduct.productName,
    category: apiProduct.category,
    specifications: apiProduct.specifications,
    performanceMetrics: apiProduct.performanceMetrics,
    technicalDetails: apiProduct.technicalDetails,
    mediaGalleryIds: apiProduct.mediaGalleryIds || [],
    createdAt: apiProduct.createdAt,
    updatedAt: apiProduct.updatedAt,
  };
}

/**
 * Transform array of product specifications
 */
export function transformProductSpecList(
  apiProducts: ProductSpecificationAPI[]
): ProductSpecification[] {
  return apiProducts.map(transformProductSpec);
}

/**
 * Get product summary text from specifications
 * Useful for preview cards and short descriptions
 */
export function getProductSummary(product: ProductSpecification): string {
  const specs = product.specifications as any;
  const parts: string[] = [];

  if (specs.platform) parts.push(specs.platform);
  if (specs.primaryRole) parts.push(specs.primaryRole);

  return parts.join(' • ');
}

/**
 * Format technical specifications for display
 * Converts object keys to readable labels
 */
export function formatSpecificationKey(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
    .trim();
}

/**
 * Get primary specs for quick reference
 * Returns the most important specs for each product category
 */
export function getPrimarySpecs(product: ProductSpecification): Record<string, string> {
  const specs = product.specifications as Record<string, any>;
  const category = product.category.toLowerCase();

  // Different categories have different primary specs
  const categoryMappings: Record<string, string[]> = {
    'uav': ['maxAltitude', 'endurance', 'range', 'payload'],
    'vtol': ['maxAltitude', 'range', 'payload', 'capacity'],
    'armored vehicle': ['crew', 'armor', 'range', 'maxSpeed'],
  };

  const primaryKeys = categoryMappings[category] || Object.keys(specs).slice(0, 4);
  const result: Record<string, string> = {};

  primaryKeys.forEach((key) => {
    if (specs[key]) {
      result[formatSpecificationKey(key)] = specs[key];
    }
  });

  return result;
}

/**
 * Get performance highlights
 * Returns formatted performance metrics for display
 */
export function getPerformanceHighlights(
  product: ProductSpecification
): Record<string, string> {
  const metrics = product.performanceMetrics as Record<string, any>;
  const result: Record<string, string> = {};

  Object.entries(metrics).forEach(([key, value]) => {
    result[formatSpecificationKey(key)] = String(value);
  });

  return result;
}

/**
 * Get technical details grouped by category
 * Organizes technical details into logical groups
 */
export function getTechnicalDetailsGrouped(
  product: ProductSpecification
): Record<string, Record<string, string>> {
  const details = product.technicalDetails as Record<string, any>;
  const grouped: Record<string, Record<string, string>> = {};

  Object.entries(details).forEach(([key, value]) => {
    if (typeof value === 'object' && !Array.isArray(value)) {
      // Nested object - create a group
      grouped[formatSpecificationKey(key)] = value as Record<string, string>;
    } else {
      // Flat value - add to "General" group
      if (!grouped['General']) {
        grouped['General'] = {};
      }
      grouped['General'][formatSpecificationKey(key)] = String(value);
    }
  });

  return grouped;
}

/**
 * Check if product has complete specifications
 * Useful for validation and UI decisions
 */
export function hasCompleteSpecs(product: ProductSpecification): boolean {
  return !!(
    product.specifications &&
    Object.keys(product.specifications).length > 0 &&
    product.performanceMetrics &&
    Object.keys(product.performanceMetrics).length > 0 &&
    product.technicalDetails &&
    Object.keys(product.technicalDetails).length > 0
  );
}

/**
 * Get product category label
 * Formats category for display
 */
export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    'uav': 'Unmanned Aerial Vehicle',
    'vtol': 'Vertical Take-Off and Landing',
    'armored vehicle': 'Armored Vehicle',
  };

  return labels[category.toLowerCase()] || category;
}

