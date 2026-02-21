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
exports.ContactController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const contact_service_1 = require("./contact.service");
const create_contact_message_dto_1 = require("./dto/create-contact-message.dto");
const update_contact_message_dto_1 = require("./dto/update-contact-message.dto");
const query_contact_messages_dto_1 = require("./dto/query-contact-messages.dto");
const bulk_operations_dto_1 = require("./dto/bulk-operations.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let ContactController = class ContactController {
    constructor(contactService) {
        this.contactService = contactService;
    }
    async create(createContactMessageDto, file, req) {
        if (file) {
            createContactMessageDto.attachment = `/uploads/contact/${file.filename}`;
        }
        const metadata = {
            userAgent: req.headers['user-agent'],
            ip: req.ip,
            referrer: req.headers.referer,
            source: req.headers.origin,
        };
        return this.contactService.create(createContactMessageDto, metadata);
    }
    findAll(query) {
        return this.contactService.findAll(query);
    }
    getStatistics() {
        return this.contactService.getStatistics();
    }
    getUnreadCount() {
        return this.contactService.getUnreadCount();
    }
    searchMessages(searchTerm) {
        return this.contactService.searchMessages(searchTerm);
    }
    findOne(id) {
        return this.contactService.findOne(id);
    }
    update(id, updateContactMessageDto) {
        return this.contactService.update(id, updateContactMessageDto);
    }
    markAsRead(id) {
        return this.contactService.markAsRead(id);
    }
    markAsUnread(id) {
        return this.contactService.markAsUnread(id);
    }
    remove(id) {
        return this.contactService.remove(id);
    }
    bulkUpdateStatus(bulkUpdateDto) {
        return this.contactService.bulkUpdateStatus(bulkUpdateDto);
    }
    bulkUpdateLeadStatus(bulkUpdateDto) {
        return this.contactService.bulkUpdateLeadStatus(bulkUpdateDto);
    }
    convertToLead(convertToLeadDto) {
        return this.contactService.convertToLead(convertToLeadDto);
    }
    bulkDelete(bulkDeleteDto) {
        return this.contactService.bulkDelete(bulkDeleteDto);
    }
};
exports.ContactController = ContactController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('attachment')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contact_message_dto_1.CreateContactMessageDto, Object, Object]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_contact_messages_dto_1.QueryContactMessagesDto]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)('unread-count'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "getUnreadCount", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "searchMessages", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_contact_message_dto_1.UpdateContactMessageDto]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/mark-read'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.Patch)(':id/mark-unread'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "markAsUnread", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)('bulk/status'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bulk_operations_dto_1.BulkUpdateStatusDto]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "bulkUpdateStatus", null);
__decorate([
    (0, common_1.Patch)('bulk/lead-status'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bulk_operations_dto_1.BulkUpdateLeadStatusDto]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "bulkUpdateLeadStatus", null);
__decorate([
    (0, common_1.Patch)('bulk/convert-to-lead'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bulk_operations_dto_1.ConvertToLeadDto]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "convertToLead", null);
__decorate([
    (0, common_1.Delete)('bulk/delete'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bulk_operations_dto_1.BulkDeleteDto]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "bulkDelete", null);
exports.ContactController = ContactController = __decorate([
    (0, common_1.Controller)('contact'),
    __metadata("design:paramtypes", [contact_service_1.ContactService])
], ContactController);
//# sourceMappingURL=contact.controller.js.map