import {
  IsString,
  IsOptional,
  IsArray,
  IsEnum,
  IsBoolean,
  IsUrl,
  IsDateString,
  MaxLength,
  MinLength,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  ProjectCategory,
  ProjectStatus,
  ProjectProgressStatus,
  DifficultyLevel,
  ClientType,
} from '../entities/project.entity';

export class SeoDataDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  metaTitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  metaDescription?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keywords?: string[];
}

export class CreateProjectDto {
  // Basic Information
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  title!: string;

  @IsString()
  @MinLength(10)
  description!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  shortSummary?: string;

  // Project Details (A)
  @IsOptional()
  @IsString()
  problem?: string;

  @IsOptional()
  @IsString()
  solution?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  role?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  highlights?: string[];

  @IsOptional()
  @IsString()
  results?: string;

  @IsOptional()
  @IsEnum(DifficultyLevel)
  difficulty?: DifficultyLevel;

  @IsOptional()
  @IsEnum(ClientType)
  clientType?: ClientType;

  // Links and Tech Stack
  @IsOptional()
  @IsUrl()
  liveDemoUrl?: string;

  @IsOptional()
  @IsUrl()
  githubRepoUrl?: string;

  @IsArray()
  @IsString({ each: true })
  techStack!: string[];

  // Classification
  @IsEnum(ProjectCategory)
  category!: ProjectCategory;

  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @IsOptional()
  @IsEnum(ProjectProgressStatus)
  progressStatus?: ProjectProgressStatus;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  // Optional SEO data
  @IsOptional()
  @ValidateNested()
  @Type(() => SeoDataDto)
  seoData?: SeoDataDto;

  // Optional scheduling
  @IsOptional()
  @IsDateString()
  scheduledPublishAt?: string;
}
