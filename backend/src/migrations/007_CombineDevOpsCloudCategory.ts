import { MigrationInterface, QueryRunner } from 'typeorm';

export class CombineDevOpsCloudCategory1654321000007 implements MigrationInterface {
  name = 'CombineDevOpsCloudCategory1654321000007';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // First, temporarily alter the column to text type
    await queryRunner.query(`
      ALTER TABLE "skills" 
      ALTER COLUMN "category" TYPE TEXT
    `);
    
    // Drop the existing enum type
    await queryRunner.query(`DROP TYPE "skills_category_enum"`);
    
    // Create the new enum type with combined devops_cloud category
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

    // Update existing devops and cloud entries to devops_cloud
    await queryRunner.query(`
      UPDATE "skills" 
      SET "category" = 'devops_cloud' 
      WHERE "category" IN ('devops', 'cloud')
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
    
    // Drop the current enum type
    await queryRunner.query(`DROP TYPE "skills_category_enum"`);
    
    // Revert to the previous enum with separate devops and cloud
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

    // Update devops_cloud entries back to devops (for migration rollback)
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
