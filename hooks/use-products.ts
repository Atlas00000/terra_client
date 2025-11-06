/**
 * useProducts Hook
 * 
 * Fetches all product specifications from the backend API
 * Includes error handling and fallback to static data
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { transformProductSpecList } from '@/lib/transformers/product-transformer';
import { getAllFallbackProducts } from '@/lib/fallback-data/products';
import { ProductSpecification, PaginatedResponse, ProductQueryParams } from '@/types/api';

interface UseProductsOptions {
  /**
   * Query parameters for filtering products
   */
  params?: ProductQueryParams;
  
  /**
   * Whether to use fallback data on error (default: true)
   */
  useFallback?: boolean;
  
  /**
   * Whether to refetch data on mount (default: false)
   */
  refetchOnMount?: boolean;
}

interface UseProductsReturn {
  /**
   * Product specifications
   */
  products: ProductSpecification[];
  
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
   * Pagination metadata (if available)
   */
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  
  /**
   * Refetch function
   */
  refetch: () => void;
}

/**
 * Hook to fetch all product specifications
 * 
 * @example
 * ```tsx
 * const { products, isLoading, isError } = useProducts();
 * 
 * if (isLoading) return <Loading />;
 * if (isError) return <Error />;
 * 
 * return (
 *   <div>
 *     {products.map(product => (
 *       <ProductCard key={product.id} product={product} />
 *     ))}
 *   </div>
 * );
 * ```
 */
export function useProducts(options: UseProductsOptions = {}): UseProductsReturn {
  const { params, useFallback = true, refetchOnMount = false } = options;

  const query = useQuery({
    queryKey: ['products', params],
    queryFn: async () => {
      const response = await apiClient.get<PaginatedResponse<ProductSpecification>>(
        API_ENDPOINTS.PRODUCTS.LIST,
        { params }
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnMount,
    retry: 2,
  });

  // Use fallback data on error
  const shouldUseFallback = useFallback && query.isError;
  const fallbackProducts = shouldUseFallback ? getAllFallbackProducts() : [];

  const products = shouldUseFallback
    ? fallbackProducts
    : query.data?.data
    ? transformProductSpecList(query.data.data)
    : [];

  return {
    products,
    isLoading: query.isLoading,
    isError: query.isError && !shouldUseFallback,
    error: query.error,
    isFallback: shouldUseFallback,
    meta: query.data?.meta,
    refetch: query.refetch,
  };
}

