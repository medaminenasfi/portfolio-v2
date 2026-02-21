import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateResumeDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
