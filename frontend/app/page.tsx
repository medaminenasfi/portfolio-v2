'use client';

import Hero from '@/components/portfolio/Hero';
import AboutSection from '@/components/portfolio/AboutSection';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import ExperienceSection from '@/components/portfolio/ExperienceSection';
import SkillsSection from '@/components/portfolio/SkillsSection';
import TestimonialsSection from '@/components/portfolio/TestimonialsSection';
import Navigation from '@/components/portfolio/Navigation';
import Footer from '@/components/portfolio/Footer';

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation activeSection="home" />
      
      <Hero />
      
      <div id="about" className="scroll-mt-20">
        <AboutSection />
      </div>
      
      <div id="projects" className="scroll-mt-20">
        <ProjectsSection />
      </div>
      
      <div id="testimonials" className="scroll-mt-20">
        <TestimonialsSection />
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
