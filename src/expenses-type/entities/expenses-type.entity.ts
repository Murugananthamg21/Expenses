import { PrimaryKey, Property, Entity } from '@mikro-orm/core';

@Entity()
export class ExpensesType {
  @PrimaryKey()
  id: number;

  @Property()
  expensesType: string;

  @Property()
  createdAt = new Date();
}
