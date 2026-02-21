import { IsOptional, IsDateString } from 'class-validator';

export class GetAnalyticsDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  period?: string; // 1d, 7d, 30d, 90d, 1y
}
