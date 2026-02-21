import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { WorkExperience } from './entities/work-experience.entity';
import { Education } from './entities/education.entity';
import { Skill } from './entities/skills.entity';
import { Certification } from './entities/certifications.entity';
import { Language } from './entities/languages.entity';

@Injectable()
export class ResumeSectionsService {
  constructor(
    @InjectRepository(WorkExperience)
    private readonly workExperienceRepository: Repository<WorkExperience>,
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
    @InjectRepository(Skill)
    private readonly skillsRepository: Repository<Skill>,
    @InjectRepository(Certification)
    private readonly certificationsRepository: Repository<Certification>,
    @InjectRepository(Language)
    private readonly languagesRepository: Repository<Language>,
  ) {}

  // Work Experience CRUD
  async createWorkExperience(createDto: any): Promise<WorkExperience> {
    const maxOrder = await this.workExperienceRepository
      .createQueryBuilder('exp')
      .orderBy('exp.orderIndex', 'DESC')
      .getOne();

    const workExperience = this.workExperienceRepository.create({
      ...createDto,
      orderIndex: createDto.orderIndex ?? (maxOrder?.orderIndex ?? 0) + 1,
    });

    return this.workExperienceRepository.save(workExperience);
  }

  async getAllWorkExperience(): Promise<WorkExperience[]> {
    return this.workExperienceRepository.find({
      where: { isActive: true },
      order: { orderIndex: 'ASC' },
    });
  }

  async updateWorkExperience(id: string, updateDto: any): Promise<WorkExperience> {
    await this.workExperienceRepository.update(id, updateDto);
    const updated = await this.workExperienceRepository.findOne({ where: { id } });
    if (!updated) {
      throw new NotFoundException('Work experience not found');
    }
    return updated;
  }

  async deleteWorkExperience(id: string): Promise<void> {
    const workExperience = await this.workExperienceRepository.findOne({ where: { id } });
    if (!workExperience) {
      throw new NotFoundException('Work experience not found');
    }
    await this.workExperienceRepository.delete(id);
  }

  async reorderWorkExperience(reorderDto: { ids: string[]; orderIndexes: number[] }): Promise<WorkExperience[]> {
    const { ids, orderIndexes } = reorderDto;

    for (let i = 0; i < ids.length; i++) {
      await this.workExperienceRepository.update(ids[i], {
        orderIndex: orderIndexes[i],
      });
    }

    return this.workExperienceRepository.find({
      where: { id: In(ids) },
      order: { orderIndex: 'ASC' },
    });
  }

  // Education CRUD
  async createEducation(createDto: any): Promise<Education> {
    const maxOrder = await this.educationRepository
      .createQueryBuilder('edu')
      .orderBy('edu.orderIndex', 'DESC')
      .getOne();

    const education = this.educationRepository.create({
      ...createDto,
      orderIndex: createDto.orderIndex ?? (maxOrder?.orderIndex ?? 0) + 1,
    });

    return this.educationRepository.save(education);
  }

  async getAllEducation(): Promise<Education[]> {
    return this.educationRepository.find({
      where: { isActive: true },
      order: { orderIndex: 'ASC' },
    });
  }

  async updateEducation(id: string, updateDto: any): Promise<Education> {
    await this.educationRepository.update(id, updateDto);
    const updated = await this.educationRepository.findOne({ where: { id } });
    if (!updated) {
      throw new NotFoundException('Education not found');
    }
    return updated;
  }

  async deleteEducation(id: string): Promise<void> {
    const education = await this.educationRepository.findOne({ where: { id } });
    if (!education) {
      throw new NotFoundException('Education not found');
    }
    await this.educationRepository.delete(id);
  }

  async reorderEducation(reorderDto: { ids: string[]; orderIndexes: number[] }): Promise<Education[]> {
    const { ids, orderIndexes } = reorderDto;

    for (let i = 0; i < ids.length; i++) {
      await this.educationRepository.update(ids[i], {
        orderIndex: orderIndexes[i],
      });
    }

    return this.educationRepository.find({
      where: { id: In(ids) },
      order: { orderIndex: 'ASC' },
    });
  }

  // Skills CRUD
  async createSkill(createDto: any): Promise<Skill> {
    const maxOrder = await this.skillsRepository
      .createQueryBuilder('skill')
      .where('skill.category = :category', { category: createDto.category })
      .orderBy('skill.orderIndex', 'DESC')
      .getOne();

    const skill = this.skillsRepository.create({
      ...createDto,
      orderIndex: createDto.orderIndex ?? (maxOrder?.orderIndex ?? 0) + 1,
    });

    return this.skillsRepository.save(skill);
  }

