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
let ProjectsService = class ProjectsService {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }
    async create(createProjectDto, userId) {
        console.log('[PROJECTS] Service create called');
        console.log('[PROJECTS] User ID:', userId);
        console.log('[PROJECTS] DTO received:', JSON.stringify(createProjectDto, null, 2));
        try {
            if (!createProjectDto.title || !createProjectDto.description) {
                throw new Error('Title and description are required');
            }
            if (!userId) {
                throw new Error('User ID is required');
            }
            const slug = createProjectDto.slug || this.generateSlug(createProjectDto.title);
            console.log('[PROJECTS] Generated slug:', slug);
            const existingProject = await this.projectRepository.findOne({
                where: { slug },
            });
            if (existingProject) {
                const uniqueSlug = `${slug}-${Date.now()}`;
                createProjectDto.slug = uniqueSlug;
                console.log('[PROJECTS] Unique slug generated:', uniqueSlug);
            }
            else {
                createProjectDto.slug = slug;
            }
            const projectData = {
                title: createProjectDto.title,
                slug: createProjectDto.slug,
                description: createProjectDto.description,
                techStack: createProjectDto.techStack || [],
                images: createProjectDto.images || [],
                bannerImage: createProjectDto.bannerImage,
                cataloguePhoto: createProjectDto.cataloguePhoto,
                liveDemoUrl: createProjectDto.liveDemoUrl,
                githubUrl: createProjectDto.githubUrl,
                category: createProjectDto.category,
                status: createProjectDto.status,
                isFeatured: createProjectDto.isFeatured || false,
            };
            console.log('[PROJECTS] Final project data (without user):', JSON.stringify(projectData, null, 2));
            const project = this.projectRepository.create(projectData);
            console.log('[PROJECTS] Project entity created');
            const savedProject = await this.projectRepository.save(project);
            console.log(`[PROJECTS] Project created: ${savedProject.title} (${savedProject.id})`);
            return savedProject;
        }
        catch (error) {
            console.error('[PROJECTS] Error creating project:', error);
            console.error('[PROJECTS] Error message:', error.message);
            console.error('[PROJECTS] Error name:', error.name);
            if (error.stack) {
                console.error('[PROJECTS] Error stack:', error.stack);
            }
            throw error;
        }
    }
    findAll() {
        return this.projectRepository.find({ order: { createdAt: 'DESC' } });
    }
    async findOne(id) {
        const project = await this.projectRepository.findOne({ where: { id } });
        if (!project) {
            throw new common_1.NotFoundException(`Project with id ${id} not found`);
        }
        return project;
    }
    async update(id, updateProjectDto) {
        const project = await this.findOne(id);
        const updateData = {
            ...updateProjectDto,
            category: updateProjectDto.category,
            status: updateProjectDto.status,
        };
        const updated = this.projectRepository.merge(project, updateData);
        return this.projectRepository.save(updated);
    }
    async remove(id) {
        const project = await this.findOne(id);
        await this.projectRepository.remove(project);
    }
    async count() {
        const total = await this.projectRepository.count();
        return { total };
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map