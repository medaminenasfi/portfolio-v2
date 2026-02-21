import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateResumeTable1640000000003 implements MigrationInterface {
  name = 'CreateResumeTable1640000000003';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create resumes table
    await queryRunner.createTable(
      new Table({
        name: 'resumes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'filename',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'originalName',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'mimeType',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'size',
            type: 'integer',
          },
          {
            name: 'filePath',
            type: 'varchar',
            length: '500',
          },
          {
            name: 'title',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'isActive',
            type: 'boolean',
            default: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Create indexes
    await queryRunner.query(`CREATE INDEX "IDX_RESUMES_IS_ACTIVE" ON "resumes" ("isActive")`);
    await queryRunner.query(`CREATE INDEX "IDX_RESUMES_CREATED_AT" ON "resumes" ("createdAt")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('resumes');
  }
}
