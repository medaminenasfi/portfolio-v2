'use client';

import { Card } from '@/components/ui/card';
import { Briefcase, MessageSquare, Download, Users, Eye, FileText, TrendingUp } from 'lucide-react';

interface DashboardStatsProps {
  stats: {
    totalProjects: number;
    totalTestimonials: number;
    pendingTestimonials: number;
    totalContacts: number;
    totalDownloads: number;
    currentVisitors: number;
  };
  loading?: boolean;
}

export default function DashboardStats({ stats, loading = false }: DashboardStatsProps) {
  const statCards = [
    {
      icon: Briefcase,
      label: 'Projects',
      value: stats.totalProjects,
      color: 'text-cyan-400',
      bgColor: 'bg-gradient-to-br from-cyan-500/10 to-cyan-600/5',
      borderColor: 'border-cyan-500/30',
      trend: '+5%',
    },
    {
      icon: FileText,
      label: 'Testimonials',
      value: stats.totalTestimonials,
      color: 'text-blue-400',
      bgColor: 'bg-gradient-to-br from-blue-500/10 to-blue-600/5',
      borderColor: 'border-blue-500/30',
      trend: '+2%',
    },
    {
      icon: MessageSquare,
      label: 'Pending',
      value: stats.pendingTestimonials,
      color: 'text-orange-400',
      bgColor: 'bg-gradient-to-br from-orange-500/10 to-orange-600/5',
      borderColor: 'border-orange-500/30',
      trend: stats.pendingTestimonials > 0 ? '⚠️ New' : '✅ Clear',
      alert: stats.pendingTestimonials > 0,
    },
    {
      icon: Eye,
      label: 'Live Visitors',
      value: stats.currentVisitors,
      color: 'text-purple-400',
      bgColor: 'bg-gradient-to-br from-purple-500/10 to-purple-600/5',
      borderColor: 'border-purple-500/30',
      trend: 'Live',
      isLive: true,
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="p-6 md:p-8 animate-pulse">
            <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-muted rounded w-3/4"></div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="relative group">
            <Card className={`p-6 md:p-8 bg-gradient-to-br ${stat.bgColor} border ${stat.borderColor} hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 ${stat.alert ? 'ring-2 ring-orange-500/30 animate-pulse' : ''}`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2 rounded-lg bg-background/50 ${stat.color}`}>
                  <Icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="flex items-center gap-1">
                  {stat.isLive ? (
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-red-400">Live</span>
                    </div>
                  ) : (
                    <>
                      <TrendingUp className={`${stat.color} w-3 h-3`} />
                      <span className={stat.color}>{stat.trend}</span>
                    </>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-muted-foreground text-xs md:text-sm font-medium uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tabular-nums">{stat.value}</p>
              </div>

              <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
