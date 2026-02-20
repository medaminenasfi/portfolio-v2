import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../auth/entities/user.entity';

export enum ProjectCategory {
  WEB = 'web',
  MOBILE = 'mobile',
  DESKTOP = 'desktop',
  FULL_STACK = 'full-stack',
}

export enum ProjectStatus {
  COMPLETED = 'completed',
  IN_PROGRESS = 'in-progress',
}

@Entity({ name: 'projects' })
export class Project extends BaseEntity {
  @Column({ length: 150 })
  title!: string;

  @Column({ unique: true, length: 150 })
  slug!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column('varchar', { array: true, default: '{}' })
  techStack?: string[];

  @Column('varchar', { array: true, default: '{}' })
  images?: string[];

  @Column({ name: 'banner_image', nullable: true })
  bannerImage?: string;

  @Column({ name: 'catalogue_photo', nullable: true })
  cataloguePhoto?: string;

  @Column({ name: 'live_demo_url', nullable: true })
  liveDemoUrl?: string;

  @Column({ name: 'github_url', nullable: true })
  githubUrl?: string;

  @Column({
    type: 'enum',
    enum: ProjectCategory,
    default: ProjectCategory.WEB,
    nullable: true,
  })
  category?: ProjectCategory;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.IN_PROGRESS,
    nullable: true,
  })
  status?: ProjectStatus;

  @Column({ name: 'is_featured', default: false })
  isFeatured?: boolean;

  @ManyToOne(() => User, (user) => user.projects)
  user!: User;
}
