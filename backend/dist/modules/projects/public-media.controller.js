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
exports.PublicProjectsController = void 0;
const common_1 = require("@nestjs/common");
const projects_service_1 = require("./projects.service");
const query_projects_dto_1 = require("./dto/query-projects.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const uuid_1 = require("uuid");
const project_media_entity_1 = require("./entities/project-media.entity");
let PublicProjectsController = class PublicProjectsController {
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    async findAll(query) {
        return this.projectsService.findAll(query);
    }
    async findOne(id) {
        return this.projectsService.findOne(id);
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
};
exports.PublicProjectsController = PublicProjectsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_projects_dto_1.QueryProjectsDto]),
    __metadata("design:returntype", Promise)
], PublicProjectsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicProjectsController.prototype, "findOne", null);
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
], PublicProjectsController.prototype, "uploadMedia", null);
exports.PublicProjectsController = PublicProjectsController = __decorate([
    (0, common_1.Controller)('public/projects'),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService])
], PublicProjectsController);
//# sourceMappingURL=public-media.controller.js.map