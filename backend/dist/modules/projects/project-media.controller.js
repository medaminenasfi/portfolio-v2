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
exports.ProjectMediaController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const admin_guard_1 = require("../auth/guards/admin.guard");
const project_media_service_1 = require("./project-media.service");
const update_project_media_dto_1 = require("./dto/update-project-media.dto");
const reorder_media_dto_1 = require("./dto/reorder-media.dto");
const project_media_entity_1 = require("./entities/project-media.entity");
let ProjectMediaController = class ProjectMediaController {
    constructor(mediaService) {
        this.mediaService = mediaService;
    }
    async uploadMedia(projectId, file, body, req) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        const createMediaDto = {
            projectId,
            filename: file.filename,
            originalName: file.originalname,
            path: `/uploads/projects/media/${file.filename}`,
            fileSize: file.size,
            mimeType: file.mimetype,
            mediaType: project_media_entity_1.MediaType.IMAGE,
            altText: body.altText,
            caption: body.caption,
            isCover: body.isCover === 'true',
            sortOrder: parseInt(body.sortOrder) || 0,
            isActive: true,
        };
        const media = await this.mediaService.create(createMediaDto);
        console.log(`[MEDIA] File uploaded: ${file.originalname} (${file.size} bytes)`);
        return media;
    }
    async findAll(projectId) {
        return this.mediaService.findAll(projectId);
    }
    async getCoverImage(projectId) {
        return this.mediaService.getCoverImage(projectId);
    }
    async findOne(id) {
        return this.mediaService.findOne(id);
    }
    async update(id, updateMediaDto) {
        return this.mediaService.update(id, updateMediaDto);
    }
    async setCoverImage(projectId, mediaId) {
        return this.mediaService.setCoverImage(projectId, mediaId);
    }
    async reorderMedia(projectId, reorderDto) {
        return this.mediaService.reorderMedia(projectId, reorderDto);
    }
    async remove(id) {
        return this.mediaService.remove(id);
    }
    async bulkUpload(projectId, file, body) {
        const media = await this.uploadMedia(projectId, file, body, { user: {} });
        return [media];
    }
};
exports.ProjectMediaController = ProjectMediaController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, cb) => {
                cb(null, './uploads/projects/media');
            },
            filename: (req, file, cb) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
        fileFilter: (req, file, cb) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
                return cb(new common_1.BadRequestException('Only image files are allowed!'), false);
            }
            cb(null, true);
        },
        limits: {
            fileSize: 10 * 1024 * 1024,
        },
    })),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProjectMediaController.prototype, "uploadMedia", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectMediaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('cover'),
    __param(0, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectMediaController.prototype, "getCoverImage", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectMediaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_project_media_dto_1.UpdateProjectMediaDto]),
    __metadata("design:returntype", Promise)
], ProjectMediaController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/set-cover'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProjectMediaController.prototype, "setCoverImage", null);
__decorate([
    (0, common_1.Patch)('reorder'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reorder_media_dto_1.ReorderMediaDto]),
    __metadata("design:returntype", Promise)
], ProjectMediaController.prototype, "reorderMedia", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectMediaController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('bulk-upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('files', {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, cb) => {
                cb(null, './uploads/projects/media');
            },
            filename: (req, file, cb) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
        fileFilter: (req, file, cb) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
                return cb(new common_1.BadRequestException('Only image files are allowed!'), false);
            }
            cb(null, true);
        },
        limits: {
            fileSize: 10 * 1024 * 1024,
            files: 10,
        },
    })),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ProjectMediaController.prototype, "bulkUpload", null);
exports.ProjectMediaController = ProjectMediaController = __decorate([
    (0, common_1.Controller)('projects/:projectId/media'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    __metadata("design:paramtypes", [project_media_service_1.ProjectMediaService])
], ProjectMediaController);
//# sourceMappingURL=project-media.controller.js.map