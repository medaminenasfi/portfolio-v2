'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, LogOut } from 'lucide-react';
import DashboardStats from '@/components/admin/DashboardStats';
import RecentProjects from '@/components/admin/RecentProjects';
import { api } from '@/lib/api';

interface DashboardStats {
  totalProjects: number;
  totalTestimonials: number;
  pendingTestimonials: number;
  totalContacts: number;
  totalDownloads: number;
  currentVisitors: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    totalTestimonials: 0,
    pendingTestimonials: 0,
    totalContacts: 0,
    totalDownloads: 0,
    currentVisitors: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      
      // Fetch data from backend API
      const [projectsRes, testimonialsRes] = await Promise.all([
        api.getPublicProjects({ limit: 1 }), // Use public endpoint
        api.getTestimonials(), // Use admin endpoint to get all testimonials
        // Skip contact and analytics stats for now as they're causing UUID errors
      ]);

      console.log('=== DASHBOARD DEBUG ==='); // Debug log
      console.log('Projects response:', projectsRes); // Debug log
      console.log('Testimonials response:', testimonialsRes); // Debug log
      console.log('Testimonials raw:', JSON.stringify(testimonialsRes, null, 2)); // Debug log

      const projectsData = projectsRes as any;
      const testimonialsData = testimonialsRes as any;

      // Check different possible response structures
      const testimonialsArray = testimonialsData.testimonials || testimonialsData.data || testimonialsData || [];
      console.log('Testimonials array:', testimonialsArray); // Debug log
      console.log('Testimonials array length:', testimonialsArray.length); // Debug log

      // Count pending testimonials
      const pendingTestimonials = testimonialsArray.filter(
        (t: any) => t.status === 'pending'
      );
      console.log('Pending testimonials:', pendingTestimonials); // Debug log
      console.log('Pending count:', pendingTestimonials.length); // Debug log

      setStats({
        totalProjects: projectsData.total || projectsData.projects?.length || 0,
        totalTestimonials: testimonialsArray.length,
        pendingTestimonials: pendingTestimonials.length, // New stat for pending testimonials
        totalContacts: 0, // Temporarily disabled
        totalDownloads: 0, // Temporarily disabled
        currentVisitors: 0, // Temporarily disabled
      });
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      // Set fallback values
      setStats({
        totalProjects: 0,
        totalTestimonials: 0,
        pendingTestimonials: 0,
        totalContacts: 0,
        totalDownloads: 0,
        currentVisitors: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      api.clearToken();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">Welcome back to your portfolio admin</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Link href="/admin/projects/new" className="flex-1 sm:flex-none">
            <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-slate-900 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 font-semibold gap-2 w-full justify-center">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </Link>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="flex-1 sm:flex-none"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <DashboardStats stats={stats} loading={loading} />
      <RecentProjects />
    </div>
  );
}
