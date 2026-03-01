'use client';

import StatsDisplay from '@/components/portfolio/StatsDisplay';

export default function TestStatsPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-8">Stats Display Test</h1>
        <p className="text-muted-foreground mb-12">Testing the portfolio stats component</p>
        
        <StatsDisplay />
        
        <div className="mt-12 p-6 bg-secondary/20 rounded-lg border border-border">
          <h2 className="text-2xl font-semibold text-foreground mb-4">How it works:</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Shows 3 stats in a responsive grid layout</li>
            <li>• Fetches data from backend API when available</li>
            <li>• Falls back to localStorage when backend is down</li>
            <li>• Uses default values as final fallback</li>
            <li>• Hover animations and smooth transitions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}