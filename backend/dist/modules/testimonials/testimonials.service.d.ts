import { Repository } from 'typeorm';
import { Testimonial } from './entities/testimonial.entity';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { QueryTestimonialsDto } from './dto/query-testimonials.dto';
import { BulkUpdateStatusDto, BulkDeleteDto } from './dto/bulk-operations.dto';
export declare class TestimonialsService {
    private readonly testimonialRepository;
    constructor(testimonialRepository: Repository<Testimonial>);
    create(createTestimonialDto: CreateTestimonialDto): Promise<Testimonial>;
    findAll(query: QueryTestimonialsDto): Promise<{
        testimonials: Testimonial[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<Testimonial>;
    update(id: string, updateTestimonialDto: UpdateTestimonialDto): Promise<Testimonial>;
    approve(id: string, adminNotes?: string): Promise<Testimonial>;
    reject(id: string, adminNotes?: string): Promise<Testimonial>;
    remove(id: string): Promise<void>;
    bulkUpdateStatus(bulkUpdateDto: BulkUpdateStatusDto): Promise<Testimonial[]>;
    bulkDelete(bulkDeleteDto: BulkDeleteDto): Promise<void>;
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
    getApprovedTestimonials(limit?: number): Promise<Testimonial[]>;
}
