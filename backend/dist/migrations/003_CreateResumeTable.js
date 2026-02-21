"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateResumeTable1640000000003 = void 0;
const typeorm_1 = require("typeorm");
class CreateResumeTable1640000000003 {
    constructor() {
        this.name = 'CreateResumeTable1640000000003';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }), true);
        await queryRunner.query(`CREATE INDEX "IDX_RESUMES_IS_ACTIVE" ON "resumes" ("isActive")`);
        await queryRunner.query(`CREATE INDEX "IDX_RESUMES_CREATED_AT" ON "resumes" ("createdAt")`);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('resumes');
    }
}
exports.CreateResumeTable1640000000003 = CreateResumeTable1640000000003;
//# sourceMappingURL=003_CreateResumeTable.js.map