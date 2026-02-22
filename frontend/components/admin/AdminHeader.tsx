'use client';

import { useState, useEffect } from 'react';
import { Menu, Bell, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const [pendingTestimonials, setPendingTestimonials] = useState(0);

  // Fetch pending testimonials count
  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const response = await api.getTestimonials() as any;
        const testimonials = response.testimonials || response.data || [];
        const pending = testimonials.filter((t: any) => t.status === 'pending').length;
        setPendingTestimonials(pending);
        console.log('AdminHeader - Pending testimonials:', pending); // Debug log
      } catch (error) {
        console.error('Failed to fetch pending testimonials:', error);
      }
    };

    fetchPendingCount();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchPendingCount, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-gradient-to-r from-slate-900/80 to-slate-950/80 border-b border-cyan-500/20 h-16 flex items-center justify-between px-4 md:px-6 backdrop-blur-sm sticky top-0 z-40">
      <button
        onClick={onMenuClick}
        className="sm:hidden text-foreground hover:text-cyan-400 transition-colors duration-200 p-2 hover:bg-cyan-500/10 rounded-lg"
      >
        <Menu size={20} />
      </button>

      <div className="flex-1" />

      <div className="flex items-center gap-2 md:gap-4">
        <button className="relative p-2 text-muted-foreground hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-200 rounded-lg">
          <Bell size={18} />
          {/* Notification Badge - Only show when there are pending testimonials */}
          {pendingTestimonials > 0 && (
            <div className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse border-2 border-slate-900">
              {pendingTestimonials > 9 ? '9+' : pendingTestimonials}
            </div>
          )}
        </button>

        <div className="flex items-center gap-2 md:gap-3 pl-3 md:pl-4 border-l border-cyan-500/20">
          <div className="text-right hidden sm:block">
            <p className="text-xs md:text-sm font-medium text-foreground">Developer</p>
            <p className="text-xs text-muted-foreground">Admin</p>
          </div>
          <div className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-200">
            <User size={16} className="text-slate-900" />
          </div>
        </div>
      </div>
    </header>
  );
}
