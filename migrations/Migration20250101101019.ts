import { Migration } from '@mikro-orm/migrations';

export class Migration20250101101019 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "expenses_type" ("id" serial primary key, "expenses_type" varchar(255) not null, "created_at" timestamptz not null);`);

    this.addSql(`create table "expense" ("id" serial primary key, "date" varchar(255) not null, "expense" varchar(255) not null, "payament_mathod" varchar(255) not null, "amount" int not null, "expenses_type_id" int not null, "created_at" timestamptz not null);`);

    this.addSql(`alter table "expense" add constraint "expense_expenses_type_id_foreign" foreign key ("expenses_type_id") references "expenses_type" ("id") on update cascade;`);
  }

}
