"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTestimonialsTable1640000000002 = void 0;
const typeorm_1 = require("typeorm");
class CreateTestimonialsTable1640000000002 {
    constructor() {
        this.name = 'CreateTestimonialsTable1640000000002';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'testimonials',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'clientName',
                    type: 'varchar',
                    length: '100',
                },
                {
                    name: 'company',
                    type: 'varchar',
                    length: '100',
                    isNullable: true,
                },
                {
                    name: 'position',
                    type: 'varchar',
                    length: '100',
                    isNullable: true,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'rating',
                    type: 'integer',
                },
                {
                    name: 'comment',
                    type: 'text',
                },
                {
                    name: 'status',
                    type: 'enum',
                    enum: ['pending', 'approved', 'rejected'],
                    default: '"pending"',
                },
                {
                    name: 'adminNotes',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'approvedAt',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'rejectedAt',
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
            ],
        }), true);
        await queryRunner.query(`CREATE INDEX "IDX_TESTIMONIALS_STATUS" ON "testimonials" ("status")`);
        await queryRunner.query(`CREATE INDEX "IDX_TESTIMONIALS_RATING" ON "testimonials" ("rating")`);
        await queryRunner.query(`CREATE INDEX "IDX_TESTIMONIALS_CLIENT_NAME" ON "testimonials" ("clientName")`);
        await queryRunner.query(`CREATE INDEX "IDX_TESTIMONIALS_CREATED_AT" ON "testimonials" ("createdAt")`);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('testimonials');
    }
}
exports.CreateTestimonialsTable1640000000002 = CreateTestimonialsTable1640000000002;
//# sourceMappingURL=002_CreateTestimonialsTable.js.map