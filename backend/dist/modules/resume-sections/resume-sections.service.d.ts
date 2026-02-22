import { Repository } from 'typeorm';
import { WorkExperience } from './entities/work-experience.entity';
import { Education } from './entities/education.entity';
import { Skill } from './entities/skills.entity';
import { Certification } from './entities/certifications.entity';
import { Language } from './entities/languages.entity';
export declare class ResumeSectionsService {
    private readonly workExperienceRepository;
    private readonly educationRepository;
    private readonly skillsRepository;
    private readonly certificationsRepository;
    private readonly languagesRepository;
    constructor(workExperienceRepository: Repository<WorkExperience>, educationRepository: Repository<Education>, skillsRepository: Repository<Skill>, certificationsRepository: Repository<Certification>, languagesRepository: Repository<Language>);
    createWorkExperience(createDto: any): Promise<WorkExperience>;
    getAllWorkExperience(): Promise<WorkExperience[]>;
    getWorkExperienceById(id: string): Promise<WorkExperience>;
    updateWorkExperience(id: string, updateDto: any): Promise<WorkExperience>;
    deleteWorkExperience(id: string): Promise<void>;
    reorderWorkExperience(reorderDto: {
        ids: string[];
        orderIndexes: number[];
    }): Promise<WorkExperience[]>;
    createEducation(createDto: any): Promise<Education>;
    getAllEducation(): Promise<Education[]>;
    updateEducation(id: string, updateDto: any): Promise<Education>;
    deleteEducation(id: string): Promise<void>;
    reorderEducation(reorderDto: {
        ids: string[];
        orderIndexes: number[];
    }): Promise<Education[]>;
    createSkill(createDto: any): Promise<Skill>;
    getAllSkills(category?: string): Promise<Skill[]>;
    updateSkill(id: string, updateDto: any): Promise<Skill>;
    deleteSkill(id: string): Promise<void>;
    reorderSkills(reorderDto: {
        ids: string[];
        orderIndexes: number[];
    }): Promise<Skill[]>;
    createCertification(createDto: any): Promise<Certification>;
    getAllCertifications(): Promise<Certification[]>;
    updateCertification(id: string, updateDto: any): Promise<Certification>;
    deleteCertification(id: string): Promise<void>;
    reorderCertifications(reorderDto: {
        ids: string[];
        orderIndexes: number[];
    }): Promise<Certification[]>;
    createLanguage(createDto: any): Promise<Language>;
    getAllLanguages(): Promise<Language[]>;
    updateLanguage(id: string, updateDto: any): Promise<Language>;
    deleteLanguage(id: string): Promise<void>;
    reorderLanguages(reorderDto: {
        ids: string[];
        orderIndexes: number[];
    }): Promise<Language[]>;
    getCompleteResume(): Promise<{
        workExperience: WorkExperience[];
        education: Education[];
        skills: Skill[];
        certifications: Certification[];
        languages: Language[];
    }>;
}
