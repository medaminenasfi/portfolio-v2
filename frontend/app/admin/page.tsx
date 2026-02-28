'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, LogOut, TrendingUp, BarChart3, Clock, Code } from 'lucide-react';
import DashboardStats from '@/components/admin/DashboardStats';
import RecentProjects from '@/components/admin/RecentProjects';
import DashboardSkills from '@/components/admin/DashboardSkills';
import { api } from '@/lib/api';

interface DashboardStats {
  totalProjects: number;
  totalTestimonials: number;
  pendingTestimonials: number;
  totalSkills: number;
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
    totalSkills: 0,
    totalContacts: 0,
    totalDownloads: 0,
    currentVisitors: 0,
  });
  const [loading, setLoading] = useState(true);

  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    fetchDashboardStats();
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const updateTime = () => {
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
  };

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      
      // Fetch data from backend API
      const [projectsRes, testimonialsRes, skillsRes] = await Promise.all([
        api.getPublicProjects({ limit: 1 }), // Use public endpoint
        api.getTestimonials(), // Use admin endpoint to get all testimonials
        api.getSkills(), // Get skills data - using correct endpoint
        // Skip contact and analytics stats for now as they're causing UUID errors
      ]);

      const projectsData = projectsRes as any;
      const testimonialsData = testimonialsRes as any;
      const skillsData = skillsRes as any;

      console.log('=== DASHBOARD DEBUG ==='); // Debug log
      console.log('Projects response:', projectsRes); // Debug log
      console.log('Testimonials response:', testimonialsRes); // Debug log
      console.log('Testimonials raw:', JSON.stringify(testimonialsRes, null, 2)); // Debug log

      // Count pending testimonials
      const testimonialsArray = testimonialsData.testimonials || testimonialsData.data || testimonialsData || [];
      const pendingTestimonials = testimonialsArray.filter(
        (t: any) => t.status === 'pending'
      );
      console.log('Testimonials array:', testimonialsArray); // Debug log
      console.log('Testimonials array length:', testimonialsArray.length); // Debug log
      console.log('Pending testimonials:', pendingTestimonials); // Debug log
      console.log('Pending count:', pendingTestimonials.length); // Debug log

      // Count skills
      const skillsArray = skillsData.skills || skillsData.data || skillsData || [];
      
      setStats({
        totalProjects: projectsData.total || projectsData.projects?.length || 0,
        totalTestimonials: testimonialsArray.length,
        pendingTestimonials: pendingTestimonials.length,
        totalSkills: skillsArray.length,
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
        totalSkills: 0,
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
    <div className="space-y-8 w-full">
      {/* Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground text-lg">Manage your portfolio content and analytics</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-start md:justify-end">
          <Link href="/admin/projects/new" className="flex-1 sm:flex-none">
            <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-slate-900 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 font-semibold gap-2 w-full justify-center">
              <Plus className="h-5 w-5" />
              New Project
            </Button>
          </Link>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="flex-1 sm:flex-none border-muted-foreground/20 hover:border-red-500/40 hover:text-red-400 transition-all"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="text-cyan-400 w-5 h-5" />
          <h2 className="text-xl font-semibold text-foreground">Overview</h2>
        </div>
        <DashboardStats stats={stats} loading={loading} />
      </div>

      {/* Quick Stats Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Last Updated</p>
              <p className="text-2xl font-bold text-foreground mt-2">{currentTime}</p>
            </div>
            <Clock className="text-cyan-400 w-10 h-10 opacity-30" />
          </div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Portfolio Status</p>
              <p className="text-2xl font-bold text-green-400 mt-2">Published</p>
            </div>
            <TrendingUp className="text-green-400 w-10 h-10 opacity-30" />
          </div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Content Items</p>
              <p className="text-2xl font-bold text-cyan-400 mt-2">{stats.totalProjects + stats.totalSkills}</p>
            </div>
            <BarChart3 className="text-cyan-400 w-10 h-10 opacity-30" />
          </div>
        </Card>
      </div>

      {/* Skills Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Code className="text-cyan-400 w-5 h-5" />
          <h2 className="text-xl font-semibold text-foreground">Skills & Technologies</h2>
        </div>
        <DashboardSkills />
      </div>

      {/* Recent Projects Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-cyan-400 w-5 h-5" />
          <h2 className="text-xl font-semibold text-foreground">Content Management</h2>
        </div>
        <RecentProjects />
      </div>
    </div>
  );
}
