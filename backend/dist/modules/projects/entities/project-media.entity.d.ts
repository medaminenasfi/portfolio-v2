import { Project } from './project.entity';
export declare enum MediaType {
    IMAGE = "image",
    VIDEO = "video"
}
export declare class ProjectMedia {
    id: string;
    type: MediaType;
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
    url: string;
    thumbnailUrl: string;
    order: number;
    videoEmbedUrl: string;
    metadata: {
        width?: number;
        height?: number;
        duration?: number;
        compressionRatio?: number;
    };
    project: Project;
    projectId: string;
    createdAt: Date;
    updatedAt: Date;
}
