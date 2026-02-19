import { NextRequest, NextResponse } from 'next/server';

// Mock data - replace with database calls
let testimonials: Array<{
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
  createdAt: string;
}> = [
  {
    id: '1',
    name: 'Sarah Ahmed',
    company: 'Tech Innovations Ltd',
    role: 'Project Manager',
    content: 'Outstanding work on our eco-tourism platform. The developer implemented interactive maps seamlessly and delivered ahead of schedule.',
    rating: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Hassan Ben',
    company: 'Chemical Industries',
    role: 'CEO',
    content: 'Excellent e-commerce solution. The XML generator tool simplified our data management process significantly.',
    rating: 5,
    createdAt: new Date().toISOString(),
  },
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const testimonial = testimonials.find(t => t.id === params.id);
    
    if (!testimonial) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      testimonial,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch testimonial' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const index = testimonials.findIndex(t => t.id === params.id);

    if (index === -1) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    testimonials[index] = {
      ...testimonials[index],
      ...body,
    };

    return NextResponse.json({
      success: true,
      testimonial: testimonials[index],
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update testimonial' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    testimonials = testimonials.filter(t => t.id !== params.id);

    return NextResponse.json({
      success: true,
      message: 'Testimonial deleted',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete testimonial' },
      { status: 500 }
    );
  }
}
