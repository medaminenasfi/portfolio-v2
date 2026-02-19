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

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      testimonials,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.name || !body.company || !body.role || !body.content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newTestimonial = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
    };

    testimonials.push(newTestimonial);

    return NextResponse.json(
      { success: true, testimonial: newTestimonial },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}
