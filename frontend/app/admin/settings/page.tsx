'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

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
  }, []);

  const fetchSettings = async () => {
    try {
      // Fetch user settings from API
      // For now, initialize with empty values
    } catch (error) {
      console.error('Failed to fetch settings:', error);
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
