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
exports.ResumeController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const uuid_1 = require("uuid");
const resume_service_1 = require("./resume.service");
const update_resume_dto_1 = require("./dto/update-resume.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const fs_1 = require("fs");
const fs_2 = require("fs");
let ResumeController = class ResumeController {
    constructor(resumeService) {
        this.resumeService = resumeService;
    }
    async uploadResume(file, title, description) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        return this.resumeService.uploadResume(file, title, description);
    }
    async getCurrentResumeInfo() {
        return this.resumeService.getResumeInfo();
    }
    async downloadCurrentResume(res) {
        try {
            const { filePath, filename, mimeType } = await this.resumeService.serveResume();
            await fs_1.promises.access(filePath);
            res.setHeader('Content-Type', mimeType);
            res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
            const fileStream = (0, fs_2.createReadStream)(filePath);
            fileStream.pipe(res);
        }
        catch (error) {
            throw new common_1.NotFoundException('Resume file not found');
        }
    }
    async serveCurrentResume(res) {
        try {
            const { filePath, filename, mimeType } = await this.resumeService.serveResume();
            await fs_1.promises.access(filePath);
            res.setHeader('Content-Type', mimeType);
            res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
            const fileStream = (0, fs_2.createReadStream)(filePath);
            fileStream.pipe(res);
        }
        catch (error) {
            throw new common_1.NotFoundException('Resume file not found');
        }
    }
    async getAllResumes() {
        return this.resumeService.getAllResumes();
    }
    async getResumeInfo(id) {
        return this.resumeService.getResumeInfo(id);
    }
    async downloadResume(id, res) {
        try {
            const { filePath, filename, mimeType } = await this.resumeService.serveResume(id);
            await fs_1.promises.access(filePath);
            res.setHeader('Content-Type', mimeType);
            res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
            const fileStream = (0, fs_2.createReadStream)(filePath);
            fileStream.pipe(res);
        }
        catch (error) {
            throw new common_1.NotFoundException('Resume file not found');
        }
    }
    async updateResume(id, updateResumeDto) {
        return this.resumeService.updateResume(id, updateResumeDto);
    }
    async deleteResume(id) {
        await this.resumeService.deleteResume(id);
        return { message: 'Resume deleted successfully' };
    }
};
exports.ResumeController = ResumeController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, cb) => {
                const uploadPath = (0, path_1.join)(process.cwd(), 'uploads', 'resume');
                cb(null, uploadPath);
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = (0, uuid_1.v4)();
                const ext = (0, path_1.extname)(file.originalname);
                cb(null, `${uniqueSuffix}${ext}`);
            },
        }),
        fileFilter: (req, file, cb) => {
            if (file.mimetype !== 'application/pdf') {
                return cb(new common_1.BadRequestException('Only PDF files are allowed'), false);
            }
            cb(null, true);
        },
        limits: {
            fileSize: 10 * 1024 * 1024,
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('title')),
    __param(2, (0, common_1.Body)('description')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "uploadResume", null);
__decorate([
    (0, common_1.Get)('current'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "getCurrentResumeInfo", null);
__decorate([
    (0, common_1.Get)('download'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "downloadCurrentResume", null);
__decorate([
    (0, common_1.Get)('serve'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "serveCurrentResume", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "getAllResumes", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "getResumeInfo", null);
__decorate([
    (0, common_1.Get)(':id/download'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "downloadResume", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_resume_dto_1.UpdateResumeDto]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "updateResume", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "deleteResume", null);
exports.ResumeController = ResumeController = __decorate([
    (0, common_1.Controller)('resume'),
    __metadata("design:paramtypes", [resume_service_1.ResumeService])
], ResumeController);
//# sourceMappingURL=resume.controller.js.map