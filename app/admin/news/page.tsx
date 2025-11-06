/**
 * News CMS Page
 * 
 * List and manage all news stories
 * Create, edit, publish, and delete functionality
 */

'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS, buildEndpoint } from '@/lib/api-endpoints';
import { NewsTable } from '@/components/admin/news-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Search, RefreshCw } from 'lucide-react';
import { NewsStoryDTO, PaginatedResponse } from '@/types/api';
import { useToast } from '@/hooks/use-toast';

export default function NewsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const limit = 20;

  // Fetch news stories
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['admin-news', page, search, statusFilter],
    queryFn: async () => {
      const params: any = { page, limit };
      if (search) params.search = search;
      if (statusFilter !== 'all') params.status = statusFilter;

      const endpoint = buildEndpoint(API_ENDPOINTS.NEWS.LIST, params);
      const response = await apiClient.get<PaginatedResponse<NewsStoryDTO>>(endpoint);
      return response.data;
    },
    staleTime: 30 * 1000,
  });

  // Publish mutation
  const publishMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.post(API_ENDPOINTS.NEWS_ADMIN.PUBLISH(id));
      return response.data;
    },
    onSuccess: () => {
      toast({ title: 'Story published successfully' });
      queryClient.invalidateQueries({ queryKey: ['admin-news'] });
    },
  });

  // Unpublish mutation
  const unpublishMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.post(API_ENDPOINTS.NEWS_ADMIN.UNPUBLISH(id));
      return response.data;
    },
    onSuccess: () => {
      toast({ title: 'Story unpublished' });
      queryClient.invalidateQueries({ queryKey: ['admin-news'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(API_ENDPOINTS.NEWS_ADMIN.DELETE(id));
    },
    onSuccess: () => {
      toast({ title: 'Story deleted' });
      queryClient.invalidateQueries({ queryKey: ['admin-news'] });
    },
  });

  const news = data?.data || [];
  const meta = data?.meta;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">News & Stories</h1>
          <p className="text-muted-foreground">Manage news articles and updates</p>
        </div>
        <Button onClick={() => router.push('/admin/news/new')}>
          <Plus className="mr-2 h-4 w-4" />
          New Story
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search stories..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="pl-9"
              />
            </div>
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      {/* Table */}
      {isLoading ? (
        <Card className="p-6 space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </Card>
      ) : (
        <NewsTable
          news={news}
          onPublish={(id) => publishMutation.mutate(id)}
          onUnpublish={(id) => unpublishMutation.mutate(id)}
          onDelete={(id) => {
            if (confirm('Are you sure you want to delete this story?')) {
              deleteMutation.mutate(id);
            }
          }}
        />
      )}

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {meta.page} of {meta.totalPages} ({meta.total} total)
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage(page - 1)} disabled={page <= 1}>
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => setPage(page + 1)} disabled={page >= meta.totalPages}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

