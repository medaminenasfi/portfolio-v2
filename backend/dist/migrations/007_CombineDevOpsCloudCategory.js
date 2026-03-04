"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CombineDevOpsCloudCategory1654321000007 = void 0;
class CombineDevOpsCloudCategory1654321000007 {
    constructor() {
        this.name = 'CombineDevOpsCloudCategory1654321000007';
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
        'devops_cloud',
        'desktop'
      )
    `);
        await queryRunner.query(`
      UPDATE "skills" 
      SET "category" = 'devops_cloud' 
      WHERE "category" IN ('devops', 'cloud')
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
      UPDATE "skills" 
      SET "category" = 'devops' 
      WHERE "category" = 'devops_cloud'
    `);
        await queryRunner.query(`
      ALTER TABLE "skills" 
      ALTER COLUMN "category" TYPE "skills_category_enum" 
      USING "category"::text::"skills_category_enum"
    `);
    }
}
exports.CombineDevOpsCloudCategory1654321000007 = CombineDevOpsCloudCategory1654321000007;
//# sourceMappingURL=007_CombineDevOpsCloudCategory.js.map