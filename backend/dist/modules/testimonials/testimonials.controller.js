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
const swagger_1 = require("@nestjs/swagger");
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
    (0, swagger_1.ApiOperation)({ summary: 'Submit a new testimonial (public)' }),
    (0, swagger_1.ApiBody)({ type: create_testimonial_dto_1.CreateTestimonialDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Testimonial submitted successfully',
        schema: {
            example: {
                id: 'uuid-string',
                clientName: 'John Doe',
                company: 'Tech Corp',
                position: 'CEO',
                content: 'Excellent work! Highly recommended.',
                rating: 5,
                status: 'pending',
                createdAt: '2024-01-01T00:00:00.000Z'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid data'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_testimonial_dto_1.CreateTestimonialDto]),
    __metadata("design:returntype", void 0)
], TestimonialsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all testimonials with filtering (admin)' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['pending', 'approved', 'rejected'], description: 'Filter by status' }),
    (0, swagger_1.ApiQuery)({ name: 'rating', required: false, type: Number, description: 'Filter by rating (1-5)' }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String, description: 'Search in client name and content' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Testimonials retrieved successfully',
        schema: {
            example: {
                data: [
                    {
                        id: 'uuid-string',
                        clientName: 'John Doe',
                        company: 'Tech Corp',
                        position: 'CEO',
                        content: 'Excellent work!',
                        rating: 5,
                        status: 'pending',
                        createdAt: '2024-01-01T00:00:00.000Z'
                    }
                ],
                total: 1,
                page: 1,
                limit: 10,
                totalPages: 1
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized'
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_testimonials_dto_1.QueryTestimonialsDto]),
    __metadata("design:returntype", void 0)
], TestimonialsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Get testimonials statistics (admin)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Statistics retrieved successfully',
        schema: {
            example: {
                totalTestimonials: 50,
                pendingTestimonials: 5,
                approvedTestimonials: 40,
                rejectedTestimonials: 5,
                averageRating: 4.5,
                ratingsDistribution: {
                    5: 25,
                    4: 15,
                    3: 8,
                    2: 2,
                    1: 0
                },
                recentSubmissions: 12
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TestimonialsController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Get testimonial by ID (admin)' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Testimonial UUID',
        type: 'string'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Testimonial retrieved successfully',
        type: create_testimonial_dto_1.CreateTestimonialDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Testimonial not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TestimonialsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Update testimonial (admin)' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Testimonial UUID',
        type: 'string'
    }),
    (0, swagger_1.ApiBody)({ type: update_testimonial_dto_1.UpdateTestimonialDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Testimonial updated successfully',
        type: create_testimonial_dto_1.CreateTestimonialDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Testimonial not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_testimonial_dto_1.UpdateTestimonialDto]),
    __metadata("design:returntype", void 0)
], TestimonialsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/approve'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve testimonial (admin)' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Testimonial UUID',
        type: 'string'
    }),
    (0, swagger_1.ApiBody)({
        description: 'Admin notes for approval',
        schema: {
            type: 'object',
            properties: {
                adminNotes: {
                    type: 'string',
                    description: 'Optional admin notes',
                    example: 'Client verified, approved for display'
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Testimonial approved successfully',
        schema: {
            example: {
                id: 'uuid-string',
                status: 'approved',
                adminNotes: 'Client verified, approved for display',
                approvedAt: '2024-01-01T12:00:00.000Z'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Testimonial not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)('adminNotes')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TestimonialsController.prototype, "approve", null);
__decorate([
    (0, common_1.Patch)(':id/reject'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Reject testimonial (admin)' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Testimonial UUID',
        type: 'string'
    }),
    (0, swagger_1.ApiBody)({
        description: 'Admin notes for rejection',
        schema: {
            type: 'object',
            properties: {
                adminNotes: {
                    type: 'string',
                    description: 'Optional admin notes for rejection',
                    example: 'Content inappropriate for display'
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Testimonial rejected successfully',
        schema: {
            example: {
                id: 'uuid-string',
                status: 'rejected',
                adminNotes: 'Content inappropriate for display',
                rejectedAt: '2024-01-01T12:00:00.000Z'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Testimonial not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)('adminNotes')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TestimonialsController.prototype, "reject", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete testimonial (admin)' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Testimonial UUID',
        type: 'string'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Testimonial deleted successfully'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Testimonial not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TestimonialsController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)('bulk/status'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk update testimonial status (admin)' }),
    (0, swagger_1.ApiBody)({ type: bulk_operations_dto_1.BulkUpdateStatusDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Testimonials updated successfully',
        schema: {
            example: {
                updated: 5,
                message: '5 testimonials updated successfully'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bulk_operations_dto_1.BulkUpdateStatusDto]),
    __metadata("design:returntype", void 0)
], TestimonialsController.prototype, "bulkUpdateStatus", null);
__decorate([
    (0, common_1.Delete)('bulk/delete'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk delete testimonials (admin)' }),
    (0, swagger_1.ApiBody)({ type: bulk_operations_dto_1.BulkDeleteDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Testimonials deleted successfully',
        schema: {
            example: {
                deleted: 3,
                message: '3 testimonials deleted successfully'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bulk_operations_dto_1.BulkDeleteDto]),
    __metadata("design:returntype", void 0)
], TestimonialsController.prototype, "bulkDelete", null);
exports.TestimonialsController = TestimonialsController = __decorate([
    (0, swagger_1.ApiTags)('testimonials'),
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
    async createTestimonial(createTestimonialDto) {
        return this.testimonialsService.create(createTestimonialDto);
    }
};
exports.PublicTestimonialsController = PublicTestimonialsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get approved testimonials (public)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Limit number of results (default: 10)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Approved testimonials retrieved successfully',
        schema: {
            example: [
                {
                    id: 'uuid-string',
                    clientName: 'John Doe',
                    company: 'Tech Corp',
                    position: 'CEO',
                    content: 'Excellent work! Highly recommended.',
                    rating: 5,
                    status: 'approved',
                    createdAt: '2024-01-01T00:00:00.000Z'
                }
            ]
        }
    }),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PublicTestimonialsController.prototype, "getApprovedTestimonials", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Submit a new testimonial (public)' }),
    (0, swagger_1.ApiBody)({ type: create_testimonial_dto_1.CreateTestimonialDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Testimonial submitted successfully',
        schema: {
            example: {
                id: 'uuid-string',
                clientName: 'Jane Smith',
                company: 'Design Studio',
                position: 'Creative Director',
                content: 'Amazing work! Very professional and creative.',
                rating: 5,
                status: 'pending',
                createdAt: '2024-01-01T00:00:00.000Z'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid data'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_testimonial_dto_1.CreateTestimonialDto]),
    __metadata("design:returntype", Promise)
], PublicTestimonialsController.prototype, "createTestimonial", null);
exports.PublicTestimonialsController = PublicTestimonialsController = __decorate([
    (0, swagger_1.ApiTags)('public-testimonials'),
    (0, common_1.Controller)('public/testimonials'),
    __metadata("design:paramtypes", [testimonials_service_1.TestimonialsService])
], PublicTestimonialsController);
//# sourceMappingURL=testimonials.controller.js.map