import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../../../common/entities/base.entity';

@Entity({ name: 'projects' })
export class Project extends BaseEntity {
  @Column({ length: 150 })
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ name: 'image_url', nullable: true })
  imageUrl?: string;

  @Column({ name: 'repo_url', nullable: true })
  repoUrl?: string;

  @Column({ name: 'live_url', nullable: true })
  liveUrl?: string;

  @Column('varchar', { array: true, default: '{}' })
  technologies!: string[];
}
