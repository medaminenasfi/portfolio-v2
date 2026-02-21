import { MessageStatus, LeadStatus } from '../entities/contact-message.entity';
export declare class BulkUpdateStatusDto {
    messageIds: string[];
    status: MessageStatus;
    internalNotes?: string;
}
export declare class BulkUpdateLeadStatusDto {
    messageIds: string[];
    leadStatus: LeadStatus;
    internalNotes?: string;
}
export declare class BulkDeleteDto {
    messageIds: string[];
}
export declare class ConvertToLeadDto {
    messageIds: string[];
    leadNotes?: string;
    followUpDate?: Date;
}
