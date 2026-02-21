import { ProjectMediaService } from './project-media.service';
import { UpdateProjectMediaDto } from './dto/update-project-media.dto';
import { ReorderMediaDto } from './dto/reorder-media.dto';
import { ProjectMedia } from './entities/project-media.entity';
export declare class ProjectMediaController {
    private readonly mediaService;
    constructor(mediaService: ProjectMediaService);
    uploadMedia(projectId: string, file: Express.Multer.File, body: any, req: any): Promise<ProjectMedia>;
    findAll(projectId: string): Promise<ProjectMedia[]>;
    getCoverImage(projectId: string): Promise<ProjectMedia | null>;
    findOne(id: string): Promise<ProjectMedia>;
    update(id: string, updateMediaDto: UpdateProjectMediaDto): Promise<ProjectMedia>;
    setCoverImage(projectId: string, mediaId: string): Promise<ProjectMedia>;
    reorderMedia(projectId: string, reorderDto: ReorderMediaDto): Promise<ProjectMedia[]>;
    remove(id: string): Promise<void>;
    bulkUpload(projectId: string, file: Express.Multer.File, body: any): Promise<ProjectMedia[]>;
}
