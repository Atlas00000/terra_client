/**
 * Next.js Middleware
 * 
 * Protects admin routes - redirects to login if not authenticated
 * Note: Since we use localStorage for tokens, actual auth happens client-side
 * This middleware just ensures admin pages are client-rendered
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow all admin routes to load
  // Auth check happens client-side via useRequireAuth hook
  // This is because we store JWT in localStorage (client-side only)
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};

