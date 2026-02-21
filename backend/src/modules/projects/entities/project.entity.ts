import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { ProjectMedia } from './project-media.entity';

export enum ProjectCategory {
  WEB = 'web',
  MOBILE = 'mobile',
  DESKTOP = 'desktop',
  FULL_STACK = 'full_stack',
}

export enum ProjectStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export enum ProjectProgressStatus {
  COMPLETED = 'completed',
  IN_PROGRESS = 'in_progress',
}

export enum DifficultyLevel {
  SIMPLE = 'simple',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export enum ClientType {
  PERSONAL = 'personal',
  FREELANCE = 'freelance',
  COMPANY = 'company',
}

@Entity('projects')
@Index(['status', 'isFeatured'])
@Index(['category'])
@Index(['progressStatus'])
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // Basic Information
  @Column({ length: 255 })
  title!: string;

  @Column('text')
  description!: string;

  @Column({ length: 500, nullable: true })
  shortSummary!: string;

  // Project Details (A)
  @Column('text', { nullable: true })
  problem!: string;

  @Column('text', { nullable: true })
  solution!: string;

  @Column({ length: 255, nullable: true })
  role!: string;

  @Column('simple-array', { nullable: true })
  highlights!: string[];

  @Column('text', { nullable: true })
  results!: string;

  @Column({
    type: 'enum',
    enum: DifficultyLevel,
    default: DifficultyLevel.MEDIUM,
  })
  difficulty!: DifficultyLevel;

  @Column({
    type: 'enum',
    enum: ClientType,
    nullable: true,
  })
  clientType!: ClientType;

  // Links and Tech Stack
  @Column({ length: 500, nullable: true })
  liveDemoUrl!: string;

  @Column({ length: 500, nullable: true })
  githubRepoUrl!: string;

  @Column('simple-array')
  techStack!: string[];

  // Classification
  @Column({
    type: 'enum',
    enum: ProjectCategory,
  })
  category!: ProjectCategory;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.DRAFT,
  })
  status!: ProjectStatus;

  @Column({
    type: 'enum',
    enum: ProjectProgressStatus,
    default: ProjectProgressStatus.IN_PROGRESS,
  })
  progressStatus!: ProjectProgressStatus;

  @Column({ default: false })
  isFeatured!: boolean;

  // Media and content
  @Column('simple-array', { nullable: true })
  bannerImages?: string[];

  @Column('simple-array', { nullable: true })
  categoryPhotos?: string[];

  @Column({ length: 500, nullable: true })
  videoUrl?: string;

  @Column({ length: 500, nullable: true })
  videoThumbnail?: string;

  @Column({ length: 100, nullable: true })
  projectDuration?: string;

  @Column({ length: 200, nullable: true })
  clientName?: string;

  @Column({ type: 'date', nullable: true })
  startDate?: Date;

  @Column({ type: 'date', nullable: true })
  endDate?: Date;

  @Column({ length: 50, nullable: true })
  teamSize?: string;

  @Column('simple-array', { nullable: true })
  tools?: string[];

  // Media Relations
  @OneToMany(() => ProjectMedia, (media) => media.project, {
    cascade: true,
    eager: true,
  })
  media!: ProjectMedia[];

  // Metadata
  @Column({ nullable: true })
  coverImageId!: string;

  @Column({ type: 'json', nullable: true })
  seoData!: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };

  @Column({ type: 'timestamp', nullable: true })
  scheduledPublishAt?: Date;

  // Timestamps
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ type: 'timestamp', nullable: true })
  publishedAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  archivedAt?: Date;
}
