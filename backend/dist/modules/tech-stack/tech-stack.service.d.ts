import { Repository } from 'typeorm';
import { TechStack, TechCategory, ProficiencyLevel } from './entities/tech-stack.entity';
import { CreateTechStackDto } from './dto/create-tech-stack.dto';
import { UpdateTechStackDto } from './dto/update-tech-stack.dto';
import { ReorderTechStackDto } from './dto/reorder-tech-stack.dto';
export declare class TechStackService {
    private readonly techStackRepository;
    constructor(techStackRepository: Repository<TechStack>);
    create(createTechStackDto: CreateTechStackDto): Promise<TechStack>;
    findAll(category?: TechCategory, showOnHomepage?: boolean): Promise<TechStack[]>;
    findOne(id: string): Promise<TechStack>;
    update(id: string, updateTechStackDto: UpdateTechStackDto): Promise<TechStack>;
    remove(id: string): Promise<void>;
    reorder(reorderDto: ReorderTechStackDto): Promise<TechStack[]>;
    getCategories(): Promise<{
        category: TechCategory;
        count: number;
    }[]>;
    getByCategory(category: TechCategory): Promise<TechStack[]>;
    getHomepageTech(): Promise<TechStack[]>;
    getStatistics(): Promise<{
        total: number;
        byCategory: {
            [key in TechCategory]?: number;
        };
        byProficiency: {
            [key in ProficiencyLevel]?: number;
        };
        homepageCount: number;
    }>;
}
