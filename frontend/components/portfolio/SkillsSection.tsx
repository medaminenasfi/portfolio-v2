'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency?: number;
  iconUrl?: string;
}

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [groupedSkills, setGroupedSkills] = useState<Record<string, Skill[]>>({});

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const data: any = await api.getSkills();
      const skillsData = Array.isArray(data) ? data : data?.data || [];
      setSkills(skillsData);
      
      // Group skills by category
      const grouped = skillsData.reduce((acc: Record<string, Skill[]>, skill: Skill) => {
        const category = skill.category || 'Other';
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
      <section id="skills" className="py-24 px-4 bg-gradient-to-b from-card/20 to-background scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Skills & Expertise</h2>
            <p className="text-lg text-muted-foreground">
              A comprehensive overview of technologies and tools I work with daily
            </p>
          </div>
          <div className="flex justify-center py-12">
            <div className="text-muted-foreground">Loading skills...</div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div
                key={category}
                className="bg-card border border-border rounded-lg p-8 hover:border-accent hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-primary mb-6">{category}</h3>

                <div className="flex flex-wrap gap-3">
                  {categorySkills.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-4 py-2 bg-secondary text-foreground rounded-lg text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { number: '2+', label: 'Years Experience' },
            { number: '5+', label: 'Projects Completed' },
            { number: '100%', label: 'Client Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
