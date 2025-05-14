import { MigrationInterface, QueryRunner, Table } from 'typeorm';

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
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'resume_data',
            type: 'jsonb',
            isNullable: true,
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
          {
            name: 'modified_date',
            type: 'timestamp',
            default: 'current_timestamp',
            isNullable: true,
          },
          {
            name: 'modified_by',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'modified_role',
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
