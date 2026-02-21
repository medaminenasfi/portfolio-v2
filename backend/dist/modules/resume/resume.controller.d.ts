import { Response } from 'express';
import { ResumeService } from './resume.service';
import { UpdateResumeDto } from './dto/update-resume.dto';
export declare class ResumeController {
    private readonly resumeService;
    constructor(resumeService: ResumeService);
    uploadResume(file: Express.Multer.File, title?: string, description?: string): Promise<import("./entities/resume.entity").Resume>;
    getCurrentResumeInfo(): Promise<Partial<import("./entities/resume.entity").Resume>>;
    downloadCurrentResume(res: Response): Promise<void>;
    serveCurrentResume(res: Response): Promise<void>;
    getAllResumes(): Promise<import("./entities/resume.entity").Resume[]>;
    getResumeInfo(id: string): Promise<Partial<import("./entities/resume.entity").Resume>>;
    downloadResume(id: string, res: Response): Promise<void>;
    updateResume(id: string, updateResumeDto: UpdateResumeDto): Promise<import("./entities/resume.entity").Resume>;
    deleteResume(id: string): Promise<{
        message: string;
    }>;
}
