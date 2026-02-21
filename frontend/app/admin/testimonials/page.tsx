'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Star } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { api } from '@/lib/api';

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
  approvedAt?: string;
  rejectedAt?: string;
  createdAt: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const data = await api.getTestimonials() as any;
      console.log('Testimonials data:', data); // Debug log
      setTestimonials(data.testimonials || data.data || []);
    } catch (err) {
      setError('Failed to load testimonials');
      console.error('Failed to fetch testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      await api.deleteTestimonial(id);
      fetchTestimonials(); // Refresh the list
    } catch (err) {
      setError('Failed to delete testimonial');
      console.error('Failed to delete testimonial:', err);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await api.approveTestimonial(id);
      fetchTestimonials(); // Refresh the list
    } catch (err) {
      setError('Failed to approve testimonial');
      console.error('Failed to approve testimonial:', err);
    }
  };

  const handleReject = async (id: string) => {
    const adminNotes = prompt('Please provide a reason for rejection (optional):');
    try {
      await api.rejectTestimonial(id, adminNotes || undefined);
      fetchTestimonials(); // Refresh the list
    } catch (err) {
      setError('Failed to reject testimonial');
      console.error('Failed to reject testimonial:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Testimonials</h1>
          <p className="text-muted-foreground mt-1">Manage client testimonials and reviews</p>
        </div>
        <Link href="/admin/testimonials/new">
          <Button className="gap-2">
            <Plus size={20} />
            Add Testimonial
          </Button>
        </Link>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading testimonials...</p>
        </div>
      ) : testimonials.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground mb-4">No testimonials yet</p>
          <Link href="/admin/testimonials/new">
            <Button variant="outline">Add Your First Testimonial</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid gap-4">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-6">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{testimonial.clientName}</h3>
                    <div className="flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    {/* Status Badge */}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      testimonial.status === 'approved' 
                        ? 'bg-green-100 text-green-800' 
                        : testimonial.status === 'rejected' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {testimonial.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {testimonial.position} at {testimonial.company}
                  </p>
                  <p className="text-foreground">{testimonial.comment}</p>
                  {testimonial.adminNotes && (
                    <p className="text-sm text-muted-foreground mt-2 italic">
                      Admin Notes: {testimonial.adminNotes}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  {/* Action Buttons */}
                  {testimonial.status === 'pending' && (
                    <>
                      <Button
                        onClick={() => handleApprove(testimonial.id)}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleReject(testimonial.id)}
                        size="sm"
                        variant="outline"
                        className="border-red-600 text-red-600 hover:bg-red-50"
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  <div className="flex gap-2">
                    <Link href={`/admin/testimonials/${testimonial.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit2 size={16} />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(testimonial.id)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
