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
exports.PublicTestimonialsController = exports.TestimonialsController = void 0;
const common_1 = require("@nestjs/common");
const testimonials_service_1 = require("./testimonials.service");
const create_testimonial_dto_1 = require("./dto/create-testimonial.dto");
const update_testimonial_dto_1 = require("./dto/update-testimonial.dto");
const query_testimonials_dto_1 = require("./dto/query-testimonials.dto");
const bulk_operations_dto_1 = require("./dto/bulk-operations.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let TestimonialsController = class TestimonialsController {
    constructor(testimonialsService) {
        this.testimonialsService = testimonialsService;
    }
    create(createTestimonialDto) {
        return this.testimonialsService.create(createTestimonialDto);
    }
    findAll(query) {
        return this.testimonialsService.findAll(query);
    }
    getStatistics() {
        return this.testimonialsService.getStatistics();
    }
    findOne(id) {
        return this.testimonialsService.findOne(id);
    }
    update(id, updateTestimonialDto) {
        return this.testimonialsService.update(id, updateTestimonialDto);
    }
    approve(id, adminNotes) {
        return this.testimonialsService.approve(id, adminNotes);
    }
    reject(id, adminNotes) {
        return this.testimonialsService.reject(id, adminNotes);
    }
    remove(id) {
        return this.testimonialsService.remove(id);
    }
    bulkUpdateStatus(bulkUpdateDto) {
        return this.testimonialsService.bulkUpdateStatus(bulkUpdateDto);
    }
    bulkDelete(bulkDeleteDto) {
        return this.testimonialsService.bulkDelete(bulkDeleteDto);
    }
};
exports.TestimonialsController = TestimonialsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_testimonial_dto_1.CreateTestimonialDto]),
    __metadata("design:returntype", void 0)
], TestimonialsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_testimonials_dto_1.QueryTestimonialsDto]),
    __metadata("design:returntype", void 0)
], TestimonialsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TestimonialsController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TestimonialsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_testimonial_dto_1.UpdateTestimonialDto]),
    __metadata("design:returntype", void 0)
], TestimonialsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/approve'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)('adminNotes')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TestimonialsController.prototype, "approve", null);
__decorate([
    (0, common_1.Patch)(':id/reject'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)('adminNotes')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TestimonialsController.prototype, "reject", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TestimonialsController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)('bulk/status'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bulk_operations_dto_1.BulkUpdateStatusDto]),
    __metadata("design:returntype", void 0)
], TestimonialsController.prototype, "bulkUpdateStatus", null);
__decorate([
    (0, common_1.Delete)('bulk/delete'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bulk_operations_dto_1.BulkDeleteDto]),
    __metadata("design:returntype", void 0)
], TestimonialsController.prototype, "bulkDelete", null);
exports.TestimonialsController = TestimonialsController = __decorate([
    (0, common_1.Controller)('testimonials'),
    __metadata("design:paramtypes", [testimonials_service_1.TestimonialsService])
], TestimonialsController);
let PublicTestimonialsController = class PublicTestimonialsController {
    constructor(testimonialsService) {
        this.testimonialsService = testimonialsService;
    }
    getApprovedTestimonials(limit) {
        const limitNum = limit ? parseInt(limit) : 10;
        return this.testimonialsService.getApprovedTestimonials(limitNum);
    }
};
exports.PublicTestimonialsController = PublicTestimonialsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PublicTestimonialsController.prototype, "getApprovedTestimonials", null);
exports.PublicTestimonialsController = PublicTestimonialsController = __decorate([
    (0, common_1.Controller)('public/testimonials'),
    __metadata("design:paramtypes", [testimonials_service_1.TestimonialsService])
], PublicTestimonialsController);
//# sourceMappingURL=testimonials.controller.js.map