import { ProjectStatus } from '../entities/project.entity';
export declare class BulkOperationDto {
    projectIds: string[];
}
export declare class BulkPublishDto extends BulkOperationDto {
    status: ProjectStatus;
}
export declare class BulkDeleteDto extends BulkOperationDto {
}
export declare class BulkFeatureDto extends BulkOperationDto {
    isFeatured?: boolean;
}
