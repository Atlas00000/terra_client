/**
 * Edit News Story Page
 * 
 * Form for editing existing news stories
 */

'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { NewsEditor } from '@/components/admin/news-editor';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function EditNewsPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const newsId = params?.id as string;

  // Fetch news story
  const { data: story, isLoading } = useQuery({
    queryKey: ['news', newsId],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.NEWS.BY_ID(newsId));
      return response.data;
    },
    enabled: !!newsId,
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      const payload = {
        ...data,
        tags: data.tags ? data.tags.split(',').map((t: string) => t.trim()) : [],
      };
      
      const response = await apiClient.patch(API_ENDPOINTS.NEWS_ADMIN.UPDATE(newsId), payload);
      return response.data;
    },
    onSuccess: () => {
      toast({ title: 'Story updated successfully' });
      queryClient.invalidateQueries({ queryKey: ['news', newsId] });
      queryClient.invalidateQueries({ queryKey: ['admin-news'] });
      router.push('/admin/news');
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to update story',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!story) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Story not found</p>
        <Button onClick={() => router.push('/admin/news')} className="mt-4">
          Back to News
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/news">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit News Story</h1>
          <p className="text-muted-foreground">{story.title}</p>
        </div>
      </div>

      <NewsEditor
        initialData={{
          ...story,
          tags: story.tags?.join(', '),
        }}
        onSubmit={(data) => updateMutation.mutateAsync(data)}
        isSubmitting={updateMutation.isPending}
        submitLabel="Update Story"
      />
    </div>
  );
}

