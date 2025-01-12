import { Migration } from '@mikro-orm/migrations';

export class Migration20250101063242 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" add column "role" varchar(255) not null;`);
  }

}
