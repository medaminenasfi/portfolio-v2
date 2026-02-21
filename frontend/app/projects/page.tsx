'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import Navigation from '@/components/portfolio/Navigation';
import Footer from '@/components/portfolio/Footer';

interface Project {
  id: string;
  title: string;
  shortSummary: string;
  description: string;
  techStack: string[];
  category: string;
  isFeatured: boolean;
  liveDemoUrl?: string;
  githubRepoUrl?: string;
  status?: string;
  created_at: string;
}

export default function AllProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/public/projects');
      const data = await response.json();
      console.log('Projects page - Raw data:', data); // Debug log
      console.log('Projects page - Projects:', data.projects); // Debug log
      console.log('Projects page - Count:', data.projects?.length); // Debug log
      console.log('Project 0:', data.projects?.[0]); // Debug log
      
      // Show all projects on public site (remove published filter)
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...new Set(projects.map(p => p.category))];
  
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.shortSummary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-background">
      <Navigation activeSection="projects" />

      {/* Hero */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-card/20">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">All Projects</h1>
          <p className="text-lg text-muted-foreground">
            Explore my complete portfolio of work across various technologies and industries
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 sticky top-20 bg-background/80 backdrop-blur-md border-b border-border z-30">
        <div className="max-w-5xl mx-auto">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-secondary text-foreground hover:border-accent border border-border'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading projects...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No projects found matching your criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <div className="group h-full p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-cyan-500/20 rounded-xl hover:border-cyan-500/60 hover:from-slate-900/70 hover:to-slate-800/70 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-semibold border border-cyan-500/30">
                        {project.category}
                      </span>
                      {project.isFeatured && (
                        <span className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-xs font-semibold border border-violet-500/30">
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {project.shortSummary}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {(project.techStack || []).slice(0, 3).map((tech: string, idx: number) => (
                        <span key={idx} className="text-xs bg-cyan-500/10 text-cyan-300 px-2 py-1 rounded border border-cyan-500/30">
                          {tech}
                        </span>
                      ))}
                      {(project.techStack || []).length > 3 && (
                        <span className="text-xs bg-cyan-500/10 text-cyan-300 px-2 py-1 rounded border border-cyan-500/30">
                          +{(project.techStack || []).length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-cyan-500/20">
                      <span className="text-sm text-muted-foreground">View details</span>
                      <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
