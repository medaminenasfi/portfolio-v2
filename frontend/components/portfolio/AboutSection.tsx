'use client';

import { useState, useEffect } from 'react';
import { Download, User, MapPin, Mail, Phone, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { api } from '@/lib/api';

export default function AboutSection() {
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
    <section id="about" className="py-24 px-4 bg-gradient-to-b from-background to-card/20 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get to know more about my background, skills, and what drives me as a developer
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Profile Image and Info */}
          <div className="space-y-6">
            <div className="relative">
              <div className="w-64 h-64 mx-auto bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center border-4 border-accent/30">
                <User className="w-32 h-32 text-accent" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-accent text-background px-4 py-2 rounded-full font-semibold">
                Available for Work
              </div>
            </div>

            <div className="text-center lg:text-left space-y-4">
              <h3 className="text-2xl font-bold text-foreground">
                Full Stack Developer
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm a passionate full-stack developer with expertise in modern web technologies. 
                I love building scalable applications that solve real-world problems and create 
                exceptional user experiences.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>hello@example.com</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 justify-center lg:justify-start">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-secondary/50 border border-border rounded-lg hover:bg-accent hover:text-background transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-secondary/50 border border-border rounded-lg hover:bg-accent hover:text-background transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-secondary/50 border border-border rounded-lg hover:bg-accent hover:text-background transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - About Content and CV Download */}
          <div className="space-y-6">
            <Card className="p-8 bg-gradient-to-br from-card to-card/50 border-border">
              <h4 className="text-xl font-semibold text-foreground mb-4">
                My Journey
              </h4>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  With over 5 years of experience in web development, I've had the privilege 
                  of working on diverse projects ranging from e-commerce platforms to enterprise 
                  applications. My journey in tech has been driven by curiosity and a constant 
                  desire to learn and innovate.
                </p>
                <p>
                  I specialize in React, Node.js, and modern JavaScript frameworks, but I'm 
                  always excited to explore new technologies and approaches. I believe in writing 
                  clean, maintainable code and creating solutions that not only work well but 
                  also provide excellent user experiences.
                </p>
                <p>
                  When I'm not coding, you'll find me contributing to open-source projects, 
                  writing technical articles, or exploring the latest developments in the 
                  tech world. I'm also passionate about mentoring aspiring developers and 
                  sharing knowledge with the community.
                </p>
              </div>

              {/* CV Download Button */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="flex-1">
                    <h5 className="font-medium text-foreground mb-1">
                      Download My Resume
                    </h5>
                    <p className="text-sm text-muted-foreground">
                      Get a detailed overview of my experience and skills
                    </p>
                  </div>
                  {!loading && resumeInfo && (
                    <Button
                      onClick={handleDownloadCV}
                      className="bg-accent hover:bg-accent/90 text-background flex items-center gap-2"
                    >
                      <Download size={16} />
                      Download CV
                    </Button>
                  )}
                  {loading && (
                    <div className="w-32 h-10 bg-muted rounded-lg animate-pulse"></div>
                  )}
                </div>
              </div>
            </Card>

            {/* Skills Preview */}
            <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border">
              <h4 className="text-lg font-semibold text-foreground mb-4">
                Core Competencies
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'React', 'Node.js', 'TypeScript', 'Next.js', 'MongoDB',
                  'PostgreSQL', 'Express', 'GraphQL', 'Docker', 'AWS'
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
