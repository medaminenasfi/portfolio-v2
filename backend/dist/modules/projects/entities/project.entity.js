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
exports.Project = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
const user_entity_1 = require("../../auth/entities/user.entity");
let Project = class Project extends base_entity_1.BaseEntity {
};
exports.Project = Project;
__decorate([
    (0, typeorm_1.Column)({ length: 150 }),
    __metadata("design:type", String)
], Project.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Project.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'image_url', nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'repo_url', nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "repoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'live_url', nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "liveUrl", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], Project.prototype, "technologies", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.projects),
    __metadata("design:type", user_entity_1.User)
], Project.prototype, "user", void 0);
exports.Project = Project = __decorate([
    (0, typeorm_1.Entity)({ name: 'projects' })
], Project);
//# sourceMappingURL=project.entity.js.map