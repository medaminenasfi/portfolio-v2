'use client';

import { useState, useEffect } from 'react';
import { Code, Briefcase, Users, Award, TrendingUp } from 'lucide-react';

interface Stat {
  number: string;
  label: string;
  icon: any;
  color: string;
}

export default function StatsSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('stats');
      if (element) {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
          setVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats: Stat[] = [
    {
      number: '50+',
      label: 'Projects Completed',
      icon: Briefcase,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      number: '100+',
      label: 'Happy Clients',
      icon: Users,
      color: 'from-purple-500 to-pink-500'
    },
    {
      number: '15+',
      label: 'Technologies',
      icon: Code,
      color: 'from-green-500 to-emerald-500'
    },
    {
      number: '5+',
      label: 'Years Experience',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500'
    },
    {
      number: '10+',
      label: 'Certifications',
      icon: Award,
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <section id="stats" className="py-20 px-4 bg-gradient-to-b from-background to-card/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Numbers That Matter
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A snapshot of my journey and achievements in the world of development
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`text-center transform transition-all duration-700 ${
                  visible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative mb-4">
                  {/* Background gradient circle */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-full blur-xl opacity-20`}></div>
                  
                  {/* Icon container */}
                  <div className={`relative w-16 h-16 mx-auto bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Number */}
                <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.number}
                </div>

                {/* Label */}
                <p className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Additional decorative elements */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 rounded-full">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300">Continuously growing</span>
          </div>
        </div>
      </div>
    </section>
  );
}
