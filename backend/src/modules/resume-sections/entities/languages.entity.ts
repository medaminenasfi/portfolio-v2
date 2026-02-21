import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum LanguageProficiency {
  NATIVE = 'native',
  FLUENT = 'fluent',
  INTERMEDIATE = 'intermediate',
  BASIC = 'basic',
}

@Entity('languages')
export class Language {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({
    type: 'enum',
    enum: LanguageProficiency,
  })
  proficiency!: LanguageProficiency;

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
