import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserTable1740704223612 implements MigrationInterface {
    private tableName = 'tbl_user'
    public async up(queryRunner: QueryRunner): Promise<void> {
        const hasTable = await queryRunner.hasTable(this.tableName);
        if (!hasTable) {
            const table = await new Table({
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
                        name: 'email',
                        type: 'VARCHAR',
                        length: '50',
                        isUnique: true,
                    },
                    {
                        name: 'mobile_number',
                        type: 'VARCHAR',
                        length: '15',
                        isNullable: true,
                    },
                    {
                        name: 'ip',
                        type: 'VARCHAR',
                        isNullable: true
                    },
                    {
                        name: 'login_otp',
                        type: 'TEXT',
                        isNullable: true,
                        comment: 'OTP -> is saved for encrypted text'
                    },
                    {
                        name: 'user_data',
                        type: 'JSONB',
                        isNullable: true,
                    },
                    {
                        name: 'created_date',
                        type: 'DATETIME',
                        default: 'CURRENT_TIMESTAMP',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'created_by',
                        type: 'INT',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'created_role',
                        type: 'ENUM',
                        enum: ['Admin', 'User'],
                        isNullable: true
                    },
                    {
                        name: 'modified_date',
                        type: 'DATETIME',
                        default: 'CURRENT_TIMESTAMP',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'modified_by',
                        type: 'INT',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'modified_role',
                        type: 'ENUM',
                        enum: ['Admin', 'User'],
                        isNullable: true
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
