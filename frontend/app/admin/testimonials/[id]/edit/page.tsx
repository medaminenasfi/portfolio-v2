import TestimonialForm from '@/components/admin/TestimonialForm';

interface EditTestimonialPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditTestimonialPage({ params }: EditTestimonialPageProps) {
  const { id } = await params;
  
  return (
    <div>
      <TestimonialForm id={id} />
    </div>
  );
}
