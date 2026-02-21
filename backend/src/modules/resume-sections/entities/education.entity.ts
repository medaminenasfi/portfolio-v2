import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('education')
export class Education {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  school!: string;

  @Column()
  degree!: string;

  @Column()
  field!: string; // Field of study

  @Column()
  startYear!: string; // Format: "2018"

  @Column({ nullable: true })
  endYear!: string; // Format: "2022" or "Present"

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ nullable: true })
  schoolLogo!: string; // URL to school logo

  @Column({ nullable: true })
  schoolUrl!: string; // School website URL

  @Column({ type: 'json', nullable: true })
  achievements!: string[]; // Array of achievements

  @Column({ nullable: true })
  gpa!: string; // Grade point average

  @Column({ default: 0 })
  orderIndex!: number;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
