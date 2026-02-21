export declare enum LanguageProficiency {
    NATIVE = "native",
    FLUENT = "fluent",
    INTERMEDIATE = "intermediate",
    BASIC = "basic"
}
export declare class Language {
    id: string;
    name: string;
    proficiency: LanguageProficiency;
    description: string;
    orderIndex: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
