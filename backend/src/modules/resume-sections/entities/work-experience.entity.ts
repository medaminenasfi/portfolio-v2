import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('work_experience')
export class WorkExperience {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  company!: string;

  @Column()
  position!: string;

  @Column({ nullable: true })
  location!: string;

  @Column()
  startDate!: string; // Format: "Jan 2020"

  @Column({ nullable: true })
  endDate!: string; // Format: "Dec 2021" or "Present"

  @Column('text')
  description!: string;

  @Column({ type: 'json', nullable: true })
  achievements!: string[]; // Array of achievement bullet points

  @Column({ nullable: true })
  companyLogo!: string; // URL to company logo

  @Column({ nullable: true })
  companyUrl!: string; // Company website URL

  @Column({ default: 0 })
  orderIndex!: number;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
