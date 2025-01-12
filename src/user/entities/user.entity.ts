import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey()
  id: number;

  @Property()
  userName: string;

  @Property()
  email: string;

  @Property()
  mobile: string;

  @Property()
  password: string;

  @Property()
  role: string;

  @Property()
  createdAt = new Date();
}
