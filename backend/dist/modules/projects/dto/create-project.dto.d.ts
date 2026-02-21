import { ProjectCategory, ProjectStatus, ProjectProgressStatus, DifficultyLevel, ClientType } from '../entities/project.entity';
export declare class SeoDataDto {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
}
export declare class CreateProjectDto {
    title: string;
    description: string;
    shortSummary?: string;
    problem?: string;
    solution?: string;
    role?: string;
    highlights?: string[];
    results?: string;
    difficulty?: DifficultyLevel;
    clientType?: ClientType;
    liveDemoUrl?: string;
    githubRepoUrl?: string;
    techStack: string[];
    category: ProjectCategory;
    status?: ProjectStatus;
    progressStatus?: ProjectProgressStatus;
    isFeatured?: boolean;
    seoData?: SeoDataDto;
    scheduledPublishAt?: string;
    bannerImages?: string[];
    categoryPhotos?: string[];
    videoUrl?: string;
    videoThumbnail?: string;
    projectDuration?: string;
    clientName?: string;
    startDate?: string;
    endDate?: string;
    teamSize?: string;
    tools?: string[];
}
