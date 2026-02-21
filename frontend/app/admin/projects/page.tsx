'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Search, Trash2, Edit2, Eye, Copy, Star, StarOff, Archive, ArchiveRestore, X, Calendar, Users, Clock, ExternalLink, Github } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api';

interface Project {
  id: string;
  title: string;
  short_description: string;
  description?: string;
  technologies: string[];
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  published_at?: string;
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
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
  tools?: string[];
  seoData?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.getProjects();
      setProjects((response as any).projects || []);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.deleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  const duplicateProject = async (id: string) => {
    try {
      await api.duplicateProject(id);
      fetchProjects(); // Refresh the list
    } catch (error) {
      console.error('Failed to duplicate project:', error);
    }
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    try {
      await api.bulkFeatureProjects([id], !featured);
      fetchProjects(); // Refresh the list
    } catch (error) {
      console.error('Failed to toggle featured:', error);
    }
  };

  const togglePublish = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'published' ? 'draft' : 'published';
      await api.bulkPublishProjects([id], newStatus === 'published');
      fetchProjects(); // Refresh the list
    } catch (error) {
      console.error('Failed to toggle publish:', error);
    }
  };

  const openProjectDetails = async (project: Project) => {
    try {
      // Fetch full project details
      const fullProject = await api.getProject(project.id) as Project;
      setSelectedProject(fullProject);
      setShowModal(true);
    } catch (error) {
      console.error('Failed to fetch project details:', error);
      // Use the project from the list as fallback
      setSelectedProject(project);
      setShowModal(true);
    }
  };

  const handleSelectProject = (id: string) => {
    setSelectedProjects(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedProjects.length === filteredProjects.length) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(filteredProjects.map(p => p.id));
    }
  };

  const bulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedProjects.length} projects?`)) return;
    try {
      await api.bulkDeleteProjects(selectedProjects);
      setSelectedProjects([]);
      fetchProjects();
    } catch (error) {
      console.error('Failed to bulk delete projects:', error);
    }
  };

  const bulkPublish = async (publish: boolean) => {
    try {
      await api.bulkPublishProjects(selectedProjects, publish);
      setSelectedProjects([]);
      fetchProjects();
    } catch (error) {
      console.error('Failed to bulk publish projects:', error);
    }
  };

  const bulkFeature = async (featured: boolean) => {
    try {
      await api.bulkFeatureProjects(selectedProjects, featured);
      setSelectedProjects([]);
      fetchProjects();
    } catch (error) {
      console.error('Failed to bulk feature projects:', error);
    }
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500/20 text-green-400';
      case 'draft': return 'bg-yellow-500/20 text-yellow-400';
      case 'archived': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400';
      case 'advanced': return 'bg-red-500/20 text-red-400';
      default: return '';
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

      {selectedProjects.length > 0 && (
        <Card className="p-4 bg-card border border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {selectedProjects.length} projects selected
            </span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => bulkPublish(true)}>
                Publish
              </Button>
              <Button size="sm" variant="outline" onClick={() => bulkPublish(false)}>
                Unpublish
              </Button>
              <Button size="sm" variant="outline" onClick={() => bulkFeature(true)}>
                Feature
              </Button>
              <Button size="sm" variant="outline" onClick={() => bulkFeature(false)}>
                Unfeature
              </Button>
              <Button size="sm" variant="destructive" onClick={bulkDelete}>
                Delete
              </Button>
            </div>
          </div>
        </Card>
      )}

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
          <div className="flex items-center gap-2 px-2">
            <input
              type="checkbox"
              checked={selectedProjects.length === filteredProjects.length}
              onChange={handleSelectAll}
              className="rounded"
            />
            <span className="text-sm text-muted-foreground">Select All</span>
          </div>
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="p-6 bg-card border border-border hover:border-accent/50 transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <input
                    type="checkbox"
                    checked={selectedProjects.includes(project.id)}
                    onChange={() => handleSelectProject(project.id)}
                    className="rounded mt-1"
                  />
                  <div 
                    className="flex-1 cursor-pointer"
                    onClick={() => openProjectDetails(project)}
                  >
                    <h3 className="text-lg font-semibold text-foreground hover:text-accent transition">{project.title}</h3>
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
                    <div className="flex items-center gap-2 mt-3">
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                      {project.category && (
                        <span className="text-xs bg-secondary/30 text-secondary-foreground px-2 py-1 rounded">
                          {project.category}
                        </span>
                      )}
                      {project.difficulty && (
                        <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(project.difficulty)}`}>
                          {project.difficulty}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Created: {new Date(project.created_at).toLocaleDateString()}
                      {project.published_at && (
                        <span className="ml-4">
                          Published: {new Date(project.published_at).toLocaleDateString()}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {project.featured && (
                    <span className="text-xs bg-accent/30 text-accent px-2 py-1 rounded font-medium">
                      Featured
                    </span>
                  )}
                  <button 
                    onClick={() => duplicateProject(project.id)}
                    className="p-2 text-muted-foreground hover:text-accent transition"
                    title="Duplicate"
                  >
                    <Copy size={18} />
                  </button>
                  <button 
                    onClick={() => toggleFeatured(project.id, project.featured)}
                    className="p-2 text-muted-foreground hover:text-accent transition"
                    title={project.featured ? 'Remove from featured' : 'Add to featured'}
                  >
                    {project.featured ? <StarOff size={18} /> : <Star size={18} />}
                  </button>
                  <button 
                    onClick={() => togglePublish(project.id, project.status)}
                    className="p-2 text-muted-foreground hover:text-accent transition"
                    title={project.status === 'published' ? 'Unpublish' : 'Publish'}
                  >
                    {project.status === 'published' ? <ArchiveRestore size={18} /> : <Archive size={18} />}
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

      {/* Project Details Modal */}
      {showModal && selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">{selectedProject.title}</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-secondary rounded-lg transition"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Overview</h3>
                  <p className="text-muted-foreground">{selectedProject.description || selectedProject.short_description}</p>
                </div>

                {/* Category Photos */}
                {selectedProject.categoryPhotos && selectedProject.categoryPhotos.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Category Photos</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedProject.categoryPhotos.map((photo, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={photo}
                            alt={`Category photo ${idx + 1}`}
                            className="w-full h-32 object-cover rounded-lg border border-border"
                            onError={(e) => {
                              // Fallback for broken images
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs">Photo {idx + 1}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies */}
                {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tools */}
                {selectedProject.tools && selectedProject.tools.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Tools & Software</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tools.map((tool, idx) => (
                        <span key={idx} className="px-3 py-1 bg-secondary/20 text-secondary-foreground rounded-full text-sm">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Project Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    {selectedProject.role && (
                      <div>
                        <h4 className="font-medium text-foreground">Role</h4>
                        <p className="text-muted-foreground">{selectedProject.role}</p>
                      </div>
                    )}
                    {selectedProject.clientName && (
                      <div>
                        <h4 className="font-medium text-foreground">Client</h4>
                        <p className="text-muted-foreground">{selectedProject.clientName}</p>
                      </div>
                    )}
                    {selectedProject.projectDuration && (
                      <div>
                        <h4 className="font-medium text-foreground">Duration</h4>
                        <p className="text-muted-foreground">{selectedProject.projectDuration}</p>
                      </div>
                    )}
                    {selectedProject.teamSize && (
                      <div>
                        <h4 className="font-medium text-foreground">Team Size</h4>
                        <p className="text-muted-foreground">{selectedProject.teamSize}</p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    {selectedProject.startDate && (
                      <div>
                        <h4 className="font-medium text-foreground">Start Date</h4>
                        <p className="text-muted-foreground">{new Date(selectedProject.startDate).toLocaleDateString()}</p>
                      </div>
                    )}
                    {selectedProject.endDate && (
                      <div>
                        <h4 className="font-medium text-foreground">End Date</h4>
                        <p className="text-muted-foreground">{new Date(selectedProject.endDate).toLocaleDateString()}</p>
                      </div>
                    )}
                    {selectedProject.category && (
                      <div>
                        <h4 className="font-medium text-foreground">Category</h4>
                        <p className="text-muted-foreground">{selectedProject.category}</p>
                      </div>
                    )}
                    {selectedProject.difficulty && (
                      <div>
                        <h4 className="font-medium text-foreground">Difficulty</h4>
                        <p className="text-muted-foreground">{selectedProject.difficulty}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Problem & Solution */}
                {selectedProject.problem && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Problem</h3>
                    <p className="text-muted-foreground">{selectedProject.problem}</p>
                  </div>
                )}
                {selectedProject.solution && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Solution</h3>
                    <p className="text-muted-foreground">{selectedProject.solution}</p>
                  </div>
                )}

                {/* Highlights */}
                {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Key Highlights</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedProject.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-muted-foreground">{highlight}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Results */}
                {selectedProject.results && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Results</h3>
                    <p className="text-muted-foreground">{selectedProject.results}</p>
                  </div>
                )}

                {/* Links */}
                <div className="flex flex-wrap gap-4">
                  {selectedProject.liveDemoUrl && (
                    <a
                      href={selectedProject.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                  {selectedProject.githubRepoUrl && (
                    <a
                      href={selectedProject.githubRepoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition"
                    >
                      <Github size={16} />
                      Repository
                    </a>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-border">
                  <Link href={`/admin/projects/${selectedProject.id}/edit`}>
                    <Button className="bg-accent text-accent-foreground">
                      <Edit2 size={16} className="mr-2" />
                      Edit Project
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
