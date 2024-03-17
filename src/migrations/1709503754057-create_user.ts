import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUser1709503754057 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'login',
          type: 'varchar',
          isUnique: true,
          isNullable: false,
        },
        {
          name: 'password_hash',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'online',
          type: 'boolean',
          default: false,
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }

}
