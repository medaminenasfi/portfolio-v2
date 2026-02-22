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
exports.ResumeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const resume_entity_1 = require("./entities/resume.entity");
const fs_1 = require("fs");
let ResumeService = class ResumeService {
    constructor(resumeRepository) {
        this.resumeRepository = resumeRepository;
    }
    async uploadResume(file, title, description) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        if (file.mimetype !== 'application/pdf') {
            throw new common_1.BadRequestException('Only PDF files are allowed');
        }
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            throw new common_1.BadRequestException('File size must be less than 10MB');
        }
        const existingResumes = await this.resumeRepository.find({ where: { isActive: true } });
        if (existingResumes.length > 0) {
            await this.resumeRepository.update(existingResumes.map(r => r.id), { isActive: false });
        }
        const resume = this.resumeRepository.create({
            filename: file.filename,
            originalName: file.originalname,
            mimeType: file.mimetype,
            size: file.size,
            filePath: file.path,
            title: title || file.originalname,
            description: description || undefined,
            isActive: true,
        });
        return this.resumeRepository.save(resume);
    }
    async getCurrentResume() {
        const resume = await this.resumeRepository.findOne({
            where: { isActive: true },
            order: { createdAt: 'DESC' },
        });
        if (!resume) {
            throw new common_1.NotFoundException('No active resume found');
        }
        return resume;
    }
    async getAllResumes() {
        return this.resumeRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
    async updateResume(id, updateResumeDto) {
        const resume = await this.resumeRepository.findOne({ where: { id } });
        if (!resume) {
            throw new common_1.NotFoundException('Resume not found');
        }
        await this.resumeRepository.update(id, updateResumeDto);
        const updatedResume = await this.resumeRepository.findOne({ where: { id } });
        if (!updatedResume) {
            throw new common_1.NotFoundException('Resume not found after update');
        }
        return updatedResume;
    }
    async deleteResume(id) {
        const resume = await this.resumeRepository.findOne({ where: { id } });
        if (!resume) {
            throw new common_1.NotFoundException('Resume not found');
        }
        try {
            await fs_1.promises.unlink(resume.filePath);
        }
        catch (error) {
            console.warn('Could not delete file:', error.message);
        }
        await this.resumeRepository.delete(id);
    }
    async getResumeFilePath(id) {
        let resume;
        if (id) {
            resume = await this.resumeRepository.findOne({ where: { id } });
            if (!resume) {
                throw new common_1.NotFoundException('Resume not found');
            }
        }
        else {
            resume = await this.getCurrentResume();
        }
        try {
            await fs_1.promises.access(resume.filePath);
        }
        catch (error) {
            throw new common_1.NotFoundException('Resume file not found on server');
        }
        return resume.filePath;
    }
    async serveResume(id) {
        const resume = id
            ? await this.resumeRepository.findOne({ where: { id } })
            : await this.getCurrentResume();
        if (!resume) {
            throw new common_1.NotFoundException('Resume not found');
        }
        return {
            filePath: resume.filePath,
            filename: resume.originalName,
            mimeType: resume.mimeType,
        };
    }
    async getResumeInfo(id) {
        const resume = id
            ? await this.resumeRepository.findOne({ where: { id } })
            : await this.getCurrentResume();
        if (!resume) {
            throw new common_1.NotFoundException('Resume not found');
        }
        return {
            id: resume.id,
            filename: resume.filename,
            originalName: resume.originalName,
            mimeType: resume.mimeType,
            size: resume.size,
            title: resume.title,
            description: resume.description,
            isActive: resume.isActive,
            createdAt: resume.createdAt,
            updatedAt: resume.updatedAt,
        };
    }
};
exports.ResumeService = ResumeService;
exports.ResumeService = ResumeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(resume_entity_1.Resume)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ResumeService);
//# sourceMappingURL=resume.service.js.map