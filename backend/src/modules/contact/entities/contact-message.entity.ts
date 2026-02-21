import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum ContactCategory {
  JOB = 'job',
  FREELANCE = 'freelance',
  PARTNERSHIP = 'partnership',
  QUESTION = 'question',
}

export enum MessageStatus {
  NEW = 'new',
  IN_PROGRESS = 'in_progress',
  REPLIED = 'replied',
  CLOSED = 'closed',
}

export enum LeadStatus {
  NONE = 'none',
  LEAD = 'lead',
  QUALIFIED = 'qualified',
  CONVERTED = 'converted',
}

@Entity('contact_messages')
export class ContactMessage {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column({ nullable: true })
  phone!: string;

  @Column({
    type: 'enum',
    enum: ContactCategory,
  })
  category!: ContactCategory;

  @Column({ nullable: true })
  company!: string;

  @Column({ nullable: true })
  budgetRange!: string; // e.g., "$1000-$5000", "Under $1000"

  @Column({ type: 'timestamp', nullable: true })
  deadline?: Date;

  @Column()
  subject!: string;

  @Column('text')
  message!: string;

  @Column({ nullable: true })
  attachment!: string; // URL to uploaded file

  @Column({
    type: 'enum',
    enum: MessageStatus,
    default: MessageStatus.NEW,
  })
  status!: MessageStatus;

  @Column({ default: false })
  isRead!: boolean;

  @Column({
    type: 'enum',
    enum: LeadStatus,
    default: LeadStatus.NONE,
  })
  leadStatus!: LeadStatus;

  @Column({ type: 'text', nullable: true })
  internalNotes!: string;

  @Column({ type: 'text', nullable: true })
  adminReply!: string;

  @Column({ type: 'timestamp', nullable: true })
  repliedAt?: Date;

  @Column({ default: false })
  autoReplySent!: boolean;

  @Column({ type: 'json', nullable: true })
  metadata!: {
    userAgent?: string;
    ip?: string;
    referrer?: string;
    source?: string;
  };

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
