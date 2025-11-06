/**
 * Stat Card Component
 * 
 * Dashboard statistic card with icon, title, value, and trend
 * Used for displaying key metrics on admin dashboard
 */

'use client';

import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    label?: string;
    direction?: 'up' | 'down' | 'stable';
  };
  className?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
}: StatCardProps) {
  const getTrendIcon = () => {
    if (!trend) return null;
    
    switch (trend.direction) {
      case 'up':
        return <TrendingUp className="h-3 w-3" />;
      case 'down':
        return <TrendingDown className="h-3 w-3" />;
      default:
        return <Minus className="h-3 w-3" />;
    }
  };

  const getTrendColor = () => {
    if (!trend) return '';
    
    switch (trend.direction) {
      case 'up':
        return 'text-green-600 dark:text-green-400';
      case 'down':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <Card className={cn('hover:shadow-md transition-shadow', className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          {/* Content */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
            <p className="text-3xl font-bold tracking-tight">
              {value}
            </p>
            {description && (
              <p className="text-xs text-muted-foreground">
                {description}
              </p>
            )}
            
            {/* Trend */}
            {trend && (
              <div className={cn('flex items-center gap-1 text-xs font-medium', getTrendColor())}>
                {getTrendIcon()}
                <span>{trend.value > 0 ? '+' : ''}{trend.value}%</span>
                {trend.label && (
                  <span className="text-muted-foreground ml-1">
                    {trend.label}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Icon */}
          <div className="p-3 rounded-lg bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Stat Card Grid Container
 * Responsive grid for displaying multiple stat cards
 */
export function StatCardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {children}
    </div>
  );
}

