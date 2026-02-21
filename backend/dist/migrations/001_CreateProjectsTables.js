"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProjectsTables1640000000001 = void 0;
const typeorm_1 = require("typeorm");
class CreateProjectsTables1640000000001 {
    constructor() {
        this.name = 'CreateProjectsTables1640000000001';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'projects',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'title',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'description',
                    type: 'text',
                },
                {
                    name: 'shortSummary',
                    type: 'varchar',
                    length: '500',
                    isNullable: true,
                },
                {
                    name: 'problem',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'solution',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'role',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'highlights',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'results',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'difficulty',
                    type: 'enum',
                    enum: ['simple', 'medium', 'hard'],
                    default: '"medium"',
                },
                {
                    name: 'clientType',
                    type: 'enum',
                    enum: ['personal', 'freelance', 'company'],
                    isNullable: true,
                },
                {
                    name: 'liveDemoUrl',
                    type: 'varchar',
                    length: '500',
                    isNullable: true,
                },
                {
                    name: 'githubRepoUrl',
                    type: 'varchar',
                    length: '500',
                    isNullable: true,
                },
                {
                    name: 'techStack',
                    type: 'text',
                },
                {
                    name: 'category',
                    type: 'enum',
                    enum: ['web', 'mobile', 'desktop', 'full_stack'],
                },
                {
                    name: 'status',
                    type: 'enum',
                    enum: ['draft', 'published', 'archived'],
                    default: '"draft"',
                },
                {
                    name: 'progressStatus',
                    type: 'enum',
                    enum: ['completed', 'in_progress'],
                    default: '"in_progress"',
                },
                {
                    name: 'isFeatured',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'coverImageId',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'seoData',
                    type: 'json',
                    isNullable: true,
                },
                {
                    name: 'scheduledPublishAt',
                    type: 'timestamp',
                    isNullable: true,
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
                {
                    name: 'publishedAt',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'archivedAt',
                    type: 'timestamp',
                    isNullable: true,
                },
            ],
        }), true);
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'project_media',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'type',
                    type: 'enum',
                    enum: ['image', 'video'],
                    default: '"image"',
                },
                {
                    name: 'filename',
                    type: 'varchar',
                    length: '500',
                },
                {
                    name: 'originalName',
                    type: 'varchar',
                    length: '500',
                },
                {
                    name: 'mimeType',
                    type: 'varchar',
                    length: '50',
                },
                {
                    name: 'size',
                    type: 'integer',
                    default: 0,
                },
                {
                    name: 'url',
                    type: 'varchar',
                    length: '1000',
                },
                {
                    name: 'thumbnailUrl',
                    type: 'varchar',
                    length: '1000',
                    isNullable: true,
                },
                {
                    name: 'order',
                    type: 'integer',
                    default: 0,
                },
                {
                    name: 'videoEmbedUrl',
                    type: 'varchar',
                    length: '500',
                    isNullable: true,
                },
                {
                    name: 'metadata',
                    type: 'json',
                    isNullable: true,
                },
                {
                    name: 'projectId',
                    type: 'uuid',
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
        }), true);
        await queryRunner.createForeignKey('project_media', new typeorm_1.TableForeignKey({
            name: 'FK_project_media_projectId',
            columnNames: ['projectId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'projects',
            onDelete: 'CASCADE',
        }));
        await queryRunner.query(`CREATE INDEX "IDX_PROJECTS_STATUS_FEATURED" ON "projects" ("status", "isFeatured")`);
        await queryRunner.query(`CREATE INDEX "IDX_PROJECTS_CATEGORY" ON "projects" ("category")`);
        await queryRunner.query(`CREATE INDEX "IDX_PROJECTS_PROGRESS_STATUS" ON "projects" ("progressStatus")`);
        await queryRunner.query(`CREATE INDEX "IDX_PROJECT_MEDIA_PROJECT_ID" ON "project_media" ("projectId")`);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('project_media');
        await queryRunner.dropTable('projects');
    }
}
exports.CreateProjectsTables1640000000001 = CreateProjectsTables1640000000001;
//# sourceMappingURL=001_CreateProjectsTables.js.map