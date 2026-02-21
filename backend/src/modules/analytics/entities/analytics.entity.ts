import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

export enum AnalyticsEventType {
  PAGE_VIEW = 'page_view',
  PROJECT_VIEW = 'project_view',
  RESUME_DOWNLOAD = 'resume_download',
  TESTIMONIAL_SUBMIT = 'testimonial_submit',
  CONTACT_SUBMIT = 'contact_submit',
  TECH_STACK_VIEW = 'tech_stack_view',
  SKILL_FILTER = 'skill_filter',
  PROJECT_FILTER = 'project_filter',
  SEARCH_QUERY = 'search_query',
  THEME_CHANGE = 'theme_change',
  LANGUAGE_CHANGE = 'language_change',
}

@Entity('analytics_events')
export class AnalyticsEvent {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'enum',
    enum: AnalyticsEventType,
  })
  @Index()
  eventType!: AnalyticsEventType;

  @Column({ nullable: true })
  page!: string; // e.g., "/projects", "/resume"

  @Column({ nullable: true })
  resourceId!: string; // e.g., project_id, testimonial_id

  @Column({ nullable: true })
  metadata!: string; // JSON string for additional data

  @Column({ nullable: true })
  userAgent!: string;

  @Column({ nullable: true })
  ip!: string;

  @Column({ nullable: true })
  referrer!: string;

  @Column({ nullable: true })
  country!: string;

  @Column({ nullable: true })
  city!: string;

  @Column({ nullable: true })
  browser!: string;

  @Column({ nullable: true })
  os!: string;

  @Column({ nullable: true })
  device!: string; // mobile, tablet, desktop

  @Column({ nullable: true })
  sessionId!: string;

  @Column({ nullable: true })
  userId!: string; // If authenticated

  @CreateDateColumn()
  @Index()
  createdAt!: Date;
}

@Entity('analytics_summary')
export class AnalyticsSummary {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'date' })
  @Index()
  date!: Date;

  @Column({ default: 0 })
  totalPageViews!: number;

  @Column({ default: 0 })
  uniqueVisitors!: number;

  @Column({ default: 0 })
  projectViews!: number;

  @Column({ default: 0 })
  resumeDownloads!: number;

  @Column({ default: 0 })
  testimonialSubmissions!: number;

  @Column({ default: 0 })
  contactSubmissions!: number;

  @Column({ default: 0 })
  techStackViews!: number;

  @Column({ type: 'json', nullable: true })
  topPages!: Array<{ page: string; views: number }>;

  @Column({ type: 'json', nullable: true })
  topProjects!: Array<{ projectId: string; title: string; views: number }>;

  @Column({ type: 'json', nullable: true })
  topReferrers!: Array<{ referrer: string; visits: number }>;

  @Column({ type: 'json', nullable: true })
  devices!: Array<{ device: string; percentage: number }>;

  @Column({ type: 'json', nullable: true })
  browsers!: Array<{ browser: string; percentage: number }>;

  @Column({ type: 'json', nullable: true })
  countries!: Array<{ country: string; visits: number }>;

  @Column({ type: 'json', nullable: true })
  hourlyDistribution!: Array<{ hour: number; visits: number }>;

  @CreateDateColumn()
  createdAt!: Date;

  @CreateDateColumn()
  updatedAt!: Date;
}
