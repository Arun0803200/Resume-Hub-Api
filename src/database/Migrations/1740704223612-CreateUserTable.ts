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
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '50',
                        isUnique: true,
                    },
                    {
                        name: 'mobile_number',
                        type: 'varchar',
                        length: '15',
                        isNullable: true,
                    },
                    {
                        name: 'ip',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'login_otp',
                        type: 'text',
                        isNullable: true,
                        comment: 'OTP -> is saved for encrypted text'
                    },
                    {
                        name: 'user_data',
                        type: 'jsonb',
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
                        name: 'created_role',
                        type: 'enum',
                        enum: ['Admin', 'User'],
                        enumName: 'user_role',
                        isNullable: true
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
                    {
                        name: 'modified_role',
                        type: 'enum',
                        enumName: 'user_role', // Reuse the existing enum type
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
