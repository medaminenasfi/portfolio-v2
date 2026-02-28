'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Github, ExternalLink, Calendar, Folder, Code2, Users, Clock, Star } from 'lucide-react';
import Navigation from '@/components/portfolio/Navigation';
import Footer from '@/components/portfolio/Footer';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3000';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

function getImageUrl(path: string | undefined): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${API_BASE_URL}${path}`;
}

interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  shortSummary: string;
  techStack: string[];
  tools?: string[];
  category: string;
  isFeatured: boolean;
  liveDemoUrl?: string;
  githubRepoUrl?: string;
  role?: string;
  problem?: string;
  solution?: string;
  highlights?: string[];
  results?: string;
  clientType?: string;
  progressStatus?: string;
  bannerImages?: string[];
  categoryPhotos?: string[];
  videoUrl?: string;
  videoThumbnail?: string;
  projectDuration?: string;
  clientName?: string;
  startDate?: string;
  endDate?: string;
  teamSize?: string;
  difficulty?: string;
  status?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const resolvedParams = await params;
        const response = await fetch(`${API_URL}/public/projects/${resolvedParams.id}`, {
          cache: 'no-store',
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setProject(data);
      } catch (err) {
        console.error('Failed to fetch project:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation activeSection="projects" />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-muted-foreground">Loading project details...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation activeSection="projects" />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">Sorry, we couldn't find the project you're looking for.</p>
          <Link href="/projects" className="text-accent hover:underline">
            ← Back to Projects
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  // Collect all images
  const allBanners = (project.bannerImages || []).filter(Boolean);
  const allPhotos = (project.categoryPhotos || []).filter(Boolean);
  const heroImage = allBanners[0] || allPhotos[0];

  return (
    <main className="min-h-screen bg-background">
      <Navigation activeSection="projects" />

      {/* Hero Banner */}
      <section className="relative pt-20 bg-gradient-to-b from-background to-card/20">
        {/* Hero Image */}
        {heroImage && (
          <div className="relative w-full h-64 md:h-96 overflow-hidden">
            <img
              src={getImageUrl(heroImage)}
              alt={project.title}
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </div>
        )}

        <div className="max-w-5xl mx-auto px-4 pb-12" style={{ marginTop: heroImage ? '-6rem' : '0', position: 'relative', zIndex: 10 }}>
          <Link href="/projects" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          {/* Title & Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-4 py-1.5 bg-accent/10 border border-accent text-accent rounded-full text-sm font-medium">
              {project.category}
            </span>
            {project.isFeatured && (
              <span className="px-4 py-1.5 bg-violet-500/10 border border-violet-500 text-violet-400 rounded-full text-sm font-medium flex items-center gap-1">
                <Star className="w-3 h-3" /> Featured
              </span>
            )}
            {project.status && (
              <span className={`px-4 py-1.5 rounded-full text-sm font-medium border ${
                project.status === 'published'
                  ? 'bg-green-500/10 border-green-500 text-green-400'
                  : project.status === 'draft'
                  ? 'bg-yellow-500/10 border-yellow-500 text-yellow-400'
                  : 'bg-gray-500/10 border-gray-500 text-gray-400'
              }`}>
                {project.status}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">{project.title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">{project.shortSummary}</p>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-accent/80 text-background rounded-lg font-semibold hover:shadow-lg hover:shadow-accent/30 transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4" />
                View Live Demo
              </a>
            )}
            {project.githubRepoUrl && (
              <a
                href={project.githubRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-accent text-accent rounded-lg font-semibold hover:bg-accent/10 transition-colors"
              >
                <Github className="w-4 h-4" />
                View Source Code
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* Quick Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.projectDuration && (
              <div className="bg-card/50 border border-border rounded-xl p-4 flex items-center gap-3">
                <Clock className="w-5 h-5 text-accent flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="text-sm font-semibold text-foreground">{project.projectDuration}</p>
                </div>
              </div>
            )}
            {project.teamSize && (
              <div className="bg-card/50 border border-border rounded-xl p-4 flex items-center gap-3">
                <Users className="w-5 h-5 text-accent flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Team Size</p>
                  <p className="text-sm font-semibold text-foreground">{project.teamSize}</p>
                </div>
              </div>
            )}
            {project.role && (
              <div className="bg-card/50 border border-border rounded-xl p-4 flex items-center gap-3">
                <Code2 className="w-5 h-5 text-accent flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">My Role</p>
                  <p className="text-sm font-semibold text-foreground">{project.role}</p>
                </div>
              </div>
            )}
            {project.difficulty && (
              <div className="bg-card/50 border border-border rounded-xl p-4 flex items-center gap-3">
                <Star className="w-5 h-5 text-accent flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Difficulty</p>
                  <p className="text-sm font-semibold text-foreground capitalize">{project.difficulty}</p>
                </div>
              </div>
            )}
          </div>

          {/* Project Overview */}
          <div className="bg-card/50 border border-border rounded-xl p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Project Overview</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{project.description}</p>
          </div>

          {/* Banner Images Gallery */}
          {allBanners.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">Project Images</h2>
              <div className={`grid gap-4 ${allBanners.length === 1 ? 'grid-cols-1' : allBanners.length === 2 ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                {allBanners.map((image, idx) => (
                  <div key={idx} className="relative group overflow-hidden rounded-xl border border-border">
                    <img
                      src={getImageUrl(image)}
                      alt={`${project.title} image ${idx + 1}`}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                      <span className="text-white text-xs">Image {idx + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Category Photos Gallery */}
          {allPhotos.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">Screenshots & Photos</h2>
              <div className={`grid gap-4 ${allPhotos.length === 1 ? 'grid-cols-1' : allPhotos.length === 2 ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                {allPhotos.map((photo, idx) => (
                  <div key={idx} className="relative group overflow-hidden rounded-xl border border-border">
                    <img
                      src={getImageUrl(photo)}
                      alt={`${project.title} screenshot ${idx + 1}`}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                      <span className="text-white text-xs">Screenshot {idx + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Images Placeholder */}
          {allBanners.length === 0 && allPhotos.length === 0 && (
            <div className="w-full h-60 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border border-border flex items-center justify-center">
              <div className="text-center">
                <Folder className="w-16 h-16 text-primary/30 mx-auto mb-3" />
                <p className="text-muted-foreground">No images uploaded yet</p>
              </div>
            </div>
          )}

          {/* Video Section */}
          {(project.videoUrl || project.videoThumbnail) && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">Video Demo</h2>
              <div className="bg-black rounded-xl overflow-hidden border border-border aspect-video flex items-center justify-center">
                {project.videoUrl ? (
                  <video
                    controls
                    poster={project.videoThumbnail ? getImageUrl(project.videoThumbnail) : undefined}
                    className="w-full h-full object-contain"
                  >
                    <source src={getImageUrl(project.videoUrl)} type="video/mp4" />
                    Your browser does not support video playback.
                  </video>
                ) : project.videoThumbnail ? (
                  <img
                    src={getImageUrl(project.videoThumbnail)}
                    alt="Video thumbnail"
                    className="w-full h-full object-contain"
                  />
                ) : null}
              </div>
            </div>
          )}

          {/* Technologies & Tools */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Code2 className="w-6 h-6 text-accent" />
              Technologies & Tools
            </h2>
            <div className="space-y-6">
              {(project.techStack || []).length > 0 && (
                <div>
                  <h3 className="text-base font-semibold text-muted-foreground uppercase tracking-wide mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {(project.techStack || []).map((tech: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/30 rounded-lg text-accent font-medium text-sm hover:border-accent/60 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {project.tools && project.tools.length > 0 && (
                <div>
                  <h3 className="text-base font-semibold text-muted-foreground uppercase tracking-wide mb-3">Tools & Software</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-secondary/20 border border-border rounded-lg text-foreground font-medium text-sm hover:border-accent/40 transition-colors"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Problem & Solution */}
          {(project.problem || project.solution) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.problem && (
                <div className="bg-card/50 border border-border rounded-xl p-6">
                  <h2 className="text-xl font-bold text-foreground mb-3 text-red-400">The Problem</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{project.problem}</p>
                </div>
              )}
              {project.solution && (
                <div className="bg-card/50 border border-border rounded-xl p-6">
                  <h2 className="text-xl font-bold text-foreground mb-3 text-green-400">The Solution</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{project.solution}</p>
                </div>
              )}
            </div>
          )}

          {/* Key Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="bg-card/50 border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Key Highlights</h2>
              <ul className="space-y-3">
                {(project.highlights || []).map((highlight: string, idx: number) => (
                  <li key={idx} className="flex gap-3 text-muted-foreground">
                    <span className="inline-block w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Results & Impact */}
          {project.results && (
            <div className="bg-gradient-to-br from-accent/5 to-card/50 border border-accent/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-foreground mb-3">Results & Impact</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{project.results}</p>
            </div>
          )}

          {/* Project Metadata */}
          {(project.clientName || project.clientType || project.progressStatus) && (
            <div className="bg-card/50 border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Project Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {project.clientName && (
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Client</p>
                    <p className="text-foreground font-medium">{project.clientName}</p>
                  </div>
                )}
                {project.clientType && (
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Project Type</p>
                    <p className="text-foreground font-medium capitalize">{project.clientType}</p>
                  </div>
                )}
                {project.progressStatus && (
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Progress</p>
                    <p className="text-foreground font-medium capitalize">{project.progressStatus.replace('_', ' ')}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Timeline */}
          {(project.startDate || project.endDate) && (
            <div className="bg-card/50 border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                Timeline
              </h3>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="text-center">
                  <p className="text-xs uppercase tracking-wide mb-1">Start</p>
                  <p className="text-foreground font-medium">
                    {project.startDate ? new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '—'}
                  </p>
                </div>
                <div className="flex-1 h-0.5 bg-gradient-to-r from-accent to-accent/30 rounded-full" />
                <div className="text-center">
                  <p className="text-xs uppercase tracking-wide mb-1">End</p>
                  <p className="text-foreground font-medium">
                    {project.endDate ? new Date(project.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Ongoing'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="pt-4 pb-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href="/projects" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to All Projects
            </Link>
            <div className="flex gap-3">
              {project.liveDemoUrl && (
                <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 bg-accent text-background rounded-lg text-sm font-semibold hover:bg-accent/90 transition-colors">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
              {project.githubRepoUrl && (
                <a href={project.githubRepoUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 border border-border text-foreground rounded-lg text-sm font-medium hover:border-accent hover:text-accent transition-colors">
                  <Github className="w-4 h-4" /> Source Code
                </a>
              )}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
