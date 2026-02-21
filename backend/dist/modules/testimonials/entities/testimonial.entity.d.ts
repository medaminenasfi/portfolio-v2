export declare enum TestimonialStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare class Testimonial {
    id: string;
    clientName: string;
    company: string;
    position: string;
    email: string;
    rating: number;
    comment: string;
    status: TestimonialStatus;
    adminNotes: string;
    approvedAt?: Date;
    rejectedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
