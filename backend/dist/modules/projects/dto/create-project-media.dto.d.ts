import { MediaType } from '../entities/project-media.entity';
export declare class CreateProjectMediaDto {
    filename: string;
    originalName: string;
    path: string;
    mediaType?: MediaType;
    fileSize?: number;
    mimeType?: string;
    altText?: string;
    caption?: string;
    isCover?: boolean;
    sortOrder?: number;
    isActive?: boolean;
}
