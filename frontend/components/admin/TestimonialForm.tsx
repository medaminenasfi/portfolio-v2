'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, Check, X, MessageSquare } from 'lucide-react';
import { api } from '@/lib/api';
import { toast } from '@/hooks/use-toast';

interface TestimonialFormProps {
  id?: string;
}

interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  position: string;
  email: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
  createdAt: string;
}

export default function TestimonialForm({ id }: TestimonialFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');

  useEffect(() => {
    if (id) {
      fetchTestimonial();
    }
  }, [id]);

  const fetchTestimonial = async () => {
    try {
      const data = await api.getTestimonialById(id as string);
      setTestimonial(data);
      setSelectedStatus(data.status);
      setAdminNotes(data.adminNotes || '');
    } catch (err) {
      setError('Failed to load testimonial');
      console.error(err);
    }
  };

  const handleStatusChange = async (newStatus: 'approved' | 'rejected') => {
    if (!id) return;
    
    setLoading(true);
    setError('');

    try {
      await api.updateTestimonialStatus(id, newStatus, adminNotes);
      
      toast({
        title: `Testimonial ${newStatus}`,
        description: `The testimonial has been ${newStatus} successfully.`,
      });
      
      // Update local state
      if (testimonial) {
        setTestimonial({
          ...testimonial,
          status: newStatus,
          adminNotes: adminNotes
        });
        setSelectedStatus(newStatus);
      }
    } catch (err) {
      setError(`Failed to ${newStatus} testimonial`);
      console.error(err);
      toast({
        title: 'Error',
        description: `Failed to ${newStatus} testimonial.`,
        variant: 'destructive',
      });
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
            className={`w-5 h-5 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-muted-foreground'
            }`}
          />
        ))}
      </div>
    );
  };

  if (!testimonial) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading testimonial...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Review Testimonial</h1>
          <p className="text-muted-foreground">Approve or reject this testimonial</p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.back()}
        >
          Back
        </Button>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Testimonial Preview */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <MessageSquare size={20} />
            Testimonial Preview
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-foreground">{testimonial.clientName}</h3>
                <p className="text-muted-foreground">{testimonial.position}</p>
                <p className="text-muted-foreground">{testimonial.company}</p>
                <p className="text-sm text-muted-foreground">{testimonial.email}</p>
              </div>
              {renderStars(testimonial.rating)}
            </div>
            
            <div className="border-t pt-4">
              <p className="text-foreground leading-relaxed">"{testimonial.comment}"</p>
            </div>
            
            <div className="text-sm text-muted-foreground border-t pt-4">
              <p>Submitted: {new Date(testimonial.createdAt).toLocaleDateString()}</p>
              <p>Status: <span className={`font-medium ${
                testimonial.status === 'approved' ? 'text-green-600' :
                testimonial.status === 'rejected' ? 'text-red-600' :
                'text-yellow-600'
              }`}>{testimonial.status.toUpperCase()}</span></p>
            </div>
          </div>
        </Card>

        {/* Status Controls */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Status Management</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Current Status
              </label>
              <div className={`px-3 py-2 rounded-lg text-center font-medium ${
                testimonial.status === 'approved' ? 'bg-green-100 text-green-800' :
                testimonial.status === 'rejected' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {testimonial.status.toUpperCase()}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Admin Notes (optional)
              </label>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add any notes about this decision..."
                className="w-full p-3 border rounded-lg resize-none h-24 bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="space-y-3 pt-4">
              {testimonial.status !== 'approved' && (
                <Button
                  onClick={() => handleStatusChange('approved')}
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                >
                  <Check size={16} />
                  {loading ? 'Approving...' : 'Approve Testimonial'}
                </Button>
              )}
              
              {testimonial.status !== 'rejected' && (
                <Button
                  onClick={() => handleStatusChange('rejected')}
                  disabled={loading}
                  variant="outline"
                  className="w-full border-red-600 text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <X size={16} />
                  {loading ? 'Rejecting...' : 'Reject Testimonial'}
                </Button>
              )}
            </div>

            {testimonial.status === 'approved' && (
              <div className="text-center text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                ✓ This testimonial is approved and visible on the public site
              </div>
            )}
            
            {testimonial.status === 'rejected' && (
              <div className="text-center text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                ✗ This testimonial is rejected and not visible on the public site
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
