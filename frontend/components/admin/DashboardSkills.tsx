'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Star, Code, Wrench } from 'lucide-react';
import { api, API_BASE_URL } from '@/lib/api';

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
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  keywords?: string[];
  description?: string;
  orderIndex: number;
  isActive: boolean;
}

const proficiencyColors: Record<string, { bg: string; text: string; border: string }> = {
  beginner: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
  intermediate: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  advanced: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
  expert: { bg: 'bg-violet-500/20', text: 'text-violet-400', border: 'border-violet-500/30' },
};

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

export default function DashboardSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [groupedSkills, setGroupedSkills] = useState<Record<string, Skill[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const data: any = await api.getSkills();
      const skillsData = Array.isArray(data) ? data : data?.skills || data?.data || [];
      
      // Filter only active skills
      const activeSkills = skillsData.filter((s: Skill) => s.isActive !== false);
      setSkills(activeSkills);

      // Group by category
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

  if (loading) {
    return (
      <Card className="p-8 bg-gradient-to-br from-slate-800/30 via-slate-900/20 to-slate-900/30 border border-cyan-500/20">
        <div className="flex justify-center py-12">
          <div className="text-muted-foreground animate-pulse">Loading skills...</div>
        </div>
      </Card>
    );
  }

  if (skills.length === 0) {
    return (
      <Card className="p-8 bg-gradient-to-br from-slate-800/30 via-slate-900/20 to-slate-900/30 border border-cyan-500/20">
        <div className="text-center py-12">
          <p className="text-muted-foreground">No skills yet. Add your first skill in the Skills section.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-violet-500/0 rounded-lg blur-2xl group-hover:via-cyan-500/10 transition-all duration-500"></div>
      <Card className="relative bg-gradient-to-br from-slate-800/30 via-slate-900/20 to-slate-900/30 border border-cyan-500/20 group-hover:border-cyan-500/40 p-8 md:p-10 backdrop-blur-sm transition-all duration-300 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/5 rounded-full blur-3xl -z-0 group-hover:from-cyan-500/10 transition-all duration-500"></div>

        <div className="relative z-10 mb-8 pb-6 border-b border-cyan-500/20">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Skills & Technologies</h2>
          <p className="text-muted-foreground text-sm md:text-base">Total: {skills.length} skills across {Object.keys(groupedSkills).length} categories</p>
        </div>

        <div className="relative z-10 space-y-8">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => {
            const CategoryIcon = categoryIcons[category] || Code;
            const categoryLabel = categoryLabels[category] || category;

            return (
              <div key={category}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-lg border border-cyan-500/30">
                    <CategoryIcon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-foreground">{categoryLabel}</h3>
                    <p className="text-xs text-muted-foreground">{categorySkills.length} skills</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {categorySkills.map((skill) => {
                    const profColor = proficiencyColors[skill.proficiency];
                    return (
                      <div
                        key={skill.id}
                        className="group/skill relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 rounded-lg blur opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300"></div>
                        <div className={`relative p-4 rounded-lg border ${profColor.border} bg-gradient-to-br from-slate-800/50 to-slate-900/30 hover:from-slate-800/70 hover:to-slate-900/50 transition-all duration-300 h-full flex flex-col items-center text-center gap-3 group-hover/skill:shadow-lg group-hover/skill:shadow-cyan-500/10`}>
                          {/* Skill Image */}
                          {skill.photo ? (
                            <div className="relative w-12 h-12 flex-shrink-0">
                              <img
                                src={getImageUrl(skill.photo)}
                                alt={skill.name}
                                className="w-full h-full object-contain rounded-lg"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center border border-cyan-500/30">
                              <Code className="w-6 h-6 text-cyan-400" />
                            </div>
                          )}

                          {/* Skill Name */}
                          <div>
                            <h4 className="font-semibold text-foreground text-sm leading-tight">{skill.name}</h4>
                          </div>

                          {/* Proficiency Badge */}
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${profColor.bg} ${profColor.text} ${profColor.border} capitalize`}>
                            {skill.proficiency}
                          </span>

                          {/* Keywords/Description Tooltip */}
                          {skill.description && (
                            <p className="text-xs text-muted-foreground line-clamp-2 hidden group-hover/skill:block mt-2 pt-2 border-t border-cyan-500/20">
                              {skill.description}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
