/**
 * Media Library Page
 * 
 * Upload and manage media files (images, documents)
 * Integrates with Cloudflare R2
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Upload, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { MediaFileDTO, PaginatedResponse } from '@/types/api';

export default function MediaPage() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['media'],
    queryFn: async () => {
      const response = await apiClient.get<PaginatedResponse<MediaFileDTO>>(
        `${API_ENDPOINTS.MEDIA.LIST}?limit=50`
      );
      return response.data;
    },
    staleTime: 30 * 1000,
  });

  const media = data?.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
          <p className="text-muted-foreground">Upload and manage media files</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Files
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="aspect-square" />
          ))}
        </div>
      ) : media.length === 0 ? (
        <Card className="p-12 text-center">
          <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">No media files yet</p>
          <Button className="mt-4">
            <Upload className="mr-2 h-4 w-4" />
            Upload Your First File
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {media.map((file) => (
            <Card key={file.id} className="overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
              <div className="aspect-square bg-muted relative">
                {file.mimeType.startsWith('image/') ? (
                  <img
                    src={file.publicUrl}
                    alt={file.altText || file.fileName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="p-2">
                <p className="text-xs font-medium truncate">{file.fileName}</p>
                <p className="text-xs text-muted-foreground">{(parseInt(file.fileSize) / 1024).toFixed(1)} KB</p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

