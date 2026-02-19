'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import DashboardStats from '@/components/admin/DashboardStats';
import RecentProjects from '@/components/admin/RecentProjects';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalExperience: 0,
    totalVisitors: 0,
    totalContacts: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [projectsRes, experienceRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/experience'),
      ]);

      const projectsData = await projectsRes.json();
      const experienceData = await experienceRes.json();

      setStats({
        totalProjects: projectsData.data?.length || 0,
        totalExperience: experienceData.data?.length || 0,
        totalVisitors: 1250,
        totalContacts: 42,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
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

      <DashboardStats stats={stats} />
      <RecentProjects />
    </div>
  );
}
