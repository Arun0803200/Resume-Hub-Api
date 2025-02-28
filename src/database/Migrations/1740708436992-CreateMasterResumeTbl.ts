import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateMasterResumeTbl1740708436992 implements MigrationInterface {
    private readonly tableName = 'tbl_m_resume';
    public async up(queryRunner: QueryRunner): Promise<void> {
        const hasTable = await queryRunner.hasTable(this.tableName);
        if (!hasTable) {
            const table = new Table({
                name: this.tableName,
                columns: [
                    {
                        name: 'id',
                        type: 'INT',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'resume_data',
                        type: 'JSONB',
                        isNullable: true,
                    },
                    {
                        name: 'created_date',
                        type: 'TIMESTAMP',
                        default: 'CURRENT_TIMESTAMP',
                        isNullable: true,
                    },
                    {
                        name: 'created_by',
                        type: 'INT',
                        isNullable: true,
                    },
                    {
                        name: 'created_role',
                        type: 'ENUM',
                        enum: ['User', 'Admin'],
                        isNullable: true,
                    },
                    {
                        name: 'modified_date',
                        type: 'TIMESTAMP',
                        default: 'CURRENT_TIMESTAMP',
                        isNullable: true,
                    },
                    {
                        name: 'modified_by',
                        type: 'INT',
                        isNullable: true,
                    },
                    {
                        name: 'modified_role',
                        type: 'ENUM',
                        enum: ['User', 'Admin'],
                        isNullable: true,
                    },
                ],
            });

            await queryRunner.createTable(table);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName);
    }

}
