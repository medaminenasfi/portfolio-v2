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
exports.SettingsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const settings_service_1 = require("./settings.service");
const settings_dto_1 = require("./dto/settings.dto");
const social_link_dto_1 = require("./dto/social-link.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let SettingsController = class SettingsController {
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    async getAllStats() {
        const stats = await this.settingsService.getAllStats();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Stats retrieved successfully',
            data: stats,
        };
    }
    async createStat(createStatDto) {
        const stat = await this.settingsService.createStat(createStatDto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Stat created successfully',
            data: stat,
        };
    }
    async updateStat(id, updateStatDto) {
        const stat = await this.settingsService.updateStat(id, updateStatDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Stat updated successfully',
            data: stat,
        };
    }
    async deleteStat(id) {
        await this.settingsService.deleteStat(id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Stat deleted successfully',
        };
    }
    async getAllSocialLinks() {
        const socialLinks = await this.settingsService.getAllSocialLinks();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Social links retrieved successfully',
            data: socialLinks,
        };
    }
    async createSocialLink(createSocialLinkDto) {
        const socialLink = await this.settingsService.createSocialLink(createSocialLinkDto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Social link created successfully',
            data: socialLink,
        };
    }
    async updateSocialLink(id, updateSocialLinkDto) {
        const socialLink = await this.settingsService.updateSocialLink(id, updateSocialLinkDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Social link updated successfully',
            data: socialLink,
        };
    }
    async deleteSocialLink(id) {
        await this.settingsService.deleteSocialLink(id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Social link deleted successfully',
        };
    }
    async initializeDefaultData() {
        await this.settingsService.initializeDefaults();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Default settings data initialized successfully',
        };
    }
};
exports.SettingsController = SettingsController;
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all portfolio stats' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all portfolio stats' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "getAllStats", null);
__decorate([
    (0, common_1.Post)('stats'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new portfolio stat' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Stat created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [settings_dto_1.CreateStatDto]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "createStat", null);
__decorate([
    (0, common_1.Patch)('stats/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a portfolio stat' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Stat ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Stat updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, settings_dto_1.UpdateStatDto]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "updateStat", null);
__decorate([
    (0, common_1.Delete)('stats/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a portfolio stat' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Stat ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Stat deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "deleteStat", null);
__decorate([
    (0, common_1.Get)('social-links'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all social links' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all social links' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "getAllSocialLinks", null);
__decorate([
    (0, common_1.Post)('social-links'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new social link' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Social link created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [social_link_dto_1.CreateSocialLinkDto]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "createSocialLink", null);
__decorate([
    (0, common_1.Patch)('social-links/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a social link' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Social link ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Social link updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, social_link_dto_1.UpdateSocialLinkDto]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "updateSocialLink", null);
__decorate([
    (0, common_1.Delete)('social-links/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a social link' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Social link ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Social link deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "deleteSocialLink", null);
__decorate([
    (0, common_1.Post)('initialize'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Initialize default settings data' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Default data initialized successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "initializeDefaultData", null);
exports.SettingsController = SettingsController = __decorate([
    (0, common_1.Controller)('api/settings'),
    __metadata("design:paramtypes", [settings_service_1.SettingsService])
], SettingsController);
//# sourceMappingURL=settings.controller.js.map