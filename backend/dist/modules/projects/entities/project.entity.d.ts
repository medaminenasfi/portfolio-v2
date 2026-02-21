import { ProjectMedia } from './project-media.entity';
export declare enum ProjectCategory {
    WEB = "web",
    MOBILE = "mobile",
    DESKTOP = "desktop",
    FULL_STACK = "full_stack"
}
export declare enum ProjectStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
    ARCHIVED = "archived"
}
export declare enum ProjectProgressStatus {
    COMPLETED = "completed",
    IN_PROGRESS = "in_progress"
}
export declare enum DifficultyLevel {
    SIMPLE = "simple",
    MEDIUM = "medium",
    HARD = "hard"
}
export declare enum ClientType {
    PERSONAL = "personal",
    FREELANCE = "freelance",
    COMPANY = "company"
}
export declare class Project {
    id: string;
    title: string;
    description: string;
    shortSummary: string;
    problem: string;
    solution: string;
    role: string;
    highlights: string[];
    results: string;
    difficulty: DifficultyLevel;
    clientType: ClientType;
    liveDemoUrl: string;
    githubRepoUrl: string;
    techStack: string[];
    category: ProjectCategory;
    status: ProjectStatus;
    progressStatus: ProjectProgressStatus;
    isFeatured: boolean;
    bannerImages?: string[];
    categoryPhotos?: string[];
    videoUrl?: string;
    videoThumbnail?: string;
    projectDuration?: string;
    clientName?: string;
    startDate?: Date;
    endDate?: Date;
    teamSize?: string;
    tools?: string[];
    media: ProjectMedia[];
    coverImageId: string;
    seoData: {
        metaTitle?: string;
        metaDescription?: string;
        keywords?: string[];
    };
    scheduledPublishAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    archivedAt?: Date;
}
