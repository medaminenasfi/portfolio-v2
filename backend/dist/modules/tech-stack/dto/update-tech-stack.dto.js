"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTechStackDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_tech_stack_dto_1 = require("./create-tech-stack.dto");
class UpdateTechStackDto extends (0, mapped_types_1.PartialType)(create_tech_stack_dto_1.CreateTechStackDto) {
}
exports.UpdateTechStackDto = UpdateTechStackDto;
//# sourceMappingURL=update-tech-stack.dto.js.map