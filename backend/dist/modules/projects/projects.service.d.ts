import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { ProjectMedia } from './entities/project-media.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { QueryProjectsDto } from './dto/query-projects.dto';
import { BulkPublishDto, BulkDeleteDto, BulkFeatureDto } from './dto/bulk-operations.dto';
export declare class ProjectsService {
    private readonly projectRepository;
    private readonly mediaRepository;
    constructor(projectRepository: Repository<Project>, mediaRepository: Repository<ProjectMedia>);
    create(createProjectDto: CreateProjectDto): Promise<Project>;
    findAll(query: QueryProjectsDto): Promise<{
        projects: Project[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<Project>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project>;
    remove(id: string): Promise<void>;
    duplicate(id: string): Promise<Project>;
    bulkPublish(bulkPublishDto: BulkPublishDto): Promise<Project[]>;
    bulkDelete(bulkDeleteDto: BulkDeleteDto): Promise<void>;
    bulkFeature(bulkFeatureDto: BulkFeatureDto): Promise<Project[]>;
    getStatistics(): Promise<{
        total: number;
        published: number;
        draft: number;
        archived: number;
        featured: number;
        completed: number;
        inProgress: number;
        byCategory: Record<string, number>;
        byDifficulty: Record<string, number>;
    }>;
    private getCategoryStats;
    private getDifficultyStats;
    addMedia(projectId: string, mediaData: Partial<ProjectMedia>): Promise<ProjectMedia>;
    updateMediaOrder(projectId: string, mediaOrders: {
        id: string;
        order: number;
    }[]): Promise<ProjectMedia[]>;
    removeMedia(mediaId: string): Promise<void>;
    setCoverImage(projectId: string, mediaId: string): Promise<Project>;
    checkScheduledPublishing(): Promise<void>;
}
