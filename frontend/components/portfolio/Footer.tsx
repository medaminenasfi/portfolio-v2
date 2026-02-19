'use client';

import { Mail, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com', color: 'hover:text-foreground' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com', color: 'hover:text-accent' },
    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com', color: 'hover:text-accent' },
    { icon: Mail, label: 'Email', href: 'mailto:contact@example.com', color: 'hover:text-accent' },
  ];

  return (
    <footer className="bg-secondary/30 border-t border-border py-12 mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Portfolio</h3>
            <p className="text-muted-foreground text-sm">Full Stack Developer</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#projects" className="text-muted-foreground hover:text-accent transition">Projects</a></li>
              <li><a href="#experience" className="text-muted-foreground hover:text-accent transition">Experience</a></li>
              <li><a href="#skills" className="text-muted-foreground hover:text-accent transition">Skills</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.label}
                    className={`text-muted-foreground ${link.color} transition duration-200`}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              &copy; {currentYear} Full Stack Developer. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm">
              <a href="#" className="text-muted-foreground hover:text-accent transition">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-accent transition">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
