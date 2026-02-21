'use client';

import { useEffect, useState } from 'react';
import ProjectForm from '@/components/admin/ProjectForm';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';

export default function EditProjectPage() {
  const params = useParams();
  const projectId = params.id as string;

  return <ProjectForm projectId={projectId} />;
}
