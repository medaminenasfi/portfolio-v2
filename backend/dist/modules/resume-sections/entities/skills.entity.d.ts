export declare enum SkillCategory {
    FRONTEND = "frontend",
    BACKEND = "backend",
    TOOLS = "tools",
    SOFT_SKILLS = "soft_skills",
    DATABASE = "database",
    MOBILE = "mobile",
    DESIGN = "design",
    DEVOPS_CLOUD = "devops_cloud",
    DESKTOP = "desktop"
}
export declare enum SkillProficiency {
    BEGINNER = "beginner",
    INTERMEDIATE = "intermediate",
    ADVANCED = "advanced",
    EXPERT = "expert"
}
export declare class Skill {
    id: string;
    name: string;
    photo: string;
    category: SkillCategory;
    proficiency?: SkillProficiency;
    keywords?: string[];
    description?: string;
    orderIndex: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
