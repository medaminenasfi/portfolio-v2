'use client';

import { useState, useEffect } from 'react';
import { api, API_BASE_URL } from '@/lib/api';
import { Code, Wrench, Star } from 'lucide-react';
import StatsDisplay from './StatsDisplay';

// Helper to get full image URL
const getImageUrl = (path: string | undefined | null): string => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  // Prepend backend URL for relative paths
  const backendUrl = API_BASE_URL.replace('/api', '');
  return `${backendUrl}${path}`;
};

interface Skill {
  id: string;
  name: string;
  photo?: string;
  category: 'frontend' | 'backend' | 'tools' | 'soft_skills';
  orderIndex: number;
  isActive: boolean;
}

const categoryIcons: Record<string, any> = {
  frontend: Code,
  backend: Code,
  tools: Wrench,
  soft_skills: Star,
};

const categoryLabels: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  tools: 'Tools & DevOps',
  soft_skills: 'Soft Skills',
};

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [stats, setStats] = useState<any[]>([
    { id: 'years-experience', number: '2+', label: 'Years Experience', orderIndex: 0 },
    { id: 'projects-completed', number: '5+', label: 'Projects Completed', orderIndex: 1 },
    { id: 'client-satisfaction', number: '100%', label: 'Client Satisfaction', orderIndex: 2 },
  ]);
  const [loading, setLoading] = useState(true);
  const [groupedSkills, setGroupedSkills] = useState<Record<string, Skill[]>>({});

  useEffect(() => {
    fetchSkills();
    fetchStats();
  }, []);

  const fetchSkills = async () => {
    try {
      const data: any = await api.getSkills();
      const skillsData = Array.isArray(data) ? data : data?.skills || data?.data || [];
      
      // Filter only active skills
      const activeSkills = skillsData.filter((s: Skill) => s.isActive !== false);
      setSkills(activeSkills);
      
      // Group skills by category
      const grouped = activeSkills.reduce((acc: Record<string, Skill[]>, skill: Skill) => {
        const category = skill.category || 'tools';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(skill);
        return acc;
      }, {});
      setGroupedSkills(grouped);
    } catch (error) {
      console.error('Failed to fetch skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data: any = await api.getPortfolioStats();
      const statsData = Array.isArray(data) ? data : data?.portfolioStats || data?.data || [];
      
      if (statsData.length > 0) {
        const mappedStats = [
          {
            id: 'years-experience',
            number: statsData.find((s: any) => s.id === 'years-experience')?.number || '2+',
            label: 'Years Experience',
            description: statsData.find((s: any) => s.id === 'years-experience')?.description || null,
            orderIndex: statsData.find((s: any) => s.id === 'years-experience')?.orderIndex || 0
          },
          {
            id: 'projects-completed',
            number: statsData.find((s: any) => s.id === 'projects-completed')?.number || '5+',
            label: 'Projects Completed',
            description: statsData.find((s: any) => s.id === 'projects-completed')?.description || null,
            orderIndex: statsData.find((s: any) => s.id === 'projects-completed')?.orderIndex || 1
          },
          {
            id: 'client-satisfaction',
            number: statsData.find((s: any) => s.id === 'client-satisfaction')?.number || '100%',
            label: 'Client Satisfaction',
            description: statsData.find((s: any) => s.id === 'client-satisfaction')?.description || null,
            orderIndex: statsData.find((s: any) => s.id === 'client-satisfaction')?.orderIndex || 2
          }
        ];
        setStats(mappedStats);
      }
    } catch (error) {
      // Silently handle API errors - use default stats
      setStats([
        { id: 'years-experience', number: '2+', label: 'Years Experience', orderIndex: 0 },
        { id: 'projects-completed', number: '5+', label: 'Projects Completed', orderIndex: 1 },
        { id: 'client-satisfaction', number: '100%', label: 'Client Satisfaction', orderIndex: 2 },
      ]);
    }
  };

  if (loading) {
    return (
      <section id="skills" className="py-24 px-4 bg-gradient-to-b from-card/20 to-background scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Skills & Expertise</h2>
            <p className="text-lg text-muted-foreground">
              A comprehensive overview of technologies and tools I work with daily
            </p>
          </div>
          <div className="flex justify-center py-12">
            <div className="text-muted-foreground animate-pulse">Loading skills...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-24 px-4 bg-gradient-to-b from-card/20 to-background scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Skills & Expertise</h2>
          <p className="text-lg text-muted-foreground">
            A comprehensive overview of technologies and tools I work with daily
          </p>
        </div>

        {skills.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No skills found</p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => {
              const CategoryIcon = categoryIcons[category] || Code;
              const categoryLabel = categoryLabels[category] || category;

              return (
                <div key={category} className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-lg border border-cyan-500/30">
                      <CategoryIcon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground">{categoryLabel}</h3>
                      <p className="text-sm text-muted-foreground">{categorySkills.length} skills</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {categorySkills.map((skill) => {
                      return (
                        <div key={skill.id} className="group/skill relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 rounded-lg blur opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative p-4 rounded-lg border border-cyan-500/30 bg-gradient-to-br from-slate-800/50 to-slate-900/30 hover:from-slate-800/70 hover:to-slate-900/50 transition-all duration-300 h-full flex flex-col items-center text-center gap-3 group-hover/skill:shadow-lg group-hover/skill:shadow-cyan-500/10">
                            {/* Skill Image */}
                            {skill.photo ? (
                              <div className="relative w-14 h-14 flex-shrink-0">
                                <img
                                  src={getImageUrl(skill.photo)}
                                  alt={skill.name}
                                  className="w-full h-full object-contain rounded-lg"
                                />
                              </div>
                            ) : (
                              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center border border-cyan-500/30">
                                <Code className="w-7 h-7 text-cyan-400" />
                              </div>
                            )}

                            {/* Skill Name */}
                            <div>
                              <h4 className="font-bold text-foreground text-sm leading-tight">{skill.name}</h4>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Highlights */}
        <StatsDisplay />
      </div>
    </section>
  );
}
