import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, Github, ExternalLink, Calendar, Folder, Code2 } from 'lucide-react';
import Navigation from '@/components/portfolio/Navigation';
import Footer from '@/components/portfolio/Footer';

interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  short_description: string;
  technologies: string[];
  category: string;
  featured: boolean;
  image_url: string;
  repository_url: string;
  live_url: string;
  start_date?: string;
  end_date?: string;
  features?: string[];
  challenges?: string[];
  outcomes?: string[];
}

async function ProjectDetailContent({ projectId }: { projectId: string }) {
  let project: ProjectDetail | null = null;
  let error = false;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/projects/${projectId}`, {
      cache: 'no-store',
    });
    const data = await response.json();
    project = data.data || null;
  } catch (err) {
    console.error('Failed to fetch project:', err);
    error = true;
  }

  if (error || !project) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation activeSection="projects" setActiveSection={() => {}} />
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
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 px-4 bg-gradient-to-b from-background to-card/20">
        <div className="max-w-5xl mx-auto">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="px-4 py-2 bg-accent/10 border border-accent text-accent rounded-lg text-sm font-medium">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-4 py-2 bg-violet-500/10 border border-violet-500 text-violet-400 rounded-lg text-sm font-medium">
                  Featured
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{project.title}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">{project.short_description}</p>
          </div>

          {/* Project image placeholder */}
          <div className="relative h-96 md:h-[500px] bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl overflow-hidden border border-border flex items-center justify-center mb-8">
            <div className="text-center">
              <Folder className="w-20 h-20 text-primary/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">{project.title} Preview</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col sm:flex-row gap-4">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-accent/80 text-background rounded-lg font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all duration-300"
              >
                <ExternalLink className="w-5 h-5" />
                View Live Project
              </a>
            )}
            {project.repository_url && (
              <a
                href={project.repository_url}
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

      {/* Content Section */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Technologies */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Code2 className="w-6 h-6 text-accent" />
              Technologies & Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {project.technologies.map((tech, idx) => (
                <div
                  key={idx}
                  className="px-4 py-3 bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/30 rounded-lg text-accent font-medium hover:border-accent/60 transition-colors"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">About This Project</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{project.description}</p>
            </div>
          </div>

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Key Features</h2>
              <ul className="space-y-3">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-3 text-muted-foreground">
                    <span className="inline-block w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenges */}
          {project.challenges && project.challenges.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Challenges & Solutions</h2>
              <ul className="space-y-3">
                {project.challenges.map((challenge, idx) => (
                  <li key={idx} className="flex gap-3 text-muted-foreground">
                    <span className="inline-block w-2 h-2 bg-violet-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Outcomes */}
          {project.outcomes && project.outcomes.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Results & Outcomes</h2>
              <ul className="space-y-3">
                {project.outcomes.map((outcome, idx) => (
                  <li key={idx} className="flex gap-3 text-muted-foreground">
                    <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Timeline */}
          {(project.start_date || project.end_date) && (
            <div className="bg-card/50 border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                Timeline
              </h3>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span>{project.start_date || 'Start date'}</span>
                <div className="flex-1 h-1 bg-gradient-to-r from-accent to-accent/30 rounded-full"></div>
                <span>{project.end_date || 'End date'}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-background">
        <Navigation activeSection="projects" setActiveSection={() => {}} />
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