  async getAllSkills(category?: string): Promise<Skill[]> {
    const where: any = { isActive: true };
    if (category) {
      where.category = category;
    }

    return this.skillsRepository.find({
      where,
      order: { category: 'ASC', orderIndex: 'ASC' },
    });
  }

  async updateSkill(id: string, updateDto: any): Promise<Skill> {
    await this.skillsRepository.update(id, updateDto);
    const updated = await this.skillsRepository.findOne({ where: { id } });
    if (!updated) {
      throw new NotFoundException('Skill not found');
    }
    return updated;
  }

  async deleteSkill(id: string): Promise<void> {
    const skill = await this.skillsRepository.findOne({ where: { id } });
    if (!skill) {
      throw new NotFoundException('Skill not found');
    }
    await this.skillsRepository.delete(id);
  }

  async reorderSkills(reorderDto: { ids: string[]; orderIndexes: number[] }): Promise<Skill[]> {
    const { ids, orderIndexes } = reorderDto;

    for (let i = 0; i < ids.length; i++) {
      await this.skillsRepository.update(ids[i], {
        orderIndex: orderIndexes[i],
      });
    }

    return this.skillsRepository.find({
      where: { id: In(ids) },
      order: { orderIndex: 'ASC' },
    });
  }

  // Certifications CRUD
  async createCertification(createDto: any): Promise<Certification> {
    const maxOrder = await this.certificationsRepository
      .createQueryBuilder('cert')
      .orderBy('cert.orderIndex', 'DESC')
      .getOne();

    const certification = this.certificationsRepository.create({
      ...createDto,
      orderIndex: createDto.orderIndex ?? (maxOrder?.orderIndex ?? 0) + 1,
    });

    return this.certificationsRepository.save(certification);
  }

  async getAllCertifications(): Promise<Certification[]> {
    return this.certificationsRepository.find({
      where: { isActive: true, showOnResume: true },
      order: { orderIndex: 'ASC' },
    });
  }

  async updateCertification(id: string, updateDto: any): Promise<Certification> {
    await this.certificationsRepository.update(id, updateDto);
    const updated = await this.certificationsRepository.findOne({ where: { id } });
    if (!updated) {
      throw new NotFoundException('Certification not found');
    }
    return updated;
  }

  async deleteCertification(id: string): Promise<void> {
    const certification = await this.certificationsRepository.findOne({ where: { id } });
    if (!certification) {
      throw new NotFoundException('Certification not found');
    }
    await this.certificationsRepository.delete(id);
  }

  async reorderCertifications(reorderDto: { ids: string[]; orderIndexes: number[] }): Promise<Certification[]> {
    const { ids, orderIndexes } = reorderDto;

    for (let i = 0; i < ids.length; i++) {
      await this.certificationsRepository.update(ids[i], {
        orderIndex: orderIndexes[i],
      });
    }

    return this.certificationsRepository.find({
      where: { id: In(ids) },
      order: { orderIndex: 'ASC' },
    });
  }

  // Languages CRUD
  async createLanguage(createDto: any): Promise<Language> {
    const maxOrder = await this.languagesRepository
      .createQueryBuilder('lang')
      .orderBy('lang.orderIndex', 'DESC')
      .getOne();

    const language = this.languagesRepository.create({
      ...createDto,
      orderIndex: createDto.orderIndex ?? (maxOrder?.orderIndex ?? 0) + 1,
    });

    return this.languagesRepository.save(language);
  }

  async getAllLanguages(): Promise<Language[]> {
    return this.languagesRepository.find({
      where: { isActive: true },
      order: { orderIndex: 'ASC' },
    });
  }

  async updateLanguage(id: string, updateDto: any): Promise<Language> {
    await this.languagesRepository.update(id, updateDto);
    const updated = await this.languagesRepository.findOne({ where: { id } });
    if (!updated) {
      throw new NotFoundException('Language not found');
    }
    return updated;
  }

  async deleteLanguage(id: string): Promise<void> {
    const language = await this.languagesRepository.findOne({ where: { id } });
    if (!language) {
      throw new NotFoundException('Language not found');
    }
    await this.languagesRepository.delete(id);
  }

  async reorderLanguages(reorderDto: { ids: string[]; orderIndexes: number[] }): Promise<Language[]> {
    const { ids, orderIndexes } = reorderDto;

    for (let i = 0; i < ids.length; i++) {
      await this.languagesRepository.update(ids[i], {
        orderIndex: orderIndexes[i],
      });
    }

    return this.languagesRepository.find({
      where: { id: In(ids) },
      order: { orderIndex: 'ASC' },
    });
  }

  // Get all resume sections
  async getCompleteResume() {
    return {
      workExperience: await this.getAllWorkExperience(),
      education: await this.getAllEducation(),
      skills: await this.getAllSkills(),
      certifications: await this.getAllCertifications(),
      languages: await this.getAllLanguages(),
    };
  }
}
