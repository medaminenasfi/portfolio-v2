'use client';

import { useEffect, useState } from 'react';
import ProjectForm from '@/components/admin/ProjectForm';
import { useParams } from 'next/navigation';

export default function EditProjectPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${projectId}`);
        const data = await response.json();
        setProjectData(data.data);
      } catch (error) {
        console.error('Failed to fetch project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (loading) {
    return <div className="text-center py-12 text-muted-foreground">Loading project...</div>;
  }

  return <ProjectForm projectId={projectId} initialData={projectData} />;
}
