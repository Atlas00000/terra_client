/**
 * Create News Story Page
 * 
 * Form for creating new news stories
 */

'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { NewsEditor } from '@/components/admin/news-editor';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewNewsPage() {
  const router = useRouter();
  const { toast } = useToast();

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      // Convert tags string to array
      const payload = {
        ...data,
        tags: data.tags ? data.tags.split(',').map((t: string) => t.trim()) : [],
      };
      
      const response = await apiClient.post(API_ENDPOINTS.NEWS_ADMIN.CREATE, payload);
      return response.data;
    },
    onSuccess: () => {
      toast({ title: 'News story created successfully' });
      router.push('/admin/news');
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to create story',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/news">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create News Story</h1>
          <p className="text-muted-foreground">Write and publish a new story</p>
        </div>
      </div>

      <NewsEditor
        onSubmit={(data) => createMutation.mutateAsync(data)}
        isSubmitting={createMutation.isPending}
        submitLabel="Create Story"
      />
    </div>
  );
}

