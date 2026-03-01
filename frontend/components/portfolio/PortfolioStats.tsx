'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export default function PortfolioStats() {
  const [yearsExperience, setYearsExperience] = useState({
    number: '2+',
    label: 'Years Experience'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchYearsExperience();
  }, []);

  const fetchYearsExperience = async () => {
    try {
      const data: any = await api.getPortfolioStats();
      const statsData = Array.isArray(data) ? data : data?.portfolioStats || data?.data || [];
      
      // Find the years experience stat
      const yearsExpStat = statsData.find((stat: any) => stat.id === 'years-experience');
      if (yearsExpStat) {
        setYearsExperience({
          number: yearsExpStat.number || '2+',
          label: yearsExpStat.label || 'Years Experience'
        });
      }
    } catch (error) {
      console.error('Failed to fetch years experience:', error);
      // Keep default value if API fails
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-20 text-center">
        <div className="animate-pulse">
          <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">2+</div>
          <div className="text-muted-foreground">Years Experience</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 text-center">
      <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">{yearsExperience.number}</div>
      <p className="text-muted-foreground">{yearsExperience.label}</p>
    </div>
  );
}