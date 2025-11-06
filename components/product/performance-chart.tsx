/**
 * Performance Metrics Chart
 * 
 * Visual representation of product performance metrics
 * Uses recharts for data visualization
 */

'use client';

import { ProductSpecification } from '@/types/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface PerformanceChartProps {
  product: ProductSpecification;
}

export function PerformanceChart({ product }: PerformanceChartProps) {
  const metrics = product.performanceMetrics as Record<string, any>;

  // Convert metrics to chart data
  // Extract numeric values for visualization
  const chartData = Object.entries(metrics)
    .filter(([_, value]) => {
      // Only include if the value contains a number
      const numMatch = String(value).match(/[\d.]+/);
      return numMatch !== null;
    })
    .map(([key, value]) => {
      // Extract the first number from the value
      const numMatch = String(value).match(/[\d.]+/);
      const numValue = numMatch ? parseFloat(numMatch[0]) : 0;
      
      return {
        name: key.replace(/([A-Z])/g, ' $1').trim(),
        value: numValue,
        unit: String(value).replace(/[\d.,\s]+/, '').trim(),
        fullValue: String(value),
      };
    });

  if (chartData.length === 0) {
    return null;
  }

  // Color scheme for bars
  const colors = ['#4A90E2', '#2C5F8A', '#1E3A5F', '#4A90E2', '#2C5F8A'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Chart visualization */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={100}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                formatter={(value: any, name: any, props: any) => [
                  props.payload.fullValue,
                  props.payload.name,
                ]}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Metric cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {chartData.map((metric, index) => (
              <div
                key={metric.name}
                className="p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="text-xs text-muted-foreground mb-1">
                  {metric.name}
                </div>
                <div className="text-lg font-bold" style={{ color: colors[index % colors.length] }}>
                  {metric.fullValue}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

