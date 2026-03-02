import { ResumeSectionsService } from './resume-sections.service';
export declare class ResumeSectionsController {
    private readonly resumeSectionsService;
    constructor(resumeSectionsService: ResumeSectionsService);
    getWorkExperience(): Promise<import("./entities/work-experience.entity").WorkExperience[]>;
    getWorkExperienceById(id: string): Promise<import("./entities/work-experience.entity").WorkExperience>;
    createWorkExperience(createDto: any): Promise<import("./entities/work-experience.entity").WorkExperience>;
    updateWorkExperience(id: string, updateDto: any): Promise<import("./entities/work-experience.entity").WorkExperience>;
    deleteWorkExperience(id: string): Promise<void>;
    reorderWorkExperience(reorderDto: {
        ids: string[];
        orderIndexes: number[];
    }): Promise<import("./entities/work-experience.entity").WorkExperience[]>;
    getEducation(): Promise<import("./entities/education.entity").Education[]>;
    createEducation(createDto: any): Promise<import("./entities/education.entity").Education>;
    updateEducation(id: string, updateDto: any): Promise<import("./entities/education.entity").Education>;
    deleteEducation(id: string): Promise<void>;
    reorderEducation(reorderDto: {
        ids: string[];
        orderIndexes: number[];
    }): Promise<import("./entities/education.entity").Education[]>;
    uploadSkillPhoto(file: Express.Multer.File): {
        url: string;
        filename: string;
    };
    getSkills(category?: string): Promise<import("./entities/skills.entity").Skill[]>;
    createSkill(createDto: any): Promise<import("./entities/skills.entity").Skill>;
    updateSkill(id: string, updateDto: any): Promise<import("./entities/skills.entity").Skill>;
    deleteSkill(id: string): Promise<void>;
    reorderSkills(reorderDto: {
        ids: string[];
        orderIndexes: number[];
    }): Promise<import("./entities/skills.entity").Skill[]>;
    getCertifications(): Promise<import("./entities/certifications.entity").Certification[]>;
    createCertification(createDto: any): Promise<import("./entities/certifications.entity").Certification>;
    updateCertification(id: string, updateDto: any): Promise<import("./entities/certifications.entity").Certification>;
    deleteCertification(id: string): Promise<void>;
    reorderCertifications(reorderDto: {
        ids: string[];
        orderIndexes: number[];
    }): Promise<import("./entities/certifications.entity").Certification[]>;
    getLanguages(): Promise<import("./entities/languages.entity").Language[]>;
    createLanguage(createDto: any): Promise<import("./entities/languages.entity").Language>;
    updateLanguage(id: string, updateDto: any): Promise<import("./entities/languages.entity").Language>;
    deleteLanguage(id: string): Promise<void>;
    reorderLanguages(reorderDto: {
        ids: string[];
        orderIndexes: number[];
    }): Promise<import("./entities/languages.entity").Language[]>;
    getCompleteResume(): Promise<{
        workExperience: import("./entities/work-experience.entity").WorkExperience[];
        education: import("./entities/education.entity").Education[];
        skills: import("./entities/skills.entity").Skill[];
        certifications: import("./entities/certifications.entity").Certification[];
        languages: import("./entities/languages.entity").Language[];
    }>;
}
