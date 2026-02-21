import { ProjectCategory, ProjectStatus, ProjectProgressStatus, DifficultyLevel } from '../entities/project.entity';
export declare class QueryProjectsDto {
    search?: string;
    category?: ProjectCategory;
    status?: ProjectStatus;
    progressStatus?: ProjectProgressStatus;
    difficulty?: DifficultyLevel;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
    featured?: boolean;
    tech?: string;
}
