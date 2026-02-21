import { CreateContactMessageDto } from './create-contact-message.dto';
import { MessageStatus, LeadStatus } from '../entities/contact-message.entity';
declare const UpdateContactMessageDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateContactMessageDto>>;
export declare class UpdateContactMessageDto extends UpdateContactMessageDto_base {
    status?: MessageStatus;
    isRead?: boolean;
    leadStatus?: LeadStatus;
    internalNotes?: string;
    adminReply?: string;
}
export {};
