'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export default function StatsDisplay() {
  const [stats, setStats] = useState([
    { id: 'years-experience', number: '2+', label: 'Years Experience' },
    { id: 'projects-completed', number: '5+', label: 'Projects Completed' },
    { id: 'client-satisfaction', number: '100%', label: 'Client Satisfaction' }
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response: any = await api.getPortfolioStats();
      const statsData = Array.isArray(response) ? response : response?.portfolioStats || response?.data || [];
      
      if (statsData.length > 0) {
        // Update stats with backend data by matching labels (not IDs)
        const updatedStats = stats.map(stat => {
          const backendStat = statsData.find((s: any) => s.label === stat.label);
          return backendStat ? { ...stat, number: backendStat.number || stat.number } : stat;
        });
        setStats(updatedStats);
        // Save to localStorage as backup
        localStorage.setItem('portfolio-stats', JSON.stringify(updatedStats));
      }
    } catch (error) {
      console.log('Failed to fetch stats from backend, using fallback:', error);
      // Silently handle API errors - fallback to localStorage or defaults
      const savedStats = localStorage.getItem('portfolio-stats');
      if (savedStats) {
        try {
          const parsedStats = JSON.parse(savedStats);
          setStats(parsedStats);
        } catch (e) {
          // Keep default stats
        }
      }
      // Keep default stats if all else fails
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className="text-center p-6 rounded-lg bg-gradient-to-br from-slate-800/30 to-slate-900/20 border border-cyan-500/20">
            <div className="animate-pulse">
              <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">00</div>
              <div className="h-4 bg-slate-700 rounded w-3/4 mx-auto"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div 
          key={stat.id} 
          className="text-center p-6 rounded-lg bg-gradient-to-br from-slate-800/30 to-slate-900/20 border border-cyan-500/20 hover:border-cyan-500/40 transition-all group"
        >
          <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2 group-hover:scale-110 transition-transform duration-300">
            {stat.number}
          </div>
          <p className="text-muted-foreground group-hover:text-foreground transition-colors">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}