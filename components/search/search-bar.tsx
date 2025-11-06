/**
 * Search Bar Component
 * 
 * Main search input with keyboard shortcut support (Cmd+K / Ctrl+K)
 * Opens search modal on focus or click
 */

'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onOpenSearch?: () => void;
  className?: string;
  placeholder?: string;
  showShortcut?: boolean;
}

export function SearchBar({
  onOpenSearch,
  className,
  placeholder = 'Search products, news...',
  showShortcut = true,
}: SearchBarProps) {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    // Detect if user is on Mac for keyboard shortcut display
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

  const handleClick = () => {
    onOpenSearch?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Prevent default input behavior and open modal
    e.preventDefault();
    onOpenSearch?.();
  };

  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      
      <Input
        type="text"
        placeholder={placeholder}
        className="pl-9 pr-20 cursor-pointer bg-background/50 hover:bg-background/80 transition-colors"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        readOnly
      />
      
      {showShortcut && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">{isMac ? '⌘' : 'Ctrl'}</span>K
          </kbd>
        </div>
      )}
    </div>
  );
}

