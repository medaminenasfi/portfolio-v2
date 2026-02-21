import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { QueryProjectsDto } from './dto/query-projects.dto';
import { BulkPublishDto, BulkDeleteDto, BulkFeatureDto } from './dto/bulk-operations.dto';
import { ProjectMedia } from './entities/project-media.entity';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(createProjectDto: CreateProjectDto): Promise<import("./entities/project.entity").Project>;
    findAll(query: QueryProjectsDto): Promise<{
        projects: import("./entities/project.entity").Project[];
        total: number;
        page: number;
        limit: number;
    }>;
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
    findOne(id: string): Promise<import("./entities/project.entity").Project>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<import("./entities/project.entity").Project>;
    remove(id: string): Promise<void>;
    duplicate(id: string): Promise<import("./entities/project.entity").Project>;
    bulkPublish(bulkPublishDto: BulkPublishDto): Promise<import("./entities/project.entity").Project[]>;
    bulkDelete(bulkDeleteDto: BulkDeleteDto): Promise<void>;
    bulkFeature(bulkFeatureDto: BulkFeatureDto): Promise<import("./entities/project.entity").Project[]>;
    uploadMedia(projectId: string, file: Express.Multer.File): Promise<ProjectMedia>;
    updateMediaOrder(projectId: string, mediaOrders: {
        id: string;
        order: number;
    }[]): Promise<ProjectMedia[]>;
    removeMedia(mediaId: string): Promise<void>;
    setCoverImage(projectId: string, mediaId: string): Promise<import("./entities/project.entity").Project>;
}
export declare class PublicProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    getAllProjects(query: QueryProjectsDto): Promise<{
        projects: import("./entities/project.entity").Project[];
        total: number;
        page: number;
        limit: number;
    }>;
    getFeaturedProjects(query: QueryProjectsDto): Promise<{
        projects: import("./entities/project.entity").Project[];
        total: number;
        page: number;
        limit: number;
    }>;
    getProjectsByCategory(category: string, query: QueryProjectsDto): Promise<{
        projects: import("./entities/project.entity").Project[];
        total: number;
        page: number;
        limit: number;
    }>;
}
