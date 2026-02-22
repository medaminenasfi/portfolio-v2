'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Download, Check } from 'lucide-react';

interface ResumeData {
  summary: string;
  skills: string[];
  education: Array<{
    degree: string;
    field: string;
    school: string;
    year: number;
  }>;
  certifications: string[];
  resume_url: string;
}

export default function ResumePage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData>({
    summary: '',
    skills: [],
    education: [],
    certifications: [],
    resume_url: '',
  });

  useEffect(() => {
    fetchResumeData();
  }, []);

  const fetchResumeData = async () => {
    try {
      setLoading(true);
      // This would fetch from your API
      // For now, we'll initialize with empty data
    } catch (error) {
      console.error('Failed to fetch resume data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeData((prev) => ({ ...prev, summary: e.target.value }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const skills = e.target.value.split('\n').filter((skill) => skill.trim());
    setResumeData((prev) => ({ ...prev, skills }));
  };

  const handleUploadResume = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setSaving(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', file.name.replace('.pdf', ''));
      formData.append('description', 'Professional Resume');

      // Get auth token
      const token = localStorage.getItem('admin_token');
      const headers: Record<string, string> = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch('http://localhost:3000/api/resume/upload', {
        method: 'POST',
        body: formData,
        headers,
        mode: 'cors',
        credentials: 'omit',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || errorData.error || 'Upload failed';
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      setResumeData((prev) => ({ ...prev, resume_url: data.filePath }));
      alert('Resume uploaded successfully!');
    } catch (error) {
      console.error('Failed to upload resume:', error);
      alert(`Failed to upload resume: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveResume = async () => {
    try {
      setSaving(true);
      const response = await fetch('/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resumeData),
      });

      if (!response.ok) throw new Error('Save failed');
      alert('Resume updated successfully');
    } catch (error) {
      console.error('Failed to save resume:', error);
      alert('Failed to save resume');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Resume & CV</h1>
        <p className="text-muted-foreground mt-1">Manage your professional resume and CV</p>
      </div>

      {/* Professional Summary */}
      <Card className="p-6 bg-card border border-border space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Professional Summary</h2>
        <Textarea
          value={resumeData.summary}
          onChange={handleSummaryChange}
          placeholder="Write a compelling professional summary about yourself..."
          className="min-h-32 bg-secondary/30 border-border"
        />
      </Card>

      {/* Skills */}
      <Card className="p-6 bg-card border border-border space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Skills</h2>
        <Textarea
          value={resumeData.skills.join('\n')}
          onChange={handleSkillsChange}
          placeholder="Add skills (one per line):
React
Node.js
TypeScript
PostgreSQL"
          className="min-h-32 bg-secondary/30 border-border font-mono text-sm"
        />
      </Card>

      {/* Resume File */}
      <Card className="p-6 bg-card border border-border space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Resume File</h2>
        
        {resumeData.resume_url && (
          <div className="flex items-center justify-between p-4 bg-accent/10 rounded-lg border border-accent/30">
            <div className="flex items-center gap-3">
              <Check size={20} className="text-accent" />
              <div>
                <p className="text-foreground font-medium">Resume uploaded</p>
                <p className="text-xs text-muted-foreground">Ready to download and share</p>
              </div>
            </div>
            <a
              href={resumeData.resume_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-accent hover:text-accent/80 transition"
            >
              <Download size={18} />
              Download
            </a>
          </div>
        )}

        <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-border rounded-lg hover:border-accent/50 cursor-pointer transition">
          <Upload size={32} className="text-muted-foreground mb-2" />
          <span className="text-foreground font-medium">Drop your resume here or click to upload</span>
          <span className="text-xs text-muted-foreground mt-1">PDF, DOC, or DOCX (Max 5MB)</span>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleUploadResume}
            className="hidden"
          />
        </label>
      </Card>

      {/* Save Button */}
      <Button
        onClick={handleSaveResume}
        disabled={saving}
        className="bg-accent text-accent-foreground hover:bg-accent/90 w-full"
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </Button>
    </div>
  );
}
