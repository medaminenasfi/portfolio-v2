'use client';

import { useState, useEffect } from 'react';
import { Award, Calendar, ExternalLink } from 'lucide-react';
import { api } from '@/lib/api';

interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expirationDate?: string | null;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
  orderIndex?: number;
}

export default function CertificationsSection() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const data: any = await api.getCertifications();
      const certData = Array.isArray(data) ? data : data?.data || [];
      setCertifications(certData);
    } catch (error) {
      console.error('Failed to fetch certifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? dateString
      : new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
        }).format(date);
  };

  if (loading) {
    return (
      <section id="certifications" className="py-24 px-4 bg-gradient-to-b from-background to-card/20 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Certifications</h2>
            <p className="text-lg text-muted-foreground">
              Professional certifications and achievements
            </p>
          </div>
          <div className="flex justify-center py-12">
            <div className="text-muted-foreground">Loading certifications...</div>
          </div>
        </div>
      </section>
    );
  }

  if (certifications.length === 0) {
    return null; // Don't show section if no data
  }

  return (
    <section id="certifications" className="py-24 px-4 bg-gradient-to-b from-background to-card/20 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Certifications</h2>
          <p className="text-lg text-muted-foreground">
            Professional certifications and achievements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-foreground mb-1">{cert.name}</h3>
                  <p className="text-primary font-medium mb-2">{cert.issuingOrganization}</p>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="w-4 h-4" />
                    Issued: {formatDate(cert.issueDate)}
                    {cert.expirationDate && (
                      <span> · Expires: {formatDate(cert.expirationDate)}</span>
                    )}
                  </div>

                  {cert.credentialId && (
                    <p className="text-sm text-muted-foreground mb-2">
                      Credential ID: {cert.credentialId}
                    </p>
                  )}

                  {cert.description && (
                    <p className="text-muted-foreground text-sm mb-3">{cert.description}</p>
                  )}

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
                    >
                      View Credential
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
