'use client';

/**
 * Test Component for useFeaturedNews Hook
 * 
 * Temporary test component to verify the hook works correctly.
 * This will be deleted after testing - just for verification.
 */

import { useFeaturedNews } from '@/hooks/use-featured-news';
import { useEffect } from 'react';

export function TestNewsHook() {
  const { data, isLoading, error, isError } = useFeaturedNews();

  useEffect(() => {
    console.log('=== useFeaturedNews Test ===');
    console.log('isLoading:', isLoading);
    console.log('isError:', isError);
    console.log('error:', error);
    console.log('data:', data);
    console.log('data length:', data?.length);
    if (data && data.length > 0) {
      console.log('First news item:', data[0]);
    }
    console.log('=== End Test ===');
  }, [data, isLoading, error, isError]);

  if (isLoading) {
    return <div className="p-4 text-white">Loading news...</div>;
  }

  if (isError) {
    return (
      <div className="p-4 text-yellow-500">
        Error loading news (using fallback data): {String(error)}
      </div>
    );
  }

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-4">News Hook Test</h2>
      <p className="mb-2">Loaded {data?.length || 0} news items</p>
      <div className="space-y-2">
        {data?.slice(0, 3).map((item, idx) => (
          <div key={idx} className="border border-gray-700 p-2 rounded">
            <p className="font-semibold">{item.title}</p>
            <p className="text-sm text-gray-400">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


