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
exports.Project = exports.ClientType = exports.DifficultyLevel = exports.ProjectProgressStatus = exports.ProjectStatus = exports.ProjectCategory = void 0;
const typeorm_1 = require("typeorm");
const project_media_entity_1 = require("./project-media.entity");
var ProjectCategory;
(function (ProjectCategory) {
    ProjectCategory["WEB"] = "web";
    ProjectCategory["MOBILE"] = "mobile";
    ProjectCategory["DESKTOP"] = "desktop";
    ProjectCategory["FULL_STACK"] = "full_stack";
})(ProjectCategory || (exports.ProjectCategory = ProjectCategory = {}));
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["DRAFT"] = "draft";
    ProjectStatus["PUBLISHED"] = "published";
    ProjectStatus["ARCHIVED"] = "archived";
})(ProjectStatus || (exports.ProjectStatus = ProjectStatus = {}));
var ProjectProgressStatus;
(function (ProjectProgressStatus) {
    ProjectProgressStatus["COMPLETED"] = "completed";
    ProjectProgressStatus["IN_PROGRESS"] = "in_progress";
})(ProjectProgressStatus || (exports.ProjectProgressStatus = ProjectProgressStatus = {}));
var DifficultyLevel;
(function (DifficultyLevel) {
    DifficultyLevel["SIMPLE"] = "simple";
    DifficultyLevel["MEDIUM"] = "medium";
    DifficultyLevel["HARD"] = "hard";
})(DifficultyLevel || (exports.DifficultyLevel = DifficultyLevel = {}));
var ClientType;
(function (ClientType) {
    ClientType["PERSONAL"] = "personal";
    ClientType["FREELANCE"] = "freelance";
    ClientType["COMPANY"] = "company";
})(ClientType || (exports.ClientType = ClientType = {}));
let Project = class Project {
};
exports.Project = Project;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Project.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Project.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Project.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "shortSummary", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "problem", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "solution", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], Project.prototype, "highlights", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "results", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: DifficultyLevel,
        default: DifficultyLevel.MEDIUM,
    }),
    __metadata("design:type", String)
], Project.prototype, "difficulty", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ClientType,
        nullable: true,
    }),
    __metadata("design:type", String)
], Project.prototype, "clientType", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "liveDemoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "githubRepoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array'),
    __metadata("design:type", Array)
], Project.prototype, "techStack", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ProjectCategory,
    }),
    __metadata("design:type", String)
], Project.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ProjectStatus,
        default: ProjectStatus.DRAFT,
    }),
    __metadata("design:type", String)
], Project.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ProjectProgressStatus,
        default: ProjectProgressStatus.IN_PROGRESS,
    }),
    __metadata("design:type", String)
], Project.prototype, "progressStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Project.prototype, "isFeatured", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], Project.prototype, "bannerImages", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], Project.prototype, "categoryPhotos", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "videoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "videoThumbnail", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "projectDuration", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200, nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "clientName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Project.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Project.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "teamSize", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], Project.prototype, "tools", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_media_entity_1.ProjectMedia, (media) => media.project, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], Project.prototype, "media", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "coverImageId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Project.prototype, "seoData", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Project.prototype, "scheduledPublishAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Project.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Project.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Project.prototype, "publishedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Project.prototype, "archivedAt", void 0);
exports.Project = Project = __decorate([
    (0, typeorm_1.Entity)('projects'),
    (0, typeorm_1.Index)(['status', 'isFeatured']),
    (0, typeorm_1.Index)(['category']),
    (0, typeorm_1.Index)(['progressStatus'])
], Project);
//# sourceMappingURL=project.entity.js.map