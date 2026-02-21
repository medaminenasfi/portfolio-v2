import { TestimonialStatus } from '../entities/testimonial.entity';
export declare class BulkUpdateStatusDto {
    testimonialIds: string[];
    status: TestimonialStatus;
    adminNotes?: string;
}
export declare class BulkDeleteDto {
    testimonialIds: string[];
}
