import { NextRequest, NextResponse } from 'next/server';

// Mock project data with detailed information
const mockProjects: Record<string, any> = {
  '1': {
    id: '1',
    title: 'Full Stack Developer @ Laghazala du Désert',
    short_description: 'Eco-friendly hiking platform with interactive maps and reservations',
    description: `This was a comprehensive full-stack project where I developed a complete web platform for managing eco-friendly hiking tours in Tunisia. The platform features an interactive map interface using Leaflet, real-time weather integration, booking and reservation system, and a sophisticated guide/artisan marketplace.

Key achievements included architecting a scalable MongoDB database schema, implementing JWT-based authentication, and optimizing API performance. The platform serves as a showcase for modern web development practices and handles complex business logic for tour management.`,
    category: 'Full Stack',
    featured: true,
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Leaflet', 'SSL'],
    image_url: '/projects/laghazala.jpg',
    repository_url: 'https://github.com',
    live_url: 'https://example.com',
    start_date: '02/2025',
    end_date: '06/2025',
    features: [
      'Interactive map system with Leaflet for tour route visualization',
      'Real-time weather filtering and updates for hiking safety',
      'Complete booking and reservation management system',
      'Guide and artisan marketplace with ratings',
      'User authentication and role-based access control',
      'Admin dashboard for tour and reservation management'
    ],
    challenges: [
      'Integrating weather APIs with geolocation data for accurate forecasting',
      'Building a scalable database schema for handling complex relationships between tours, guides, and users',
      'Optimizing map rendering performance with thousands of data points',
      'Implementing secure payment processing for bookings'
    ],
    outcomes: [
      'Successfully deployed platform with 1000+ registered users',
      '95% uptime and sub-300ms average response time',
      'Increased tour bookings by 150% in the first quarter',
      'Recognition as a top travel tech solution in Tunisia'
    ]
  },
  '2': {
    id: '2',
    title: 'Web Developer @ Tunisian Chemical Group',
    short_description: 'Modern e-commerce platform with XML integration',
    description: `Developed a modern e-commerce platform for a major chemical products distributor. The project included building a user-friendly interface for product browsing, implementing an XML generator for automated data exports, and creating a comprehensive admin dashboard.

The platform handles complex inventory management and integrates with their existing ERP system through XML-based data exchange. Collaborated closely with the design team to ensure optimal UX/UI while maintaining technical excellence.`,
    category: 'E-Commerce',
    featured: true,
    technologies: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'XML', 'Stripe'],
    image_url: '/projects/tcg.jpg',
    repository_url: 'https://github.com',
    live_url: 'https://example.com',
    start_date: '07/2024',
    end_date: '08/2024',
    features: [
      'Dynamic product catalog with filtering and search',
      'XML generator for automated Excel file creation',
      'Shopping cart with persistent storage',
      'User-friendly web interface for data entry and conversion',
      'Admin dashboard for inventory management',
      'Integration with ERP system via XML exchange'
    ],
    challenges: [
      'Implementing complex XML parsing and generation from Excel files',
      'Handling large file uploads without impacting performance',
      'Ensuring data consistency between web platform and ERP system',
      'Creating intuitive UI for non-technical users'
    ],
    outcomes: [
      'Reduced manual data entry time by 80%',
      '50+ business users actively using the platform',
      'Seamless integration with existing enterprise systems',
      'Won praise from management for improved efficiency'
    ]
  }
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const projectId = params.id;

  const project = mockProjects[projectId];

  if (!project) {
    return NextResponse.json(
      { error: 'Project not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: project
  });
}
