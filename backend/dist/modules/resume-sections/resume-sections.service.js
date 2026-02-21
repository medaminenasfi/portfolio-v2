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
exports.ResumeSectionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const work_experience_entity_1 = require("./entities/work-experience.entity");
const education_entity_1 = require("./entities/education.entity");
const skills_entity_1 = require("./entities/skills.entity");
const certifications_entity_1 = require("./entities/certifications.entity");
const languages_entity_1 = require("./entities/languages.entity");
let ResumeSectionsService = class ResumeSectionsService {
    constructor(workExperienceRepository, educationRepository, skillsRepository, certificationsRepository, languagesRepository) {
        this.workExperienceRepository = workExperienceRepository;
        this.educationRepository = educationRepository;
        this.skillsRepository = skillsRepository;
        this.certificationsRepository = certificationsRepository;
        this.languagesRepository = languagesRepository;
    }
    async createWorkExperience(createDto) {
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
    async getAllWorkExperience() {
        return this.workExperienceRepository.find({
            where: { isActive: true },
            order: { orderIndex: 'ASC' },
        });
    }
    async updateWorkExperience(id, updateDto) {
        await this.workExperienceRepository.update(id, updateDto);
        const updated = await this.workExperienceRepository.findOne({ where: { id } });
        if (!updated) {
            throw new common_1.NotFoundException('Work experience not found');
        }
        return updated;
    }
    async deleteWorkExperience(id) {
        const workExperience = await this.workExperienceRepository.findOne({ where: { id } });
        if (!workExperience) {
            throw new common_1.NotFoundException('Work experience not found');
        }
        await this.workExperienceRepository.delete(id);
    }
    async reorderWorkExperience(reorderDto) {
        const { ids, orderIndexes } = reorderDto;
        for (let i = 0; i < ids.length; i++) {
            await this.workExperienceRepository.update(ids[i], {
                orderIndex: orderIndexes[i],
            });
        }
        return this.workExperienceRepository.find({
            where: { id: (0, typeorm_2.In)(ids) },
            order: { orderIndex: 'ASC' },
        });
    }
    async createEducation(createDto) {
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
    async getAllEducation() {
        return this.educationRepository.find({
            where: { isActive: true },
            order: { orderIndex: 'ASC' },
        });
    }
    async updateEducation(id, updateDto) {
        await this.educationRepository.update(id, updateDto);
        const updated = await this.educationRepository.findOne({ where: { id } });
        if (!updated) {
            throw new common_1.NotFoundException('Education not found');
        }
        return updated;
    }
    async deleteEducation(id) {
        const education = await this.educationRepository.findOne({ where: { id } });
        if (!education) {
            throw new common_1.NotFoundException('Education not found');
        }
        await this.educationRepository.delete(id);
    }
    async reorderEducation(reorderDto) {
        const { ids, orderIndexes } = reorderDto;
        for (let i = 0; i < ids.length; i++) {
            await this.educationRepository.update(ids[i], {
                orderIndex: orderIndexes[i],
            });
        }
        return this.educationRepository.find({
            where: { id: (0, typeorm_2.In)(ids) },
            order: { orderIndex: 'ASC' },
        });
    }
    async createSkill(createDto) {
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
    async getAllSkills(category) {
        const where = { isActive: true };
        if (category) {
            where.category = category;
        }
        return this.skillsRepository.find({
            where,
            order: { category: 'ASC', orderIndex: 'ASC' },
        });
    }
    async updateSkill(id, updateDto) {
        await this.skillsRepository.update(id, updateDto);
        const updated = await this.skillsRepository.findOne({ where: { id } });
        if (!updated) {
            throw new common_1.NotFoundException('Skill not found');
        }
        return updated;
    }
    async deleteSkill(id) {
        const skill = await this.skillsRepository.findOne({ where: { id } });
        if (!skill) {
            throw new common_1.NotFoundException('Skill not found');
        }
        await this.skillsRepository.delete(id);
    }
    async reorderSkills(reorderDto) {
        const { ids, orderIndexes } = reorderDto;
        for (let i = 0; i < ids.length; i++) {
            await this.skillsRepository.update(ids[i], {
                orderIndex: orderIndexes[i],
            });
        }
        return this.skillsRepository.find({
            where: { id: (0, typeorm_2.In)(ids) },
            order: { orderIndex: 'ASC' },
        });
    }
    async createCertification(createDto) {
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
    async getAllCertifications() {
        return this.certificationsRepository.find({
            where: { isActive: true, showOnResume: true },
            order: { orderIndex: 'ASC' },
        });
    }
    async updateCertification(id, updateDto) {
        await this.certificationsRepository.update(id, updateDto);
        const updated = await this.certificationsRepository.findOne({ where: { id } });
        if (!updated) {
            throw new common_1.NotFoundException('Certification not found');
        }
        return updated;
    }
    async deleteCertification(id) {
        const certification = await this.certificationsRepository.findOne({ where: { id } });
        if (!certification) {
            throw new common_1.NotFoundException('Certification not found');
        }
        await this.certificationsRepository.delete(id);
    }
    async reorderCertifications(reorderDto) {
        const { ids, orderIndexes } = reorderDto;
        for (let i = 0; i < ids.length; i++) {
            await this.certificationsRepository.update(ids[i], {
                orderIndex: orderIndexes[i],
            });
        }
        return this.certificationsRepository.find({
            where: { id: (0, typeorm_2.In)(ids) },
            order: { orderIndex: 'ASC' },
        });
    }
    async createLanguage(createDto) {
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
    async getAllLanguages() {
        return this.languagesRepository.find({
            where: { isActive: true },
            order: { orderIndex: 'ASC' },
        });
    }
    async updateLanguage(id, updateDto) {
        await this.languagesRepository.update(id, updateDto);
        const updated = await this.languagesRepository.findOne({ where: { id } });
        if (!updated) {
            throw new common_1.NotFoundException('Language not found');
        }
        return updated;
    }
    async deleteLanguage(id) {
        const language = await this.languagesRepository.findOne({ where: { id } });
        if (!language) {
            throw new common_1.NotFoundException('Language not found');
        }
        await this.languagesRepository.delete(id);
    }
    async reorderLanguages(reorderDto) {
        const { ids, orderIndexes } = reorderDto;
        for (let i = 0; i < ids.length; i++) {
            await this.languagesRepository.update(ids[i], {
                orderIndex: orderIndexes[i],
            });
        }
        return this.languagesRepository.find({
            where: { id: (0, typeorm_2.In)(ids) },
            order: { orderIndex: 'ASC' },
        });
    }
    async getCompleteResume() {
        return {
            workExperience: await this.getAllWorkExperience(),
            education: await this.getAllEducation(),
            skills: await this.getAllSkills(),
            certifications: await this.getAllCertifications(),
            languages: await this.getAllLanguages(),
        };
    }
};
exports.ResumeSectionsService = ResumeSectionsService;
exports.ResumeSectionsService = ResumeSectionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(work_experience_entity_1.WorkExperience)),
    __param(1, (0, typeorm_1.InjectRepository)(education_entity_1.Education)),
    __param(2, (0, typeorm_1.InjectRepository)(skills_entity_1.Skill)),
    __param(3, (0, typeorm_1.InjectRepository)(certifications_entity_1.Certification)),
    __param(4, (0, typeorm_1.InjectRepository)(languages_entity_1.Language)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ResumeSectionsService);
//# sourceMappingURL=resume-sections.service.js.map