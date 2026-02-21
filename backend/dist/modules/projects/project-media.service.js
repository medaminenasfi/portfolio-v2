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
exports.ProjectMediaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const project_media_entity_1 = require("./entities/project-media.entity");
let ProjectMediaService = class ProjectMediaService {
    constructor(mediaRepository) {
        this.mediaRepository = mediaRepository;
    }
    async create(createMediaDto) {
        if (createMediaDto.isCover) {
            await this.mediaRepository.update({ projectId: createMediaDto.projectId, isCover: true }, { isCover: false });
        }
        const media = this.mediaRepository.create(createMediaDto);
        const savedMedia = await this.mediaRepository.save(media);
        console.log(`[MEDIA] Media created: ${savedMedia.filename} for project ${savedMedia.projectId}`);
        return savedMedia;
    }
    async findAll(projectId) {
        return this.mediaRepository.find({
            where: { projectId, isActive: true },
            order: { sortOrder: 'ASC', createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const media = await this.mediaRepository.findOne({ where: { id } });
        if (!media) {
            throw new common_1.NotFoundException(`Media with ID ${id} not found`);
        }
        return media;
    }
    async update(id, updateMediaDto) {
        const media = await this.findOne(id);
        if (updateMediaDto.isCover) {
            await this.mediaRepository.update({ projectId: media.projectId, isCover: true, id: (0, typeorm_2.Not)(id) }, { isCover: false });
        }
        Object.assign(media, updateMediaDto);
        const updatedMedia = await this.mediaRepository.save(media);
        console.log(`[MEDIA] Media updated: ${updatedMedia.filename}`);
        return updatedMedia;
    }
    async remove(id) {
        const media = await this.findOne(id);
        if (media.isCover) {
            const remainingMedia = await this.mediaRepository.findOne({
                where: { projectId: media.projectId, isActive: true },
                order: { sortOrder: 'ASC' },
            });
            if (remainingMedia) {
                await this.mediaRepository.update(remainingMedia.id, { isCover: true });
            }
        }
        await this.mediaRepository.remove(media);
        console.log(`[MEDIA] Media deleted: ${media.filename}`);
    }
    async reorderMedia(projectId, reorderDto) {
        const { items } = reorderDto;
        const mediaIds = items.map(item => item.id);
        const existingMedia = await this.mediaRepository.find({
            where: { id: (0, typeorm_2.In)(mediaIds), projectId },
        });
        if (existingMedia.length !== items.length) {
            throw new common_1.BadRequestException('Some media items do not belong to this project');
        }
        for (const item of items) {
            await this.mediaRepository.update(item.id, { sortOrder: item.sortOrder });
        }
        console.log(`[MEDIA] Media reordered for project ${projectId}`);
        return this.findAll(projectId);
    }
    async setCoverImage(projectId, mediaId) {
        await this.mediaRepository.update({ projectId, isCover: true }, { isCover: false });
        const media = await this.findOne(mediaId);
        if (media.projectId !== projectId) {
            throw new common_1.BadRequestException('Media does not belong to this project');
        }
        await this.mediaRepository.update(mediaId, { isCover: true });
        console.log(`[MEDIA] Cover image set: ${media.filename} for project ${projectId}`);
        return this.findOne(mediaId);
    }
    async getCoverImage(projectId) {
        return this.mediaRepository.findOne({
            where: { projectId, isCover: true, isActive: true },
        });
    }
};
exports.ProjectMediaService = ProjectMediaService;
exports.ProjectMediaService = ProjectMediaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_media_entity_1.ProjectMedia)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProjectMediaService);
//# sourceMappingURL=project-media.service.js.map