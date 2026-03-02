'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, Bell, User, LogOut, X, MessageSquare, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const [pendingTestimonials, setPendingTestimonials] = useState(0);
  const [pendingTestimonialsList, setPendingTestimonialsList] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Fetch pending testimonials count
  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const response = await api.getTestimonials() as any;
        const testimonials = response.testimonials || response.data || [];
        const pendingTestimonials = testimonials.filter((t: any) => t.status === 'pending');
        setPendingTestimonials(pendingTestimonials.length);
        setPendingTestimonialsList(pendingTestimonials);
        console.log('AdminHeader - Pending testimonials:', pendingTestimonials.length); // Debug log
      } catch (error) {
        console.error('Failed to fetch pending testimonials:', error);
        setPendingTestimonials(0);
        setPendingTestimonialsList([]);
      }
    };

    fetchPendingCount();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchPendingCount, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTestimonialClick = (testimonialId: string) => {
    router.push(`/admin/testimonials#${testimonialId}`);
    setShowNotifications(false);
  };

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
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-muted-foreground hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-200 rounded-lg"
          >
            <Bell size={18} />
            {/* Notification Badge - Only show when there are pending testimonials */}
            {pendingTestimonials > 0 && (
              <div className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse border-2 border-slate-900">
                {pendingTestimonials > 9 ? '9+' : pendingTestimonials}
              </div>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-cyan-500/20 rounded-lg shadow-lg z-50 max-h-96 overflow-hidden">
              <div className="p-4 border-b border-cyan-500/20 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <MessageSquare size={16} className="text-cyan-400" />
                  New Testimonials
                </h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div className="max-h-80 overflow-y-auto">
                {pendingTestimonialsList.length > 0 ? (
                  pendingTestimonialsList.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      onClick={() => handleTestimonialClick(testimonial.id)}
                      className="p-4 border-b border-slate-800 hover:bg-slate-800/50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <MessageSquare size={14} className="text-slate-900" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {testimonial.name || 'Anonymous'}
                          </p>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                            {testimonial.message || 'No message'}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Clock size={12} className="text-muted-foreground" />
                            <p className="text-xs text-muted-foreground">
                              {new Date(testimonial.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <MessageSquare size={32} className="text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No new testimonials</p>
                  </div>
                )}
              </div>

              {pendingTestimonialsList.length > 0 && (
                <div className="p-3 border-t border-cyan-500/20">
                  <button
                    onClick={() => {
                      router.push('/admin/testimonials');
                      setShowNotifications(false);
                    }}
                    className="w-full text-center text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    View All Testimonials →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

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
