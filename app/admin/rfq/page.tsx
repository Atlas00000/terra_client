/**
 * Admin RFQ Pipeline Page
 * 
 * Kanban board view of RFQ pipeline
 * Shows requests grouped by status
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS, buildEndpoint } from '@/lib/api-endpoints';
import { PipelineBoard } from '@/components/admin/pipeline-board';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RefreshCw, Download, Filter } from 'lucide-react';
import { RfqRequestDTO, PaginatedResponse } from '@/types/api';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RFQPipelinePage() {
  const router = useRouter();
  const [productFilter, setProductFilter] = useState<string>('all');

  // Fetch RFQs
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['rfqs', productFilter],
    queryFn: async () => {
      const params: any = {
        limit: 100, // Get all for pipeline view
        sortBy: 'createdAt',
        order: 'desc',
      };

      if (productFilter !== 'all') {
        params.productCategory = productFilter;
      }

      const endpoint = buildEndpoint(API_ENDPOINTS.RFQ.LIST, params);
      const response = await apiClient.get<PaginatedResponse<RfqRequestDTO>>(endpoint);
      return response.data;
    },
    staleTime: 30 * 1000,
  });

  const rfqs = data?.data || [];

  // Fetch RFQ statistics
  const { data: stats } = useQuery({
    queryKey: ['rfq-stats'],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.RFQ.STATS);
      return response.data;
    },
    staleTime: 60 * 1000,
  });

  const handleRfqClick = (rfqId: string) => {
    router.push(`/admin/rfq/${rfqId}`);
  };

  const handleExportCSV = async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.RFQ.EXPORT, {
        responseType: 'blob',
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `rfqs-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">RFQ Pipeline</h1>
          <p className="text-muted-foreground">
            Manage quote requests and track sales pipeline
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total RFQs</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.pending}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.won}</div>
            <div className="text-sm text-muted-foreground">Won</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold">{stats.totalValue > 0 ? `$${(stats.totalValue / 1000000).toFixed(1)}M` : '-'}</div>
            <div className="text-sm text-muted-foreground">Total Value</div>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card className="p-4">
        <div className="flex gap-4">
          <Select value={productFilter} onValueChange={setProductFilter}>
            <SelectTrigger className="w-[200px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by product" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="UAV">UAV (Artemis)</SelectItem>
              <SelectItem value="VTOL">VTOL (Archer)</SelectItem>
              <SelectItem value="Armored Vehicle">Armored Vehicles</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Pipeline Board */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <PipelineBoard rfqs={rfqs} onRfqClick={handleRfqClick} />
      )}
    </div>
  );
}

