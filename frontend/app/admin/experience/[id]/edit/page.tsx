'use client';

import { useEffect, useState } from 'react';
import ExperienceForm from '@/components/admin/ExperienceForm';
import { useParams } from 'next/navigation';

export default function EditExperiencePage() {
  const params = useParams();
  const experienceId = params.id as string;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetch(`/api/experience/${experienceId}`);
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error('Failed to fetch experience:', error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [experienceId]);

  if (loading) {
    return <div className="text-center py-12 text-muted-foreground">Loading...</div>;
  }

  return <ExperienceForm experienceId={experienceId} initialData={data} />;
}
