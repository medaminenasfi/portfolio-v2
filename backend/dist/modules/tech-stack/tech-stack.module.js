"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechStackModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tech_stack_service_1 = require("./tech-stack.service");
const tech_stack_controller_1 = require("./tech-stack.controller");
const tech_stack_entity_1 = require("./entities/tech-stack.entity");
let TechStackModule = class TechStackModule {
};
exports.TechStackModule = TechStackModule;
exports.TechStackModule = TechStackModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([tech_stack_entity_1.TechStack])],
        controllers: [tech_stack_controller_1.TechStackController],
        providers: [tech_stack_service_1.TechStackService],
        exports: [tech_stack_service_1.TechStackService],
    })
], TechStackModule);
//# sourceMappingURL=tech-stack.module.js.map