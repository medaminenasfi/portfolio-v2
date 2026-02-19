import { NextRequest, NextResponse } from 'next/server';

// Mock data
const MOCK_EXPERIENCE = [
  {
    id: '1',
    company_name: 'Laghazala du Désert',
    position: 'Full Stack Developer (PFE Internship)',
    employment_type: 'Internship',
    location: 'Gabes, Tunisia',
    description: 'Developed a web platform for managing eco-friendly hiking tours in Tunisia with interactive maps and weather filtering.',
    start_date: '2025-02-01',
    end_date: '2025-06-01',
  },
  {
    id: '2',
    company_name: 'Tunisian Chemical Group',
    position: 'Web Developer',
    employment_type: 'Freelance',
    location: 'Tunisia',
    description: 'Developed a modern e-commerce platform and XML generator from Excel files with UI/UX improvements.',
    start_date: '2024-07-01',
    end_date: '2024-08-01',
  },
];

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      data: MOCK_EXPERIENCE,
      total: MOCK_EXPERIENCE.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch experience' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.company_name || !body.position || !body.start_date) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newExperience = {
      id: Date.now().toString(),
      ...body,
      created_at: new Date().toISOString(),
    };

    return NextResponse.json(
      { success: true, data: newExperience },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create experience' },
      { status: 500 }
    );
  }
}
