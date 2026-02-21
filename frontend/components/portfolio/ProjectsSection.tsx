'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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
  bannerImages?: string[];
  categoryPhotos?: string[];
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/public/projects');
      const data = await response.json();
      console.log('ProjectsSection - Raw data:', data); // Debug log
      console.log('ProjectsSection - Projects:', data.projects); // Debug log
      console.log('ProjectsSection - Count:', data.projects?.length); // Debug log
      console.log('Sample project:', data.projects?.[0]); // Debug log
      
      // Check if projects have bannerImages or categoryPhotos
      if (data.projects && data.projects.length > 0) {
        const sampleProject = data.projects[0];
        console.log('Sample project fields:', Object.keys(sampleProject));
        console.log('Has bannerImages:', !!sampleProject.bannerImages, 'Length:', sampleProject.bannerImages?.length || 0);
        console.log('Has categoryPhotos:', !!sampleProject.categoryPhotos, 'Length:', sampleProject.categoryPhotos?.length || 0);
      }
      
      // Sort projects to show ones with images first
      const sortedProjects = (data.projects || []).sort((a: any, b: any) => {
        const aHasImages = (a.bannerImages && a.bannerImages.length > 0) || (a.categoryPhotos && a.categoryPhotos.length > 0);
        const bHasImages = (b.bannerImages && b.bannerImages.length > 0) || (b.categoryPhotos && b.categoryPhotos.length > 0);
        if (aHasImages && !bHasImages) return -1;
        if (!aHasImages && bHasImages) return 1;
        return 0;
      });
      
      console.log('Projects data:', data.projects); // Debug log
      console.log('Sorted projects:', sortedProjects); // Debug log
      console.log('Project 0:', sortedProjects[0]); // Debug log
      
      setProjects(sortedProjects);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-card/20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">All Projects</h2>
          <p className="text-lg text-muted-foreground">
            Showcase of all work across full-stack development, web platforms, and enterprise solutions
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="text-muted-foreground">Loading projects...</div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <div className="group relative rounded-xl overflow-hidden bg-card border border-border hover:border-accent transition-all duration-300 cursor-pointer h-full">
                  {/* Project image */}
                  <div className="relative h-64 bg-secondary overflow-hidden">
                    {(project.bannerImages && project.bannerImages.length > 0) || (project.categoryPhotos && project.categoryPhotos.length > 0) ? (
                      <>
                        {project.categoryPhotos && project.categoryPhotos.length > 0 ? (
                          <img
                            src={project.categoryPhotos[0].startsWith('http') ? project.categoryPhotos[0] : `http://localhost:3000${project.categoryPhotos[0]}`}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <img
                            src={project.bannerImages![0].startsWith('http') ? project.bannerImages![0] : `http://localhost:3000${project.bannerImages![0]}`}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-primary/30 mb-2">{project.category}</div>
                          <p className="text-muted-foreground">{project.title}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Project content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {project.shortSummary}
                    </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(project.techStack || []).slice(0, 4).map((tech: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-secondary text-accent rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {(project.techStack || []).length > 4 && (
                      <span className="px-3 py-1 bg-secondary text-accent rounded-full text-xs font-medium">
                        +{(project.techStack || []).length - 4}
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/30">
                    <span className="text-sm text-muted-foreground">Learn more about this project</span>
                    <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <a
            href="/projects"
            className="inline-block px-8 py-3 border border-accent text-accent rounded-lg font-semibold hover:bg-accent hover:bg-opacity-10 transition-colors"
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
}
