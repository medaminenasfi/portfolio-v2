'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ProjectFormProps {
  projectId?: string;
  initialData?: {
    title: string;
    short_description: string;
    description: string;
    technologies: string[];
    category: string;
    featured: boolean;
    image_url: string;
    repository_url: string;
    live_url: string;
  };
}

const TECH_OPTIONS = [
  'React', 'Next.js', 'Vue.js', 'Angular',
  'Node.js', 'Express', 'Django', 'FastAPI',
  'PostgreSQL', 'MongoDB', 'Redis', 'Firebase',
  'TypeScript', 'JavaScript', 'Python', 'Go',
  'Docker', 'AWS', 'Vercel', 'Netlify'
];

const CATEGORIES = ['Frontend', 'Backend', 'Full Stack', 'Mobile', 'DevOps', 'AI/ML'];

export default function ProjectForm({ projectId, initialData }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(
    initialData || {
      title: '',
      short_description: '',
      description: '',
      technologies: [],
      category: 'Full Stack',
      featured: false,
      image_url: '',
      repository_url: '',
      live_url: '',
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTechToggle = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.includes(tech)
        ? prev.technologies.filter((t) => t !== tech)
        : [...prev.technologies, tech],
    }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, featured: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const method = projectId ? 'PUT' : 'POST';
      const url = projectId ? `/api/projects/${projectId}` : '/api/projects';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save project');

      router.push('/admin/projects');
    } catch (error) {
      console.error('Failed to save project:', error);
      alert('Failed to save project');
    } finally {
      setLoading(false);
    }
  };

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
          <Label htmlFor="short_description">Short Description *</Label>
          <Input
            id="short_description"
            name="short_description"
            value={formData.short_description}
            onChange={handleChange}
            placeholder="Brief 1-line description"
            className="mt-2 bg-secondary/30 border-border"
            required
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
          <Label htmlFor="image_url">Image URL</Label>
          <Input
            id="image_url"
            name="image_url"
            type="url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="https://..."
            className="mt-2 bg-secondary/30 border-border"
          />
        </div>

        <div>
          <Label htmlFor="repository_url">Repository URL</Label>
          <Input
            id="repository_url"
            name="repository_url"
            type="url"
            value={formData.repository_url}
            onChange={handleChange}
            placeholder="https://github.com/..."
            className="mt-2 bg-secondary/30 border-border"
          />
        </div>

        <div>
          <Label htmlFor="live_url">Live URL</Label>
          <Input
            id="live_url"
            name="live_url"
            type="url"
            value={formData.live_url}
            onChange={handleChange}
            placeholder="https://..."
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
                checked={formData.technologies.includes(tech)}
                onChange={() => handleTechToggle(tech)}
              />
              <span className="text-sm text-foreground">{tech}</span>
            </label>
          ))}
        </div>
      </Card>

      {/* Settings */}
      <Card className="p-6 bg-card border border-border space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Settings</h2>
        <label className="flex items-center gap-3 cursor-pointer">
          <Checkbox checked={formData.featured} onChange={handleCheckbox} />
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
