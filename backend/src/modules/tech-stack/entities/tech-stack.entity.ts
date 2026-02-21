import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum TechCategory {
  FRONTEND = 'frontend',
  BACKEND = 'backend',
  DATABASE = 'database',
  DEVOPS = 'devops',
  DESIGN = 'design',
  TOOLS = 'tools',
}

export enum ProficiencyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert',
}

@Entity('tech_stack')
export class TechStack {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  icon!: string; // URL to icon image

  @Column({
    type: 'enum',
    enum: TechCategory,
  })
  category!: TechCategory;

  @Column({
    type: 'enum',
    enum: ProficiencyLevel,
  })
  proficiency!: ProficiencyLevel;

  @Column({ default: 0 })
  orderIndex!: number;

  @Column({ default: true })
  showOnHomepage!: boolean;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ nullable: true })
  officialUrl!: string;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
