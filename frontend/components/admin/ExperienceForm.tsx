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
import { api } from '@/lib/api';

interface ExperiencePayload {
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

interface ExperienceFormProps {
  experienceId?: string;
  initialData?: ExperiencePayload;
}

export default function ExperienceForm({ experienceId, initialData }: ExperienceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const normalizedInitial = initialData
    ? {
        ...initialData,
        startDate: initialData.startDate?.split('T')[0] || initialData.startDate || '',
        endDate: initialData.endDate ? initialData.endDate.split('T')[0] : '',
      }
    : undefined;
  const [currentlyWorking, setCurrentlyWorking] = useState(!normalizedInitial?.endDate);
  const [formData, setFormData] = useState<ExperiencePayload>(
    normalizedInitial || {
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCurrentlyWorking = (checked: boolean) => {
    setCurrentlyWorking(checked);
    setFormData((prev) => ({
      ...prev,
      endDate: checked ? null : prev.endDate,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload: ExperiencePayload = {
        ...formData,
        endDate: currentlyWorking ? null : formData.endDate,
      };

      if (experienceId) {
        await api.updateWorkExperience(experienceId, payload);
      } else {
        await api.createWorkExperience(payload);
      }

      router.push('/admin/experience');
    } catch (error) {
      console.error('Failed to save experience:', error);
      alert('Failed to save experience');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/experience">
          <button type="button" className="p-2 hover:bg-secondary rounded-lg transition">
            <ArrowLeft size={20} className="text-foreground" />
          </button>
        </Link>
        <h1 className="text-3xl font-bold text-foreground">
          {experienceId ? 'Edit Experience' : 'Add Experience'}
        </h1>
      </div>

      <Card className="p-6 bg-card border border-border space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Job Details</h2>

        <div>
          <Label htmlFor="position">Job Title *</Label>
          <Input
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="E.g., Senior Full Stack Developer"
            className="mt-2 bg-secondary/30 border-border"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="company">Company *</Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="E.g., Tech Company Inc"
              className="mt-2 bg-secondary/30 border-border"
              required
            />
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location || ''}
              onChange={handleChange}
              placeholder="E.g., San Francisco, CA"
              className="mt-2 bg-secondary/30 border-border"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate">Start Date *</Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              className="mt-2 bg-secondary/30 border-border"
              required
            />
          </div>

          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              value={formData.endDate || ''}
              onChange={handleChange}
              disabled={currentlyWorking}
              className="mt-2 bg-secondary/30 border-border disabled:opacity-50"
            />
          </div>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <Checkbox checked={currentlyWorking} onCheckedChange={(value) => handleCurrentlyWorking(Boolean(value))} />
          <span className="text-foreground">Currently working here</span>
        </label>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your responsibilities and achievements..."
            className="mt-2 bg-secondary/30 border-border min-h-32"
          />
        </div>
      </Card>

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={loading}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          {loading ? 'Saving...' : experienceId ? 'Update' : 'Add'}
        </Button>
        <Link href="/admin/experience">
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </Link>
      </div>
    </form>
  );
}
