import { IsArray, IsEnum, IsUUID, ArrayNotEmpty, IsOptional } from 'class-validator';
import { ProjectStatus } from '../entities/project.entity';

export class BulkOperationDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  projectIds!: string[];
}

export class BulkPublishDto extends BulkOperationDto {
  @IsEnum(ProjectStatus)
  status!: ProjectStatus;
}

export class BulkDeleteDto extends BulkOperationDto {}

export class BulkFeatureDto extends BulkOperationDto {
  @IsOptional()
  isFeatured?: boolean = true;
}
