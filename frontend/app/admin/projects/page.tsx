'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Search, Trash2, Edit2, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Project {
  id: string;
  title: string;
  short_description: string;
  technologies: string[];
  featured: boolean;
  created_at: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data.data || []);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.short_description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      setProjects(projects.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage your portfolio projects</p>
        </div>
        <Link href="/admin/projects/new">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      <Card className="p-4 bg-card border border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary/30 border-border"
          />
        </div>
      </Card>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading projects...</div>
      ) : filteredProjects.length === 0 ? (
        <Card className="p-12 text-center bg-card border border-border">
          <p className="text-muted-foreground mb-4">No projects found</p>
          <Link href="/admin/projects/new">
            <Button className="bg-accent text-accent-foreground">Create First Project</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="p-6 bg-card border border-border hover:border-accent/50 transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{project.short_description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.technologies?.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-accent/20 text-accent px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Created: {new Date(project.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {project.featured && (
                    <span className="text-xs bg-accent/30 text-accent px-2 py-1 rounded font-medium">
                      Featured
                    </span>
                  )}
                  <button className="p-2 text-muted-foreground hover:text-accent transition">
                    <Eye size={18} />
                  </button>
                  <Link href={`/admin/projects/${project.id}/edit`}>
                    <button className="p-2 text-muted-foreground hover:text-accent transition">
                      <Edit2 size={18} />
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteProject(project.id)}
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
