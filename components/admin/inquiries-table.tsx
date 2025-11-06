/**
 * Inquiries Data Table
 * 
 * Sortable, filterable table for displaying inquiries
 * Shows key information and actions
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { InquiryDTO } from '@/types/api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Eye, Edit, Trash2, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface InquiriesTableProps {
  inquiries: InquiryDTO[];
  onUpdate?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function InquiriesTable({ inquiries, onUpdate, onDelete }: InquiriesTableProps) {
  const getStatusBadge = (status: string) => {
    const variants = {
      new: 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20',
      contacted: 'bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20',
      qualified: 'bg-green-500/10 text-green-600 hover:bg-green-500/20',
      closed: 'bg-gray-500/10 text-gray-600 hover:bg-gray-500/20',
    };

    return (
      <Badge 
        variant="outline" 
        className={cn(variants[status as keyof typeof variants] || variants.new)}
      >
        {status}
      </Badge>
    );
  };

  const getLeadScoreBadge = (score: number) => {
    if (score >= 70) {
      return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">High ({score})</Badge>;
    } else if (score >= 40) {
      return <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">Medium ({score})</Badge>;
    } else {
      return <Badge className="bg-gray-500/10 text-gray-600 hover:bg-gray-500/20">Low ({score})</Badge>;
    }
  };

  if (inquiries.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-border rounded-lg">
        <Inbox className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
        <p className="text-sm text-muted-foreground">No inquiries found</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Contact</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Lead Score</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inquiries.map((inquiry) => (
            <TableRow key={inquiry.id} className="hover:bg-muted/50">
              <TableCell>
                <div>
                  <div className="font-medium">{inquiry.fullName}</div>
                  <div className="text-sm text-muted-foreground">{inquiry.email}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-[200px] truncate">
                  {inquiry.company || '-'}
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm capitalize">{inquiry.inquiryType}</span>
              </TableCell>
              <TableCell>
                {getStatusBadge(inquiry.status)}
              </TableCell>
              <TableCell>
                {getLeadScoreBadge(inquiry.leadScore)}
              </TableCell>
              <TableCell>
                <div className="text-sm text-muted-foreground">
                  {format(new Date(inquiry.createdAt), 'MMM d, yyyy')}
                </div>
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
                      <Link href={`/admin/inquiries/${inquiry.id}`} className="cursor-pointer">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onUpdate?.(inquiry.id)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Update Status
                    </DropdownMenuItem>
                    {inquiry.status !== 'qualified' && (
                      <DropdownMenuItem>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark Qualified
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem 
                      onClick={() => onDelete?.(inquiry.id)}
                      className="text-destructive"
                    >
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

