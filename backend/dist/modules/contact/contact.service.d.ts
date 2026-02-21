import { Repository } from 'typeorm';
import { ContactMessage, MessageStatus, LeadStatus, ContactCategory } from './entities/contact-message.entity';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { UpdateContactMessageDto } from './dto/update-contact-message.dto';
import { QueryContactMessagesDto } from './dto/query-contact-messages.dto';
import { BulkUpdateStatusDto, BulkUpdateLeadStatusDto, BulkDeleteDto, ConvertToLeadDto } from './dto/bulk-operations.dto';
export declare class ContactService {
    private readonly contactMessageRepository;
    constructor(contactMessageRepository: Repository<ContactMessage>);
    create(createContactMessageDto: CreateContactMessageDto, metadata?: any): Promise<ContactMessage>;
    findAll(query: QueryContactMessagesDto): Promise<{
        messages: ContactMessage[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<ContactMessage>;
    update(id: string, updateContactMessageDto: UpdateContactMessageDto): Promise<ContactMessage>;
    markAsRead(id: string): Promise<ContactMessage>;
    markAsUnread(id: string): Promise<ContactMessage>;
    remove(id: string): Promise<void>;
    bulkUpdateStatus(bulkUpdateDto: BulkUpdateStatusDto): Promise<ContactMessage[]>;
    bulkUpdateLeadStatus(bulkUpdateDto: BulkUpdateLeadStatusDto): Promise<ContactMessage[]>;
    bulkDelete(bulkDeleteDto: BulkDeleteDto): Promise<void>;
    convertToLead(convertToLeadDto: ConvertToLeadDto): Promise<ContactMessage[]>;
    getStatistics(): Promise<{
        total: number;
        unread: number;
        byStatus: {
            [key in MessageStatus]?: number;
        };
        byCategory: {
            [key in ContactCategory]?: number;
        };
        byLeadStatus: {
            [key in LeadStatus]?: number;
        };
        recentMessages: ContactMessage[];
    }>;
    getUnreadCount(): Promise<number>;
    searchMessages(searchTerm: string): Promise<ContactMessage[]>;
}
