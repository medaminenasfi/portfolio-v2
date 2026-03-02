'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowUp, ArrowDown, Edit, Save, X, Plus, Trash2 } from 'lucide-react';
import { api } from '@/lib/api';
import { toast } from '@/hooks/use-toast';

interface PortfolioStat {
  id: number;
  label: string;
  number: string;
  createdAt: string;
  updatedAt: string;
}

const STATS_CONFIG = [
  { id: 'years-experience', label: 'Years Experience', default: '2+' },
  { id: 'projects-completed', label: 'Projects Completed', default: '5+' },
  { id: 'client-satisfaction', label: 'Client Satisfaction', default: '100%' }
];

export default function StatsPage() {
  const [stats, setStats] = useState<any[]>(STATS_CONFIG.map(stat => ({
    ...stat,
    backendId: null, // Will store the numeric ID from backend
    number: stat.default,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response: any = await api.getPortfolioStats();
      const backendStats = response.data || response; // Handle both response formats
      
      if (Array.isArray(backendStats) && backendStats.length > 0) {
        // Update stats with backend data by matching labels
        const updatedStats = stats.map(stat => {
          const backendStat = backendStats.find((s: any) => s.label === stat.label);
          return backendStat ? { 
            ...stat, 
            backendId: backendStat.id, 
            number: backendStat.number || stat.default 
          } : stat;
        });
        setStats(updatedStats);
        // Save to localStorage as backup
        localStorage.setItem('portfolio-stats', JSON.stringify(updatedStats));
      }
    } catch (error) {
      console.error('Failed to fetch stats from backend:', error);
      // Try to load from localStorage
      const savedStats = localStorage.getItem('portfolio-stats');
      if (savedStats) {
        try {
          const parsedStats = JSON.parse(savedStats);
          setStats(parsedStats);
          toast({
            title: 'Loaded Local Data',
            description: 'Using saved stats. Will sync with backend when available.',
          });
        } catch (e) {
          console.error('Failed to parse saved stats');
        }
      } else {
        toast({
          title: 'Using Default Values',
          description: 'Backend not available. Changes will be saved locally.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (statId: string, currentValue: string) => {
    setEditingId(statId);
    setEditValue(currentValue);
  };

  const handleSave = async (statId: string) => {
    if (!editValue.trim()) return;
    
    // Validate the format before saving
    const isValidFormat = /^([0-9]+[+]?)|([0-9]+%)|([0-9]+[+]?%)$/.test(editValue);
    if (!isValidFormat) {
      toast({
        title: 'Invalid Format',
        description: 'Please enter numbers only with optional + or % symbols',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      setSaving(true);
      
      const statToUpdate = stats.find(s => s.id === statId);
      if (!statToUpdate) return;
      
      // Update local state
      const updatedStats = stats.map(stat => 
        stat.id === statId ? { ...stat, number: editValue, updatedAt: new Date().toISOString() } : stat
      );
      setStats(updatedStats);
      
      // Save to localStorage
      localStorage.setItem('portfolio-stats', JSON.stringify(updatedStats));
      
      // Try to save to backend
      try {
        if (statToUpdate.backendId) {
          // Update existing stat
          await api.updatePortfolioStat(statToUpdate.backendId.toString(), { 
            number: editValue,
            label: statToUpdate.label 
          });
        } else {
          // Create new stat
          const newStat = await api.createPortfolioStat({ 
            number: editValue,
            label: statToUpdate.label 
          });
          // Update the stat with the new backend ID
          const newStatData = (newStat as any).data || newStat;
          const finalStats = updatedStats.map(stat => 
            stat.id === statId ? { ...stat, backendId: newStatData?.id } : stat
          );
          setStats(finalStats);
          localStorage.setItem('portfolio-stats', JSON.stringify(finalStats));
        }
        toast({
          title: 'Success',
          description: 'Stat updated and saved to backend',
        });
      } catch (apiError) {
        console.error('Failed to save to backend:', apiError);
        toast({
          title: 'Saved Locally',
          description: 'Changes saved locally. Will sync when backend is available.',
        });
      }
      
      setEditingId(null);
      setEditValue('');
    } catch (error) {
      console.error('Failed to update stat:', error);
      toast({
        title: 'Error',
        description: 'Failed to update stat',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers, +, and % symbols
    const isValid = /^([0-9]+[+]?)|([0-9]+%)|([0-9]+[+]?%)$/.test(value) || value === '';
    if (isValid) {
      setEditValue(value);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Portfolio Stats</h1>
          <p className="text-muted-foreground mt-1">Manage your portfolio statistics</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STATS_CONFIG.map((stat) => (
            <div key={stat.id} className="p-6 bg-card border border-border rounded-lg">
              <div className="animate-pulse">
                <div className="h-6 bg-slate-700 rounded w-3/4 mb-4"></div>
                <div className="h-12 bg-slate-700 rounded mb-4"></div>
                <div className="h-10 bg-slate-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Portfolio Stats</h1>
        <p className="text-muted-foreground mt-1">Edit the numbers that appear on your portfolio</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className="p-6 bg-card border border-border rounded-lg space-y-4">
            <h3 className="text-xl font-semibold text-foreground text-center">{stat.label}</h3>
            
            {editingId === stat.id ? (
              <div className="space-y-3">
                <Input
                  value={editValue}
                  onChange={handleChange}
                  placeholder="Enter numbers with + or % (e.g., 5+, 100%)"
                  className="text-2xl font-bold text-center h-14"
                  pattern="([0-9]+[+]?)|([0-9]+%)|([0-9]+[+]?%)"
                />
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleSave(stat.id)}
                    disabled={saving || !editValue.trim()}
                    className="flex-1 flex items-center gap-2"
                  >
                    {saving ? 'Saving...' : <><Save size={16} /> Save</>}
                  </Button>
                  <Button 
                    onClick={handleCancel}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <X size={16} /> Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-center p-4 rounded-lg bg-gradient-to-br from-slate-800/30 to-slate-900/20 border border-cyan-500/20">
                  <div className="text-4xl md:text-5xl font-bold text-cyan-400">{stat.number}</div>
                </div>
                <Button
                  onClick={() => handleEditClick(stat.id, stat.number)}
                  variant="outline"
                  className="w-full flex items-center gap-2"
                >
                  <Edit size={16} /> Edit Number
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="text-center text-muted-foreground text-sm p-4 bg-secondary/20 rounded-lg border border-border">
        <p>Changes will be reflected immediately on your portfolio page</p>
      </div>
    </div>
  );
}