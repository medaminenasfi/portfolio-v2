'use client';

import ModernCard from '@/components/ui/ModernCard';

export default function ModernCardExample() {
  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Modern Card Examples</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example 1: Project with image and links */}
          <ModernCard
            title="E-Commerce Platform"
            description="A full-stack e-commerce solution built with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard."
            image="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop"
            tags={["React", "Node.js", "PostgreSQL", "Stripe"]}
            githubUrl="https://github.com"
            liveUrl="https://example.com"
            rating={4.8}
          />
          
          {/* Example 2: Project without image */}
          <ModernCard
            title="Task Management App"
            description="A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features."
            tags={["TypeScript", "Next.js", "Socket.io", "MongoDB"]}
            githubUrl="https://github.com"
            rating={4.5}
          />
          
          {/* Example 3: Minimal card */}
          <ModernCard
            title="Weather Dashboard"
            description="A responsive weather dashboard with location-based forecasts, interactive charts, and beautiful weather animations."
            tags={["Vue.js", "API Integration", "Charts.js"]}
            liveUrl="https://example.com"
          />
        </div>
      </div>
    </div>
  );
}
