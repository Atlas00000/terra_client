/**
 * Admin Inquiries List Page
 * 
 * Shows all customer inquiries with filtering and search
 * Main CRM interface
 */

'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS, buildEndpoint } from '@/lib/api-endpoints';
import { InquiriesTable } from '@/components/admin/inquiries-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Search, Filter, Download, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { InquiryDTO, PaginatedResponse } from '@/types/api';

export default function InquiriesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  const limit = 20;

  // Fetch inquiries
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['inquiries', page, search, statusFilter, sortBy, order],
    queryFn: async () => {
      const params: any = {
        page,
        limit,
        sortBy,
        order,
      };

      if (search) params.search = search;
      if (statusFilter !== 'all') params.status = statusFilter;

      const endpoint = buildEndpoint(API_ENDPOINTS.INQUIRIES.LIST, params);
      const response = await apiClient.get<PaginatedResponse<InquiryDTO>>(endpoint);
      return response.data;
    },
    staleTime: 30 * 1000, // 30 seconds
  });

  const inquiries = data?.data || [];
  const meta = data?.meta;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Inquiries</h1>
        <p className="text-muted-foreground">
          Manage customer inquiries and leads
        </p>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, company..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1); // Reset to first page on search
                }}
                className="pl-9"
              />
            </div>
          </div>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={(value) => {
            setStatusFilter(value);
            setPage(1);
          }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Date Created</SelectItem>
              <SelectItem value="leadScore">Lead Score</SelectItem>
              <SelectItem value="fullName">Name</SelectItem>
              <SelectItem value="company">Company</SelectItem>
            </SelectContent>
          </Select>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => refetch()}
              title="Refresh"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" title="Export CSV">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Table */}
      {isLoading ? (
        <Card>
          <div className="p-6 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </Card>
      ) : (
        <InquiriesTable
          inquiries={inquiries}
          onUpdate={(id) => {
            console.log('Update inquiry:', id);
            refetch();
          }}
          onDelete={(id) => {
            console.log('Delete inquiry:', id);
            refetch();
          }}
        />
      )}

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(meta.page - 1) * meta.limit + 1} to{' '}
            {Math.min(meta.page * meta.limit, meta.total)} of {meta.total} inquiries
          </p>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page - 1)}
              disabled={page <= 1}
            >
              Previous
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, meta.totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={page === pageNum ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page + 1)}
              disabled={page >= meta.totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

