import { NextRequest, NextResponse } from 'next/server';

// Mock data - Replace with database queries
const MOCK_PROJECTS = [
  {
    id: '1',
    title: 'Full Stack Developer (PFE Internship) @ Laghazala du Désert',
    short_description: 'Developed a web platform for managing eco-friendly hiking tours in Tunisia',
    description: 'Built a complete eco-tourism platform with interactive maps, real-time weather integration, and booking system.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'SSL', 'Postman'],
    category: 'Full Stack',
    featured: true,
    image_url: '/projects/laghazala.jpg',
    repository_url: 'https://github.com',
    live_url: 'https://example.com',
    start_date: '2025-02-01',
    end_date: '2025-06-01',
  },
  {
    id: '2',
    title: 'Web Developer @ Tunisian Chemical Group',
    short_description: 'Developed a modern e-commerce platform using React.js',
    description: 'Created an XML generator from Excel files, web forms, and SQL queries with a user-friendly interface.',
    technologies: ['React.js', 'XML', 'SQL', 'JavaScript'],
    category: 'Frontend',
    featured: true,
    image_url: '/projects/tcg.jpg',
    repository_url: 'https://github.com',
    live_url: 'https://example.com',
    start_date: '2024-07-01',
    end_date: '2024-08-01',
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');

    let projects = MOCK_PROJECTS;

    if (featured === 'true') {
      projects = projects.filter((p) => p.featured);
    }

    return NextResponse.json({
      success: true,
      data: projects,
      total: projects.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation
    if (!body.title || !body.description || !body.technologies) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // This would normally save to database
    const newProject = {
      id: Date.now().toString(),
      ...body,
      created_at: new Date().toISOString(),
    };

    return NextResponse.json(
      { success: true, data: newProject },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
