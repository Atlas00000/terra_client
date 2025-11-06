/**
 * Search Modal Component
 * 
 * Full-screen search modal with keyboard navigation
 * Displays search results from global search API
 */

'use client';

import { useEffect, useState, useCallback } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useSearch } from '@/hooks/use-search';
import { useTrackSearch } from '@/hooks/use-track-event';
import { SearchResults } from './search-results';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const router = useRouter();

  // Debounce search query to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Fetch search results
  const { results, isLoading, isError } = useSearch(debouncedQuery, {
    enabled: debouncedQuery.length >= 2,
  });
  
  // Track search queries for analytics
  const totalResults = results
    ? results.products.length + results.news.length + results.inquiries.length + results.rfqs.length
    : 0;
  useTrackSearch(debouncedQuery, totalResults);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to toggle
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
      
      // Escape to close
      if (e.key === 'Escape' && open) {
        onOpenChange(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  // Reset query when modal closes
  useEffect(() => {
    if (!open) {
      setQuery('');
      setDebouncedQuery('');
    }
  }, [open]);

  const handleResultClick = useCallback(
    (url: string) => {
      router.push(url);
      onOpenChange(false);
    },
    [router, onOpenChange]
  );

  const handleClear = () => {
    setQuery('');
    setDebouncedQuery('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 gap-0 max-h-[80vh] overflow-hidden">
        {/* Search Input Header */}
        <DialogHeader className="px-4 py-4 border-b">
          <div className="flex items-center gap-3">
            <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            
            <Input
              autoFocus
              type="text"
              placeholder="Search products, news, and more..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg px-0"
            />
            
            {query && (
              <button
                onClick={handleClear}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </DialogHeader>

        {/* Search Results */}
        <div className="overflow-y-auto max-h-[calc(80vh-100px)]">
          {!query && (
            <div className="px-4 py-12 text-center text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p className="text-sm">
                Start typing to search across products, news, and content
              </p>
              <p className="text-xs mt-2 text-muted-foreground/60">
                Tip: Use <kbd className="px-1.5 py-0.5 rounded border bg-muted">↑</kbd> <kbd className="px-1.5 py-0.5 rounded border bg-muted">↓</kbd> to navigate
              </p>
            </div>
          )}

          {query && query.length < 2 && (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              Type at least 2 characters to search
            </div>
          )}

          {debouncedQuery.length >= 2 && (
            <SearchResults
              query={debouncedQuery}
              results={results}
              isLoading={isLoading}
              isError={isError}
              onResultClick={handleResultClick}
            />
          )}
        </div>

        {/* Footer with shortcuts */}
        <div className="px-4 py-3 border-t bg-muted/50 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded border bg-background">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded border bg-background">↓</kbd>
              <span>navigate</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded border bg-background">↵</kbd>
              <span>select</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded border bg-background">esc</kbd>
              <span>close</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

