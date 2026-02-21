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
exports.ProjectMedia = exports.MediaType = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
const project_entity_1 = require("./project.entity");
var MediaType;
(function (MediaType) {
    MediaType["IMAGE"] = "image";
    MediaType["VIDEO"] = "video";
    MediaType["DOCUMENT"] = "document";
})(MediaType || (exports.MediaType = MediaType = {}));
let ProjectMedia = class ProjectMedia extends base_entity_1.BaseEntity {
};
exports.ProjectMedia = ProjectMedia;
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], ProjectMedia.prototype, "filename", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], ProjectMedia.prototype, "originalName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500 }),
    __metadata("design:type", String)
], ProjectMedia.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: MediaType, default: MediaType.IMAGE }),
    __metadata("design:type", String)
], ProjectMedia.prototype, "mediaType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', default: 0 }),
    __metadata("design:type", Number)
], ProjectMedia.prototype, "fileSize", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, nullable: true }),
    __metadata("design:type", String)
], ProjectMedia.prototype, "mimeType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ProjectMedia.prototype, "altText", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ProjectMedia.prototype, "caption", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ProjectMedia.prototype, "isCover", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], ProjectMedia.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], ProjectMedia.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.Project, (project) => project.media),
    __metadata("design:type", project_entity_1.Project)
], ProjectMedia.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'project_id' }),
    __metadata("design:type", String)
], ProjectMedia.prototype, "projectId", void 0);
exports.ProjectMedia = ProjectMedia = __decorate([
    (0, typeorm_1.Entity)({ name: 'project_media' })
], ProjectMedia);
//# sourceMappingURL=project-media.entity.js.map