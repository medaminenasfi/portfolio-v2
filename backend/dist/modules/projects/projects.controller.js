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
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const create_project_dto_1 = require("./dto/create-project.dto");
const update_project_dto_1 = require("./dto/update-project.dto");
const projects_service_1 = require("./projects.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const admin_guard_1 = require("../auth/guards/admin.guard");
let ProjectsController = class ProjectsController {
    constructor(projectsService) {
        this.projectsService = projectsService;
        this.projects = [];
    }
    testCreate(body, req) {
        console.log('[PROJECTS] Test create endpoint called');
        console.log('[PROJECTS] User:', req.user);
        console.log('[PROJECTS] Body:', body);
        return {
            message: 'Test endpoint working',
            user: req.user,
            body: body
        };
    }
    debugHeaders(req) {
        console.log('[PROJECTS] Debug headers endpoint called');
        console.log('[PROJECTS] Headers:', JSON.stringify(req.headers, null, 2));
        return {
            message: 'Headers captured',
            authorizationHeader: req.headers?.authorization || req.headers?.Authorization,
            headers: req.headers,
        };
    }
    testAdmin(body, req) {
        console.log('[PROJECTS] Test admin endpoint called');
        console.log('[PROJECTS] User:', req.user);
        console.log('[PROJECTS] Body:', body);
        return {
            message: 'Admin endpoint working',
            user: req.user,
            body: body
        };
    }
    async createWorking(body, req) {
        console.log('[PROJECTS] Working create called');
        console.log('[PROJECTS] User:', req.user);
        console.log('[PROJECTS] Body:', body);
        try {
            const project = {
                id: `proj-${Date.now()}`,
                title: body.title || 'Untitled Project',
                slug: body.title ? body.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-') : 'untitled',
                description: body.description || 'No description',
                techStack: body.techStack || [],
                images: body.images || [],
                bannerImage: body.bannerImage,
                cataloguePhoto: body.cataloguePhoto,
                liveDemoUrl: body.liveDemoUrl,
                githubUrl: body.githubUrl,
                category: body.category,
                status: body.status,
                isFeatured: body.isFeatured || false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                user: req.user
            };
            this.projects.push(project);
            console.log('[PROJECTS] Project created successfully:', project.title);
            return project;
        }
        catch (error) {
            console.error('[PROJECTS] Error:', error.message);
            return {
                error: error.message,
                body: body
            };
        }
    }
    create(createProjectDto, req) {
        console.log(`[PROJECTS] Creating project: ${createProjectDto.title} by ${req.user?.username}`);
        console.log(`[PROJECTS] User ID: ${req.user?.userId}`);
        console.log(`[PROJECTS] Full user object:`, JSON.stringify(req.user, null, 2));
        console.log(`[PROJECTS] Project data:`, JSON.stringify(createProjectDto, null, 2));
        if (!req.user?.userId) {
            console.error('[PROJECTS] No userId in request - authentication issue');
            throw new Error('User authentication failed - missing userId');
        }
        return this.projectsService.create(createProjectDto, req.user.userId);
    }
    getWorkingProjects() {
        return this.projects;
    }
    getWorkingProject(id) {
        return this.projects.find(p => p.id === id);
    }
    updateWorkingProject(id, body) {
        const index = this.projects.findIndex(p => p.id === id);
        if (index !== -1) {
            this.projects[index] = { ...this.projects[index], ...body, updatedAt: new Date().toISOString() };
            return this.projects[index];
        }
        return { error: 'Project not found' };
    }
    deleteWorkingProject(id) {
        const index = this.projects.findIndex(p => p.id === id);
        if (index !== -1) {
            const deleted = this.projects.splice(index, 1);
            return { message: 'Project deleted', project: deleted[0] };
        }
        return { error: 'Project not found' };
    }
    getWorkingCount() {
        return { total: this.projects.length };
    }
    findOne(id) {
        return this.projectsService.findOne(id);
    }
    findAllAdmin() {
        return this.projectsService.findAll();
    }
    findOneAdmin(id) {
        return this.projectsService.findOne(id);
    }
    update(id, updateProjectDto) {
        return this.projectsService.update(id, updateProjectDto);
    }
    count() {
        return this.projectsService.count();
    }
    uploadImage(file) {
        if (!file) {
            console.error('[PROJECTS] No file uploaded');
            throw new Error('No file uploaded');
        }
        console.log(`[PROJECTS] File uploaded: ${file.originalname} (${file.size} bytes)`);
        return {
            filename: file.filename,
            path: `/uploads/projects/${file.filename}`,
            originalName: file.originalname,
            size: file.size,
        };
    }
    remove(id) {
        return this.projectsService.remove(id);
    }
};
exports.ProjectsController = ProjectsController;
__decorate([
    (0, common_1.Post)('test-create'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "testCreate", null);
__decorate([
    (0, common_1.Post)('debug-headers'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "debugHeaders", null);
__decorate([
    (0, common_1.Post)('test-admin'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "testAdmin", null);
__decorate([
    (0, common_1.Post)('create-working'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "createWorking", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_dto_1.CreateProjectDto, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('working'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getWorkingProjects", null);
__decorate([
    (0, common_1.Get)('working/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getWorkingProject", null);
__decorate([
    (0, common_1.Patch)('working/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "updateWorkingProject", null);
__decorate([
    (0, common_1.Delete)('working/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "deleteWorkingProject", null);
__decorate([
    (0, common_1.Get)('working/count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getWorkingCount", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('admin/all'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findAllAdmin", null);
__decorate([
    (0, common_1.Get)('admin/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findOneAdmin", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_project_dto_1.UpdateProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('count'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "count", null);
__decorate([
    (0, common_1.Post)('upload-image'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, cb) => {
                cb(null, './uploads/projects');
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
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                return cb(new Error('Only image files are allowed!'), false);
            }
            cb(null, true);
        },
        limits: {
            fileSize: 5 * 1024 * 1024,
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "remove", null);
exports.ProjectsController = ProjectsController = __decorate([
    (0, common_1.Controller)('projects'),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService])
], ProjectsController);
//# sourceMappingURL=projects.controller.js.map