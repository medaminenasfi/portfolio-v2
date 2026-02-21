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
exports.UpdateContactMessageDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_contact_message_dto_1 = require("./create-contact-message.dto");
const class_validator_1 = require("class-validator");
const contact_message_entity_1 = require("../entities/contact-message.entity");
class UpdateContactMessageDto extends (0, mapped_types_1.PartialType)(create_contact_message_dto_1.CreateContactMessageDto) {
}
exports.UpdateContactMessageDto = UpdateContactMessageDto;
__decorate([
    (0, class_validator_1.IsEnum)(contact_message_entity_1.MessageStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateContactMessageDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateContactMessageDto.prototype, "isRead", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(contact_message_entity_1.LeadStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateContactMessageDto.prototype, "leadStatus", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateContactMessageDto.prototype, "internalNotes", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateContactMessageDto.prototype, "adminReply", void 0);
//# sourceMappingURL=update-contact-message.dto.js.map