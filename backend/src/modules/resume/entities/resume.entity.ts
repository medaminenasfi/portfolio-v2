import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('resumes')
export class Resume {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  filename!: string;

  @Column()
  originalName!: string;

  @Column()
  mimeType!: string;

  @Column()
  size!: number;

  @Column()
  filePath!: string;

  @Column({ nullable: true })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
