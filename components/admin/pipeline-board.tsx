/**
 * Pipeline Board Component
 * 
 * Kanban-style board for RFQ pipeline visualization
 * Shows RFQs grouped by status (pending, quoted, won, lost)
 */

'use client';

import { RfqRequestDTO } from '@/types/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { DollarSign, Clock, CheckCircle, XCircle, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PipelineBoardProps {
  rfqs: RfqRequestDTO[];
  onRfqClick?: (rfqId: string) => void;
}

export function PipelineBoard({ rfqs, onRfqClick }: PipelineBoardProps) {
  const columns = [
    {
      status: 'pending',
      title: 'Pending',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-500/10',
    },
    {
      status: 'quoted',
      title: 'Quoted',
      icon: FileText,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-500/10',
    },
    {
      status: 'won',
      title: 'Won',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-500/10',
    },
    {
      status: 'lost',
      title: 'Lost',
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-500/10',
    },
  ];

  const getRfqsByStatus = (status: string) => {
    return rfqs.filter((rfq) => rfq.status === status);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {columns.map((column) => {
        const columnRfqs = getRfqsByStatus(column.status);
        const Icon = column.icon;

        return (
          <div key={column.status} className="space-y-3">
            {/* Column Header */}
            <div className={cn('p-3 rounded-lg', column.bgColor)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={cn('h-5 w-5', column.color)} />
                  <h3 className="font-semibold">{column.title}</h3>
                </div>
                <Badge variant="secondary">{columnRfqs.length}</Badge>
              </div>
            </div>

            {/* RFQ Cards */}
            <div className="space-y-2 min-h-[200px]">
              {columnRfqs.length === 0 ? (
                <div className="text-center py-8 text-sm text-muted-foreground border border-dashed rounded-lg">
                  No {column.title.toLowerCase()} RFQs
                </div>
              ) : (
                columnRfqs.map((rfq) => (
                  <Card
                    key={rfq.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => onRfqClick?.(rfq.id)}
                  >
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {rfq.productCategory}
                          </p>
                          {rfq.quantity && (
                            <p className="text-xs text-muted-foreground">
                              Qty: {rfq.quantity}
                            </p>
                          )}
                        </div>
                        {rfq.quoteAmount && (
                          <div className="flex items-center gap-1 text-xs font-semibold text-green-600">
                            <DollarSign className="h-3 w-3" />
                            {rfq.quoteAmount}
                          </div>
                        )}
                      </div>

                      {rfq.budgetRange && (
                        <div className="text-xs text-muted-foreground">
                          Budget: {rfq.budgetRange}
                        </div>
                      )}

                      {rfq.timeline && (
                        <div className="text-xs text-muted-foreground">
                          Timeline: {rfq.timeline}
                        </div>
                      )}

                      <div className="pt-2 border-t border-border">
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(rfq.createdAt), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

