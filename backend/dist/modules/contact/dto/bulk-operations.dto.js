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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertToLeadDto = exports.BulkDeleteDto = exports.BulkUpdateLeadStatusDto = exports.BulkUpdateStatusDto = void 0;
const class_validator_1 = require("class-validator");
const contact_message_entity_1 = require("../entities/contact-message.entity");
class BulkUpdateStatusDto {
}
exports.BulkUpdateStatusDto = BulkUpdateStatusDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    __metadata("design:type", Array)
], BulkUpdateStatusDto.prototype, "messageIds", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(contact_message_entity_1.MessageStatus),
    __metadata("design:type", String)
], BulkUpdateStatusDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BulkUpdateStatusDto.prototype, "internalNotes", void 0);
class BulkUpdateLeadStatusDto {
}
exports.BulkUpdateLeadStatusDto = BulkUpdateLeadStatusDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    __metadata("design:type", Array)
], BulkUpdateLeadStatusDto.prototype, "messageIds", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(contact_message_entity_1.LeadStatus),
    __metadata("design:type", String)
], BulkUpdateLeadStatusDto.prototype, "leadStatus", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BulkUpdateLeadStatusDto.prototype, "internalNotes", void 0);
class BulkDeleteDto {
}
exports.BulkDeleteDto = BulkDeleteDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    __metadata("design:type", Array)
], BulkDeleteDto.prototype, "messageIds", void 0);
class ConvertToLeadDto {
}
exports.ConvertToLeadDto = ConvertToLeadDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    __metadata("design:type", Array)
], ConvertToLeadDto.prototype, "messageIds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ConvertToLeadDto.prototype, "leadNotes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], ConvertToLeadDto.prototype, "followUpDate", void 0);
//# sourceMappingURL=bulk-operations.dto.js.map