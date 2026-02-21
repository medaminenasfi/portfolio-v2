import { ContactService } from './contact.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { UpdateContactMessageDto } from './dto/update-contact-message.dto';
import { QueryContactMessagesDto } from './dto/query-contact-messages.dto';
import { BulkUpdateStatusDto, BulkUpdateLeadStatusDto, BulkDeleteDto, ConvertToLeadDto } from './dto/bulk-operations.dto';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    create(createContactMessageDto: CreateContactMessageDto, file: Express.Multer.File, req: any): Promise<import("./entities/contact-message.entity").ContactMessage>;
    findAll(query: QueryContactMessagesDto): Promise<{
        messages: import("./entities/contact-message.entity").ContactMessage[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getStatistics(): Promise<{
        total: number;
        unread: number;
        byStatus: { [key in import("./entities/contact-message.entity").MessageStatus]?: number; };
        byCategory: { [key in import("./entities/contact-message.entity").ContactCategory]?: number; };
        byLeadStatus: { [key in import("./entities/contact-message.entity").LeadStatus]?: number; };
        recentMessages: import("./entities/contact-message.entity").ContactMessage[];
    }>;
    getUnreadCount(): Promise<number>;
    searchMessages(searchTerm: string): Promise<import("./entities/contact-message.entity").ContactMessage[]>;
    findOne(id: string): Promise<import("./entities/contact-message.entity").ContactMessage>;
    update(id: string, updateContactMessageDto: UpdateContactMessageDto): Promise<import("./entities/contact-message.entity").ContactMessage>;
    markAsRead(id: string): Promise<import("./entities/contact-message.entity").ContactMessage>;
    markAsUnread(id: string): Promise<import("./entities/contact-message.entity").ContactMessage>;
    remove(id: string): Promise<void>;
    bulkUpdateStatus(bulkUpdateDto: BulkUpdateStatusDto): Promise<import("./entities/contact-message.entity").ContactMessage[]>;
    bulkUpdateLeadStatus(bulkUpdateDto: BulkUpdateLeadStatusDto): Promise<import("./entities/contact-message.entity").ContactMessage[]>;
    convertToLead(convertToLeadDto: ConvertToLeadDto): Promise<import("./entities/contact-message.entity").ContactMessage[]>;
    bulkDelete(bulkDeleteDto: BulkDeleteDto): Promise<void>;
}
