import { MessageStatus, LeadStatus, ContactCategory } from '../entities/contact-message.entity';
export declare class QueryContactMessagesDto {
    status?: MessageStatus;
    leadStatus?: LeadStatus;
    category?: ContactCategory;
    isRead?: boolean;
    search?: string;
    startDate?: string;
    endDate?: string;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
    page?: number;
    limit?: number;
}
