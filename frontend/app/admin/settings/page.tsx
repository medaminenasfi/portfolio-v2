'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { LogOut, Upload, FileText, Download, Trash2 } from 'lucide-react';
import { api } from '@/lib/api';

interface PortfolioSettings {
  name: string;
  title: string;
  email: string;
  phone: string;
  bio: string;
  location: string;
  github: string;
  linkedin: string;
  twitter: string;
}

export default function SettingsPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [resumeInfo, setResumeInfo] = useState<any>(null);
  const [settings, setSettings] = useState<PortfolioSettings>({
    name: '',
    title: '',
    email: '',
    phone: '',
    bio: '',
    location: '',
    github: '',
    linkedin: '',
    twitter: '',
  });

  useEffect(() => {
    fetchSettings();
    fetchResumeInfo();
  }, []);

  const fetchSettings = async () => {
    try {
      // Fetch user settings from API
      // For now, initialize with empty values
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    }
  };

  const fetchResumeInfo = async () => {
    try {
      const info = await api.getCurrentResumeInfo();
      setResumeInfo(info);
    } catch (error) {
      console.log('No resume uploaded yet');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    try {
      setUploading(true);
      const metadata = {
        title: file.name.replace('.pdf', ''),
        description: 'Professional Resume'
      };
      const result = await api.uploadResume(file, metadata);
      setResumeInfo(result);
      alert('Resume uploaded successfully!');
    } catch (error) {
      console.error('Failed to upload resume:', error);
      alert('Failed to upload resume');
    } finally {
      setUploading(false);
    }
  };

  const handleDownloadResume = () => {
    if (resumeInfo) {
      window.open('http://localhost:3000/api/resume/download', '_blank');
    }
  };

  const handleDeleteResume = async () => {
    if (!resumeInfo || !confirm('Are you sure you want to delete this resume?')) return;

    try {
      await api.deleteResume(resumeInfo.id);
      setResumeInfo(null);
      alert('Resume deleted successfully');
    } catch (error) {
      console.error('Failed to delete resume:', error);
      alert('Failed to delete resume');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      // Save settings to API
      alert('Settings saved successfully');
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your portfolio and account settings</p>
      </div>

      {/* Personal Information */}
      <Card className="p-6 bg-card border border-border space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Personal Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={settings.name}
              onChange={handleChange}
              className="mt-2 bg-secondary/30 border-border"
            />
          </div>

          <div>
            <Label htmlFor="title">Professional Title</Label>
            <Input
              id="title"
              name="title"
              value={settings.title}
              onChange={handleChange}
              placeholder="E.g., Full Stack Developer"
              className="mt-2 bg-secondary/30 border-border"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={settings.email}
              onChange={handleChange}
              className="mt-2 bg-secondary/30 border-border"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={settings.phone}
              onChange={handleChange}
              className="mt-2 bg-secondary/30 border-border"
            />
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={settings.location}
              onChange={handleChange}
              placeholder="E.g., San Francisco, CA"
              className="mt-2 bg-secondary/30 border-border"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            value={settings.bio}
            onChange={handleChange}
            placeholder="Tell visitors about yourself..."
            className="mt-2 bg-secondary/30 border-border min-h-24"
          />
        </div>
      </Card>

      {/* Social Links */}
      <Card className="p-6 bg-card border border-border space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Social Links</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="github">GitHub</Label>
            <Input
              id="github"
              name="github"
              value={settings.github}
              onChange={handleChange}
              placeholder="https://github.com/..."
              className="mt-2 bg-secondary/30 border-border"
            />
          </div>

          <div>
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              name="linkedin"
              value={settings.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/..."
              className="mt-2 bg-secondary/30 border-border"
            />
          </div>

          <div>
            <Label htmlFor="twitter">Twitter</Label>
            <Input
              id="twitter"
              name="twitter"
              value={settings.twitter}
              onChange={handleChange}
              placeholder="https://twitter.com/..."
              className="mt-2 bg-secondary/30 border-border"
            />
          </div>
        </div>
      </Card>

      {/* Resume Management */}
      <Card className="p-6 bg-card border border-border space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Resume/CV Management</h2>
        
        {resumeInfo ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg border border-border">
              <FileText className="w-8 h-8 text-accent" />
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{resumeInfo.title || 'Resume'}</h3>
                <p className="text-sm text-muted-foreground">
                  {resumeInfo.description || 'Professional Resume'} • 
                  Uploaded: {new Date(resumeInfo.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={handleDownloadResume}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download size={16} />
                Download
              </Button>
              <Button
                onClick={handleDeleteResume}
                variant="outline"
                className="flex items-center gap-2 text-destructive hover:text-destructive border-destructive/30 hover:border-destructive/50"
              >
                <Trash2 size={16} />
                Delete
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Upload your resume/CV to make it available for download on your portfolio.
            </p>
            
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-4">
                Upload a PDF file (Max 10MB)
              </p>
              
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
                id="resume-upload"
              />
              
              <Button
                onClick={() => document.getElementById('resume-upload')?.click()}
                disabled={uploading}
                className="flex items-center gap-2"
              >
                <Upload size={16} />
                {uploading ? 'Uploading...' : 'Choose PDF File'}
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Account */}
      <Card className="p-6 bg-card border border-border space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Account</h2>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </Card>

      {/* Save Button */}
      <Button
        onClick={handleSave}
        disabled={saving}
        className="bg-accent text-accent-foreground hover:bg-accent/90"
      >
        {saving ? 'Saving...' : 'Save Settings'}
      </Button>
    </div>
  );
}
