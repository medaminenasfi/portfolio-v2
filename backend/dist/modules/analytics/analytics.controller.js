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
exports.AnalyticsController = void 0;
const common_1 = require("@nestjs/common");
const analytics_service_1 = require("./analytics.service");
const create_event_dto_1 = require("./dto/create-event.dto");
const get_analytics_dto_1 = require("./dto/get-analytics.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let AnalyticsController = class AnalyticsController {
    constructor(analyticsService) {
        this.analyticsService = analyticsService;
    }
    async trackEvent(createEventDto, req) {
        return this.analyticsService.trackEvent(createEventDto, req);
    }
    getAnalytics(query) {
        return this.analyticsService.getAnalytics(query);
    }
    getDashboardStats() {
        return this.analyticsService.getDashboardStats();
    }
    getOverview(query) {
        return this.analyticsService.getOverviewStats(query.startDate ? new Date(query.startDate) : undefined, query.endDate ? new Date(query.endDate) : undefined);
    }
    getTrafficStats(query) {
        const dates = this.analyticsService['getDateRange'](query.period || '7d', query.startDate ? new Date(query.startDate) : undefined, query.endDate ? new Date(query.endDate) : undefined);
        return this.analyticsService.getTrafficStats(dates.startDate, dates.endDate);
    }
    getContentStats(query) {
        const dates = this.analyticsService['getDateRange'](query.period || '7d', query.startDate ? new Date(query.startDate) : undefined, query.endDate ? new Date(query.endDate) : undefined);
        return this.analyticsService.getContentStats(dates.startDate, dates.endDate);
    }
    getEngagementStats(query) {
        const dates = this.analyticsService['getDateRange'](query.period || '7d', query.startDate ? new Date(query.startDate) : undefined, query.endDate ? new Date(query.endDate) : undefined);
        return this.analyticsService.getEngagementStats(dates.startDate, dates.endDate);
    }
    getTechnologyStats(query) {
        const dates = this.analyticsService['getDateRange'](query.period || '7d', query.startDate ? new Date(query.startDate) : undefined, query.endDate ? new Date(query.endDate) : undefined);
        return this.analyticsService.getTechnologyStats(dates.startDate, dates.endDate);
    }
    getGeographyStats(query) {
        const dates = this.analyticsService['getDateRange'](query.period || '7d', query.startDate ? new Date(query.startDate) : undefined, query.endDate ? new Date(query.endDate) : undefined);
        return this.analyticsService.getGeographyStats(dates.startDate, dates.endDate);
    }
    getTrends(query) {
        const dates = this.analyticsService['getDateRange'](query.period || '7d', query.startDate ? new Date(query.startDate) : undefined, query.endDate ? new Date(query.endDate) : undefined);
        return this.analyticsService.getTrends(dates.startDate, dates.endDate);
    }
    getRealTimeStats() {
        return this.analyticsService.getRealTimeStats();
    }
};
exports.AnalyticsController = AnalyticsController;
__decorate([
    (0, common_1.Post)('track'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_event_dto_1.CreateEventDto, Object]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "trackEvent", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_analytics_dto_1.GetAnalyticsDto]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getAnalytics", null);
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getDashboardStats", null);
__decorate([
    (0, common_1.Get)('overview'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_analytics_dto_1.GetAnalyticsDto]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getOverview", null);
__decorate([
    (0, common_1.Get)('traffic'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_analytics_dto_1.GetAnalyticsDto]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getTrafficStats", null);
__decorate([
    (0, common_1.Get)('content'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_analytics_dto_1.GetAnalyticsDto]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getContentStats", null);
__decorate([
    (0, common_1.Get)('engagement'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_analytics_dto_1.GetAnalyticsDto]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getEngagementStats", null);
__decorate([
    (0, common_1.Get)('technology'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_analytics_dto_1.GetAnalyticsDto]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getTechnologyStats", null);
__decorate([
    (0, common_1.Get)('geography'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_analytics_dto_1.GetAnalyticsDto]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getGeographyStats", null);
__decorate([
    (0, common_1.Get)('trends'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_analytics_dto_1.GetAnalyticsDto]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getTrends", null);
__decorate([
    (0, common_1.Get)('realtime'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getRealTimeStats", null);
exports.AnalyticsController = AnalyticsController = __decorate([
    (0, common_1.Controller)('analytics'),
    __metadata("design:paramtypes", [analytics_service_1.AnalyticsService])
], AnalyticsController);
//# sourceMappingURL=analytics.controller.js.map