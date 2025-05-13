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
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'token',
                        type: 'text',
                        isNullable: false,
                    },
                    {
                        name: 'created_date',
                        type: 'timestamp',
                        default: 'current_timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'created_by',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'created_role',
                        type: 'enum',
                        enumName: 'user_role', // Reuse the existing enum type
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
