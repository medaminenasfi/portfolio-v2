import { ProjectsService } from './projects.service';
import { QueryProjectsDto } from './dto/query-projects.dto';
import { ProjectMedia } from './entities/project-media.entity';
export declare class PublicProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    findAll(query: QueryProjectsDto): Promise<{
        projects: import("./entities/project.entity").Project[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./entities/project.entity").Project>;
    uploadMedia(projectId: string, file: Express.Multer.File): Promise<ProjectMedia>;
}
