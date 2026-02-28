'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, ExternalLink, Github } from 'lucide-react';
import Navigation from '@/components/portfolio/Navigation';
import Footer from '@/components/portfolio/Footer';

const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3000';

function getImageUrl(path: string | undefined): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${API_BASE}${path}`;
}

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
  bannerImages?: string[];
  categoryPhotos?: string[];
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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
      const response = await fetch(`${apiUrl}/public/projects?limit=100`);
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  function getProjectImage(project: Project): string {
    const photos = project.categoryPhotos?.filter(Boolean) || [];
    const banners = project.bannerImages?.filter(Boolean) || [];
    const first = photos[0] || banners[0];
    return first ? getImageUrl(first) : '';
  }

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
              {filteredProjects.map((project) => {
                const imageUrl = getProjectImage(project);
                return (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <div className="group h-full bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-cyan-500/20 rounded-xl hover:border-cyan-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer overflow-hidden flex flex-col">
                    
                    {/* Project Image */}
                    <div className="relative h-48 bg-secondary/30 overflow-hidden flex-shrink-0">
                      {imageUrl ? (
                        <>
                          <img
                            src={imageUrl}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              (e.target as HTMLImageElement).parentElement!.classList.add('hidden');
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </>
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 flex items-center justify-center">
                          <span className="text-4xl font-bold text-cyan-500/20">{project.category}</span>
                        </div>
                      )}
                      {/* Badges overlay on image */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="px-2 py-1 bg-black/60 backdrop-blur text-cyan-300 rounded-full text-xs font-semibold border border-cyan-500/30">
                          {project.category}
                        </span>
                        {project.isFeatured && (
                          <span className="px-2 py-1 bg-black/60 backdrop-blur text-violet-300 rounded-full text-xs font-semibold border border-violet-500/30">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                        {project.title}
                      </h3>

                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
                        {project.shortSummary}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
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
                        <div className="flex items-center gap-3">
                          {project.liveDemoUrl && (
                            <span onClick={(e) => { e.preventDefault(); window.open(project.liveDemoUrl, '_blank'); }}
                              className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300">
                              <ExternalLink className="w-3 h-3" /> Demo
                            </span>
                          )}
                          {project.githubRepoUrl && (
                            <span onClick={(e) => { e.preventDefault(); window.open(project.githubRepoUrl, '_blank'); }}
                              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                              <Github className="w-3 h-3" /> Code
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground group-hover:text-cyan-400">
                          <span>Details</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
