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
exports.CreateTechStackDto = void 0;
const class_validator_1 = require("class-validator");
const tech_stack_entity_1 = require("../entities/tech-stack.entity");
class CreateTechStackDto {
}
exports.CreateTechStackDto = CreateTechStackDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTechStackDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTechStackDto.prototype, "icon", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(tech_stack_entity_1.TechCategory),
    __metadata("design:type", String)
], CreateTechStackDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(tech_stack_entity_1.ProficiencyLevel),
    __metadata("design:type", String)
], CreateTechStackDto.prototype, "proficiency", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateTechStackDto.prototype, "orderIndex", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateTechStackDto.prototype, "showOnHomepage", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTechStackDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTechStackDto.prototype, "officialUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateTechStackDto.prototype, "isActive", void 0);
//# sourceMappingURL=create-tech-stack.dto.js.map