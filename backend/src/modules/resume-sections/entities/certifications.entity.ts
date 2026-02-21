import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('certifications')
export class Certification {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  issuer!: string;

  @Column()
  issueDate!: string; // Format: "Jan 2023"

  @Column({ nullable: true })
  expiryDate!: string; // Format: "Jan 2025" or "No expiry"

  @Column({ nullable: true })
  credentialId!: string; // Certificate ID

  @Column({ nullable: true })
  credentialUrl!: string; // Certificate verification URL

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ nullable: true })
  certificateImage!: string; // URL to certificate image

  @Column({ default: 0 })
  orderIndex!: number;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ default: true })
  showOnResume!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
