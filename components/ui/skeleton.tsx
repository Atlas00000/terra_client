/**
 * Skeleton Loading Component
 * 
 * Provides animated loading placeholders while content is being fetched.
 * Matches the design system and provides smooth loading experience.
 */

import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional variant for different skeleton styles
   */
  variant?: 'default' | 'circular' | 'text'
}

/**
 * Basic Skeleton Component
 * 
 * Shows an animated placeholder that pulses to indicate loading state.
 * 
 * @example
 * ```tsx
 * <Skeleton className="h-12 w-full" />
 * ```
 */
function Skeleton({
  className,
  variant = 'default',
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-muted",
        variant === 'circular' && "rounded-full",
        variant === 'text' && "rounded",
        variant === 'default' && "rounded-md",
        className
      )}
      {...props}
    />
  )
}

/**
 * News Card Skeleton
 * 
 * Specifically designed for news card loading states
 */
function NewsCardSkeleton() {
  return (
    <div className="space-y-3 p-4">
      {/* Title */}
      <Skeleton className="h-6 w-3/4" />
      
      {/* Subtitle */}
      <Skeleton className="h-4 w-1/2" />
      
      {/* Content lines */}
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>
      
      {/* Image placeholder */}
      <Skeleton className="h-48 w-full mt-4" />
    </div>
  )
}

/**
 * News Slideshow Skeleton
 * 
 * Loading state for the company news slideshow
 */
function NewsSlideshowSkeleton() {
  return (
    <div className="w-full h-full min-h-[600px] flex items-center justify-center p-8">
      <div className="w-full max-w-4xl space-y-6">
        {/* Title */}
        <Skeleton className="h-12 w-2/3 mx-auto" />
        
        {/* Subtitle */}
        <Skeleton className="h-6 w-1/3 mx-auto" />
        
        {/* Content */}
        <div className="space-y-3 mt-8">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        
        {/* Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <NewsItemSkeleton />
          <NewsItemSkeleton />
        </div>
      </div>
    </div>
  )
}

/**
 * News Item Skeleton (for structured content)
 */
function NewsItemSkeleton() {
  return (
    <div className="p-4 border border-gray-700 rounded-lg space-y-3">
      {/* Item title */}
      <Skeleton className="h-5 w-3/4" />
      
      {/* Description */}
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>
      
      {/* Details */}
      <div className="space-y-1.5 mt-3">
        <Skeleton className="h-2 w-full" />
        <Skeleton className="h-2 w-full" />
        <Skeleton className="h-2 w-3/4" />
      </div>
    </div>
  )
}

/**
 * Compact Loading Spinner
 * 
 * Small spinner for inline loading states
 */
function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
        className
      )}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  )
}

export {
  Skeleton,
  NewsCardSkeleton,
  NewsSlideshowSkeleton,
  NewsItemSkeleton,
  LoadingSpinner,
}
