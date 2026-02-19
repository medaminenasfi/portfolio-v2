'use client';

import { Card } from '@/components/ui/card';
import { Briefcase, Users, MessageSquare, Eye, TrendingUp } from 'lucide-react';

interface DashboardStatsProps {
  stats: {
    totalProjects: number;
    totalExperience: number;
    totalVisitors: number;
    totalContacts: number;
  };
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
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
      icon: Users,
      label: 'Experience',
      value: stats.totalExperience,
      color: 'text-blue-400',
      bgColor: 'bg-gradient-to-br from-blue-500/10 to-blue-600/5',
      borderColor: 'border-blue-500/30',
      trend: '+2%',
    },
    {
      icon: Eye,
      label: 'Visitors',
      value: stats.totalVisitors.toLocaleString(),
      color: 'text-emerald-400',
      bgColor: 'bg-gradient-to-br from-emerald-500/10 to-emerald-600/5',
      borderColor: 'border-emerald-500/30',
      trend: '+12%',
    },
    {
      icon: MessageSquare,
      label: 'Messages',
      value: stats.totalContacts,
      color: 'text-violet-400',
      bgColor: 'bg-gradient-to-br from-violet-500/10 to-violet-600/5',
      borderColor: 'border-violet-500/30',
      trend: '+8%',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="group">
            <Card className={`${stat.bgColor} border ${stat.borderColor} p-6 md:p-8 hover:border-opacity-100 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 backdrop-blur-sm cursor-default`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor} border ${stat.borderColor} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`${stat.color} w-5 h-5 md:w-6 md:h-6`} />
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold">
                  <TrendingUp className={`${stat.color} w-3 h-3`} />
                  <span className={stat.color}>{stat.trend}</span>
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
