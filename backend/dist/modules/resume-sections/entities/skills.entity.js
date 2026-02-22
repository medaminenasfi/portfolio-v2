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
exports.Skill = exports.SkillProficiency = exports.SkillCategory = void 0;
const typeorm_1 = require("typeorm");
var SkillCategory;
(function (SkillCategory) {
    SkillCategory["FRONTEND"] = "frontend";
    SkillCategory["BACKEND"] = "backend";
    SkillCategory["TOOLS"] = "tools";
    SkillCategory["SOFT_SKILLS"] = "soft_skills";
})(SkillCategory || (exports.SkillCategory = SkillCategory = {}));
var SkillProficiency;
(function (SkillProficiency) {
    SkillProficiency["BEGINNER"] = "beginner";
    SkillProficiency["INTERMEDIATE"] = "intermediate";
    SkillProficiency["ADVANCED"] = "advanced";
    SkillProficiency["EXPERT"] = "expert";
})(SkillProficiency || (exports.SkillProficiency = SkillProficiency = {}));
let Skill = class Skill {
};
exports.Skill = Skill;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Skill.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Skill.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Skill.prototype, "photo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: SkillCategory,
    }),
    __metadata("design:type", String)
], Skill.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: SkillProficiency,
    }),
    __metadata("design:type", String)
], Skill.prototype, "proficiency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Skill.prototype, "keywords", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Skill.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Skill.prototype, "orderIndex", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Skill.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Skill.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Skill.prototype, "updatedAt", void 0);
exports.Skill = Skill = __decorate([
    (0, typeorm_1.Entity)('skills')
], Skill);
//# sourceMappingURL=skills.entity.js.map