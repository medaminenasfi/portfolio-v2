import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateSkillsCategoryEnum1654321000006 implements MigrationInterface {
  name = 'UpdateSkillsCategoryEnum1654321000006';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // First, temporarily alter the column to text type
    await queryRunner.query(`
      ALTER TABLE "skills" 
      ALTER COLUMN "category" TYPE TEXT
    `);
    
    // Drop the existing enum type
    await queryRunner.query(`DROP TYPE "skills_category_enum"`);
    
    // Create the new enum type with all categories
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

    // Update the column to use the new enum type
    await queryRunner.query(`
      ALTER TABLE "skills" 
      ALTER COLUMN "category" TYPE "skills_category_enum" 
      USING "category"::text::"skills_category_enum"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // First, temporarily alter the column to text type
    await queryRunner.query(`
      ALTER TABLE "skills" 
      ALTER COLUMN "category" TYPE TEXT
    `);
    
    // Drop the new enum type
    await queryRunner.query(`DROP TYPE "skills_category_enum"`);
    
    // Revert to the original enum
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
