'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { LayoutDashboard, Briefcase, FileText, MessageSquare, Settings, LogOut, ChevronRight, Sparkles, Code } from 'lucide-react';
import { api } from '@/lib/api';

interface AdminSidebarProps {
  open: boolean;
}

interface MenuItem {
  icon: any;
  label: string;
  href: string;
  badge?: number;
}

export default function AdminSidebar({ open }: AdminSidebarProps) {
  const pathname = usePathname();
  const [pendingTestimonials, setPendingTestimonials] = useState(0);

  // Fetch pending testimonials count
  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const response = await api.getTestimonials() as any;
        const testimonials = response.testimonials || response.data || [];
        const pending = testimonials.filter((t: any) => t.status === 'pending').length;
        setPendingTestimonials(pending);
        console.log('AdminSidebar - Pending testimonials:', pending); // Debug log
        console.log('AdminSidebar - Should show badge:', pending > 0); // Debug log
      } catch (error) {
        console.error('Failed to fetch pending testimonials:', error);
        setPendingTestimonials(0);
      }
    };

    fetchPendingCount();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchPendingCount, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const menuItems: MenuItem[] = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Briefcase, label: 'Projects', href: '/admin/projects' },
    { icon: Code, label: 'Skills', href: '/admin/skills' },
    { icon: FileText, label: 'Experience', href: '/admin/experience' },
    { icon: FileText, label: 'Resume', href: '/admin/resume' },
    { 
      icon: MessageSquare, 
      label: 'Testimonials', 
      href: '/admin/testimonials',
      badge: pendingTestimonials > 0 ? pendingTestimonials : undefined
    },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname?.startsWith(href);
  };

  return (
    <aside className={`${open ? 'w-64' : 'w-20'} bg-gradient-to-b from-slate-900 to-slate-950 border-r border-cyan-500/20 transition-all duration-300 flex flex-col h-full hidden sm:flex`}>
      <div className="p-4 md:p-6 border-b border-cyan-500/20">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 border border-cyan-500/30">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
          </div>
          {open && (
            <div>
              <h1 className="font-bold text-cyan-400 text-sm md:text-base">Portfolio Pro</h1>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 p-3 md:p-4 space-y-1 md:space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg transition-all duration-200 group relative ${
                  active
                    ? 'bg-gradient-to-r from-cyan-500/30 to-cyan-600/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-muted-foreground hover:text-foreground hover:bg-slate-800/50 border border-transparent hover:border-cyan-500/20'
                }`}
              >
                <Icon size={18} className={active ? 'text-cyan-400' : 'group-hover:text-cyan-400 transition-colors'} />
                {open && (
                  <span className={`text-xs md:text-sm font-medium ${active ? 'text-cyan-300' : ''}`}>
                    {item.label}
                  </span>
                )}
                {open && active && (
                  <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-auto text-cyan-400" />
                )}
                {/* Notification Badge */}
                {item.badge && (
                  <div className={`absolute ${open ? 'top-2 right-2' : 'top-1 right-1'} w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse border-2 border-slate-900`}>
                    {item.badge > 9 ? '9+' : item.badge}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-cyan-500/20 p-3 md:p-4">
        <button className="flex items-center gap-3 w-full px-3 md:px-4 py-2 md:py-3 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 border border-transparent hover:border-red-500/30">
          <LogOut size={18} />
          {open && <span className="text-xs md:text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
