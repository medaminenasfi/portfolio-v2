import { ProjectsService } from './projects.service';
import { QueryProjectsDto } from './dto/query-projects.dto';
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
}
