/**
 * Analytics Dashboard Page
 * 
 * Comprehensive analytics with charts and metrics
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { StatCard, StatCardGrid } from '@/components/admin/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, Users, FileText, Eye } from 'lucide-react';

export default function AnalyticsPage() {
  const { data: overview, isLoading } = useQuery({
    queryKey: ['analytics-overview'],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.ANALYTICS.OVERVIEW);
      return response.data;
    },
    staleTime: 2 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <StatCardGrid>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </StatCardGrid>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Business intelligence and performance metrics</p>
      </div>

      <StatCardGrid>
        <StatCard
          title="Total Views"
          value={overview?.totalViews || 0}
          icon={Eye}
          description="Across all content"
        />
        <StatCard
          title="Leads Generated"
          value={overview?.leadsGenerated || 0}
          icon={Users}
          description="This month"
        />
        <StatCard
          title="Conversion Rate"
          value={`${overview?.conversionRate || 0}%`}
          icon={TrendingUp}
          description="Inquiry to RFQ"
        />
        <StatCard
          title="Active RFQs"
          value={overview?.activeRFQs || 0}
          icon={FileText}
          description="In pipeline"
        />
      </StatCardGrid>

      <Card>
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Detailed analytics and charts will be displayed here
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

