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
exports.UpdateSocialLinkDto = exports.CreateSocialLinkDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateSocialLinkDto {
}
exports.CreateSocialLinkDto = CreateSocialLinkDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'github', description: 'The social platform name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateSocialLinkDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://github.com/username', description: 'The social link URL' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateSocialLinkDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'github', description: 'The icon name/class' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateSocialLinkDto.prototype, "icon", void 0);
class UpdateSocialLinkDto {
}
exports.UpdateSocialLinkDto = UpdateSocialLinkDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'github', description: 'The social platform name', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], UpdateSocialLinkDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://github.com/username', description: 'The social link URL', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], UpdateSocialLinkDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'github', description: 'The icon name/class', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], UpdateSocialLinkDto.prototype, "icon", void 0);
//# sourceMappingURL=social-link.dto.js.map