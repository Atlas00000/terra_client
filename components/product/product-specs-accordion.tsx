/**
 * Product Specifications Accordion
 * 
 * Expandable sections for product technical details
 * Dynamic data from backend API
 */

'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ProductSpecification } from '@/types/api';
import { getTechnicalDetailsGrouped, formatSpecificationKey } from '@/lib/transformers/product-transformer';
import { Badge } from '@/components/ui/badge';

interface ProductSpecsAccordionProps {
  product: ProductSpecification;
  defaultOpen?: string[];
}

export function ProductSpecsAccordion({ product, defaultOpen = ['specifications'] }: ProductSpecsAccordionProps) {
  const technicalGroups = getTechnicalDetailsGrouped(product);
  const specs = product.specifications as Record<string, any>;
  const performanceMetrics = product.performanceMetrics as Record<string, any>;

  return (
    <Accordion type="multiple" defaultValue={defaultOpen} className="w-full">
      {/* General Specifications */}
      <AccordionItem value="specifications">
        <AccordionTrigger className="text-lg font-semibold">
          General Specifications
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {Object.entries(specs).map(([key, value]) => (
              <div key={key} className="flex justify-between items-start border-b border-border/50 pb-2">
                <span className="text-sm font-medium text-muted-foreground">
                  {formatSpecificationKey(key)}
                </span>
                <span className="text-sm font-semibold text-right max-w-[60%]">
                  {String(value)}
                </span>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Performance Metrics */}
      <AccordionItem value="performance">
        <AccordionTrigger className="text-lg font-semibold">
          Performance Metrics
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {Object.entries(performanceMetrics).map(([key, value]) => (
              <div key={key} className="flex justify-between items-start border-b border-border/50 pb-2">
                <span className="text-sm font-medium text-muted-foreground">
                  {formatSpecificationKey(key)}
                </span>
                <Badge variant="secondary" className="text-sm font-semibold">
                  {String(value)}
                </Badge>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Technical Details Groups */}
      {Object.entries(technicalGroups).map(([groupName, groupData]) => (
        <AccordionItem key={groupName} value={groupName.toLowerCase()}>
          <AccordionTrigger className="text-lg font-semibold">
            {groupName}
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {Object.entries(groupData).map(([key, value]) => (
                <div key={key} className="flex justify-between items-start border-b border-border/50 pb-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    {key}
                  </span>
                  <span className="text-sm font-semibold text-right max-w-[60%]">
                    {String(value)}
                  </span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

