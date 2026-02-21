import { IsEnum, IsOptional, IsString } from 'class-validator';
import { AnalyticsEventType } from '../entities/analytics.entity';

export class CreateEventDto {
  @IsEnum(AnalyticsEventType)
  eventType!: AnalyticsEventType;

  @IsString()
  @IsOptional()
  page?: string;

  @IsString()
  @IsOptional()
  resourceId?: string;

  @IsString()
  @IsOptional()
  metadata?: string; // JSON string
}
