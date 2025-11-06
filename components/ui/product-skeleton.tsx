/**
 * Product Loading Skeleton
 * 
 * Shows animated placeholder while product data is loading
 */

import { Skeleton } from '@/components/ui/skeleton';

/**
 * Skeleton for product card in slideshow/grid
 */
export function ProductCardSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-card p-6 space-y-4">
      {/* Product name */}
      <Skeleton className="h-8 w-3/4" />
      
      {/* Category */}
      <Skeleton className="h-4 w-1/2" />
      
      {/* Specifications */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
      
      {/* Action button */}
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

/**
 * Skeleton for product detail page
 */
export function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <Skeleton className="h-12 w-3/4 mx-auto" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
      </div>
      
      {/* Main content grid */}
      <div className="grid md:grid-cols-2 gap-8 mt-12">
        {/* Left column - Image placeholder */}
        <div className="space-y-4">
          <Skeleton className="aspect-video w-full rounded-lg" />
          <div className="flex gap-2">
            <Skeleton className="h-20 w-20 rounded" />
            <Skeleton className="h-20 w-20 rounded" />
            <Skeleton className="h-20 w-20 rounded" />
          </div>
        </div>
        
        {/* Right column - Specs */}
        <div className="space-y-6">
          {/* Section 1 */}
          <div className="space-y-3">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
          
          {/* Section 2 */}
          <div className="space-y-3">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
          
          {/* Section 3 */}
          <div className="space-y-3">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </div>
      
      {/* Technical details sections */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-3 p-6 border border-border rounded-lg">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Skeleton for product slideshow item
 */
export function ProductSlideshowSkeleton() {
  return (
    <div className="flex items-center justify-center h-full p-8">
      <div className="w-full max-w-lg space-y-6">
        {/* Title */}
        <Skeleton className="h-10 w-3/4 mx-auto" />
        
        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6 mx-auto" />
          <Skeleton className="h-4 w-4/6 mx-auto" />
        </div>
        
        {/* Specs grid */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-5 w-32" />
            </div>
          ))}
        </div>
        
        {/* CTA button */}
        <Skeleton className="h-12 w-40 mx-auto mt-8" />
      </div>
    </div>
  );
}

/**
 * Multiple product cards skeleton (for grids)
 */
export function ProductGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

