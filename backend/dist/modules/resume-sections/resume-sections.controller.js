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
exports.ResumeSectionsController = void 0;
const common_1 = require("@nestjs/common");
const resume_sections_service_1 = require("./resume-sections.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const fs_1 = require("fs");
let ResumeSectionsController = class ResumeSectionsController {
    constructor(resumeSectionsService) {
        this.resumeSectionsService = resumeSectionsService;
    }
    getWorkExperience() {
        return this.resumeSectionsService.getAllWorkExperience();
    }
    createWorkExperience(createDto) {
        return this.resumeSectionsService.createWorkExperience(createDto);
    }
    updateWorkExperience(id, updateDto) {
        return this.resumeSectionsService.updateWorkExperience(id, updateDto);
    }
    deleteWorkExperience(id) {
        return this.resumeSectionsService.deleteWorkExperience(id);
    }
    reorderWorkExperience(reorderDto) {
        return this.resumeSectionsService.reorderWorkExperience(reorderDto);
    }
    getEducation() {
        return this.resumeSectionsService.getAllEducation();
    }
    createEducation(createDto) {
        return this.resumeSectionsService.createEducation(createDto);
    }
    updateEducation(id, updateDto) {
        return this.resumeSectionsService.updateEducation(id, updateDto);
    }
    deleteEducation(id) {
        return this.resumeSectionsService.deleteEducation(id);
    }
    reorderEducation(reorderDto) {
        return this.resumeSectionsService.reorderEducation(reorderDto);
    }
    uploadSkillPhoto(file) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        const relativePath = `/uploads/skills/${file.filename}`;
        return {
            url: relativePath,
            filename: file.filename,
        };
    }
    getSkills(category) {
        return this.resumeSectionsService.getAllSkills(category);
    }
    createSkill(createDto) {
        return this.resumeSectionsService.createSkill(createDto);
    }
    updateSkill(id, updateDto) {
        return this.resumeSectionsService.updateSkill(id, updateDto);
    }
    deleteSkill(id) {
        return this.resumeSectionsService.deleteSkill(id);
    }
    reorderSkills(reorderDto) {
        return this.resumeSectionsService.reorderSkills(reorderDto);
    }
    getCertifications() {
        return this.resumeSectionsService.getAllCertifications();
    }
    createCertification(createDto) {
        return this.resumeSectionsService.createCertification(createDto);
    }
    updateCertification(id, updateDto) {
        return this.resumeSectionsService.updateCertification(id, updateDto);
    }
    deleteCertification(id) {
        return this.resumeSectionsService.deleteCertification(id);
    }
    reorderCertifications(reorderDto) {
        return this.resumeSectionsService.reorderCertifications(reorderDto);
    }
    getLanguages() {
        return this.resumeSectionsService.getAllLanguages();
    }
    createLanguage(createDto) {
        return this.resumeSectionsService.createLanguage(createDto);
    }
    updateLanguage(id, updateDto) {
        return this.resumeSectionsService.updateLanguage(id, updateDto);
    }
    deleteLanguage(id) {
        return this.resumeSectionsService.deleteLanguage(id);
    }
    reorderLanguages(reorderDto) {
        return this.resumeSectionsService.reorderLanguages(reorderDto);
    }
    getCompleteResume() {
        return this.resumeSectionsService.getCompleteResume();
    }
};
exports.ResumeSectionsController = ResumeSectionsController;
__decorate([
    (0, common_1.Get)('work-experience'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ResumeSectionsController.prototype, "getWorkExperience", null);
__decorate([
    (0, common_1.Post)('work-experience'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ResumeSectionsController.prototype, "createWorkExperience", null);
__decorate([
    (0, common_1.Patch)('work-experience/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ResumeSectionsController.prototype, "updateWorkExperience", null);
__decorate([
    (0, common_1.Delete)('work-experience/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResumeSectionsController.prototype, "deleteWorkExperience", null);
__decorate([
    (0, common_1.Patch)('work-experience/reorder'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ResumeSectionsController.prototype, "reorderWorkExperience", null);
__decorate([
    (0, common_1.Get)('education'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ResumeSectionsController.prototype, "getEducation", null);
__decorate([
    (0, common_1.Post)('education'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ResumeSectionsController.prototype, "createEducation", null);
__decorate([
    (0, common_1.Patch)('education/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ResumeSectionsController.prototype, "updateEducation", null);
__decorate([
    (0, common_1.Delete)('education/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResumeSectionsController.prototype, "deleteEducation", null);
__decorate([
    (0, common_1.Patch)('education/reorder'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ResumeSectionsController.prototype, "reorderEducation", null);
__decorate([
    (0, common_1.Post)('skills/upload-photo'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, cb) => {
                const uploadPath = (0, path_1.join)(process.cwd(), 'uploads', 'skills');
                if (!(0, fs_1.existsSync)(uploadPath)) {
                    (0, fs_1.mkdirSync)(uploadPath, { recursive: true });
                }
                cb(null, uploadPath);
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                cb(null, `${uniqueSuffix}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
        fileFilter: (req, file, cb) => {
            const allowed = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
            if (!allowed.includes(file.mimetype)) {
                return cb(new common_1.BadRequestException('Only PNG, JPG, or WEBP images are allowed'), false);
            }
            cb(null, true);
        },
        limits: { fileSize: 2 * 1024 * 1024 },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ResumeSectionsController.prototype, "uploadSkillPhoto", null);
__decorate([
    (0, common_1.Get)('skills'),
    __param(0, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResumeSectionsController.prototype, "getSkills", null);
__decorate([
    (0, common_1.Post)('skills'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ResumeSectionsController.prototype, "createSkill", null);
__decorate([
    (0, common_1.Patch)('skills/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ResumeSectionsController.prototype, "updateSkill", null);
__decorate([
    (0, common_1.Delete)('skills/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResumeSectionsController.prototype, "deleteSkill", null);
__decorate([
    (0, common_1.Patch)('skills/reorder'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ResumeSectionsController.prototype, "reorderSkills", null);
__decorate([
    (0, common_1.Get)('certifications'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ResumeSectionsController.prototype, "getCertifications", null);
__decorate([
    (0, common_1.Post)('certifications'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ResumeSectionsController.prototype, "createCertification", null);
__decorate([
    (0, common_1.Patch)('certifications/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ResumeSectionsController.prototype, "updateCertification", null);
__decorate([
    (0, common_1.Delete)('certifications/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResumeSectionsController.prototype, "deleteCertification", null);
__decorate([
    (0, common_1.Patch)('certifications/reorder'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ResumeSectionsController.prototype, "reorderCertifications", null);
__decorate([
    (0, common_1.Get)('languages'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ResumeSectionsController.prototype, "getLanguages", null);
__decorate([
    (0, common_1.Post)('languages'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ResumeSectionsController.prototype, "createLanguage", null);
__decorate([
    (0, common_1.Patch)('languages/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ResumeSectionsController.prototype, "updateLanguage", null);
__decorate([
    (0, common_1.Delete)('languages/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResumeSectionsController.prototype, "deleteLanguage", null);
__decorate([
    (0, common_1.Patch)('languages/reorder'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ResumeSectionsController.prototype, "reorderLanguages", null);
__decorate([
    (0, common_1.Get)('complete'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ResumeSectionsController.prototype, "getCompleteResume", null);
exports.ResumeSectionsController = ResumeSectionsController = __decorate([
    (0, common_1.Controller)('resume-sections'),
    __metadata("design:paramtypes", [resume_sections_service_1.ResumeSectionsService])
], ResumeSectionsController);
//# sourceMappingURL=resume-sections.controller.js.map