import TestimonialForm from '@/components/admin/TestimonialForm';

interface EditTestimonialPageProps {
  params: {
    id: string;
  };
}

export default function EditTestimonialPage({ params }: EditTestimonialPageProps) {
  return (
    <div>
      <TestimonialForm id={params.id} />
    </div>
  );
}
