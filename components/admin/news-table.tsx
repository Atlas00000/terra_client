/**
 * News Table Component
 * 
 * Data table for news stories with publish/edit actions
 */

'use client';

import Link from 'next/link';
import { NewsStoryDTO } from '@/types/api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Eye, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface NewsTableProps {
  news: NewsStoryDTO[];
  onPublish?: (id: string) => void;
  onUnpublish?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function NewsTable({ news, onPublish, onUnpublish, onDelete }: NewsTableProps) {
  const getStatusBadge = (status: string) => {
    const variants = {
      draft: 'bg-gray-500/10 text-gray-600',
      published: 'bg-green-500/10 text-green-600',
      archived: 'bg-red-500/10 text-red-600',
    };

    return (
      <Badge variant="outline" className={variants[status as keyof typeof variants]}>
        {status}
      </Badge>
    );
  };

  if (news.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed rounded-lg">
        <p className="text-muted-foreground">No news stories found</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Published</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {news.map((story) => (
            <TableRow key={story.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{story.title}</div>
                  <div className="text-xs text-muted-foreground truncate max-w-md">
                    {story.excerpt}
                  </div>
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(story.status)}</TableCell>
              <TableCell>
                <span className="text-sm">{story.category || '-'}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{story.viewCount}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">
                  {story.publishedAt ? format(new Date(story.publishedAt), 'MMM d, yyyy') : '-'}
                </span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/news/${story.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    {story.status === 'draft' && (
                      <DropdownMenuItem onClick={() => onPublish?.(story.id)}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Publish
                      </DropdownMenuItem>
                    )}
                    {story.status === 'published' && (
                      <DropdownMenuItem onClick={() => onUnpublish?.(story.id)}>
                        <XCircle className="mr-2 h-4 w-4" />
                        Unpublish
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => onDelete?.(story.id)} className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

