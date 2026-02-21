export declare enum ContactCategory {
    JOB = "job",
    FREELANCE = "freelance",
    PARTNERSHIP = "partnership",
    QUESTION = "question"
}
export declare enum MessageStatus {
    NEW = "new",
    IN_PROGRESS = "in_progress",
    REPLIED = "replied",
    CLOSED = "closed"
}
export declare enum LeadStatus {
    NONE = "none",
    LEAD = "lead",
    QUALIFIED = "qualified",
    CONVERTED = "converted"
}
export declare class ContactMessage {
    id: string;
    name: string;
    email: string;
    phone: string;
    category: ContactCategory;
    company: string;
    budgetRange: string;
    deadline?: Date;
    subject: string;
    message: string;
    attachment: string;
    status: MessageStatus;
    isRead: boolean;
    leadStatus: LeadStatus;
    internalNotes: string;
    adminReply: string;
    repliedAt?: Date;
    autoReplySent: boolean;
    metadata: {
        userAgent?: string;
        ip?: string;
        referrer?: string;
        source?: string;
    };
    createdAt: Date;
    updatedAt: Date;
}
