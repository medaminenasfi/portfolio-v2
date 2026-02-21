import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { TechStack, TechCategory, ProficiencyLevel } from './entities/tech-stack.entity';
import { CreateTechStackDto } from './dto/create-tech-stack.dto';
import { UpdateTechStackDto } from './dto/update-tech-stack.dto';
import { ReorderTechStackDto } from './dto/reorder-tech-stack.dto';

@Injectable()
export class TechStackService {
  constructor(
    @InjectRepository(TechStack)
    private readonly techStackRepository: Repository<TechStack>,
  ) {}

  async create(createTechStackDto: CreateTechStackDto): Promise<TechStack> {
    // Get the highest orderIndex for the category
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

  async findAll(category?: TechCategory, showOnHomepage?: boolean): Promise<TechStack[]> {
    const where: any = { isActive: true };

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

  async findOne(id: string): Promise<TechStack> {
    const techStack = await this.techStackRepository.findOne({ where: { id } });
    if (!techStack) {
      throw new NotFoundException('Tech stack item not found');
    }
    return techStack;
  }

  async update(id: string, updateTechStackDto: UpdateTechStackDto): Promise<TechStack> {
    await this.techStackRepository.update(id, updateTechStackDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const techStack = await this.findOne(id);
    await this.techStackRepository.delete(id);
  }

  async reorder(reorderDto: ReorderTechStackDto): Promise<TechStack[]> {
    const { techIds, orderIndexes } = reorderDto;

    if (techIds.length !== orderIndexes.length) {
      throw new Error('Tech IDs and order indexes must have the same length');
    }

    // Update each tech item with its new order
    for (let i = 0; i < techIds.length; i++) {
      await this.techStackRepository.update(techIds[i], {
        orderIndex: orderIndexes[i],
      });
    }

    // Return updated items in new order
    return this.techStackRepository.find({
      where: { id: In(techIds) },
      order: { orderIndex: 'ASC' },
    });
  }

  async getCategories(): Promise<{ category: TechCategory; count: number }[]> {
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

  async getByCategory(category: TechCategory): Promise<TechStack[]> {
    return this.techStackRepository.find({
      where: { category, isActive: true },
      order: { orderIndex: 'ASC' },
    });
  }

  async getHomepageTech(): Promise<TechStack[]> {
    return this.techStackRepository.find({
      where: { isActive: true, showOnHomepage: true },
      order: { orderIndex: 'ASC' },
      take: 12, // Limit to 12 items for homepage
    });
  }

  async getStatistics(): Promise<{
    total: number;
    byCategory: { [key in TechCategory]?: number };
    byProficiency: { [key in ProficiencyLevel]?: number };
    homepageCount: number;
  }> {
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
}
