"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeSectionsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const resume_sections_service_1 = require("./resume-sections.service");
const resume_sections_controller_1 = require("./resume-sections.controller");
const work_experience_entity_1 = require("./entities/work-experience.entity");
const education_entity_1 = require("./entities/education.entity");
const skills_entity_1 = require("./entities/skills.entity");
const certifications_entity_1 = require("./entities/certifications.entity");
const languages_entity_1 = require("./entities/languages.entity");
let ResumeSectionsModule = class ResumeSectionsModule {
};
exports.ResumeSectionsModule = ResumeSectionsModule;
exports.ResumeSectionsModule = ResumeSectionsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([work_experience_entity_1.WorkExperience, education_entity_1.Education, skills_entity_1.Skill, certifications_entity_1.Certification, languages_entity_1.Language])],
        controllers: [resume_sections_controller_1.ResumeSectionsController],
        providers: [resume_sections_service_1.ResumeSectionsService],
        exports: [resume_sections_service_1.ResumeSectionsService],
    })
], ResumeSectionsModule);
//# sourceMappingURL=resume-sections.module.js.map