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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const project_entity_1 = require("./entities/project.entity");
const project_media_entity_1 = require("./entities/project-media.entity");
let ProjectsService = class ProjectsService {
    constructor(projectRepository, mediaRepository) {
        this.projectRepository = projectRepository;
        this.mediaRepository = mediaRepository;
    }
    async create(createProjectDto) {
        try {
            const project = this.projectRepository.create(createProjectDto);
            if (createProjectDto.scheduledPublishAt) {
                project.scheduledPublishAt = new Date(createProjectDto.scheduledPublishAt);
            }
            if (project.status === project_entity_1.ProjectStatus.PUBLISHED) {
                project.publishedAt = new Date();
            }
            return await this.projectRepository.save(project);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to create project');
        }
    }
    async findAll(query) {
        const { page = 1, limit = 10, search, category, status, progressStatus, difficulty, featured, tech, sortBy = 'createdAt', sortOrder = 'DESC' } = query;
        const queryBuilder = this.projectRepository
            .createQueryBuilder('project')
            .leftJoinAndSelect('project.media', 'media')
            .orderBy(`project.${sortBy}`, sortOrder);
        if (search) {
            queryBuilder.andWhere('(project.title ILIKE :search OR project.description ILIKE :search OR project.shortSummary ILIKE :search)', { search: `%${search}%` });
        }
        if (category) {
            queryBuilder.andWhere('project.category = :category', { category });
        }
        if (status) {
            queryBuilder.andWhere('project.status = :status', { status });
        }
        if (progressStatus) {
            queryBuilder.andWhere('project.progressStatus = :progressStatus', { progressStatus });
        }
        if (difficulty) {
            queryBuilder.andWhere('project.difficulty = :difficulty', { difficulty });
        }
        if (featured !== undefined) {
            queryBuilder.andWhere('project.isFeatured = :featured', { featured });
        }
        if (tech) {
            queryBuilder.andWhere(':tech = ANY(project.techStack)', { tech });
        }
        const now = new Date();
        queryBuilder.andWhere('(project.scheduledPublishAt IS NULL OR project.scheduledPublishAt <= :now)', { now });
        const [projects, total] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        return {
            projects,
            total,
            page,
            limit,
        };
    }
    async findOne(id) {
        const project = await this.projectRepository.findOne({
            where: { id },
            relations: ['media'],
        });
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
        }
        return project;
    }
    async update(id, updateProjectDto) {
        const project = await this.findOne(id);
        try {
            if (updateProjectDto.status) {
                if (updateProjectDto.status === project_entity_1.ProjectStatus.PUBLISHED && project.status !== project_entity_1.ProjectStatus.PUBLISHED) {
                    project.publishedAt = new Date();
                }
                else if (updateProjectDto.status === project_entity_1.ProjectStatus.ARCHIVED && project.status !== project_entity_1.ProjectStatus.ARCHIVED) {
                    project.archivedAt = new Date();
                }
            }
            if (updateProjectDto.scheduledPublishAt) {
                project.scheduledPublishAt = new Date(updateProjectDto.scheduledPublishAt);
            }
            Object.assign(project, updateProjectDto);
            return await this.projectRepository.save(project);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to update project');
        }
    }
    async remove(id) {
        const project = await this.findOne(id);
        await this.projectRepository.remove(project);
    }
    async duplicate(id) {
        const originalProject = await this.findOne(id);
        const duplicatedProject = this.projectRepository.create({
            ...originalProject,
            id: undefined,
            title: `${originalProject.title} (Copy)`,
            status: project_entity_1.ProjectStatus.DRAFT,
            publishedAt: undefined,
            archivedAt: undefined,
            createdAt: undefined,
            updatedAt: undefined,
        });
        return await this.projectRepository.save(duplicatedProject);
    }
    async bulkPublish(bulkPublishDto) {
        const { projectIds, status } = bulkPublishDto;
        const projects = await this.projectRepository.findByIds(projectIds);
        if (projects.length !== projectIds.length) {
            throw new common_1.BadRequestException('Some projects not found');
        }
        const updateData = { status };
        if (status === project_entity_1.ProjectStatus.PUBLISHED) {
            updateData.publishedAt = new Date();
        }
        else if (status === project_entity_1.ProjectStatus.ARCHIVED) {
            updateData.archivedAt = new Date();
        }
        await this.projectRepository.update(projectIds, updateData);
        return await this.projectRepository.findByIds(projectIds);
    }
    async bulkDelete(bulkDeleteDto) {
        const { projectIds } = bulkDeleteDto;
        const projects = await this.projectRepository.findByIds(projectIds);
        if (projects.length !== projectIds.length) {
            throw new common_1.BadRequestException('Some projects not found');
        }
        await this.projectRepository.remove(projects);
    }
    async bulkFeature(bulkFeatureDto) {
        const { projectIds, isFeatured = true } = bulkFeatureDto;
        const projects = await this.projectRepository.findByIds(projectIds);
        if (projects.length !== projectIds.length) {
            throw new common_1.BadRequestException('Some projects not found');
        }
        await this.projectRepository.update(projectIds, { isFeatured });
        return await this.projectRepository.findByIds(projectIds);
    }
    async getStatistics() {
        const [total, published, draft, archived, featured, completed, inProgress, byCategory, byDifficulty,] = await Promise.all([
            this.projectRepository.count(),
            this.projectRepository.count({ where: { status: project_entity_1.ProjectStatus.PUBLISHED } }),
            this.projectRepository.count({ where: { status: project_entity_1.ProjectStatus.DRAFT } }),
            this.projectRepository.count({ where: { status: project_entity_1.ProjectStatus.ARCHIVED } }),
            this.projectRepository.count({ where: { isFeatured: true } }),
            this.projectRepository.count({ where: { progressStatus: project_entity_1.ProjectProgressStatus.COMPLETED } }),
            this.projectRepository.count({ where: { progressStatus: project_entity_1.ProjectProgressStatus.IN_PROGRESS } }),
            this.getCategoryStats(),
            this.getDifficultyStats(),
        ]);
        return {
            total,
            published,
            draft,
            archived,
            featured,
            completed,
            inProgress,
            byCategory,
            byDifficulty,
        };
    }
    async getCategoryStats() {
        const result = await this.projectRepository
            .createQueryBuilder('project')
            .select('project.category', 'category')
            .addSelect('COUNT(*)', 'count')
            .groupBy('project.category')
            .getRawMany();
        return result.reduce((acc, item) => {
            acc[item.category] = parseInt(item.count);
            return acc;
        }, {});
    }
    async getDifficultyStats() {
        const result = await this.projectRepository
            .createQueryBuilder('project')
            .select('project.difficulty', 'difficulty')
            .addSelect('COUNT(*)', 'count')
            .groupBy('project.difficulty')
            .getRawMany();
        return result.reduce((acc, item) => {
            acc[item.difficulty] = parseInt(item.count);
            return acc;
        }, {});
    }
    async addMedia(projectId, mediaData) {
        const project = await this.findOne(projectId);
        const lastMedia = await this.mediaRepository.findOne({
            where: { projectId },
            order: { order: 'DESC' },
        });
        const media = this.mediaRepository.create({
            ...mediaData,
            projectId,
            order: lastMedia ? lastMedia.order + 1 : 0,
        });
        return await this.mediaRepository.save(media);
    }
    async updateMediaOrder(projectId, mediaOrders) {
        await Promise.all(mediaOrders.map(({ id, order }) => this.mediaRepository.update(id, { order })));
        return await this.mediaRepository.find({
            where: { projectId },
            order: { order: 'ASC' },
        });
    }
    async removeMedia(mediaId) {
        const media = await this.mediaRepository.findOne({ where: { id: mediaId } });
        if (!media) {
            throw new common_1.NotFoundException(`Media with ID ${mediaId} not found`);
        }
        await this.mediaRepository.remove(media);
    }
    async setCoverImage(projectId, mediaId) {
        const project = await this.findOne(projectId);
        const media = await this.mediaRepository.findOne({
            where: { id: mediaId, projectId }
        });
        if (!media) {
            throw new common_1.NotFoundException(`Media with ID ${mediaId} not found in this project`);
        }
        project.coverImageId = mediaId;
        return await this.projectRepository.save(project);
    }
    async checkScheduledPublishing() {
        const now = new Date();
        const scheduledProjects = await this.projectRepository.find({
            where: {
                scheduledPublishAt: (0, typeorm_2.LessThanOrEqual)(now),
                status: project_entity_1.ProjectStatus.DRAFT,
            },
        });
        if (scheduledProjects.length > 0) {
            await this.projectRepository.update(scheduledProjects.map(p => p.id), {
                status: project_entity_1.ProjectStatus.PUBLISHED,
                publishedAt: now,
            });
        }
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __param(1, (0, typeorm_1.InjectRepository)(project_media_entity_1.ProjectMedia)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map