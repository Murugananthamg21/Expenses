import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Expense {
  @PrimaryKey()
  id: number;

  @Property()
  date: Date;

  @Property()
  expense: string;

  @Property()
  payamentMathod: string;

  @Property()
  amount: number;

  @Property()
  createdAt = new Date();
}
