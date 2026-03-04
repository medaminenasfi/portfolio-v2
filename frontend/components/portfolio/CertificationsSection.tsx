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
      setLoading(true);
      
      // Mock data for now - replace with API call when admin is ready
      const mockCertifications = [
        {
          id: '1',
          name: 'TOEFL iBT (B2 Level)',
          issuingOrganization: 'English Certification',
          issueDate: '2023-06-15',
          credentialId: 'TOEFL-2023-B2',
          description: 'English language proficiency certification at B2 level.',
          orderIndex: 1
        },
        {
          id: '2',
          name: 'TCF TP (B2 Level)',
          issuingOrganization: 'French Certification',
          issueDate: '2023-04-20',
          credentialId: 'TCF-2023-B2',
          description: 'French language proficiency certification at B2 level.',
          orderIndex: 2
        },
        {
          id: '3',
          name: 'Web Development Training',
          issuingOrganization: 'Coursera',
          issueDate: '2022-11-10',
          description: 'Comprehensive training in HTML, CSS, and JavaScript web development.',
          orderIndex: 3
        },
        {
          id: '4',
          name: 'Introduction to Java Training',
          issuingOrganization: 'Coursera',
          issueDate: '2022-09-15',
          description: 'Fundamental Java programming concepts and applications.',
          orderIndex: 4
        },
        {
          id: '5',
          name: 'UI/UX Design Training',
          issuingOrganization: 'Coursera',
          issueDate: '2022-07-20',
          description: 'Training in Design of User Interfaces and Experiences (UI/UX).',
          orderIndex: 5
        },
        {
          id: '6',
          name: 'React Basics Training',
          issuingOrganization: 'Coursera',
          issueDate: '2022-05-10',
          description: 'Introduction to React.js and modern web development.',
          orderIndex: 6
        },
        {
          id: '7',
          name: 'Soft Skills Training',
          issuingOrganization: 'We Youth Organization',
          issueDate: '2022-03-15',
          description: 'Professional soft skills development and communication training.',
          orderIndex: 7
        },
        {
          id: '8',
          name: 'Google Developer Groups Training',
          issuingOrganization: 'DevFest',
          issueDate: '2021-12-10',
          description: 'Google technologies and modern development practices training.',
          orderIndex: 8
        }
      ];
      
      setCertifications(mockCertifications);
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

  // Continue to render even with no data - will show fallback

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-card/20 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Certifications</h2>
          <p className="text-lg text-muted-foreground">
            Professional certifications and achievements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.length > 0 ? (
            certifications.map((cert) => (
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
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Certifications Added Yet</h3>
              <p className="text-muted-foreground">Professional certifications will be added soon.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
