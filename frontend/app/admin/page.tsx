'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import DashboardStats from '@/components/admin/DashboardStats';
import RecentProjects from '@/components/admin/RecentProjects';
import { api } from '@/lib/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTestimonials: 0,
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
      const [projectsRes, testimonialsRes, contactsRes, analyticsRes] = await Promise.all([
        api.getProjects({ limit: 1 }), // Just get count
        api.getTestimonials({ limit: 1 }), // Just get count
        api.getContactStats(),
        api.getDashboardStats().catch(() => null), // Analytics might fail
      ]);

      const projectsData = projectsRes as any;
      const testimonialsData = testimonialsRes as any;
      const contactsData = contactsRes as any;
      const analyticsData = analyticsRes as any;

      setStats({
        totalProjects: projectsData.pagination?.total || projectsData.data?.length || 0,
        totalTestimonials: testimonialsData.pagination?.total || testimonialsData.data?.length || 0,
        totalContacts: contactsData.totalContactSubmissions || contactsData.total || 0,
        totalDownloads: analyticsData?.total?.resumeDownloads || 0,
        currentVisitors: analyticsData?.realTime?.currentVisitors || 0,
      });
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      // Set fallback values
      setStats({
        totalProjects: 0,
        totalTestimonials: 0,
        totalContacts: 0,
        totalDownloads: 0,
        currentVisitors: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">Welcome back to your portfolio admin</p>
        </div>
        <Link href="/admin/projects/new">
          <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-slate-900 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 font-semibold gap-2 w-full sm:w-auto justify-center sm:justify-start">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      <DashboardStats stats={stats} loading={loading} />
      <RecentProjects />
    </div>
  );
}
