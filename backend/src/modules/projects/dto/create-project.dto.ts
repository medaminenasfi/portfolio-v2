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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ProjectCategory,
  ProjectStatus,
  ProjectProgressStatus,
  DifficultyLevel,
  ClientType,
} from '../entities/project.entity';

export class SeoDataDto {
  @ApiPropertyOptional({
    description: 'SEO meta title',
    example: 'My Awesome Project - Portfolio',
    maxLength: 255,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  metaTitle?: string;

  @ApiPropertyOptional({
    description: 'SEO meta description',
    example: 'A detailed description of my awesome project showcasing skills and technologies',
    maxLength: 500,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  metaDescription?: string;

  @ApiPropertyOptional({
    description: 'SEO keywords',
    example: ['react', 'nodejs', 'typescript', 'portfolio'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keywords?: string[];
}

export class CreateProjectDto {
  // Basic Information
  @ApiProperty({
    description: 'Project title',
    example: 'E-commerce Platform with React and Node.js',
    minLength: 1,
    maxLength: 255,
    type: String,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  title!: string;

  @ApiProperty({
    description: 'Detailed project description',
    example: 'A full-featured e-commerce platform built with React, Node.js, and PostgreSQL. Includes user authentication, payment processing, and admin dashboard.',
    minLength: 10,
    type: String,
  })
  @IsString()
  @MinLength(10)
  description!: string;

  @ApiPropertyOptional({
    description: 'Brief project summary',
    example: 'Modern e-commerce solution with real-time inventory management',
    maxLength: 500,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  shortSummary?: string;

  // Project Details (A)
  @ApiPropertyOptional({
    description: 'Problem the project solves',
    example: 'Small businesses need affordable e-commerce solutions with easy inventory management',
    type: String,
  })
  @IsOptional()
  @IsString()
  problem?: string;

  @ApiPropertyOptional({
    description: 'Solution implemented',
    example: 'Built a scalable e-commerce platform with real-time inventory tracking and integrated payment processing',
    type: String,
  })
  @IsOptional()
  @IsString()
  solution?: string;

  @ApiPropertyOptional({
    description: 'Role in the project',
    example: 'Full-stack Developer & Project Lead',
    maxLength: 255,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  role?: string;

  @ApiPropertyOptional({
    description: 'Key project highlights and achievements',
    example: ['Implemented real-time inventory', 'Reduced page load time by 60%', 'Integrated multiple payment gateways'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  highlights?: string[];

  @ApiPropertyOptional({
    description: 'Project results and outcomes',
    example: 'Successfully launched with 100+ products, processing 1000+ orders monthly',
    type: String,
  })
  @IsOptional()
  @IsString()
  results?: string;

  @ApiPropertyOptional({
    description: 'Project difficulty level',
    enum: DifficultyLevel,
    example: 'intermediate',
  })
  @IsOptional()
  @IsEnum(DifficultyLevel)
  difficulty?: DifficultyLevel;

  @ApiPropertyOptional({
    description: 'Client type',
    enum: ClientType,
    example: 'startup',
  })
  @IsOptional()
  @IsEnum(ClientType)
  clientType?: ClientType;

  // Links and Tech Stack
  @ApiPropertyOptional({
    description: 'Live demo URL',
    example: 'https://demo-ecommerce.example.com',
    type: String,
  })
  @IsOptional()
  @IsUrl({}, { message: 'liveDemoUrl must be a valid URL address' })
  @IsString()
  liveDemoUrl?: string;

  @ApiPropertyOptional({
    description: 'GitHub repository URL',
    example: 'https://github.com/username/ecommerce-platform',
    type: String,
  })
  @IsOptional()
  @IsUrl({}, { message: 'githubRepoUrl must be a valid URL address' })
  @IsString()
  githubRepoUrl?: string;

  @ApiProperty({
    description: 'Technology stack used in the project',
    example: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Redis'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  techStack!: string[];

  // Classification
  @ApiProperty({
    description: 'Project category',
    enum: ProjectCategory,
    example: 'web',
  })
  @IsEnum(ProjectCategory)
  category!: ProjectCategory;

  @ApiPropertyOptional({
    description: 'Project publication status',
    enum: ProjectStatus,
    example: 'draft',
  })
  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @ApiPropertyOptional({
    description: 'Project progress status',
    enum: ProjectProgressStatus,
    example: 'in-progress',
  })
  @IsOptional()
  @IsEnum(ProjectProgressStatus)
  progressStatus?: ProjectProgressStatus;

  @ApiPropertyOptional({
    description: 'Whether project is featured',
    example: false,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  // Optional SEO data
  @ApiPropertyOptional({
    description: 'SEO metadata for the project',
    type: SeoDataDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SeoDataDto)
  seoData?: SeoDataDto;

  // Optional scheduling
  @ApiPropertyOptional({
    description: 'Scheduled publish date (ISO 8601 format)',
    example: '2024-12-31T23:59:59.000Z',
    type: String,
  })
  @IsOptional()
  @IsDateString()
  scheduledPublishAt?: string;

  // Media and content
  @ApiPropertyOptional({
    description: 'Banner image URLs',
    example: ['/uploads/projects/banner1.jpg', '/uploads/projects/banner2.jpg'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  bannerImages?: string[];

  @ApiPropertyOptional({
    description: 'Category photo URLs',
    example: ['/uploads/projects/category1.jpg'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categoryPhotos?: string[];

  @ApiPropertyOptional({
    description: 'Video URL',
    example: 'https://www.youtube.com/watch?v=demo',
    type: String,
  })
  @IsOptional()
  @IsString()
  videoUrl?: string;

  @ApiPropertyOptional({
    description: 'Video thumbnail URL',
    example: '/uploads/projects/video-thumb.jpg',
    type: String,
  })
  @IsOptional()
  @IsString()
  videoThumbnail?: string;

  @ApiPropertyOptional({
    description: 'Project duration',
    example: '3 months',
    type: String,
  })
  @IsOptional()
  @IsString()
  projectDuration?: string;

  @ApiPropertyOptional({
    description: 'Client name',
    example: 'Tech Startup Inc.',
    type: String,
  })
  @IsOptional()
  @IsString()
  clientName?: string;

  @ApiPropertyOptional({
    description: 'Project start date (ISO 8601 format)',
    example: '2024-01-15T00:00:00.000Z',
    type: String,
  })
  @IsOptional()
  @IsDateString({}, { message: 'startDate must be a valid ISO 8601 date string' })
  startDate?: string;

  @ApiPropertyOptional({
    description: 'Project end date (ISO 8601 format)',
    example: '2024-04-15T00:00:00.000Z',
    type: String,
  })
  @IsOptional()
  @IsDateString({}, { message: 'endDate must be a valid ISO 8601 date string' })
  endDate?: string;

  @ApiPropertyOptional({
    description: 'Team size',
    example: '4 developers',
    type: String,
  })
  @IsOptional()
  @IsString()
  teamSize?: string;

  @ApiPropertyOptional({
    description: 'Tools and software used',
    example: ['VS Code', 'Docker', 'Git', 'Figma'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tools?: string[];
}
