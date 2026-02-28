'use client';

import { useState, useEffect } from 'react';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { api } from '@/lib/api';

interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  location?: string;
  startDate: string;
  endDate: string | null;
  description?: string;
  orderIndex?: number;
}

export default function EducationSection() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      setError(null);
      const data: any = await api.getEducation();
      const educationData = Array.isArray(data) ? data : data?.data || [];
      setEducation(educationData);
    } catch (error) {
      console.error('Failed to fetch education:', error);
      setError('Unable to load education data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? dateString
      : new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
        }).format(date);
  };

  if (loading) {
    return (
      <section id="education" className="py-24 px-4 bg-background scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Education</h2>
            <p className="text-lg text-muted-foreground">
              My academic background and qualifications
            </p>
          </div>
          <div className="flex justify-center py-12">
            <div className="text-muted-foreground">Loading education...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error || education.length === 0) {
    return null; // Don't show section if no data
  }

  return (
    <section id="education" className="py-24 px-4 bg-background scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Education</h2>
          <p className="text-lg text-muted-foreground">
            My academic background and qualifications
          </p>
        </div>

        <div className="space-y-8">
          {education.map((edu, idx) => (
            <div key={edu.id} className="relative">
              {/* Timeline connector */}
              {idx !== education.length - 1 && (
                <div className="absolute left-6 top-20 h-12 border-l-2 border-accent/30"></div>
              )}

              <div className="flex gap-6">
                {/* Timeline dot */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <div className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">{edu.institution}</h3>
                        <p className="text-primary font-semibold">
                          {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2 md:mt-0">
                        <Calendar className="w-4 h-4" />
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </div>
                    </div>

                    {edu.location && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        {edu.location}
                      </div>
                    )}

                    {edu.description && (
                      <p className="text-muted-foreground leading-relaxed">{edu.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
