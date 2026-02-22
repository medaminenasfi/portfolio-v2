'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Upload, X, Star, ImageOff } from 'lucide-react';
import { api } from '@/lib/api';

interface Skill {
  id: string;
  name: string;
  photo?: string;
  category: 'frontend' | 'backend' | 'tools' | 'soft_skills';
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  keywords?: string[];
  description?: string;
  orderIndex: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function SkillsPage() {
  const fileBaseUrl = process.env.NEXT_PUBLIC_API_FILES_URL || 'http://localhost:3000';
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    category: 'frontend' as 'frontend' | 'backend' | 'tools' | 'soft_skills',
    proficiency: 'intermediate' as 'beginner' | 'intermediate' | 'advanced' | 'expert',
    keywords: '',
    description: '',
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await api.getSkills() as any;
      const skillsArray = Array.isArray(response)
        ? response
        : response?.skills || response?.data || [];
      setSkills(skillsArray);
    } catch (error) {
      console.error('Failed to fetch skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPhotoUrl = (value?: string) => {
    if (!value) return '';
    return value.startsWith('http') ? value : `${fileBaseUrl}${value}`;
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploadingPhoto(true);
      const result = await api.uploadSkillPhoto(file);
      setFormData((prev) => ({ ...prev, photo: result.url }));
    } catch (error) {
      console.error('Failed to upload photo:', error);
      alert(error instanceof Error ? error.message : 'Failed to upload photo');
    } finally {
      setUploadingPhoto(false);
      event.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const skillData = {
        ...formData,
        keywords: formData.keywords.split(',').map(k => k.trim()).filter(k => k),
      };

      if (editingSkill) {
        await api.updateSkill(editingSkill.id, skillData);
      } else {
        await api.createSkill(skillData);
      }

      setShowForm(false);
      setEditingSkill(null);
      setFormData({
        name: '',
        photo: '',
        category: 'frontend' as 'frontend' | 'backend' | 'tools' | 'soft_skills',
        proficiency: 'intermediate' as 'beginner' | 'intermediate' | 'advanced' | 'expert',
        keywords: '',
        description: '',
      });
      fetchSkills();
    } catch (error) {
      console.error('Failed to save skill:', error);
      alert('Failed to save skill');
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      photo: skill.photo || '',
      category: skill.category,
      proficiency: skill.proficiency,
      keywords: skill.keywords?.join(', ') || '',
      description: skill.description || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    
    try {
      await api.deleteSkill(id);
      fetchSkills();
    } catch (error) {
      console.error('Failed to delete skill:', error);
      alert('Failed to delete skill');
    }
  };

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      case 'expert': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'frontend': return 'bg-cyan-100 text-cyan-800';
      case 'backend': return 'bg-emerald-100 text-emerald-800';
      case 'tools': return 'bg-indigo-100 text-indigo-800';
      case 'soft_skills': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (proficiency: string) => {
    const levels = {
      beginner: 1,
      intermediate: 2,
      advanced: 3,
      expert: 4,
    };
    const level = levels[proficiency as keyof typeof levels] || 1;
    
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= level ? 'text-yellow-400 fill-current' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Skills Management</h1>
          <p className="text-muted-foreground">Manage your technical skills and expertise</p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-accent hover:bg-accent/90 text-background"
        >
          <Plus size={20} className="mr-2" />
          Add Skill
        </Button>
      </div>

      {(!loading && skills.length === 0) && (
        <Card className="p-8 bg-card border-dashed border-border flex flex-col items-center justify-center text-center text-muted-foreground">
          <ImageOff className="w-10 h-10 mb-3" />
          <p>No skills yet. Click "Add Skill" to create your first one and upload an icon.</p>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <Card key={skill.id} className="p-6 bg-card border-border">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {skill.photo && (
                    <img
                      src={getPhotoUrl(skill.photo)}
                      alt={skill.name}
                      className="w-8 h-8 rounded object-cover"
                    />
                  )}
                  <h3 className="font-semibold text-foreground">{skill.name}</h3>
                </div>
                <div className="flex gap-1">
                  <Badge className={getCategoryColor(skill.category)}>
                    {skill.category}
                  </Badge>
                  <Badge className={getProficiencyColor(skill.proficiency)}>
                    {skill.proficiency}
                  </Badge>
                </div>
              </div>
              {renderStars(skill.proficiency)}
            </div>

            {skill.description && (
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                {skill.description}
              </p>
            )}

            {skill.keywords && skill.keywords.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {skill.keywords.map((keyword, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(skill)}
              >
                <Edit size={14} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(skill.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 size={14} />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add/Edit Skill Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl bg-background border-border">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-semibold text-foreground">
                {editingSkill ? 'Edit Skill' : 'Add New Skill'}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowForm(false);
                  setEditingSkill(null);
                  setFormData({
                    name: '',
                    photo: '',
                    category: 'frontend' as 'frontend' | 'backend' | 'tools' | 'soft_skills',
                    proficiency: 'intermediate' as 'beginner' | 'intermediate' | 'advanced' | 'expert',
                    keywords: '',
                    description: '',
                  });
                }}
              >
                <X size={20} />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Skill Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., React, Node.js, TypeScript"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="photo">Skill Icon</Label>
                  <div className="flex flex-col gap-2">
                    <Input
                      id="photo"
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handlePhotoUpload}
                      disabled={uploadingPhoto}
                    />
                    {uploadingPhoto && (
                      <p className="text-xs text-muted-foreground">Uploading...</p>
                    )}
                    {formData.photo && (
                      <div className="flex items-center gap-3">
                        <img
                          src={getPhotoUrl(formData.photo)}
                          alt="Skill icon preview"
                          className="w-10 h-10 rounded object-cover border"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setFormData((prev) => ({ ...prev, photo: '' }))}
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP up to 2 MB.</p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as 'frontend' | 'backend' | 'tools' | 'soft_skills' })}
                    className="w-full p-2 border border-border rounded-md bg-background"
                  >
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="tools">Tools</option>
                    <option value="soft_skills">Soft Skills</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="proficiency">Proficiency</Label>
                  <select
                    id="proficiency"
                    value={formData.proficiency}
                    onChange={(e) => setFormData({ ...formData, proficiency: e.target.value as 'beginner' | 'intermediate' | 'advanced' | 'expert' })}
                    className="w-full p-2 border border-border rounded-md bg-background"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                <Input
                  id="keywords"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  placeholder="javascript, react, typescript"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your experience with this skill..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingSkill(null);
                    setFormData({
                      name: '',
                      photo: '',
                      category: 'frontend',
                      proficiency: 'intermediate',
                      keywords: '',
                      description: '',
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-accent hover:bg-accent/90 text-background">
                  {editingSkill ? 'Update' : 'Create'} Skill
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
