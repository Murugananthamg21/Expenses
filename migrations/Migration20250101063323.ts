import { Migration } from '@mikro-orm/migrations';

export class Migration20250101063323 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" alter column "created_at" type varchar(255) using ("created_at"::varchar(255));`);
  }

}
