"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSkillsCategoryEnum1654321000006 = void 0;
class UpdateSkillsCategoryEnum1654321000006 {
    constructor() {
        this.name = 'UpdateSkillsCategoryEnum1654321000006';
    }
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "skills" 
      ALTER COLUMN "category" TYPE TEXT
    `);
        await queryRunner.query(`DROP TYPE "skills_category_enum"`);
        await queryRunner.query(`
      CREATE TYPE "skills_category_enum" AS ENUM (
        'frontend', 
        'backend', 
        'tools', 
        'soft_skills',
        'database',
        'mobile',
        'design',
        'devops',
        'cloud',
        'desktop'
      )
    `);
        await queryRunner.query(`
      ALTER TABLE "skills" 
      ALTER COLUMN "category" TYPE "skills_category_enum" 
      USING "category"::text::"skills_category_enum"
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "skills" 
      ALTER COLUMN "category" TYPE TEXT
    `);
        await queryRunner.query(`DROP TYPE "skills_category_enum"`);
        await queryRunner.query(`
      CREATE TYPE "skills_category_enum" AS ENUM (
        'frontend', 
        'backend', 
        'tools', 
        'soft_skills'
      )
    `);
        await queryRunner.query(`
      ALTER TABLE "skills" 
      ALTER COLUMN "category" TYPE "skills_category_enum" 
      USING "category"::text::"skills_category_enum"
    `);
    }
}
exports.UpdateSkillsCategoryEnum1654321000006 = UpdateSkillsCategoryEnum1654321000006;
//# sourceMappingURL=006_UpdateSkillsCategoryEnum.js.map