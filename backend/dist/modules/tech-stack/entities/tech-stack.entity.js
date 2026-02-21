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
exports.TechStack = exports.ProficiencyLevel = exports.TechCategory = void 0;
const typeorm_1 = require("typeorm");
var TechCategory;
(function (TechCategory) {
    TechCategory["FRONTEND"] = "frontend";
    TechCategory["BACKEND"] = "backend";
    TechCategory["DATABASE"] = "database";
    TechCategory["DEVOPS"] = "devops";
    TechCategory["DESIGN"] = "design";
    TechCategory["TOOLS"] = "tools";
})(TechCategory || (exports.TechCategory = TechCategory = {}));
var ProficiencyLevel;
(function (ProficiencyLevel) {
    ProficiencyLevel["BEGINNER"] = "beginner";
    ProficiencyLevel["INTERMEDIATE"] = "intermediate";
    ProficiencyLevel["ADVANCED"] = "advanced";
    ProficiencyLevel["EXPERT"] = "expert";
})(ProficiencyLevel || (exports.ProficiencyLevel = ProficiencyLevel = {}));
let TechStack = class TechStack {
};
exports.TechStack = TechStack;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TechStack.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TechStack.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TechStack.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TechCategory,
    }),
    __metadata("design:type", String)
], TechStack.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ProficiencyLevel,
    }),
    __metadata("design:type", String)
], TechStack.prototype, "proficiency", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], TechStack.prototype, "orderIndex", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], TechStack.prototype, "showOnHomepage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], TechStack.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TechStack.prototype, "officialUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], TechStack.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TechStack.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], TechStack.prototype, "updatedAt", void 0);
exports.TechStack = TechStack = __decorate([
    (0, typeorm_1.Entity)('tech_stack')
], TechStack);
//# sourceMappingURL=tech-stack.entity.js.map