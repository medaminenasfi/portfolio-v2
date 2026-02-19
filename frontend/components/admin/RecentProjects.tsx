'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, Eye, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  featured: boolean;
}

export default function RecentProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects?limit=5');
      const data = await response.json();
      setProjects(data.data || []);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-cyan-500/20 p-8 md:p-12 backdrop-blur-sm">
        <div className="text-muted-foreground text-center py-12 animate-pulse">Loading recent projects...</div>
      </Card>
    );
  }

  if (projects.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-cyan-500/20 p-8 md:p-12 backdrop-blur-sm">
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-6 text-base">No projects yet</p>
          <Link href="/admin/projects/new">
            <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-slate-900 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300">Create First Project</Button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-cyan-500/20 p-6 md:p-8 backdrop-blur-sm overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/5 pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Recent Projects</h2>
          <p className="text-muted-foreground text-sm mt-1">Your latest portfolio additions</p>
        </div>
        <Link href="/admin/projects">
          <Button variant="outline" className="border-cyan-500/30 hover:bg-cyan-500/10 hover:border-cyan-500/60 transition-all duration-300 gap-2">
            View All
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div className="relative z-10 space-y-3 md:space-y-4">
        {projects.map((project, idx) => (
          <div
            key={project.id}
            className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 md:p-5 bg-gradient-to-r from-slate-800/40 to-slate-900/40 rounded-xl border border-cyan-500/20 hover:border-cyan-500/60 hover:from-slate-800/60 hover:to-slate-900/60 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 mt-2"></div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-sm md:text-base truncate">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies?.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded-full border border-cyan-500/30">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {project.featured && (
                <span className="text-xs bg-gradient-to-r from-violet-500/30 to-violet-600/30 text-violet-300 px-3 py-1 rounded-full border border-violet-500/40 flex items-center gap-1 flex-shrink-0">
                  <Star className="w-3 h-3" />
                  Featured
                </span>
              )}
              <div className="flex items-center gap-1 ml-auto sm:ml-0">
                <button className="p-2 text-muted-foreground hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors duration-200">
                  <Eye size={18} />
                </button>
                <Link href={`/admin/projects/${project.id}/edit`}>
                  <button className="p-2 text-muted-foreground hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors duration-200">
                    <Edit2 size={18} />
                  </button>
                </Link>
                <button className="p-2 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors duration-200">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
