import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum TestimonialStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('testimonials')
export class Testimonial {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  clientName!: string;

  @Column({ nullable: true })
  company!: string;

  @Column({ nullable: true })
  position!: string;

  @Column({ nullable: true })
  email!: string;

  @Column()
  rating!: number; // 1-5 stars

  @Column('text')
  comment!: string;

  @Column({
    type: 'enum',
    enum: TestimonialStatus,
    default: TestimonialStatus.PENDING,
  })
  status!: TestimonialStatus;

  @Column({ nullable: true })
  adminNotes!: string; // Admin can add notes for rejected testimonials

  @Column({ type: 'timestamp', nullable: true })
  approvedAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  rejectedAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
