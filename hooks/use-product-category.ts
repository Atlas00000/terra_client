/**
 * useProductCategory Hook
 * 
 * Fetches product specifications for a specific category
 * Used for individual product pages (Artemis, Archer, etc.)
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { transformProductSpec } from '@/lib/transformers/product-transformer';
import { getFallbackProduct } from '@/lib/fallback-data/products';
import { ProductSpecification } from '@/types/api';

interface UseProductCategoryOptions {
  /**
   * Whether to use fallback data on error (default: true)
   */
  useFallback?: boolean;
  
  /**
   * Whether to refetch data on mount (default: false)
   */
  refetchOnMount?: boolean;
  
  /**
   * Whether to enable the query (default: true)
   * Set to false to disable automatic fetching
   */
  enabled?: boolean;
}

interface UseProductCategoryReturn {
  /**
   * Product specification (single product)
   */
  product: ProductSpecification | null;
  
  /**
   * Whether the data is loading
   */
  isLoading: boolean;
  
  /**
   * Whether there was an error fetching data
   */
  isError: boolean;
  
  /**
   * The error object (if any)
   */
  error: Error | null;
  
  /**
   * Whether fallback data is being used
   */
  isFallback: boolean;
  
  /**
   * Refetch function
   */
  refetch: () => void;
}

/**
 * Hook to fetch product specification by product name/category
 * 
 * @param productName - Name of the product (e.g., 'Artemis', 'Archer')
 * @param options - Additional options
 * 
 * @example
 * ```tsx
 * const { product, isLoading } = useProductCategory('Artemis');
 * 
 * if (isLoading) return <ProductSkeleton />;
 * if (!product) return <NotFound />;
 * 
 * return <ProductDetail product={product} />;
 * ```
 */
export function useProductCategory(
  productName: string,
  options: UseProductCategoryOptions = {}
): UseProductCategoryReturn {
  const { useFallback = true, refetchOnMount = false, enabled = true } = options;

  const query = useQuery({
    queryKey: ['product', productName],
    queryFn: async () => {
      // Fetch product by category endpoint
      // The API should return an array, we take the first match
      const response = await apiClient.get<{ data: ProductSpecification[] }>(
        API_ENDPOINTS.PRODUCTS.BY_CATEGORY(productName)
      );
      
      // Return the first product from the category
      return response.data?.data?.[0] || null;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes (product specs change rarely)
    refetchOnMount,
    retry: 2,
    enabled: enabled && !!productName,
  });

  // Use fallback data on error
  const shouldUseFallback = useFallback && query.isError;
  const fallbackProduct = shouldUseFallback ? getFallbackProduct(productName) : null;

  const product = shouldUseFallback
    ? fallbackProduct || null
    : query.data
    ? transformProductSpec(query.data)
    : null;

  return {
    product,
    isLoading: query.isLoading,
    isError: query.isError && !shouldUseFallback,
    error: query.error,
    isFallback: shouldUseFallback,
    refetch: query.refetch,
  };
}

/**
 * Alternative hook to fetch product by exact product name
 * Uses the LIST endpoint with filtering
 * 
 * @example
 * ```tsx
 * const { product } = useProductByName('Artemis');
 * ```
 */
export function useProductByName(
  productName: string,
  options: UseProductCategoryOptions = {}
): UseProductCategoryReturn {
  const { useFallback = true, refetchOnMount = false, enabled = true } = options;

  const query = useQuery({
    queryKey: ['product-by-name', productName],
    queryFn: async () => {
      const response = await apiClient.get<{ data: ProductSpecification[] }>(
        API_ENDPOINTS.PRODUCTS.LIST,
        {
          params: { limit: 1 },
        }
      );
      
      // Filter by product name on client side
      const matchedProduct = response.data?.data?.find(
        (p) => p.productName.toLowerCase() === productName.toLowerCase()
      );
      
      return matchedProduct || null;
    },
    staleTime: 10 * 60 * 1000,
    refetchOnMount,
    retry: 2,
    enabled: enabled && !!productName,
  });

  const shouldUseFallback = useFallback && query.isError;
  const fallbackProduct = shouldUseFallback ? getFallbackProduct(productName) : null;

  const product = shouldUseFallback
    ? fallbackProduct || null
    : query.data
    ? transformProductSpec(query.data)
    : null;

  return {
    product,
    isLoading: query.isLoading,
    isError: query.isError && !shouldUseFallback,
    error: query.error,
    isFallback: shouldUseFallback,
    refetch: query.refetch,
  };
}

