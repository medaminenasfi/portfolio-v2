"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechStackService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tech_stack_entity_1 = require("./entities/tech-stack.entity");
let TechStackService = class TechStackService {
    constructor(techStackRepository) {
        this.techStackRepository = techStackRepository;
    }
    async create(createTechStackDto) {
        const maxOrder = await this.techStackRepository
            .createQueryBuilder('tech')
            .where('tech.category = :category', { category: createTechStackDto.category })
            .orderBy('tech.orderIndex', 'DESC')
            .getOne();
        const techStack = this.techStackRepository.create({
            ...createTechStackDto,
            orderIndex: createTechStackDto.orderIndex ?? (maxOrder?.orderIndex ?? 0) + 1,
        });
        return this.techStackRepository.save(techStack);
    }
    async findAll(category, showOnHomepage) {
        const where = { isActive: true };
        if (category) {
            where.category = category;
        }
        if (showOnHomepage !== undefined) {
            where.showOnHomepage = showOnHomepage;
        }
        return this.techStackRepository.find({
            where,
            order: { category: 'ASC', orderIndex: 'ASC' },
        });
    }
    async findOne(id) {
        const techStack = await this.techStackRepository.findOne({ where: { id } });
        if (!techStack) {
            throw new common_1.NotFoundException('Tech stack item not found');
        }
        return techStack;
    }
    async update(id, updateTechStackDto) {
        await this.techStackRepository.update(id, updateTechStackDto);
        return this.findOne(id);
    }
    async remove(id) {
        const techStack = await this.findOne(id);
        await this.techStackRepository.delete(id);
    }
    async reorder(reorderDto) {
        const { techIds, orderIndexes } = reorderDto;
        if (techIds.length !== orderIndexes.length) {
            throw new Error('Tech IDs and order indexes must have the same length');
        }
        for (let i = 0; i < techIds.length; i++) {
            await this.techStackRepository.update(techIds[i], {
                orderIndex: orderIndexes[i],
            });
        }
        return this.techStackRepository.find({
            where: { id: (0, typeorm_2.In)(techIds) },
            order: { orderIndex: 'ASC' },
        });
    }
    async getCategories() {
        const result = await this.techStackRepository
            .createQueryBuilder('tech')
            .select('tech.category', 'category')
            .addSelect('COUNT(*)', 'count')
            .where('tech.isActive = :isActive', { isActive: true })
            .groupBy('tech.category')
            .orderBy('tech.category', 'ASC')
            .getRawMany();
        return result;
    }
    async getByCategory(category) {
        return this.techStackRepository.find({
            where: { category, isActive: true },
            order: { orderIndex: 'ASC' },
        });
    }
    async getHomepageTech() {
        return this.techStackRepository.find({
            where: { isActive: true, showOnHomepage: true },
            order: { orderIndex: 'ASC' },
            take: 12,
        });
    }
    async getStatistics() {
        const total = await this.techStackRepository.count({ where: { isActive: true } });
        const byCategory = await this.techStackRepository
            .createQueryBuilder('tech')
            .select('tech.category', 'category')
            .addSelect('COUNT(*)', 'count')
            .where('tech.isActive = :isActive', { isActive: true })
            .groupBy('tech.category')
            .getRawMany();
        const byProficiency = await this.techStackRepository
            .createQueryBuilder('tech')
            .select('tech.proficiency', 'proficiency')
            .addSelect('COUNT(*)', 'count')
            .where('tech.isActive = :isActive', { isActive: true })
            .groupBy('tech.proficiency')
            .getRawMany();
        const homepageCount = await this.techStackRepository.count({
            where: { isActive: true, showOnHomepage: true },
        });
        return {
            total,
            byCategory: byCategory.reduce((acc, item) => {
                acc[item.category] = parseInt(item.count);
                return acc;
            }, {}),
            byProficiency: byProficiency.reduce((acc, item) => {
                acc[item.proficiency] = parseInt(item.count);
                return acc;
            }, {}),
            homepageCount,
        };
    }
};
exports.TechStackService = TechStackService;
exports.TechStackService = TechStackService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tech_stack_entity_1.TechStack)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TechStackService);
//# sourceMappingURL=tech-stack.service.js.map