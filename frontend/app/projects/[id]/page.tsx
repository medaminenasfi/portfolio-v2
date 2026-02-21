import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, Github, ExternalLink, Calendar, Folder, Code2 } from 'lucide-react';
import Navigation from '@/components/portfolio/Navigation';
import Footer from '@/components/portfolio/Footer';

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
  created_at: string;
  updated_at: string;
}

async function ProjectDetailContent({ projectId }: { projectId: string }) {
  let project: ProjectDetail | null = null;
  let error = false;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/public/projects/${projectId}`, {
      cache: 'no-store',
    });
    const data = await response.json();
    // Show all projects (remove status filter)
    project = data;
  } catch (err) {
    console.error('Failed to fetch project:', err);
    error = true;
  }

  if (error || !project) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation activeSection="projects" />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">Sorry, we couldn't find the project you're looking for.</p>
          <Link href="/" className="text-accent hover:underline">
            Back to Home
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation activeSection="projects" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 px-4 bg-gradient-to-b from-background to-card/20">
        <div className="max-w-5xl mx-auto">
          <Link href="/projects" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="px-4 py-2 bg-accent/10 border border-accent text-accent rounded-lg text-sm font-medium">
                {project.category}
              </span>
              {project.isFeatured && (
                <span className="px-4 py-2 bg-violet-500/10 border border-violet-500 text-violet-400 rounded-lg text-sm font-medium">
                  Featured
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{project.title}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">{project.shortSummary}</p>
          </div>

          {/* Project Images Gallery */}
          <div className="mb-8">
            {/* Banner Images */}
            {project.bannerImages && project.bannerImages.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Banner Images</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.bannerImages.map((image, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={image.startsWith('http') ? image : `http://localhost:3000${image}`}
                        alt={`${project.title} banner ${idx + 1}`}
                        className="w-full h-48 object-cover rounded-lg border border-border"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">Banner {idx + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category Photos */}
            {project.categoryPhotos && project.categoryPhotos.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Category Photos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.categoryPhotos.map((photo, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={photo.startsWith('http') ? photo : `http://localhost:3000${photo}`}
                        alt={`${project.title} category photo ${idx + 1}`}
                        className="w-full h-48 object-cover rounded-lg border border-border"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">Photo {idx + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Images Placeholder */}
            {(!project.bannerImages || project.bannerImages.length === 0) && 
             (!project.categoryPhotos || project.categoryPhotos.length === 0) && (
              <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl border border-border flex items-center justify-center">
                <div className="text-center">
                  <Folder className="w-20 h-20 text-primary/30 mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">{project.title}</p>
                  <p className="text-muted-foreground text-sm mt-2">No images available</p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="flex flex-col sm:flex-row gap-4">
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-accent/80 text-background rounded-lg font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all duration-300"
              >
                <ExternalLink className="w-5 h-5" />
                View Live Project
              </a>
            )}
            {project.githubRepoUrl && (
              <a
                href={project.githubRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-accent text-accent rounded-lg font-semibold hover:bg-accent/10 transition-colors"
              >
                <Github className="w-5 h-5" />
                View Code
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Complete Project Details */}
          <div className="space-y-8">
            {/* Project Overview */}
            <div className="bg-card/50 border border-border rounded-xl p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Project Overview</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{project.description}</p>
              </div>
            </div>

            {/* Project Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.role && (
                <div className="bg-card/50 border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Role</h3>
                  <p className="text-muted-foreground">{project.role}</p>
                </div>
              )}
              {project.clientName && (
                <div className="bg-card/50 border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Client</h3>
                  <p className="text-muted-foreground">{project.clientName}</p>
                </div>
              )}
              {project.projectDuration && (
                <div className="bg-card/50 border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Duration</h3>
                  <p className="text-muted-foreground">{project.projectDuration}</p>
                </div>
              )}
              {project.teamSize && (
                <div className="bg-card/50 border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Team Size</h3>
                  <p className="text-muted-foreground">{project.teamSize}</p>
                </div>
              )}
              {project.difficulty && (
                <div className="bg-card/50 border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Difficulty</h3>
                  <p className="text-muted-foreground capitalize">{project.difficulty}</p>
                </div>
              )}
              {project.clientType && (
                <div className="bg-card/50 border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Project Type</h3>
                  <p className="text-muted-foreground capitalize">{project.clientType}</p>
                </div>
              )}
              {project.status && (
                <div className="bg-card/50 border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Status</h3>
                  <p className="text-muted-foreground capitalize">{project.status}</p>
                </div>
              )}
              {project.progressStatus && (
                <div className="bg-card/50 border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Progress</h3>
                  <p className="text-muted-foreground capitalize">{project.progressStatus}</p>
                </div>
              )}
            </div>

            {/* Technologies & Tools */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Code2 className="w-6 h-6 text-accent" />
                Technologies & Tools
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Tech Stack</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {(project.techStack || []).map((tech: string, idx: number) => (
                      <div
                        key={idx}
                        className="px-4 py-3 bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/30 rounded-lg text-accent font-medium hover:border-accent/60 transition-colors"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
                {project.tools && project.tools.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Tools & Software</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {project.tools.map((tool: string, idx: number) => (
                        <div
                          key={idx}
                          className="px-4 py-3 bg-gradient-to-r from-secondary/10 to-secondary/5 border border-secondary/30 rounded-lg text-secondary-foreground font-medium hover:border-secondary/60 transition-colors"
                        >
                          {tool}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Problem & Solution */}
            {project.problem && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Problem Statement</h2>
                <div className="bg-card/50 border border-border rounded-xl p-6">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{project.problem}</p>
                  </div>
                </div>
              </div>
            )}

            {project.solution && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Solution</h2>
                <div className="bg-card/50 border border-border rounded-xl p-6">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{project.solution}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Key Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Key Highlights</h2>
                <div className="bg-card/50 border border-border rounded-xl p-6">
                  <ul className="space-y-3">
                    {(project.highlights || []).map((highlight: string, idx: number) => (
                      <li key={idx} className="flex gap-3 text-muted-foreground">
                        <span className="inline-block w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Results & Impact */}
            {project.results && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Results & Impact</h2>
                <div className="bg-card/50 border border-border rounded-xl p-6">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{project.results}</p>
                  </div>
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
                  <span>{project.startDate ? new Date(project.startDate).toLocaleDateString() : 'Start date'}</span>
                  <div className="flex-1 h-1 bg-gradient-to-r from-accent to-accent/30 rounded-full"></div>
                  <span>{project.endDate ? new Date(project.endDate).toLocaleDateString() : 'End date'}</span>
                </div>
              </div>
            )}
          </div>

      <Footer />
    </main>
  );
}

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-background">
        <Navigation activeSection="projects" />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-muted-foreground">Loading project details...</div>
        </div>
      </main>
    }>
      <ProjectDetailContentWrapper params={params} />
    </Suspense>
  );
}

async function ProjectDetailContentWrapper({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <ProjectDetailContent projectId={resolvedParams.id} />;
}
