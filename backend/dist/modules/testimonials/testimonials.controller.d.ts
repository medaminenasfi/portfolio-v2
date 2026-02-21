import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { QueryTestimonialsDto } from './dto/query-testimonials.dto';
import { BulkUpdateStatusDto, BulkDeleteDto } from './dto/bulk-operations.dto';
export declare class TestimonialsController {
    private readonly testimonialsService;
    constructor(testimonialsService: TestimonialsService);
    create(createTestimonialDto: CreateTestimonialDto): Promise<import("./entities/testimonial.entity").Testimonial>;
    findAll(query: QueryTestimonialsDto): Promise<{
        testimonials: import("./entities/testimonial.entity").Testimonial[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getStatistics(): Promise<{
        total: number;
        approved: number;
        pending: number;
        rejected: number;
        averageRating: number;
        ratingDistribution: {
            [key: number]: number;
        };
    }>;
    findOne(id: string): Promise<import("./entities/testimonial.entity").Testimonial>;
    update(id: string, updateTestimonialDto: UpdateTestimonialDto): Promise<import("./entities/testimonial.entity").Testimonial>;
    approve(id: string, adminNotes?: string): Promise<import("./entities/testimonial.entity").Testimonial>;
    reject(id: string, adminNotes?: string): Promise<import("./entities/testimonial.entity").Testimonial>;
    remove(id: string): Promise<void>;
    bulkUpdateStatus(bulkUpdateDto: BulkUpdateStatusDto): Promise<import("./entities/testimonial.entity").Testimonial[]>;
    bulkDelete(bulkDeleteDto: BulkDeleteDto): Promise<void>;
}
export declare class PublicTestimonialsController {
    private readonly testimonialsService;
    constructor(testimonialsService: TestimonialsService);
    getApprovedTestimonials(limit?: string): Promise<import("./entities/testimonial.entity").Testimonial[]>;
    createTestimonial(createTestimonialDto: CreateTestimonialDto): Promise<import("./entities/testimonial.entity").Testimonial>;
}
