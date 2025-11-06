/**
 * Search Results Component
 * 
 * Displays categorized search results from global search
 * Supports keyboard navigation
 */

'use client';

import { ArrowRight, Package, Newspaper, Loader2 } from 'lucide-react';
import { GlobalSearchResultsDTO } from '@/types/api';
import { cn } from '@/lib/utils';

interface SearchResultsProps {
  query: string;
  results: GlobalSearchResultsDTO | null;
  isLoading: boolean;
  isError: boolean;
  onResultClick: (url: string) => void;
}

export function SearchResults({
  query,
  results,
  isLoading,
  isError,
  onResultClick,
}: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="px-4 py-12 flex flex-col items-center justify-center text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin mb-3" />
        <p className="text-sm">Searching...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="px-4 py-8 text-center text-sm text-destructive">
        Failed to load search results. Please try again.
      </div>
    );
  }

  if (!results) {
    return null;
  }

  // Only show public data (products and news)
  // Inquiries and RFQs are admin-only and should not be exposed in public search
  const hasResults = 
    results.products.length > 0 ||
    results.news.length > 0;

  if (!hasResults) {
    return (
      <div className="px-4 py-12 text-center">
        <p className="text-sm text-muted-foreground mb-2">
          No results found for "<span className="font-medium text-foreground">{query}</span>"
        </p>
        <p className="text-xs text-muted-foreground/60">
          Try different keywords or check your spelling
        </p>
      </div>
    );
  }

  return (
    <div className="py-2">
      {/* Products */}
      {results.products.length > 0 && (
        <div className="mb-4">
          <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Products ({results.products.length})
          </div>
          <div className="space-y-1">
            {results.products.map((product) => (
              <button
                key={product.id}
                onClick={() => onResultClick(`/${product.productName.toLowerCase()}`)}
                className="w-full px-4 py-3 flex items-start gap-3 hover:bg-accent transition-colors group text-left"
              >
                <div className="mt-0.5 p-2 rounded-md bg-primary/10 text-primary">
                  <Package className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm group-hover:text-primary transition-colors">
                    {product.productName}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {product.category}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* News */}
      {results.news.length > 0 && (
        <div className="mb-4">
          <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            News & Updates ({results.news.length})
          </div>
          <div className="space-y-1">
            {results.news.map((story) => (
              <button
                key={story.id}
                onClick={() => onResultClick(`/news/${story.slug}`)}
                className="w-full px-4 py-3 flex items-start gap-3 hover:bg-accent transition-colors group text-left"
              >
                <div className="mt-0.5 p-2 rounded-md bg-blue-500/10 text-blue-500">
                  <Newspaper className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm group-hover:text-primary transition-colors">
                    {story.title}
                  </div>
                  {story.excerpt && (
                    <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                      {story.excerpt}
                    </div>
                  )}
                  {story.category && (
                    <div className="text-xs text-muted-foreground/60 mt-1">
                      {story.category}
                    </div>
                  )}
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Inquiries & RFQs - REMOVED for security */}
      {/* Customer data (inquiries/RFQs) should only be visible in admin dashboard */}
      {/* This prevents exposure of sensitive customer information in public search */}
    </div>
  );
}

