import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Like, In } from 'typeorm';
import { ContactMessage, MessageStatus, LeadStatus, ContactCategory } from './entities/contact-message.entity';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { UpdateContactMessageDto } from './dto/update-contact-message.dto';
import { QueryContactMessagesDto } from './dto/query-contact-messages.dto';
import { BulkUpdateStatusDto, BulkUpdateLeadStatusDto, BulkDeleteDto, ConvertToLeadDto } from './dto/bulk-operations.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactMessage)
    private readonly contactMessageRepository: Repository<ContactMessage>,
  ) {}

  async create(createContactMessageDto: CreateContactMessageDto, metadata?: any): Promise<ContactMessage> {
    const contactMessage = this.contactMessageRepository.create({
      ...createContactMessageDto,
      metadata: metadata || {},
    });

    const saved = await this.contactMessageRepository.save(contactMessage);

    // TODO: Send auto-reply email if enabled
    // await this.sendAutoReply(saved);

    return saved;
  }

  async findAll(query: QueryContactMessagesDto) {
    const {
      status,
      leadStatus,
      category,
      isRead,
      search,
      startDate,
      endDate,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
      page = 1,
      limit = 10,
    } = query;

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (leadStatus) {
      where.leadStatus = leadStatus;
    }

    if (category) {
      where.category = category;
    }

    if (isRead !== undefined) {
      where.isRead = isRead;
    }

    if (search) {
      where.name = Like(`%${search}%`);
    }

    if (startDate && endDate) {
      where.createdAt = Between(new Date(startDate), new Date(endDate));
    } else if (startDate) {
      where.createdAt = Between(new Date(startDate), new Date());
    }

    const [messages, total] = await this.contactMessageRepository.findAndCount({
      where,
      order: { [sortBy]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      messages,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<ContactMessage> {
    const message = await this.contactMessageRepository.findOne({ where: { id } });
    if (!message) {
      throw new NotFoundException('Contact message not found');
    }
    return message;
  }

  async update(id: string, updateContactMessageDto: UpdateContactMessageDto): Promise<ContactMessage> {
    await this.contactMessageRepository.update(id, updateContactMessageDto);
    
    // If status is being changed to 'replied', set repliedAt
    if (updateContactMessageDto.status === MessageStatus.REPLIED) {
      await this.contactMessageRepository.update(id, {
        repliedAt: new Date(),
      });
    }

    return this.findOne(id);
  }

  async markAsRead(id: string): Promise<ContactMessage> {
    await this.contactMessageRepository.update(id, { isRead: true });
    return this.findOne(id);
  }

  async markAsUnread(id: string): Promise<ContactMessage> {
    await this.contactMessageRepository.update(id, { isRead: false });
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const message = await this.findOne(id);
    await this.contactMessageRepository.delete(id);
  }

  // Bulk operations
  async bulkUpdateStatus(bulkUpdateDto: BulkUpdateStatusDto): Promise<ContactMessage[]> {
    const { messageIds, status, internalNotes } = bulkUpdateDto;

    const updateData: any = { status };
    
    if (status === MessageStatus.REPLIED) {
      updateData.repliedAt = new Date();
    }
    
    if (internalNotes) {
      updateData.internalNotes = internalNotes;
    }

    await this.contactMessageRepository.update(messageIds, updateData);
    
    return this.contactMessageRepository.findByIds(messageIds);
  }

  async bulkUpdateLeadStatus(bulkUpdateDto: BulkUpdateLeadStatusDto): Promise<ContactMessage[]> {
    const { messageIds, leadStatus, internalNotes } = bulkUpdateDto;

    const updateData: any = { leadStatus };
    
    if (internalNotes) {
      updateData.internalNotes = internalNotes;
    }

    await this.contactMessageRepository.update(messageIds, updateData);
    
    return this.contactMessageRepository.findByIds(messageIds);
  }

  async bulkDelete(bulkDeleteDto: BulkDeleteDto): Promise<void> {
    const { messageIds } = bulkDeleteDto;
    await this.contactMessageRepository.delete(messageIds);
  }

  async convertToLead(convertToLeadDto: ConvertToLeadDto): Promise<ContactMessage[]> {
    const { messageIds, leadNotes, followUpDate } = convertToLeadDto;

    const updateData: any = { 
      leadStatus: LeadStatus.LEAD,
      status: MessageStatus.IN_PROGRESS
    };
    
    if (leadNotes) {
      updateData.internalNotes = leadNotes;
    }

    await this.contactMessageRepository.update(messageIds, updateData);
    
    return this.contactMessageRepository.findByIds(messageIds);
  }

  async getStatistics(): Promise<{
    total: number;
    unread: number;
    byStatus: { [key in MessageStatus]?: number };
    byCategory: { [key in ContactCategory]?: number };
    byLeadStatus: { [key in LeadStatus]?: number };
    recentMessages: ContactMessage[];
  }> {
    const total = await this.contactMessageRepository.count();
    const unread = await this.contactMessageRepository.count({ where: { isRead: false } });

    const byStatus = await this.contactMessageRepository
      .createQueryBuilder('message')
      .select('message.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('message.status')
      .getRawMany();

    const byCategory = await this.contactMessageRepository
      .createQueryBuilder('message')
      .select('message.category', 'category')
      .addSelect('COUNT(*)', 'count')
      .groupBy('message.category')
      .getRawMany();

    const byLeadStatus = await this.contactMessageRepository
      .createQueryBuilder('message')
      .select('message.leadStatus', 'leadStatus')
      .addSelect('COUNT(*)', 'count')
      .groupBy('message.leadStatus')
      .getRawMany();

    const recentMessages = await this.contactMessageRepository.find({
      order: { createdAt: 'DESC' },
      take: 5,
    });

    return {
      total,
      unread,
      byStatus: byStatus.reduce((acc, item) => {
        acc[item.status] = parseInt(item.count);
        return acc;
      }, {}),
      byCategory: byCategory.reduce((acc, item) => {
        acc[item.category] = parseInt(item.count);
        return acc;
      }, {}),
      byLeadStatus: byLeadStatus.reduce((acc, item) => {
        acc[item.leadStatus] = parseInt(item.count);
        return acc;
      }, {}),
      recentMessages,
    };
  }

  async getUnreadCount(): Promise<number> {
    return this.contactMessageRepository.count({ where: { isRead: false } });
  }

  async searchMessages(searchTerm: string): Promise<ContactMessage[]> {
    return this.contactMessageRepository.find({
      where: [
        { name: Like(`%${searchTerm}%`) },
        { email: Like(`%${searchTerm}%`) },
        { subject: Like(`%${searchTerm}%`) },
        { message: Like(`%${searchTerm}%`) },
        { company: Like(`%${searchTerm}%`) },
      ],
      order: { createdAt: 'DESC' },
    });
  }
}
