/**
 * Admin Dashboard Overview Page
 * 
 * Main dashboard showing key metrics and statistics
 * Uses analytics API for real-time data
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { StatCard, StatCardGrid } from '@/components/admin/stat-card';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Inbox,
  FileText,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
} from 'lucide-react';

interface DashboardMetrics {
  inquiries: {
    total: number;
    new: number;
    inProgress: number;
    highPriority: number;
  };
  rfqs: {
    total: number;
    pending: number;
    quoted: number;
    won: number;
    winRate: number;
  };
  recentActivity: Array<{
    id: string;
    action: string;
    entityType: string;
    createdAt: string;
  }>;
}

export default function AdminDashboardPage() {
  // Fetch dashboard metrics
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: async () => {
      // Try analytics overview endpoint first
      try {
        const response = await apiClient.get(API_ENDPOINTS.ANALYTICS.OVERVIEW);
        return response.data;
      } catch {
        // Fallback: fetch data from individual endpoints
        const [inquiriesRes, rfqsRes] = await Promise.all([
          apiClient.get(API_ENDPOINTS.INQUIRIES.STATS),
          apiClient.get(API_ENDPOINTS.RFQ.STATS),
        ]);

        return {
          inquiries: inquiriesRes.data,
          rfqs: rfqsRes.data,
          recentActivity: [],
        };
      }
    },
    staleTime: 60 * 1000, // 1 minute
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to Terra Industries Admin Portal</p>
        </div>

        <StatCardGrid>
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </StatCardGrid>
      </div>
    );
  }

  const inquiryData = metrics?.inquiries || { total: 0, new: 0, inProgress: 0, highPriority: 0 };
  const rfqData = metrics?.rfqs || { total: 0, pending: 0, quoted: 0, won: 0, winRate: 0 };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to Terra Industries Admin Portal
        </p>
      </div>

      {/* Stat Cards */}
      <StatCardGrid>
        <StatCard
          title="Total Inquiries"
          value={inquiryData.total}
          icon={Inbox}
          description={`${inquiryData.new} new inquiries`}
        />
        
        <StatCard
          title="In Progress"
          value={inquiryData.inProgress}
          icon={Activity}
          description="Currently being handled"
        />
        
        <StatCard
          title="High Priority"
          value={inquiryData.highPriority}
          icon={TrendingUp}
          description="Urgent attention needed"
        />
        
        <StatCard
          title="RFQs"
          value={rfqData.total}
          icon={FileText}
          description={`${rfqData.won} won, ${rfqData.pending} pending`}
        />
      </StatCardGrid>

      {/* Secondary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">RFQ Pipeline</CardTitle>
            <CardDescription>Current quote requests</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Pending</span>
              <span className="text-lg font-semibold">{rfqData.pending}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Quoted</span>
              <span className="text-lg font-semibold">{rfqData.quoted}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Won</span>
              <span className="text-lg font-semibold text-green-600">{rfqData.won}</span>
            </div>
            <div className="pt-3 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Win Rate</span>
                <span className="text-lg font-bold text-primary">{rfqData.winRate}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Lead Distribution</CardTitle>
            <CardDescription>Inquiry breakdown by status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">New</span>
              <span className="text-lg font-semibold">{inquiryData.new}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">In Progress</span>
              <span className="text-lg font-semibold">{inquiryData.inProgress}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">High Priority</span>
              <span className="text-lg font-semibold text-red-600">{inquiryData.highPriority}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
            <CardDescription>Common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href="/admin/inquiries"
              className="block px-4 py-2 rounded-lg hover:bg-accent transition-colors text-sm font-medium"
            >
              View All Inquiries →
            </a>
            <a
              href="/admin/rfq"
              className="block px-4 py-2 rounded-lg hover:bg-accent transition-colors text-sm font-medium"
            >
              Manage RFQs →
            </a>
            <a
              href="/admin/news"
              className="block px-4 py-2 rounded-lg hover:bg-accent transition-colors text-sm font-medium"
            >
              Create News Story →
            </a>
            <a
              href="/admin/analytics"
              className="block px-4 py-2 rounded-lg hover:bg-accent transition-colors text-sm font-medium"
            >
              View Analytics →
            </a>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      {metrics?.recentActivity && metrics.recentActivity.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.recentActivity.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 text-sm">
                  <div className="mt-0.5 p-1.5 rounded-md bg-primary/10">
                    <Activity className="h-3 w-3 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.entityType} • {new Date(activity.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

