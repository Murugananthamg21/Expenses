import { Migration } from '@mikro-orm/migrations';

export class Migration20250110153628 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "expense" drop constraint "expense_expenses_type_id_foreign";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "expense" add column "expenses_type_id" int not null;`);
    this.addSql(`alter table "expense" add constraint "expense_expenses_type_id_foreign" foreign key ("expenses_type_id") references "expenses_type" ("id") on update cascade;`);
  }

}
