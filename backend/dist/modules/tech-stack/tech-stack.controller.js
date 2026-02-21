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
exports.TechStackController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const tech_stack_service_1 = require("./tech-stack.service");
const create_tech_stack_dto_1 = require("./dto/create-tech-stack.dto");
const update_tech_stack_dto_1 = require("./dto/update-tech-stack.dto");
const reorder_tech_stack_dto_1 = require("./dto/reorder-tech-stack.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const tech_stack_entity_1 = require("./entities/tech-stack.entity");
let TechStackController = class TechStackController {
    constructor(techStackService) {
        this.techStackService = techStackService;
    }
    findAll(category, showOnHomepage) {
        const showHomepage = showOnHomepage === 'true' ? true : showOnHomepage === 'false' ? false : undefined;
        return this.techStackService.findAll(category, showHomepage);
    }
    getCategories() {
        return this.techStackService.getCategories();
    }
    getByCategory(category) {
        return this.techStackService.getByCategory(category);
    }
    getHomepageTech() {
        return this.techStackService.getHomepageTech();
    }
    getStatistics() {
        return this.techStackService.getStatistics();
    }
    findOne(id) {
        return this.techStackService.findOne(id);
    }
    create(createTechStackDto) {
        return this.techStackService.create(createTechStackDto);
    }
    async uploadIcon(file) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
        if (!allowedTypes.includes(file.mimetype)) {
            throw new common_1.BadRequestException('Only image files are allowed');
        }
        return {
            iconUrl: `/uploads/tech-icons/${file.filename}`,
            filename: file.filename,
            originalName: file.originalname,
            size: file.size,
        };
    }
    reorder(reorderDto) {
        return this.techStackService.reorder(reorderDto);
    }
    update(id, updateTechStackDto) {
        return this.techStackService.update(id, updateTechStackDto);
    }
    remove(id) {
        return this.techStackService.remove(id);
    }
};
exports.TechStackController = TechStackController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('category')),
    __param(1, (0, common_1.Query)('showOnHomepage')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TechStackController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TechStackController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Get)('category/:category'),
    __param(0, (0, common_1.Param)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TechStackController.prototype, "getByCategory", null);
__decorate([
    (0, common_1.Get)('homepage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TechStackController.prototype, "getHomepageTech", null);
__decorate([
    (0, common_1.Get)('statistics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TechStackController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TechStackController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tech_stack_dto_1.CreateTechStackDto]),
    __metadata("design:returntype", void 0)
], TechStackController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('upload-icon'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TechStackController.prototype, "uploadIcon", null);
__decorate([
    (0, common_1.Patch)('reorder'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reorder_tech_stack_dto_1.ReorderTechStackDto]),
    __metadata("design:returntype", void 0)
], TechStackController.prototype, "reorder", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tech_stack_dto_1.UpdateTechStackDto]),
    __metadata("design:returntype", void 0)
], TechStackController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TechStackController.prototype, "remove", null);
exports.TechStackController = TechStackController = __decorate([
    (0, common_1.Controller)('tech-stack'),
    __metadata("design:paramtypes", [tech_stack_service_1.TechStackService])
], TechStackController);
//# sourceMappingURL=tech-stack.controller.js.map