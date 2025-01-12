import { Migration } from '@mikro-orm/migrations';

export class Migration20250110154102 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "expense" alter column "date" type timestamptz using ("date"::timestamptz);`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "expense" alter column "date" type varchar(255) using ("date"::varchar(255));`,
    );
  }
}
