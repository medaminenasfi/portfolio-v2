'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { api } from '@/lib/api';

interface ProjectFormProps {
  projectId?: string;
  initialData?: {
    title: string;
    description: string;
    shortSummary?: string;
    techStack: string[];
    category: string;
    isFeatured?: boolean;
    liveDemoUrl?: string;
    githubRepoUrl?: string;
    role?: string;
    problem?: string;
    solution?: string;
    highlights?: string[];
    results?: string;
    difficulty?: string;
    clientType?: string;
    status?: string;
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
  };
}

const TECH_OPTIONS = [
  'React', 'Next.js', 'Vue.js', 'Angular',
  'Node.js', 'Express', 'Django', 'FastAPI',
  'PostgreSQL', 'MongoDB', 'Redis', 'Firebase',
  'TypeScript', 'JavaScript', 'Python', 'Go',
  'Docker', 'AWS', 'Vercel', 'Netlify'
];

const CATEGORIES = ['web', 'mobile', 'desktop', 'full_stack'];
const DIFFICULTY_LEVELS = ['simple', 'medium', 'hard'];
const CLIENT_TYPES = ['personal', 'freelance', 'company'];
const STATUSES = ['draft', 'published', 'archived'];
const PROGRESS_STATUSES = ['completed', 'in_progress'];

