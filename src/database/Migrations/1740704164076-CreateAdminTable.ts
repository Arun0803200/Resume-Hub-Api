import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAdminTable1740704164076 implements MigrationInterface {
    private tableName = 'tbl_admin'
    public async up(queryRunner: QueryRunner): Promise<void> {
        const hasTable = await queryRunner.hasTable(this.tableName);
        if (!hasTable) {
            const table = new Table({
                name: this.tableName,
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'email',
                        type: 'VARCHAR',
                        length: '50',
                        isPrimary: false,
                        isNullable: false,
                        isUnique: true,
                    },
                    {
                        name: 'password',
                        type: 'VARCHAR',
                        length: '255',
                        isPrimary: false,
                        isNullable: false,
                        isUnique: true,
                    },
                    {
                        name: 'mobile_number',
                        type: 'VARCHAR',
                        length: '15',
                        isPrimary: true,
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: 'admin_data',
                        type: 'JSONB',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'created_date',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'created_by',
                        type: 'integer',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'modified_date',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'modified_by',
                        type: 'integer',
                        isPrimary: false,
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
