import { TechStackService } from './tech-stack.service';
import { CreateTechStackDto } from './dto/create-tech-stack.dto';
import { UpdateTechStackDto } from './dto/update-tech-stack.dto';
import { ReorderTechStackDto } from './dto/reorder-tech-stack.dto';
import { TechCategory } from './entities/tech-stack.entity';
export declare class TechStackController {
    private readonly techStackService;
    constructor(techStackService: TechStackService);
    findAll(category?: TechCategory, showOnHomepage?: string): Promise<import("./entities/tech-stack.entity").TechStack[]>;
    getCategories(): Promise<{
        category: TechCategory;
        count: number;
    }[]>;
    getByCategory(category: TechCategory): Promise<import("./entities/tech-stack.entity").TechStack[]>;
    getHomepageTech(): Promise<import("./entities/tech-stack.entity").TechStack[]>;
    getStatistics(): Promise<{
        total: number;
        byCategory: { [key in TechCategory]?: number; };
        byProficiency: { [key in import("./entities/tech-stack.entity").ProficiencyLevel]?: number; };
        homepageCount: number;
    }>;
    findOne(id: string): Promise<import("./entities/tech-stack.entity").TechStack>;
    create(createTechStackDto: CreateTechStackDto): Promise<import("./entities/tech-stack.entity").TechStack>;
    uploadIcon(file: Express.Multer.File): Promise<{
        iconUrl: string;
        filename: string;
        originalName: string;
        size: number;
    }>;
    reorder(reorderDto: ReorderTechStackDto): Promise<import("./entities/tech-stack.entity").TechStack[]>;
    update(id: string, updateTechStackDto: UpdateTechStackDto): Promise<import("./entities/tech-stack.entity").TechStack>;
    remove(id: string): Promise<void>;
}
