export declare enum TechCategory {
    FRONTEND = "frontend",
    BACKEND = "backend",
    DATABASE = "database",
    DEVOPS = "devops",
    DESIGN = "design",
    TOOLS = "tools"
}
export declare enum ProficiencyLevel {
    BEGINNER = "beginner",
    INTERMEDIATE = "intermediate",
    ADVANCED = "advanced",
    EXPERT = "expert"
}
export declare class TechStack {
    id: string;
    name: string;
    icon: string;
    category: TechCategory;
    proficiency: ProficiencyLevel;
    orderIndex: number;
    showOnHomepage: boolean;
    description: string;
    officialUrl: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
