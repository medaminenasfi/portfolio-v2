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
exports.Project = exports.ProjectStatus = exports.ProjectCategory = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
const user_entity_1 = require("../../auth/entities/user.entity");
const project_media_entity_1 = require("./project-media.entity");
var ProjectCategory;
(function (ProjectCategory) {
    ProjectCategory["WEB"] = "web";
    ProjectCategory["MOBILE"] = "mobile";
    ProjectCategory["DESKTOP"] = "desktop";
    ProjectCategory["FULL_STACK"] = "full-stack";
})(ProjectCategory || (exports.ProjectCategory = ProjectCategory = {}));
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["COMPLETED"] = "completed";
    ProjectStatus["IN_PROGRESS"] = "in-progress";
})(ProjectStatus || (exports.ProjectStatus = ProjectStatus = {}));
let Project = class Project extends base_entity_1.BaseEntity {
};
exports.Project = Project;
__decorate([
    (0, typeorm_1.Column)({ length: 150 }),
    __metadata("design:type", String)
], Project.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 150 }),
    __metadata("design:type", String)
], Project.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Project.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], Project.prototype, "techStack", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], Project.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'banner_image', nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "bannerImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'catalogue_photo', nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "cataloguePhoto", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'live_demo_url', nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "liveDemoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'github_url', nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "githubUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ProjectCategory,
        default: ProjectCategory.WEB,
        nullable: true,
    }),
    __metadata("design:type", String)
], Project.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ProjectStatus,
        default: ProjectStatus.IN_PROGRESS,
        nullable: true,
    }),
    __metadata("design:type", String)
], Project.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_featured', default: false }),
    __metadata("design:type", Boolean)
], Project.prototype, "isFeatured", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.projects),
    __metadata("design:type", user_entity_1.User)
], Project.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_media_entity_1.ProjectMedia, (media) => media.project, { cascade: true }),
    __metadata("design:type", Array)
], Project.prototype, "media", void 0);
exports.Project = Project = __decorate([
    (0, typeorm_1.Entity)({ name: 'projects' })
], Project);
//# sourceMappingURL=project.entity.js.map