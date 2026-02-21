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
exports.TestimonialsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const testimonial_entity_1 = require("./entities/testimonial.entity");
let TestimonialsService = class TestimonialsService {
    constructor(testimonialRepository) {
        this.testimonialRepository = testimonialRepository;
    }
    async create(createTestimonialDto) {
        const testimonial = this.testimonialRepository.create(createTestimonialDto);
        return this.testimonialRepository.save(testimonial);
    }
    async findAll(query) {
        const { status, page = 1, limit = 10, rating, search, sortBy = 'createdAt', sortOrder = 'DESC', } = query;
        const where = {};
        if (status) {
            where.status = status;
        }
        if (rating) {
            where.rating = rating;
        }
        if (search) {
            where.clientName = (0, typeorm_2.Like)(`%${search}%`);
        }
        const [testimonials, total] = await this.testimonialRepository.findAndCount({
            where,
            order: { [sortBy]: sortOrder },
            skip: (page - 1) * limit,
            take: limit,
        });
        return {
            testimonials,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        const testimonial = await this.testimonialRepository.findOne({ where: { id } });
        if (!testimonial) {
            throw new Error('Testimonial not found');
        }
        return testimonial;
    }
    async update(id, updateTestimonialDto) {
        await this.testimonialRepository.update(id, updateTestimonialDto);
        return this.findOne(id);
    }
    async approve(id, adminNotes) {
        await this.testimonialRepository.update(id, {
            status: testimonial_entity_1.TestimonialStatus.APPROVED,
            approvedAt: new Date(),
            adminNotes,
        });
        return this.findOne(id);
    }
    async reject(id, adminNotes) {
        await this.testimonialRepository.update(id, {
            status: testimonial_entity_1.TestimonialStatus.REJECTED,
            rejectedAt: new Date(),
            adminNotes,
        });
        return this.findOne(id);
    }
    async remove(id) {
        await this.testimonialRepository.delete(id);
    }
    async bulkUpdateStatus(bulkUpdateDto) {
        const { testimonialIds, status, adminNotes } = bulkUpdateDto;
        const updateData = { status };
        if (status === testimonial_entity_1.TestimonialStatus.APPROVED) {
            updateData.approvedAt = new Date();
        }
        else if (status === testimonial_entity_1.TestimonialStatus.REJECTED) {
            updateData.rejectedAt = new Date();
        }
        if (adminNotes) {
            updateData.adminNotes = adminNotes;
        }
        await this.testimonialRepository.update(testimonialIds, updateData);
        return this.testimonialRepository.findByIds(testimonialIds);
    }
    async bulkDelete(bulkDeleteDto) {
        const { testimonialIds } = bulkDeleteDto;
        await this.testimonialRepository.delete(testimonialIds);
    }
    async getStatistics() {
        const total = await this.testimonialRepository.count();
        const approved = await this.testimonialRepository.count({ where: { status: testimonial_entity_1.TestimonialStatus.APPROVED } });
        const pending = await this.testimonialRepository.count({ where: { status: testimonial_entity_1.TestimonialStatus.PENDING } });
        const rejected = await this.testimonialRepository.count({ where: { status: testimonial_entity_1.TestimonialStatus.REJECTED } });
        const approvedTestimonials = await this.testimonialRepository.find({
            where: { status: testimonial_entity_1.TestimonialStatus.APPROVED },
            select: ['rating'],
        });
        const averageRating = approvedTestimonials.length > 0
            ? approvedTestimonials.reduce((sum, t) => sum + t.rating, 0) / approvedTestimonials.length
            : 0;
        const ratingDistribution = {};
        for (let i = 1; i <= 5; i++) {
            ratingDistribution[i] = await this.testimonialRepository.count({
                where: { rating: i, status: testimonial_entity_1.TestimonialStatus.APPROVED },
            });
        }
        return {
            total,
            approved,
            pending,
            rejected,
            averageRating: Math.round(averageRating * 10) / 10,
            ratingDistribution,
        };
    }
    async getApprovedTestimonials(limit = 10) {
        return this.testimonialRepository.find({
            where: { status: testimonial_entity_1.TestimonialStatus.APPROVED },
            order: { approvedAt: 'DESC' },
            take: limit,
        });
    }
};
exports.TestimonialsService = TestimonialsService;
exports.TestimonialsService = TestimonialsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(testimonial_entity_1.Testimonial)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TestimonialsService);
//# sourceMappingURL=testimonials.service.js.map