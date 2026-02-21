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
exports.PublicProjectsController = exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const uuid_1 = require("uuid");
const projects_service_1 = require("./projects.service");
const create_project_dto_1 = require("./dto/create-project.dto");
const update_project_dto_1 = require("./dto/update-project.dto");
const query_projects_dto_1 = require("./dto/query-projects.dto");
const bulk_operations_dto_1 = require("./dto/bulk-operations.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const project_media_entity_1 = require("./entities/project-media.entity");
let ProjectsController = class ProjectsController {
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    create(createProjectDto) {
        return this.projectsService.create(createProjectDto);
    }
    findAll(query) {
        return this.projectsService.findAll(query);
    }
    getStatistics() {
        return this.projectsService.getStatistics();
    }
    findOne(id) {
        return this.projectsService.findOne(id);
    }
    update(id, updateProjectDto) {
        return this.projectsService.update(id, updateProjectDto);
    }
    async remove(id) {
        await this.projectsService.remove(id);
    }
    duplicate(id) {
        return this.projectsService.duplicate(id);
    }
    bulkPublish(bulkPublishDto) {
        return this.projectsService.bulkPublish(bulkPublishDto);
    }
    bulkDelete(bulkDeleteDto) {
        return this.projectsService.bulkDelete(bulkDeleteDto);
    }
    bulkFeature(bulkFeatureDto) {
        return this.projectsService.bulkFeature(bulkFeatureDto);
    }
    async uploadMedia(projectId, file) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        const mediaType = file.mimetype.startsWith('image/') ? project_media_entity_1.MediaType.IMAGE : project_media_entity_1.MediaType.VIDEO;
        const mediaData = {
            type: mediaType,
            filename: file.filename,
            originalName: file.originalname,
            mimeType: file.mimetype,
            size: file.size,
            url: `/uploads/projects/${file.filename}`,
        };
        return this.projectsService.addMedia(projectId, mediaData);
    }
    updateMediaOrder(projectId, mediaOrders) {
        return this.projectsService.updateMediaOrder(projectId, mediaOrders);
    }
    removeMedia(mediaId) {
        return this.projectsService.removeMedia(mediaId);
    }
    setCoverImage(projectId, mediaId) {
        return this.projectsService.setCoverImage(projectId, mediaId);
    }
};
exports.ProjectsController = ProjectsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_dto_1.CreateProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_projects_dto_1.QueryProjectsDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('statistics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_project_dto_1.UpdateProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/duplicate'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "duplicate", null);
__decorate([
    (0, common_1.Patch)('bulk/publish'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bulk_operations_dto_1.BulkPublishDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "bulkPublish", null);
__decorate([
    (0, common_1.Delete)('bulk/delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bulk_operations_dto_1.BulkDeleteDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "bulkDelete", null);
__decorate([
    (0, common_1.Patch)('bulk/feature'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bulk_operations_dto_1.BulkFeatureDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "bulkFeature", null);
__decorate([
    (0, common_1.Post)(':id/media'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, cb) => {
                const uploadPath = (0, path_1.join)(process.cwd(), 'uploads', 'projects');
                cb(null, uploadPath);
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = (0, uuid_1.v4)();
                const ext = (0, path_1.extname)(file.originalname);
                cb(null, `${uniqueSuffix}${ext}`);
            },
        }),
        fileFilter: (req, file, cb) => {
            const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|avi|mov/;
            const fileExtname = (0, path_1.extname)(file.originalname).toLowerCase();
            const mimetype = allowedTypes.test(file.mimetype);
            if (mimetype && allowedTypes.test(fileExtname)) {
                return cb(null, true);
            }
            else {
                return cb(new common_1.BadRequestException('Only image and video files are allowed'), false);
            }
        },
        limits: {
            fileSize: 50 * 1024 * 1024,
        },
    })),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "uploadMedia", null);
__decorate([
    (0, common_1.Patch)(':id/media/order'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "updateMediaOrder", null);
__decorate([
    (0, common_1.Delete)('media/:mediaId'),
    __param(0, (0, common_1.Param)('mediaId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "removeMedia", null);
__decorate([
    (0, common_1.Patch)(':id/cover-image'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)('mediaId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "setCoverImage", null);
exports.ProjectsController = ProjectsController = __decorate([
    (0, common_1.Controller)('projects'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService])
], ProjectsController);
let PublicProjectsController = class PublicProjectsController {
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    getAllProjects(query) {
        return this.projectsService.findAll({ ...query, status: 'published' });
    }
    getFeaturedProjects(query) {
        return this.projectsService.findAll({ ...query, featured: true, status: 'published' });
    }
    getProjectsByCategory(category, query) {
        return this.projectsService.findAll({ ...query, category: category, status: 'published' });
    }
};
exports.PublicProjectsController = PublicProjectsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_projects_dto_1.QueryProjectsDto]),
    __metadata("design:returntype", void 0)
], PublicProjectsController.prototype, "getAllProjects", null);
__decorate([
    (0, common_1.Get)('featured'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_projects_dto_1.QueryProjectsDto]),
    __metadata("design:returntype", void 0)
], PublicProjectsController.prototype, "getFeaturedProjects", null);
__decorate([
    (0, common_1.Get)('by-category/:category'),
    __param(0, (0, common_1.Param)('category')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, query_projects_dto_1.QueryProjectsDto]),
    __metadata("design:returntype", void 0)
], PublicProjectsController.prototype, "getProjectsByCategory", null);
exports.PublicProjectsController = PublicProjectsController = __decorate([
    (0, common_1.Controller)('public/projects'),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService])
], PublicProjectsController);
//# sourceMappingURL=projects.controller.js.map