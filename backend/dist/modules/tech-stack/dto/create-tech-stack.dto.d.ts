import { TechCategory, ProficiencyLevel } from '../entities/tech-stack.entity';
export declare class CreateTechStackDto {
    name: string;
    icon?: string;
    category: TechCategory;
    proficiency: ProficiencyLevel;
    orderIndex?: number;
    showOnHomepage?: boolean;
    description?: string;
    officialUrl?: string;
    isActive?: boolean;
}
