import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    testCreate(body: any, req: any): {
        message: string;
        user: any;
        body: any;
    };
    debugHeaders(req: any): {
        message: string;
        authorizationHeader: any;
        headers: any;
    };
    testAdmin(body: any, req: any): {
        message: string;
        user: any;
        body: any;
    };
    createWorking(body: any, req: any): Promise<{
        id: string;
        title: any;
        slug: any;
        description: any;
        techStack: any;
        images: any;
        bannerImage: any;
        cataloguePhoto: any;
        liveDemoUrl: any;
        githubUrl: any;
        category: any;
        status: any;
        isFeatured: any;
        createdAt: string;
        updatedAt: string;
        user: any;
    } | {
        error: any;
        body: any;
    }>;
    create(createProjectDto: CreateProjectDto, req: any): Promise<Project>;
    private projects;
    getWorkingProjects(): any[];
    getWorkingProject(id: string): any;
    updateWorkingProject(id: string, body: any): any;
    deleteWorkingProject(id: string): {
        message: string;
        project: any;
        error?: undefined;
    } | {
        error: string;
        message?: undefined;
        project?: undefined;
    };
    getWorkingCount(): {
        total: number;
    };
    findOne(id: string): Promise<Project>;
    findAllAdmin(): Promise<Project[]>;
    findOneAdmin(id: string): Promise<Project>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project>;
    count(): Promise<{
        total: number;
    }>;
    uploadImage(file: Express.Multer.File): {
        filename: string;
        path: string;
        originalName: string;
        size: number;
    };
    remove(id: string): Promise<void>;
}
