import { BaseEntity } from '../../../common/entities/base.entity';
import { Project } from './project.entity';
export declare enum MediaType {
    IMAGE = "image",
    VIDEO = "video",
    DOCUMENT = "document"
}
export declare class ProjectMedia extends BaseEntity {
    filename: string;
    originalName: string;
    path: string;
    mediaType: MediaType;
    fileSize: number;
    mimeType?: string;
    altText?: string;
    caption?: string;
    isCover: boolean;
    sortOrder: number;
    isActive: boolean;
    project: Project;
    projectId: string;
}
