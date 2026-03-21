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
const swagger_1 = require("@nestjs/swagger");
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
    async uploadMedia(projectId, file, category) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        console.log('Uploading media for project:', projectId);
        console.log('ProjectId type:', typeof projectId);
        console.log('File details:', {
            filename: file.filename,
            originalName: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            path: file.path,
        });
        console.log('Category:', category);
        const mediaType = file.mimetype.startsWith('image/') ? project_media_entity_1.MediaType.IMAGE : project_media_entity_1.MediaType.VIDEO;
        const mediaData = {
            type: mediaType,
            filename: file.filename,
            originalName: file.originalname,
            mimeType: file.mimetype,
            size: file.size,
            url: `/uploads/projects/${file.filename}`,
        };
        const validCategories = ['banner', 'category', 'video', 'thumbnail'];
        const categoryType = category && validCategories.includes(category) ? category : 'banner';
        console.log('Saving media with category:', categoryType);
        console.log('Calling addMedia with projectId:', projectId, 'and mediaData:', mediaData);
        return this.projectsService.addMedia(projectId, mediaData, categoryType);
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
    (0, swagger_1.ApiOperation)({ summary: 'Create a new project' }),
    (0, swagger_1.ApiBody)({ type: create_project_dto_1.CreateProjectDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Project created successfully',
        schema: {
            example: {
                id: 'uuid-string',
                title: 'My Awesome Project',
                description: 'Detailed project description',
                category: 'web',
                status: 'draft',
                isFeatured: false,
                createdAt: '2024-01-01T00:00:00.000Z'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid data'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_dto_1.CreateProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all projects with filtering and pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false, enum: ['web', 'mobile', 'desktop', 'ai', 'other'], description: 'Filter by category' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['draft', 'published', 'archived'], description: 'Filter by status' }),
    (0, swagger_1.ApiQuery)({ name: 'featured', required: false, type: Boolean, description: 'Filter featured projects' }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String, description: 'Search in title and description' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Projects retrieved successfully',
        schema: {
            example: {
                data: [
                    {
                        id: 'uuid-string',
                        title: 'My Awesome Project',
                        category: 'web',
                        status: 'published',
                        isFeatured: true
                    }
                ],
                total: 1,
                page: 1,
                limit: 10,
                totalPages: 1
            }
        }
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_projects_dto_1.QueryProjectsDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get projects statistics' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Statistics retrieved successfully',
        schema: {
            example: {
                totalProjects: 25,
                publishedProjects: 20,
                draftProjects: 5,
                featuredProjects: 8,
                projectsByCategory: {
                    web: 15,
                    mobile: 5,
                    desktop: 3,
                    ai: 2
                },
                recentActivity: 12
            }
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get project by ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Project UUID',
        type: 'string'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Project retrieved successfully',
        type: create_project_dto_1.CreateProjectDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Project not found'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update project' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Project UUID',
        type: 'string'
    }),
    (0, swagger_1.ApiBody)({ type: update_project_dto_1.UpdateProjectDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Project updated successfully',
        type: create_project_dto_1.CreateProjectDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Project not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid data'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_project_dto_1.UpdateProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete project' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Project UUID',
        type: 'string'
    }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Project deleted successfully'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Project not found'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/duplicate'),
    (0, swagger_1.ApiOperation)({ summary: 'Duplicate project' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Project UUID to duplicate',
        type: 'string'
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Project duplicated successfully',
        schema: {
            example: {
                id: 'new-uuid-string',
                title: 'My Awesome Project (Copy)',
                description: 'Detailed project description',
                category: 'web',
                status: 'draft'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Project not found'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "duplicate", null);
__decorate([
    (0, common_1.Patch)('bulk/publish'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk publish/unpublish projects' }),
    (0, swagger_1.ApiBody)({ type: bulk_operations_dto_1.BulkPublishDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Projects updated successfully',
        schema: {
            example: {
                updated: 5,
                message: '5 projects updated successfully'
            }
        }
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bulk_operations_dto_1.BulkPublishDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "bulkPublish", null);
__decorate([
    (0, common_1.Delete)('bulk/delete'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk delete projects' }),
    (0, swagger_1.ApiBody)({ type: bulk_operations_dto_1.BulkDeleteDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Projects deleted successfully',
        schema: {
            example: {
                deleted: 3,
                message: '3 projects deleted successfully'
            }
        }
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bulk_operations_dto_1.BulkDeleteDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "bulkDelete", null);
__decorate([
    (0, common_1.Patch)('bulk/feature'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk feature/unfeature projects' }),
    (0, swagger_1.ApiBody)({ type: bulk_operations_dto_1.BulkFeatureDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Projects updated successfully',
        schema: {
            example: {
                updated: 4,
                message: '4 projects updated successfully'
            }
        }
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bulk_operations_dto_1.BulkFeatureDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "bulkFeature", null);
__decorate([
    (0, common_1.Post)(':id/media'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload media file for project' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Project UUID',
        type: 'string'
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'Upload media file (image or video)',
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                    description: 'Media file (jpeg, jpg, png, gif, webp, mp4, avi, mov) - Max 50MB'
                },
                category: {
                    type: 'string',
                    enum: ['banner', 'category', 'video', 'thumbnail'],
                    description: 'Media category (optional, default: banner)'
                }
            },
            required: ['file']
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Media uploaded successfully',
        schema: {
            example: {
                id: 'media-uuid',
                type: 'image',
                filename: 'unique-filename.jpg',
                originalName: 'project-screenshot.jpg',
                mimeType: 'image/jpeg',
                size: 1024000,
                url: '/uploads/projects/unique-filename.jpg',
                category: 'banner',
                order: 0
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid file type or size'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Project not found'
    }),
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
    __param(2, (0, common_1.Body)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "uploadMedia", null);
__decorate([
    (0, common_1.Patch)(':id/media/order'),
    (0, swagger_1.ApiOperation)({ summary: 'Update media order for project' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Project UUID',
        type: 'string'
    }),
    (0, swagger_1.ApiBody)({
        description: 'Media order array',
        schema: {
            example: [
                { id: 'media-uuid-1', order: 0 },
                { id: 'media-uuid-2', order: 1 }
            ]
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Media order updated successfully'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "updateMediaOrder", null);
__decorate([
    (0, common_1.Delete)('media/:mediaId'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove media from project' }),
    (0, swagger_1.ApiParam)({
        name: 'mediaId',
        description: 'Media UUID',
        type: 'string'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Media removed successfully'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Media not found'
    }),
    __param(0, (0, common_1.Param)('mediaId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "removeMedia", null);
__decorate([
    (0, common_1.Patch)(':id/cover-image'),
    (0, swagger_1.ApiOperation)({ summary: 'Set project cover image' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Project UUID',
        type: 'string'
    }),
    (0, swagger_1.ApiBody)({
        description: 'Media ID to set as cover',
        schema: {
            type: 'object',
            properties: {
                mediaId: {
                    type: 'string',
                    description: 'Media UUID to set as cover image'
                }
            },
            required: ['mediaId']
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cover image set successfully'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Project or media not found'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)('mediaId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "setCoverImage", null);
exports.ProjectsController = ProjectsController = __decorate([
    (0, swagger_1.ApiTags)('projects'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('projects'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService])
], ProjectsController);
let PublicProjectsController = class PublicProjectsController {
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    getAllProjects(query) {
        return this.projectsService.findAll(query);
    }
    getFeaturedProjects(query) {
        return this.projectsService.findAll({ ...query, featured: true, status: 'published' });
    }
    getProjectsByCategory(category, query) {
        return this.projectsService.findAll({ ...query, category: category, status: 'published' });
    }
    getProjectById(id) {
        return this.projectsService.findOne(id);
    }
};
exports.PublicProjectsController = PublicProjectsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all projects (public access)' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false, enum: ['web', 'mobile', 'desktop', 'ai', 'other'], description: 'Filter by category' }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String, description: 'Search in title and description' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Projects retrieved successfully',
        schema: {
            example: {
                data: [
                    {
                        id: 'uuid-string',
                        title: 'My Awesome Project',
                        category: 'web',
                        status: 'published',
                        isFeatured: true,
                        shortSummary: 'Brief project description'
                    }
                ],
                total: 1,
                page: 1,
                limit: 10,
                totalPages: 1
            }
        }
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_projects_dto_1.QueryProjectsDto]),
    __metadata("design:returntype", void 0)
], PublicProjectsController.prototype, "getAllProjects", null);
__decorate([
    (0, common_1.Get)('featured'),
    (0, swagger_1.ApiOperation)({ summary: 'Get featured projects (public access)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Limit number of results' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Featured projects retrieved successfully',
        schema: {
            example: {
                data: [
                    {
                        id: 'uuid-string',
                        title: 'Featured Project',
                        category: 'web',
                        shortSummary: 'Brief description',
                        coverImage: '/uploads/projects/cover.jpg'
                    }
                ],
                total: 1
            }
        }
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_projects_dto_1.QueryProjectsDto]),
    __metadata("design:returntype", void 0)
], PublicProjectsController.prototype, "getFeaturedProjects", null);
__decorate([
    (0, common_1.Get)('by-category/:category'),
    (0, swagger_1.ApiOperation)({ summary: 'Get projects by category (public access)' }),
    (0, swagger_1.ApiParam)({
        name: 'category',
        description: 'Project category',
        enum: ['web', 'mobile', 'desktop', 'ai', 'other'],
        type: 'string'
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Projects by category retrieved successfully'
    }),
    __param(0, (0, common_1.Param)('category')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, query_projects_dto_1.QueryProjectsDto]),
    __metadata("design:returntype", void 0)
], PublicProjectsController.prototype, "getProjectsByCategory", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get project by ID (public access)' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Project UUID',
        type: 'string'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Project retrieved successfully',
        type: create_project_dto_1.CreateProjectDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Project not found'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PublicProjectsController.prototype, "getProjectById", null);
exports.PublicProjectsController = PublicProjectsController = __decorate([
    (0, swagger_1.ApiTags)('public-projects'),
    (0, common_1.Controller)('public/projects'),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService])
], PublicProjectsController);
//# sourceMappingURL=projects.controller.js.map