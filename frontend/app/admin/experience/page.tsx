'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Edit2 } from 'lucide-react';

interface Experience {
  id: string;
  job_title: string;
  company: string;
  location: string;
  start_date: string;
  end_date: string | null;
  description: string;
}

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await fetch('/api/experience');
      const data = await response.json();
      setExperiences(data.data || []);
    } catch (error) {
      console.error('Failed to fetch experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteExperience = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await fetch(`/api/experience/${id}`, { method: 'DELETE' });
      setExperiences(experiences.filter((e) => e.id !== id));
    } catch (error) {
      console.error('Failed to delete experience:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Experience</h1>
          <p className="text-muted-foreground mt-1">Manage your work experience and CV</p>
        </div>
        <Link href="/admin/experience/new">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Plus className="mr-2 h-4 w-4" />
            Add Experience
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : experiences.length === 0 ? (
        <Card className="p-12 text-center bg-card border border-border">
          <p className="text-muted-foreground mb-4">No experience entries yet</p>
          <Link href="/admin/experience/new">
            <Button className="bg-accent text-accent-foreground">Add First Entry</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-3">
          {experiences.map((exp) => (
            <Card key={exp.id} className="p-6 bg-card border border-border hover:border-accent/50 transition">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">{exp.job_title}</h3>
                  <p className="text-accent text-sm font-medium">{exp.company}</p>
                  <p className="text-muted-foreground text-sm">
                    {exp.location} • {new Date(exp.start_date).toLocaleDateString()}{' '}
                    {exp.end_date ? `- ${new Date(exp.end_date).toLocaleDateString()}` : '- Present'}
                  </p>
                  <p className="text-muted-foreground text-sm mt-2">{exp.description}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Link href={`/admin/experience/${exp.id}/edit`}>
                    <button className="p-2 text-muted-foreground hover:text-accent transition">
                      <Edit2 size={18} />
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteExperience(exp.id)}
                    className="p-2 text-muted-foreground hover:text-red-400 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
