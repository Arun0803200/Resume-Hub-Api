import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateUserResumeTbl1740708902609 implements MigrationInterface {
  private readonly tableName = 'tbl_user_resume';
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hasTable = await queryRunner.hasTable(this.tableName);
    if (!hasTable) {
      await queryRunner.createTable(
        new Table({
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
              name: 'resume_id',
              type: 'integer',
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
              type: 'integer',
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
              type: 'integer',
              isNullable: true,
            },
            {
              name: 'modified_role',
              type: 'enum',
              enumName: 'user_role', // Reuse the existing enum type
              isNullable: true,
            },
          ],
        })
      );

      // Add foreign key constraint for `resume_id`
      await queryRunner.createForeignKey(
        this.tableName,
        new TableForeignKey({
          columnNames: ['resume_id'],
          referencedTableName: 'tbl_m_resume',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE', // If the resume is deleted, the user_resume entry is also deleted
          onUpdate: 'CASCADE',
        })
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
