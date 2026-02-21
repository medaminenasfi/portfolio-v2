import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Project } from './project.entity';

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
}

@Entity('project_media')
export class ProjectMedia {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'enum',
    enum: MediaType,
    default: MediaType.IMAGE,
  })
  type!: MediaType;

  @Column({ length: 500 })
  filename!: string;

  @Column({ length: 500 })
  originalName!: string;

  @Column({ length: 50 })
  mimeType!: string;

  @Column({ default: 0 })
  size!: number;

  @Column({ length: 1000 })
  url!: string;

  @Column({ length: 1000, nullable: true })
  thumbnailUrl!: string;

  @Column({ default: 0 })
  order!: number;

  @Column({ length: 500, nullable: true })
  videoEmbedUrl!: string;

  @Column({ type: 'json', nullable: true })
  metadata!: {
    width?: number;
    height?: number;
    duration?: number;
    compressionRatio?: number;
  };

  @ManyToOne(() => Project, (project) => project.media, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'projectId' })
  project!: Project;

  @Column()
  projectId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
