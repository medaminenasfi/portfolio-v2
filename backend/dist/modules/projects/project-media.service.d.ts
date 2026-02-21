import { Repository } from 'typeorm';
import { ProjectMedia } from './entities/project-media.entity';
import { CreateProjectMediaDto } from './dto/create-project-media.dto';
import { UpdateProjectMediaDto } from './dto/update-project-media.dto';
import { ReorderMediaDto } from './dto/reorder-media.dto';
export declare class ProjectMediaService {
    private readonly mediaRepository;
    constructor(mediaRepository: Repository<ProjectMedia>);
    create(createMediaDto: CreateProjectMediaDto & {
        projectId: string;
    }): Promise<ProjectMedia>;
    findAll(projectId: string): Promise<ProjectMedia[]>;
    findOne(id: string): Promise<ProjectMedia>;
    update(id: string, updateMediaDto: UpdateProjectMediaDto): Promise<ProjectMedia>;
    remove(id: string): Promise<void>;
    reorderMedia(projectId: string, reorderDto: ReorderMediaDto): Promise<ProjectMedia[]>;
    setCoverImage(projectId: string, mediaId: string): Promise<ProjectMedia>;
    getCoverImage(projectId: string): Promise<ProjectMedia | null>;
}
