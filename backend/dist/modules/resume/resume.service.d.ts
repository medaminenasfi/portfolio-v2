import { Repository } from 'typeorm';
import { Resume } from './entities/resume.entity';
import { UpdateResumeDto } from './dto/update-resume.dto';
export declare class ResumeService {
    private readonly resumeRepository;
    constructor(resumeRepository: Repository<Resume>);
    uploadResume(file: Express.Multer.File, title?: string, description?: string): Promise<Resume>;
    getCurrentResume(): Promise<Resume>;
    getAllResumes(): Promise<Resume[]>;
    updateResume(id: string, updateResumeDto: UpdateResumeDto): Promise<Resume>;
    deleteResume(id: string): Promise<void>;
    getResumeFilePath(id?: string): Promise<string>;
    serveResume(id?: string): Promise<{
        filePath: string;
        filename: string;
        mimeType: string;
    }>;
    getResumeInfo(id?: string): Promise<Partial<Resume>>;
}
