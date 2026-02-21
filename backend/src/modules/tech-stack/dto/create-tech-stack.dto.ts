import { IsString, IsEnum, IsNumber, IsOptional, IsUrl, Min, Max } from 'class-validator';
import { TechCategory, ProficiencyLevel } from '../entities/tech-stack.entity';

export class CreateTechStackDto {
  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsEnum(TechCategory)
  category!: TechCategory;

  @IsEnum(ProficiencyLevel)
  proficiency!: ProficiencyLevel;

  @IsNumber()
  @Min(0)
  @IsOptional()
  orderIndex?: number;

  @IsOptional()
  showOnHomepage?: boolean;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  officialUrl?: string;

  @IsOptional()
  isActive?: boolean;
}
