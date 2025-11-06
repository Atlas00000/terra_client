/**
 * Admin Layout
 * 
 * Main layout for admin dashboard
 * Includes sidebar navigation and header
 * Bypasses auth check for login page
 */

'use client';

import { useRequireAuth } from '@/hooks/use-auth';
import { AdminSidebar } from '@/components/admin/sidebar';
import { AdminHeader } from '@/components/admin/admin-header';
import { Loading } from '@/components/loading';
import { usePathname } from 'next/navigation';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  
  // Don't apply auth check to login page
  const isLoginPage = pathname === '/admin/login';
  
  if (isLoginPage) {
    // Login page gets rendered without layout
    return <>{children}</>;
  }

  // All other admin pages require authentication
  const { user, isLoading } = useRequireAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return null; // Will redirect to login via useRequireAuth
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 flex-shrink-0">
        <AdminSidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-muted/30">
          <div className="container mx-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

