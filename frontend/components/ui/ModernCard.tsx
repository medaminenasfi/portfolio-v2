'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Star } from 'lucide-react';

interface ModernCardProps {
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  githubUrl?: string;
  liveUrl?: string;
  rating?: number;
  className?: string;
}

export default function ModernCard({
  title,
  description,
  image,
  tags = [],
  githubUrl,
  liveUrl,
  rating,
  className = '',
}: ModernCardProps) {
  return (
    <Card className={`group relative overflow-hidden bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 ${className}`}>
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
              {title}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
              {description}
            </p>
          </div>
          
          {/* Rating */}
          {rating && (
            <div className="flex items-center gap-1 ml-4">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-slate-300">{rating}</span>
            </div>
          )}
        </div>

        {/* Image */}
        {image && (
          <div className="mb-4 rounded-lg overflow-hidden bg-slate-800/50">
            <img
              src={image}
              alt={title}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-cyan-500/10 text-cyan-300 border-cyan-500/20 hover:bg-cyan-500/20 transition-colors text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-auto">
          {githubUrl && (
            <Button
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white hover:border-slate-500 transition-all"
              asChild
            >
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                Code
              </a>
            </Button>
          )}
          
          {liveUrl && (
            <Button
              size="sm"
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-0 transition-all"
              asChild
            >
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            </Button>
          )}
        </div>

        {/* Hover effect border */}
        <div className="absolute inset-0 rounded-lg border border-cyan-500/0 group-hover:border-cyan-500/30 transition-all duration-300 pointer-events-none" />
      </div>
    </Card>
  );
}
