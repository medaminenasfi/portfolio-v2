'use client';

import { useState, useEffect } from 'react';

interface Experience {
  id: string;
  company_name: string;
  position: string;
  employment_type: string;
  location: string;
  description: string;
  start_date: string;
  end_date: string | null;
}

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    try {
      const response = await fetch('/api/experience');
      const data = await response.json();
      setExperiences(data.data || []);
    } catch (error) {
      console.error('Failed to fetch experience:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
    }).format(date);
  };

  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Experience</h2>
          <p className="text-lg text-muted-foreground">
            My professional journey through internships and freelance work
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="text-muted-foreground">Loading experience...</div>
          </div>
        ) : experiences.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No experience found</p>
          </div>
        ) : (
          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <div key={exp.id} className="relative">
                {/* Timeline connector */}
                {idx !== experiences.length - 1 && (
                  <div className="absolute left-6 top-20 h-12 border-l-2 border-accent/30"></div>
                )}

                <div className="flex gap-6">
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                        <div>
                          <h3 className="text-2xl font-bold text-foreground">{exp.position}</h3>
                          <p className="text-primary font-semibold">{exp.company_name}</p>
                        </div>
                        <div className="text-sm text-muted-foreground mt-2 md:mt-0">
                          {formatDate(exp.start_date)} -{' '}
                          {exp.end_date ? formatDate(exp.end_date) : 'Present'}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 mb-3">
                        <span className="px-3 py-1 bg-secondary text-accent rounded-full text-xs font-medium">
                          {exp.employment_type}
                        </span>
                        <span className="px-3 py-1 bg-secondary text-accent rounded-full text-xs font-medium">
                          {exp.location}
                        </span>
                      </div>

                      {exp.description && (
                        <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
