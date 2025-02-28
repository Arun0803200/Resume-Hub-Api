import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateAccessTokenTbl1740708153964 implements MigrationInterface {
    private readonly tableName = 'tbl_access_token';
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
                        name: 'token',
                        type: 'TEXT',
                        isNullable: false,
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
                ],
            });

            await queryRunner.createTable(table);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName);
    }

}
