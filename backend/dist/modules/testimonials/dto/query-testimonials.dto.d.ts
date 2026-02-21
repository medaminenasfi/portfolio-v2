import { TestimonialStatus } from '../entities/testimonial.entity';
export declare class QueryTestimonialsDto {
    status?: TestimonialStatus;
    page?: number;
    limit?: number;
    rating?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
}
