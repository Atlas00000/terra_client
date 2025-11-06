/**
 * Admin Sidebar Navigation
 * 
 * Main navigation for admin dashboard
 * Shows active routes and navigation items
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Inbox,
  FileText,
  Newspaper,
  Package,
  Image as ImageIcon,
  BarChart3,
  Mail,
  Activity,
  Settings,
} from 'lucide-react';
import Image from 'next/image';

const navigationItems = [
  {
    title: 'Overview',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Inquiries',
    href: '/admin/inquiries',
    icon: Inbox,
    badge: 'CRM',
  },
  {
    title: 'RFQs',
    href: '/admin/rfq',
    icon: FileText,
    badge: 'Sales',
  },
  {
    title: 'News & Stories',
    href: '/admin/news',
    icon: Newspaper,
  },
  {
    title: 'Products',
    href: '/admin/products',
    icon: Package,
  },
  {
    title: 'Media Library',
    href: '/admin/media',
    icon: ImageIcon,
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
  },
  {
    title: 'Email Queue',
    href: '/admin/email',
    icon: Mail,
  },
  {
    title: 'Activity Logs',
    href: '/admin/logs',
    icon: Activity,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-background border-r border-border">
      {/* Logo Section */}
      <div className="p-6 border-b border-border">
        <Link href="/admin/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-primary/30 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 group-hover:border-primary/50 transition-colors">
            <Image
              src="/terra-logo.png"
              alt="Terra Industries"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
          </div>
          <div>
            <div className="font-bold text-sm">TERRA INDUSTRIES</div>
            <div className="text-xs text-muted-foreground">Admin Portal</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon className={cn(
                'h-5 w-5 flex-shrink-0',
                isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-accent-foreground'
              )} />
              
              <span className="flex-1">{item.title}</span>
              
              {item.badge && (
                <span className={cn(
                  'text-xs px-2 py-0.5 rounded-full font-semibold',
                  isActive
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-primary/10 text-primary'
                )}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Link
          href="/admin/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
}

