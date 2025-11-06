/**
 * Inquiry Detail Page
 * 
 * Shows complete information about a single inquiry
 * Allows status updates and assignment
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { InquiryDTO } from '@/types/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  Globe,
  Calendar,
  TrendingUp,
  User,
} from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

export default function InquiryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const inquiryId = params?.id as string;

  // Fetch inquiry details
  const { data: inquiry, isLoading } = useQuery({
    queryKey: ['inquiry', inquiryId],
    queryFn: async () => {
      const response = await apiClient.get<InquiryDTO>(
        API_ENDPOINTS.INQUIRIES.BY_ID(inquiryId)
      );
      return response.data;
    },
    enabled: !!inquiryId,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  if (!inquiry) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Inquiry not found</p>
        <Button onClick={() => router.push('/admin/inquiries')} className="mt-4">
          Back to Inquiries
        </Button>
      </div>
    );
  }

  const getLeadScoreBadge = (score: number) => {
    if (score >= 70) return { label: 'High', color: 'bg-green-500' };
    if (score >= 40) return { label: 'Medium', color: 'bg-yellow-500' };
    return { label: 'Low', color: 'bg-gray-500' };
  };

  const leadScore = getLeadScoreBadge(inquiry.leadScore);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/inquiries">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{inquiry.fullName}</h1>
            <p className="text-muted-foreground">{inquiry.company || 'Individual Customer'}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="capitalize">
            {inquiry.status}
          </Badge>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted">
            <div className={`w-2 h-2 rounded-full ${leadScore.color}`} />
            <span className="text-sm font-medium">
              {leadScore.label} Priority ({inquiry.leadScore}/100)
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Full Name</p>
                <p className="text-sm text-muted-foreground">{inquiry.fullName}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <a href={`mailto:${inquiry.email}`} className="text-sm text-primary hover:underline">
                  {inquiry.email}
                </a>
              </div>
            </div>

            {inquiry.phone && (
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <a href={`tel:${inquiry.phone}`} className="text-sm text-primary hover:underline">
                    {inquiry.phone}
                  </a>
                </div>
              </div>
            )}

            {inquiry.company && (
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Company</p>
                  <p className="text-sm text-muted-foreground">{inquiry.company}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Country</p>
                <p className="text-sm text-muted-foreground">{inquiry.country}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inquiry Details */}
        <Card>
          <CardHeader>
            <CardTitle>Inquiry Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-1">Type</p>
              <Badge variant="outline" className="capitalize">
                {inquiry.inquiryType}
              </Badge>
            </div>

            <div>
              <p className="text-sm font-medium mb-1">Lead Score</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${leadScore.color}`}
                    style={{ width: `${inquiry.leadScore}%` }}
                  />
                </div>
                <span className="text-sm font-semibold">{inquiry.leadScore}/100</span>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-1">Source</p>
              <p className="text-sm text-muted-foreground capitalize">{inquiry.source}</p>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Created</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(inquiry.createdAt), 'PPP p')}
                </p>
              </div>
            </div>

            {inquiry.assignedTo && (
              <div>
                <p className="text-sm font-medium mb-1">Assigned To</p>
                <p className="text-sm text-muted-foreground">
                  {inquiry.assignedTo.fullName || inquiry.assignedTo.email}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Message */}
      <Card>
        <CardHeader>
          <CardTitle>Message</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm whitespace-pre-wrap">{inquiry.message}</p>
        </CardContent>
      </Card>

      {/* Metadata */}
      {inquiry.metadata && Object.keys(inquiry.metadata).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(inquiry.metadata).map(([key, value]) => (
                <div key={key}>
                  <p className="text-sm font-medium capitalize mb-1">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {String(value)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button>Update Status</Button>
        <Button variant="outline">Assign to User</Button>
        <Button variant="outline">Create RFQ</Button>
        <Button variant="destructive" className="ml-auto">Delete Inquiry</Button>
      </div>
    </div>
  );
}

