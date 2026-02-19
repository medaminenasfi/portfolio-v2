'use client';

import { useState } from 'react';
import Hero from '@/components/portfolio/Hero';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import ExperienceSection from '@/components/portfolio/ExperienceSection';
import SkillsSection from '@/components/portfolio/SkillsSection';
import Navigation from '@/components/portfolio/Navigation';
import Footer from '@/components/portfolio/Footer';

export default function Page() {
  const [activeSection, setActiveSection] = useState('about');

  return (
    <main className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <Hero />
      
      <div id="projects" className="scroll-mt-20">
        <ProjectsSection />
      </div>
      
      <div id="experience" className="scroll-mt-20">
        <ExperienceSection />
      </div>
      
      <div id="skills" className="scroll-mt-20">
        <SkillsSection />
      </div>
      
      <Footer />
    </main>
  );
}
