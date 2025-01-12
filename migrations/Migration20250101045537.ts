import { Migration } from '@mikro-orm/migrations';

export class Migration20250101045537 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user" ("id" serial primary key, "user_name" varchar(255) not null, "email" varchar(255) not null, "mobile" varchar(255) not null, "password" varchar(255) not null, "created_at" varchar(255) not null);`);
  }

}
