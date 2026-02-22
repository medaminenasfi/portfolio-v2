import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum SkillCategory {
  FRONTEND = 'frontend',
  BACKEND = 'backend',
  TOOLS = 'tools',
  SOFT_SKILLS = 'soft_skills',
}

export enum SkillProficiency {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert',
}

@Entity('skills')
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  photo!: string; // URL or path to skill photo/icon

  @Column({
    type: 'enum',
    enum: SkillCategory,
  })
  category!: SkillCategory;

  @Column({
    type: 'enum',
    enum: SkillProficiency,
  })
  proficiency!: SkillProficiency;

  @Column({ type: 'json', nullable: true })
  keywords!: string[]; // Related keywords/tags

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ default: 0 })
  orderIndex!: number;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
