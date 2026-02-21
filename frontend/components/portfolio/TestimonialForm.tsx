'use client';

import { useState } from 'react';
import { Star, Send, User, Building, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface TestimonialFormData {
  clientName: string;
  company: string;
  position: string;
  email: string;
  rating: number;
  comment: string;
}

export default function TestimonialForm() {
  const [formData, setFormData] = useState<TestimonialFormData>({
    clientName: '',
    company: '',
    position: '',
    email: '',
    rating: 5,
    comment: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/public/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to submit testimonial');
      }

      setSubmitted(true);
      // Reset form after successful submission
      setFormData({
        clientName: '',
        company: '',
        position: '',
        email: '',
        rating: 5,
        comment: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit testimonial');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Card className="p-8 text-center bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-background" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Thank You!</h3>
          <p className="text-muted-foreground mb-4">
            Your testimonial has been submitted successfully. We appreciate your feedback!
          </p>
          <Button
            onClick={() => setSubmitted(false)}
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-background"
          >
            Submit Another Testimonial
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 bg-gradient-to-br from-card to-card/50 border-border">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">Share Your Experience</h3>
          <p className="text-muted-foreground">
            Have you worked with me? I'd love to hear about your experience!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="clientName" className="flex items-center gap-2 text-sm font-medium text-foreground">
                <User className="w-4 h-4" />
                Your Name *
              </label>
              <input
                type="text"
                id="clientName"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="company" className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Building className="w-4 h-4" />
                Company *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Acme Corp"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="position" className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Briefcase className="w-4 h-4" />
                Your Position *
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Project Manager"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-foreground">
                <User className="w-4 h-4" />
                Email (Optional)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="rating" className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Star className="w-4 h-4" />
              Rating *
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className="p-1 transition-colors"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= formData.rating
                        ? 'fill-accent text-accent'
                        : 'text-muted-foreground hover:text-accent/50'
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="comment" className="text-sm font-medium text-foreground">
              Your Testimonial *
            </label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
              placeholder="Share your experience working with me..."
            />
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent hover:bg-accent/90 text-background font-semibold py-3"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin"></div>
                Submitting...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Submit Testimonial
              </span>
            )}
          </Button>
        </form>
      </div>
    </Card>
  );
}
