'use client';

import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { api } from '@/lib/api';

export default function Hero() {
  const [resumeInfo, setResumeInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumeInfo = async () => {
      try {
        const info = await api.getCurrentResumeInfo();
        setResumeInfo(info);
      } catch (error) {
        // This should not happen now since we handle it in the API client
        console.log('Error fetching resume info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeInfo();
  }, []);

  const handleDownloadCV = () => {
    if (resumeInfo) {
      window.open('http://localhost:3000/api/resume/download', '_blank');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-8 inline-block">
          <span className="text-sm font-mono text-accent tracking-widest">WELCOME TO MY PORTFOLIO</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground text-balance">
          Full Stack Developer
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance leading-relaxed">
          I build modern web platforms combining React, Node.js, and cloud technologies. 
          Currently focused on creating scalable eco-tourism solutions and enterprise web applications.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-accent text-accent rounded-lg font-semibold hover:bg-accent hover:bg-opacity-10 transition-colors"
          >
            Get In Touch
          </a>
        </div>

        {/* Tech stack preview */}
        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">TECHNOLOGIES I WORK WITH</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'React',
              'Node.js',
              'TypeScript',
              'MongoDB',
              'PostgreSQL',
              'Express',
              'Next.js',
              'AWS',
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-secondary text-accent rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
