'use client';

import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { api } from '@/lib/api';

interface Language {
  id: string;
  name: string;
  proficiency: 'native' | 'fluent' | 'professional' | 'intermediate' | 'basic';
  orderIndex?: number;
}

const proficiencyLabels: Record<string, string> = {
  native: 'Native',
  fluent: 'Fluent',
  professional: 'Professional Working',
  intermediate: 'Intermediate',
  basic: 'Basic',
};

const proficiencyColors: Record<string, string> = {
  native: 'bg-green-500/20 text-green-400 border-green-500/30',
  fluent: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  professional: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  basic: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

export default function LanguagesSection() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      const data: any = await api.getLanguages();
      const langData = Array.isArray(data) ? data : data?.data || [];
      setLanguages(langData);
    } catch (error) {
      console.error('Failed to fetch languages:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="languages" className="py-24 px-4 bg-background scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Languages</h2>
            <p className="text-lg text-muted-foreground">
              Languages I speak and my proficiency levels
            </p>
          </div>
          <div className="flex justify-center py-12">
            <div className="text-muted-foreground">Loading languages...</div>
          </div>
        </div>
      </section>
    );
  }

  if (languages.length === 0) {
    return null; // Don't show section if no data
  }

  return (
    <section id="languages" className="py-24 px-4 bg-background scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Languages</h2>
          <p className="text-lg text-muted-foreground">
            Languages I speak and my proficiency levels
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {languages.map((language) => (
            <div
              key={language.id}
              className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground">{language.name}</h3>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${
                      proficiencyColors[language.proficiency] || 'bg-secondary text-foreground'
                    }`}
                  >
                    {proficiencyLabels[language.proficiency] || language.proficiency}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
