import { IsArray, IsEnum, IsUUID, IsOptional } from 'class-validator';
import { TestimonialStatus } from '../entities/testimonial.entity';

export class BulkUpdateStatusDto {
  @IsArray()
  @IsUUID('4', { each: true })
  testimonialIds!: string[];

  @IsEnum(TestimonialStatus)
  status!: TestimonialStatus;

  @IsOptional()
  adminNotes?: string;
}

export class BulkDeleteDto {
  @IsArray()
  @IsUUID('4', { each: true })
  testimonialIds!: string[];
}
