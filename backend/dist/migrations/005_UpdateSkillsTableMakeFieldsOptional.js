"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSkillsTableMakeFieldsOptional1654321000005 = void 0;
const typeorm_1 = require("typeorm");
class UpdateSkillsTableMakeFieldsOptional1654321000005 {
    constructor() {
        this.name = 'UpdateSkillsTableMakeFieldsOptional1654321000005';
    }
    async up(queryRunner) {
        await queryRunner.changeColumn('skills', 'proficiency', new typeorm_1.TableColumn({
            name: 'proficiency',
            type: 'enum',
            enum: ['beginner', 'intermediate', 'advanced', 'expert'],
            isNullable: true,
            default: "'intermediate'",
        }));
        await queryRunner.query(`
      UPDATE "skills" 
      SET "proficiency" = 'intermediate' 
      WHERE "proficiency" IS NULL
    `);
    }
    async down(queryRunner) {
        await queryRunner.changeColumn('skills', 'proficiency', new typeorm_1.TableColumn({
            name: 'proficiency',
            type: 'enum',
            enum: ['beginner', 'intermediate', 'advanced', 'expert'],
            isNullable: false,
            default: "'intermediate'",
        }));
    }
}
exports.UpdateSkillsTableMakeFieldsOptional1654321000005 = UpdateSkillsTableMakeFieldsOptional1654321000005;
//# sourceMappingURL=005_UpdateSkillsTableMakeFieldsOptional.js.map