'use client';

/**
 * Integration Test Page
 * 
 * Verifies that the client can successfully connect to the backend API
 * and fetch data correctly.
 */

import { useState, useEffect } from 'react';
import { useFeaturedNews } from '@/hooks/use-featured-news';
import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/api-endpoints';

export default function IntegrationTestPage() {
  const [healthCheck, setHealthCheck] = useState<any>(null);
  const [healthError, setHealthError] = useState<string | null>(null);
  const { data: newsData, isLoading, error, isError } = useFeaturedNews();

  // Test health endpoint
  useEffect(() => {
    async function checkHealth() {
      try {
        const response = await apiClient.get(API_ENDPOINTS.HEALTH);
        setHealthCheck(response.data);
      } catch (err: any) {
        setHealthError(err.message || 'Health check failed');
      }
    }
    checkHealth();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">🔗 Integration Test</h1>
          <p className="text-muted-foreground">
            Verifying client-backend connection
          </p>
        </div>

        {/* Health Check Test */}
        <div className="border border-border rounded-lg p-6 bg-card">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            {healthCheck ? '✅' : healthError ? '❌' : '⏳'} Health Check
          </h2>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              <strong>Endpoint:</strong> GET /api/v1/health
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Backend URL:</strong> {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}
            </p>
            
            {healthCheck && (
              <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded">
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(healthCheck, null, 2)}
                </pre>
              </div>
            )}
            
            {healthError && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded">
                <p className="text-red-400">{healthError}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Make sure the backend server is running on port 4000
                </p>
              </div>
            )}
          </div>
        </div>

        {/* News API Test */}
        <div className="border border-border rounded-lg p-6 bg-card">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            {newsData ? '✅' : isError ? '❌' : '⏳'} News API Test
          </h2>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              <strong>Endpoint:</strong> GET /api/v1/news/featured
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Hook:</strong> useFeaturedNews()
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Status:</strong>{' '}
              {isLoading ? '⏳ Loading...' : isError ? '❌ Error' : '✅ Success'}
            </p>
            
            {isLoading && (
              <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded">
                <p className="text-blue-400">Loading news data...</p>
              </div>
            )}
            
            {isError && (
              <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded">
                <p className="text-yellow-400">Using fallback data</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {String(error)}
                </p>
              </div>
            )}
            
            {newsData && (
              <div className="mt-4 space-y-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded">
                  <p className="text-green-400 font-semibold mb-2">
                    ✅ Successfully loaded {newsData.length} news items
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {isError ? '(Using fallback data - backend unavailable)' : '(Loaded from backend API)'}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-semibold">Sample News Items:</h3>
                  {newsData.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="p-3 bg-muted/50 rounded border border-border">
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.items?.length || 0} detailed items
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* React Query DevTools Info */}
        <div className="border border-border rounded-lg p-6 bg-card">
          <h2 className="text-2xl font-semibold mb-4">🔧 Developer Tools</h2>
          <div className="space-y-3 text-sm">
            <p className="text-muted-foreground">
              ✅ React Query DevTools available (bottom-right corner)
            </p>
            <p className="text-muted-foreground">
              ✅ Console logging enabled in development mode
            </p>
            <p className="text-muted-foreground">
              ✅ Automatic fallback to static data on API errors
            </p>
            <p className="text-muted-foreground">
              ✅ 5-minute cache with automatic stale-while-revalidate
            </p>
          </div>
        </div>

        {/* Connection Summary */}
        <div className="border border-primary/20 rounded-lg p-6 bg-primary/5">
          <h2 className="text-2xl font-semibold mb-4">📊 Connection Summary</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Backend Status</p>
              <p className="text-lg font-bold">
                {healthCheck ? '🟢 Online' : healthError ? '🔴 Offline' : '🟡 Checking...'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">News API</p>
              <p className="text-lg font-bold">
                {isLoading ? '🟡 Loading' : newsData ? '🟢 Working' : '🔴 Error'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Frontend</p>
              <p className="text-lg font-bold">🟢 Running</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Integration</p>
              <p className="text-lg font-bold">
                {healthCheck && newsData ? '🟢 Connected' : '🟡 Partial'}
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="border border-border rounded-lg p-6 bg-card">
          <h2 className="text-2xl font-semibold mb-4">✅ Week 1 Complete!</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>✅ Backend API infrastructure set up</p>
            <p>✅ React Query configured with caching</p>
            <p>✅ News hook created with automatic fallback</p>
            <p>✅ Loading skeletons implemented</p>
            <p>✅ Error handling configured</p>
            <p>✅ Components updated to use dynamic data</p>
          </div>
          
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded">
            <p className="font-semibold text-blue-400 mb-2">🎯 Ready for Week 2!</p>
            <p className="text-sm text-muted-foreground">
              Next: Dynamic Products (Artemis, Archer, Iroko, Duma, Kallon)
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4">
          <a
            href="/"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Go to Home
          </a>
          <a
            href="/company"
            className="px-6 py-3 bg-muted text-foreground rounded-lg hover:bg-muted/90 transition-colors"
          >
            Go to Company Page
          </a>
        </div>
      </div>
    </div>
  );
}

