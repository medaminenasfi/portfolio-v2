"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const contact_message_entity_1 = require("./entities/contact-message.entity");
let ContactService = class ContactService {
    constructor(contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }
    async create(createContactMessageDto, metadata) {
        const contactMessage = this.contactMessageRepository.create({
            ...createContactMessageDto,
            metadata: metadata || {},
        });
        const saved = await this.contactMessageRepository.save(contactMessage);
        return saved;
    }
    async findAll(query) {
        const { status, leadStatus, category, isRead, search, startDate, endDate, sortBy = 'createdAt', sortOrder = 'DESC', page = 1, limit = 10, } = query;
        const where = {};
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
            where.name = (0, typeorm_2.Like)(`%${search}%`);
        }
        if (startDate && endDate) {
            where.createdAt = (0, typeorm_2.Between)(new Date(startDate), new Date(endDate));
        }
        else if (startDate) {
            where.createdAt = (0, typeorm_2.Between)(new Date(startDate), new Date());
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
    async findOne(id) {
        const message = await this.contactMessageRepository.findOne({ where: { id } });
        if (!message) {
            throw new common_1.NotFoundException('Contact message not found');
        }
        return message;
    }
    async update(id, updateContactMessageDto) {
        await this.contactMessageRepository.update(id, updateContactMessageDto);
        if (updateContactMessageDto.status === contact_message_entity_1.MessageStatus.REPLIED) {
            await this.contactMessageRepository.update(id, {
                repliedAt: new Date(),
            });
        }
        return this.findOne(id);
    }
    async markAsRead(id) {
        await this.contactMessageRepository.update(id, { isRead: true });
        return this.findOne(id);
    }
    async markAsUnread(id) {
        await this.contactMessageRepository.update(id, { isRead: false });
        return this.findOne(id);
    }
    async remove(id) {
        const message = await this.findOne(id);
        await this.contactMessageRepository.delete(id);
    }
    async bulkUpdateStatus(bulkUpdateDto) {
        const { messageIds, status, internalNotes } = bulkUpdateDto;
        const updateData = { status };
        if (status === contact_message_entity_1.MessageStatus.REPLIED) {
            updateData.repliedAt = new Date();
        }
        if (internalNotes) {
            updateData.internalNotes = internalNotes;
        }
        await this.contactMessageRepository.update(messageIds, updateData);
        return this.contactMessageRepository.findByIds(messageIds);
    }
    async bulkUpdateLeadStatus(bulkUpdateDto) {
        const { messageIds, leadStatus, internalNotes } = bulkUpdateDto;
        const updateData = { leadStatus };
        if (internalNotes) {
            updateData.internalNotes = internalNotes;
        }
        await this.contactMessageRepository.update(messageIds, updateData);
        return this.contactMessageRepository.findByIds(messageIds);
    }
    async bulkDelete(bulkDeleteDto) {
        const { messageIds } = bulkDeleteDto;
        await this.contactMessageRepository.delete(messageIds);
    }
    async convertToLead(convertToLeadDto) {
        const { messageIds, leadNotes, followUpDate } = convertToLeadDto;
        const updateData = {
            leadStatus: contact_message_entity_1.LeadStatus.LEAD,
            status: contact_message_entity_1.MessageStatus.IN_PROGRESS
        };
        if (leadNotes) {
            updateData.internalNotes = leadNotes;
        }
        await this.contactMessageRepository.update(messageIds, updateData);
        return this.contactMessageRepository.findByIds(messageIds);
    }
    async getStatistics() {
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
    async getUnreadCount() {
        return this.contactMessageRepository.count({ where: { isRead: false } });
    }
    async searchMessages(searchTerm) {
        return this.contactMessageRepository.find({
            where: [
                { name: (0, typeorm_2.Like)(`%${searchTerm}%`) },
                { email: (0, typeorm_2.Like)(`%${searchTerm}%`) },
                { subject: (0, typeorm_2.Like)(`%${searchTerm}%`) },
                { message: (0, typeorm_2.Like)(`%${searchTerm}%`) },
                { company: (0, typeorm_2.Like)(`%${searchTerm}%`) },
            ],
            order: { createdAt: 'DESC' },
        });
    }
};
exports.ContactService = ContactService;
exports.ContactService = ContactService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(contact_message_entity_1.ContactMessage)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ContactService);
//# sourceMappingURL=contact.service.js.map