'use client';

import { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { Card } from '@/components/ui/card';
import TestimonialForm from './TestimonialForm';

interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  position: string;
  email: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/public/testimonials');
      const data = await response.json();
      console.log('=== PUBLIC TESTIMONIALS DEBUG ==='); // Debug log
      console.log('Raw response:', data); // Debug log
      console.log('Response JSON:', JSON.stringify(data, null, 2)); // Debug log
      
      // The public endpoint should already return only approved testimonials
      // But let's ensure we're handling the data correctly
      const testimonials = data.testimonials || data.data || data || [];
      console.log('Testimonials array:', testimonials); // Debug log
      console.log('Testimonials count:', testimonials.length); // Debug log
      
      if (testimonials.length > 0) {
        console.log('Sample testimonial:', JSON.stringify(testimonials[0], null, 2)); // Debug log
      }
      
      setTestimonials(testimonials);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-accent text-accent'
                : 'text-muted-foreground'
            }`}
          />
        ))}
      </div>
    );
  };

  if (showForm) {
    return (
      <section id="testimonials" className="py-24 px-4 bg-gradient-to-b from-background to-card/20 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <TestimonialForm />
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-24 px-4 bg-gradient-to-b from-background to-card/20 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Client Testimonials
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear what my clients have to say about working with me
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading testimonials...</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12">
            <Quote className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg mb-6">
              No testimonials yet. Be the first to share your experience!
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-accent hover:bg-accent/90 text-background rounded-lg font-semibold transition-colors"
            >
              Share Your Experience
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {testimonials.map((testimonial) => (
                <Card
                  key={testimonial.id}
                  className="p-6 bg-gradient-to-br from-card to-card/50 border-border hover:border-accent/50 transition-all duration-300"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">
                          {testimonial.clientName}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.position} at {testimonial.company}
                        </p>
                      </div>
                      {renderStars(testimonial.rating)}
                    </div>
                    
                    <blockquote className="flex-1 mb-4">
                      <p className="text-muted-foreground leading-relaxed italic">
                        "{testimonial.comment}"
                      </p>
                    </blockquote>
                    
                    <div className="text-xs text-muted-foreground">
                      {new Date(testimonial.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Card className="p-8 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 inline-block">
                <div className="max-w-md">
                  <Quote className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Share Your Experience
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Have you worked with me? I'd love to hear about your experience!
                  </p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="px-6 py-3 bg-accent hover:bg-accent/90 text-background rounded-lg font-semibold transition-colors"
                  >
                    Submit Testimonial
                  </button>
                </div>
              </Card>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