export default function ProjectForm({ projectId, initialData }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(!!projectId);
  const [formData, setFormData] = useState(
    initialData || {
      title: '',
      shortSummary: '',
      description: '',
      techStack: [],
      category: 'full_stack',
      isFeatured: false,
      liveDemoUrl: '',
      githubRepoUrl: '',
      role: '',
      problem: '',
      solution: '',
      highlights: [],
      results: '',
      difficulty: 'medium',
      clientType: 'personal',
      status: 'draft',
      progressStatus: 'completed',
      bannerImages: [],
      categoryPhotos: [],
      videoUrl: '',
      videoThumbnail: '',
      projectDuration: '',
      clientName: '',
      startDate: '',
      endDate: '',
      teamSize: '',
      tools: [],
      seoData: {
        metaTitle: '',
        metaDescription: '',
        keywords: [],
      },
    }
  );

  const [newTech, setNewTech] = useState('');
  const [newTool, setNewTool] = useState('');
  const [bannerFiles, setBannerFiles] = useState<File[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoThumbnailFile, setVideoThumbnailFile] = useState<File | null>(null);
  const [categoryPhotos, setCategoryPhotos] = useState<File[]>([]);

  useEffect(() => {
    if (projectId && !initialData) {
      loadProject();
    }
  }, [projectId, initialData]);

  const loadProject = async () => {
    if (!projectId) return;
    try {
      const project = await api.getProject(projectId) as any;
      setFormData({
        title: project.title || '',
        shortSummary: project.shortSummary || '',
        description: project.description || '',
        techStack: project.techStack || [],
        category: project.category || 'full_stack',
        isFeatured: project.isFeatured || false,
        liveDemoUrl: project.liveDemoUrl || '',
        githubRepoUrl: project.githubRepoUrl || '',
        role: project.role || '',
        problem: project.problem || '',
        solution: project.solution || '',
        highlights: project.highlights || [],
        results: project.results || '',
        difficulty: project.difficulty || 'medium',
        clientType: project.clientType || 'personal',
        status: project.status || 'draft',
        progressStatus: project.progressStatus || 'completed',
        bannerImages: project.bannerImages || [],
        categoryPhotos: project.categoryPhotos || [],
        videoUrl: project.videoUrl || '',
        videoThumbnail: project.videoThumbnail || '',
        projectDuration: project.projectDuration || '',
        clientName: project.clientName || '',
        startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '',
        endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '',
        teamSize: project.teamSize || '',
        tools: project.tools || [],
        seoData: {
          metaTitle: project.seoData?.metaTitle || '',
          metaDescription: project.seoData?.metaDescription || '',
          keywords: project.seoData?.keywords || [],
        },
      });
    } catch (error) {
      console.error('Failed to load project:', error);
      alert('Failed to load project');
      router.push('/admin/projects');
    } finally {
      setLoadingData(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTechToggle = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter((t: string) => t !== tech)
        : [...prev.techStack, tech],
    }));
  };

  const addCustomTech = () => {
    if (newTech.trim() && !formData.techStack.includes(newTech.trim())) {
      setFormData((prev) => ({
        ...prev,
        techStack: [...prev.techStack, newTech.trim()],
      }));
      setNewTech('');
    }
  };

  const handleToolsToggle = (tool: string) => {
    setFormData((prev) => ({
      ...prev,
      tools: prev.tools?.includes(tool)
        ? prev.tools.filter((t: string) => t !== tool)
        : [...(prev.tools || []), tool],
    }));
  };

  const addCustomTool = () => {
    if (newTool.trim() && !formData.tools?.includes(newTool.trim())) {
      setFormData((prev) => ({
        ...prev,
        tools: [...(prev.tools || []), newTool.trim()],
      }));
      setNewTool('');
    }
  };

  const handleHighlightsChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      highlights: (prev.highlights || []).map((h, i) => i === index ? value : h),
    }));
  };

  const addHighlight = () => {
    setFormData((prev) => ({
      ...prev,
      highlights: [...(prev.highlights || []), ''],
    }));
  };

  const removeHighlight = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      highlights: (prev.highlights || []).filter((_, i) => i !== index),
    }));
  };

  const handleKeywordsChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      seoData: {
        ...prev.seoData,
        keywords: (prev.seoData?.keywords || []).map((k, i) => i === index ? value : k),
      },
    }));
  };

  const addKeyword = () => {
    setFormData((prev) => ({
      ...prev,
      seoData: {
        ...prev.seoData,
        keywords: [...(prev.seoData?.keywords || []), ''],
      },
    }));
  };

  const removeKeyword = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      seoData: {
        ...prev.seoData,
        keywords: (prev.seoData?.keywords || []).filter((_, i) => i !== index),
      },
    }));
  };

  const handleCheckbox = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isFeatured: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Helper function to validate URLs
      const isValidUrl = (url: string): boolean => {
        try {
          new URL(url);
          return true;
        } catch {
          return false;
        }
      };

      // First, create the project
      const submitData = {
        ...formData,
        // Ensure description meets minimum length
        description: formData.description.trim() || 'A comprehensive project with modern features and functionality.',
        // Handle URL fields - only include if they're valid URLs, otherwise omit
        ...(formData.liveDemoUrl?.trim() && isValidUrl(formData.liveDemoUrl) ? { liveDemoUrl: formData.liveDemoUrl } : {}),
        ...(formData.githubRepoUrl?.trim() && isValidUrl(formData.githubRepoUrl) ? { githubRepoUrl: formData.githubRepoUrl } : {}),
        // Handle date fields - only include if they're valid dates, otherwise omit
        ...(formData.startDate ? { startDate: new Date(formData.startDate).toISOString() } : {}),
        ...(formData.endDate ? { endDate: new Date(formData.endDate).toISOString() } : {}),
        // Filter out empty highlights
        highlights: formData.highlights?.filter(h => h.trim()) || [],
        // Filter out empty keywords
        seoData: {
          ...formData.seoData,
          keywords: formData.seoData?.keywords?.filter(k => k.trim()) || [],
        },
        // Don't include file arrays in initial submission
        bannerImages: [],
        categoryPhotos: [],
        videoUrl: '',
        videoThumbnail: '',
      };

      let createdProject;
      if (projectId) {
        createdProject = await api.updateProject(projectId, submitData);
      } else {
        createdProject = await api.createProject(submitData);
      }

      const projectIdToUse = projectId || (createdProject as any).id;

      // Upload banner images
      if (bannerFiles.length > 0) {
        for (const file of bannerFiles) {
          await uploadFile(projectIdToUse, file, 'banner');
        }
      }

      // Upload category photos
      if (categoryPhotos.length > 0) {
        for (const file of categoryPhotos) {
          await uploadFile(projectIdToUse, file, 'category');
        }
      }

      // Upload video file
      if (videoFile) {
        await uploadFile(projectIdToUse, videoFile, 'video');
      }

      // Upload video thumbnail
      if (videoThumbnailFile) {
        await uploadFile(projectIdToUse, videoThumbnailFile, 'thumbnail');
      }

      router.push('/admin/projects');
    } catch (error) {
      console.error('Failed to save project:', error);
      alert('Failed to save project: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to upload files
  const uploadFile = async (projectId: string, file: File, type: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    try {
      const response = await fetch(`http://localhost:3000/api/public/projects/${projectId}/media`, {
        method: 'POST',
        body: formData,
        // Note: Don't set Content-Type header when using FormData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      console.log(`Uploaded ${type} file:`, result);
      return result;
    } catch (error) {
      console.error(`Failed to upload ${type} file:`, error);
      throw error;
    }
  };

  if (loadingData) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-muted-foreground">Loading project...</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/projects">
          <button type="button" className="p-2 hover:bg-secondary rounded-lg transition">
            <ArrowLeft size={20} className="text-foreground" />
          </button>
        </Link>
        <h1 className="text-3xl font-bold text-foreground">
          {projectId ? 'Edit Project' : 'New Project'}
        </h1>
      </div>

      {/* Basic Information */}
      <Card className="p-6 bg-card border border-border space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Basic Information</h2>

        <div>
          <Label htmlFor="title">Project Title *</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="E.g., E-commerce Platform"
            className="mt-2 bg-secondary/30 border-border"
            required
          />
        </div>

        <div>
          <Label htmlFor="shortSummary">Short Description</Label>
          <Input
            id="shortSummary"
            name="shortSummary"
            value={formData.shortSummary}
            onChange={handleChange}
            placeholder="Brief 1-line description"
            className="mt-2 bg-secondary/30 border-border"
          />
        </div>

        <div>
          <Label htmlFor="description">Full Description *</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Detailed project description..."
            className="mt-2 bg-secondary/30 border-border min-h-32"
            required
          />
        </div>

        <div>
          <Label htmlFor="category">Category *</Label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full mt-2 px-3 py-2 bg-secondary/30 border border-border rounded-md text-foreground"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Links */}
      <Card className="p-6 bg-card border border-border space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Links</h2>

        <div>
          <Label htmlFor="liveDemoUrl">Live Demo URL</Label>
          <Input
            id="liveDemoUrl"
            name="liveDemoUrl"
            type="url"
            value={formData.liveDemoUrl}
            onChange={handleChange}
            placeholder="https://..."
            className="mt-2 bg-secondary/30 border-border"
          />
        </div>

        <div>
          <Label htmlFor="githubRepoUrl">Repository URL</Label>
          <Input
            id="githubRepoUrl"
            name="githubRepoUrl"
            type="url"
            value={formData.githubRepoUrl}
            onChange={handleChange}
            placeholder="https://github.com/..."
            className="mt-2 bg-secondary/30 border-border"
          />
        </div>

      </Card>

      {/* Media & Content */}
      <Card className="p-6 bg-card border border-border space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Media & Content</h2>

        <div>
          <Label htmlFor="bannerImages">Banner Images</Label>
          <Input
            id="bannerImages"
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              setBannerFiles(files);
              // For now, just store file names as preview
              const fileNames = files.map(file => URL.createObjectURL(file));
              setFormData(prev => ({ ...prev, bannerImages: fileNames }));
            }}
            className="mt-2 bg-secondary/30 border-border"
          />
          {bannerFiles.length > 0 && (
            <div className="mt-2">
              <div className="text-sm text-foreground mb-2">
                {bannerFiles.length} file(s) selected: {bannerFiles.map(f => f.name).join(', ')}
              </div>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                {bannerFiles.map((file, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Banner preview ${idx + 1}`}
                      className="w-full h-20 object-cover rounded border border-border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newFiles = bannerFiles.filter((_, i) => i !== idx);
                        setBannerFiles(newFiles);
                        const fileNames = newFiles.map(f => URL.createObjectURL(f));
                        setFormData(prev => ({ ...prev, bannerImages: fileNames }));
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="categoryPhotos">Category/Showcase Photos</Label>
          <Input
            id="categoryPhotos"
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              setCategoryPhotos(files);
              // For now, just store file names as preview
              const fileNames = files.map(file => URL.createObjectURL(file));
              setFormData(prev => ({ ...prev, categoryPhotos: fileNames }));
            }}
            className="mt-2 bg-secondary/30 border-border"
          />
          {categoryPhotos.length > 0 && (
            <div className="mt-2">
              <div className="text-sm text-foreground mb-2">
                {categoryPhotos.length} photo(s) selected: {categoryPhotos.map(f => f.name).join(', ')}
              </div>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                {categoryPhotos.map((file, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Category photo preview ${idx + 1}`}
                      className="w-full h-20 object-cover rounded border border-border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newFiles = categoryPhotos.filter((_, i) => i !== idx);
                        setCategoryPhotos(newFiles);
                        const fileNames = newFiles.map(f => URL.createObjectURL(f));
                        setFormData(prev => ({ ...prev, categoryPhotos: fileNames }));
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="videoFile">Video File</Label>
          <Input
            id="videoFile"
            type="file"
            accept="video/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setVideoFile(file);
                setFormData(prev => ({ ...prev, videoUrl: file.name }));
              }
            }}
            className="mt-2 bg-secondary/30 border-border"
          />
          {videoFile && (
            <div className="mt-2 text-sm text-foreground">
              Video selected: {videoFile.name}
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="videoThumbnailFile">Video Thumbnail</Label>
          <Input
            id="videoThumbnailFile"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setVideoThumbnailFile(file);
                setFormData(prev => ({ ...prev, videoThumbnail: file.name }));
              }
            }}
            className="mt-2 bg-secondary/30 border-border"
          />
          {videoThumbnailFile && (
            <div className="mt-2 text-sm text-foreground">
              Thumbnail selected: {videoThumbnailFile.name}
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="projectDuration">Project Duration</Label>
          <Input
            id="projectDuration"
            name="projectDuration"
            value={formData.projectDuration}
            onChange={handleChange}
            placeholder="3 months"
            className="mt-2 bg-secondary/30 border-border"
          />
        </div>
      </Card>

      {/* Project Details */}
      <Card className="p-6 bg-card border border-border space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Project Details</h2>

        <div>
          <Label htmlFor="role">Your Role</Label>
          <Input
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Full-stack Developer, Team Lead"
            className="mt-2 bg-secondary/30 border-border"
          />
        </div>

        <div>
          <Label htmlFor="clientName">Client Name</Label>
          <Input
            id="clientName"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            placeholder="ABC Company"
            className="mt-2 bg-secondary/30 border-border"
          />
        </div>

        <div>
          <Label htmlFor="problem">Problem Statement</Label>
          <Textarea
            id="problem"
            name="problem"
            value={formData.problem}
            onChange={handleChange}
            placeholder="What problem did this project solve?"
            className="mt-2 bg-secondary/30 border-border min-h-24"
          />
        </div>

        <div>
          <Label htmlFor="solution">Solution</Label>
          <Textarea
            id="solution"
            name="solution"
            value={formData.solution}
            onChange={handleChange}
            placeholder="How did you solve the problem?"
            className="mt-2 bg-secondary/30 border-border min-h-24"
          />
        </div>

        <div>
          <Label htmlFor="results">Results & Impact</Label>
          <Textarea
            id="results"
            name="results"
            value={formData.results}
            onChange={handleChange}
            placeholder="What were the results and impact?"
            className="mt-2 bg-secondary/30 border-border min-h-24"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              className="mt-2 bg-secondary/30 border-border"
            />
          </div>

          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              className="mt-2 bg-secondary/30 border-border"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="teamSize">Team Size</Label>
          <Input
            id="teamSize"
            name="teamSize"
            value={formData.teamSize}
            onChange={handleChange}
            placeholder="5 people"
            className="mt-2 bg-secondary/30 border-border"
          />
        </div>
      </Card>

      {/* Technologies */}
      <Card className="p-6 bg-card border border-border space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Technologies</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {TECH_OPTIONS.map((tech) => (
            <label key={tech} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={formData.techStack.includes(tech)}
                onCheckedChange={() => handleTechToggle(tech)}
              />
              <span className="text-sm text-foreground">{tech}</span>
            </label>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            placeholder="Add custom technology"
            className="bg-secondary/30 border-border"
            onKeyPress={(e) => e.key === 'Enter' && addCustomTech()}
          />
          <Button type="button" onClick={addCustomTech}>
            Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {formData.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-primary/20 text-primary rounded-md text-sm flex items-center gap-1"
            >
              {tech}
              <button
                type="button"
                onClick={() => handleTechToggle(tech)}
                className="text-primary hover:text-primary/80"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </Card>

      {/* Tools */}
      <Card className="p-6 bg-card border border-border space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Tools & Software</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {['VS Code', 'Figma', 'Postman', 'Docker', 'Git', 'Webpack', 'Vite', 'Jest', 'ESLint', 'Prettier', 'Slack', 'Jira'].map((tool) => (
            <label key={tool} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={formData.tools?.includes(tool) || false}
                onCheckedChange={() => handleToolsToggle(tool)}
              />
              <span className="text-sm text-foreground">{tool}</span>
            </label>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            value={newTool}
            onChange={(e) => setNewTool(e.target.value)}
            placeholder="Add custom tool"
            className="bg-secondary/30 border-border"
            onKeyPress={(e) => e.key === 'Enter' && addCustomTool()}
          />
          <Button type="button" onClick={addCustomTool}>
            Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {formData.tools?.map((tool) => (
            <span
              key={tool}
              className="px-2 py-1 bg-secondary/20 text-secondary-foreground rounded-md text-sm flex items-center gap-1"
            >
              {tool}
              <button
                type="button"
                onClick={() => handleToolsToggle(tool)}
                className="text-secondary-foreground hover:text-secondary-foreground/80"
              >
                ×
              </button>
            </span>
          )) || []}
        </div>
      </Card>

      {/* Highlights */}
      <Card className="p-6 bg-card border border-border space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Key Highlights</h2>
        {formData.highlights?.map((highlight, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={highlight}
              onChange={(e) => handleHighlightsChange(index, e.target.value)}
              placeholder="Key achievement or feature"
              className="bg-secondary/30 border-border"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeHighlight(index)}
            >
              Remove
            </Button>
          </div>
        )) || []}
        <Button type="button" variant="outline" onClick={addHighlight}>
          Add Highlight
        </Button>
      </Card>

      {/* SEO */}
      <Card className="p-6 bg-card border border-border space-y-4">
        <h2 className="text-xl font-semibold text-foreground">SEO Settings</h2>
        
        <div>
          <Label htmlFor="metaTitle">Meta Title</Label>
          <Input
            id="metaTitle"
            name="metaTitle"
            value={formData.seoData?.metaTitle || ''}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              seoData: { ...prev.seoData, metaTitle: e.target.value }
            }))}
            placeholder="SEO title for search engines"
            className="mt-2 bg-secondary/30 border-border"
          />
        </div>

        <div>
          <Label htmlFor="metaDescription">Meta Description</Label>
          <Textarea
            id="metaDescription"
            name="metaDescription"
            value={formData.seoData?.metaDescription || ''}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              seoData: { ...prev.seoData, metaDescription: e.target.value }
            }))}
            placeholder="SEO description for search engines"
            className="mt-2 bg-secondary/30 border-border min-h-20"
          />
        </div>

        <div>
          <Label>Keywords</Label>
          {formData.seoData?.keywords?.map((keyword, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={keyword}
                onChange={(e) => handleKeywordsChange(index, e.target.value)}
                placeholder="SEO keyword"
                className="bg-secondary/30 border-border"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeKeyword(index)}
              >
                Remove
              </Button>
            </div>
          )) || []}
          <Button type="button" variant="outline" onClick={addKeyword}>
            Add Keyword
          </Button>
        </div>
      </Card>

      {/* Settings */}
      <Card className="p-6 bg-card border border-border space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Settings</h2>
        <label className="flex items-center gap-3 cursor-pointer">
          <Checkbox 
            checked={formData.isFeatured} 
            onCheckedChange={handleCheckbox}
          />
          <span className="text-foreground">Featured Project</span>
        </label>
      </Card>

      {/* Submit */}
      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={loading}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          {loading ? 'Saving...' : projectId ? 'Update Project' : 'Create Project'}
        </Button>
        <Link href="/admin/projects">
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </Link>
      </div>
    </form>
  );
}
