import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateSkillsTableMakeFieldsOptional1654321000005 implements MigrationInterface {
  name = 'UpdateSkillsTableMakeFieldsOptional1654321000005';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Make proficiency column nullable with default value
    await queryRunner.changeColumn('skills', 'proficiency', new TableColumn({
      name: 'proficiency',
      type: 'enum',
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      isNullable: true,
      default: "'intermediate'",
    }));

    // Update existing NULL values to 'intermediate'
    await queryRunner.query(`
      UPDATE "skills" 
      SET "proficiency" = 'intermediate' 
      WHERE "proficiency" IS NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert proficiency back to NOT NULL
    await queryRunner.changeColumn('skills', 'proficiency', new TableColumn({
      name: 'proficiency',
      type: 'enum',
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      isNullable: false,
      default: "'intermediate'",
    }));
  }
}
