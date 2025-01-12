// mikro-orm.config.ts
import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import * as dotenv from 'dotenv';
dotenv.config();

const config: Options = {
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: process.env.DB_NAME || 'expenses_tvui',
  user: process.env.DB_USER || 'expenses',
  password: process.env.DB_PASSWORD || 'alzOvBuxy6lvZ9SrIVnwO09B1acgSD6V',
  host: process.env.DB_HOST || 'dpg-cu1o7h3qf0us73de9feg-a',
  port: Number(process.env.DB_PORT) || 5432,
  driver: PostgreSqlDriver,
  migrations: {
    tableName: 'mikro_orm_migration',
    path: './migrations',
    transactional: true,
    disableForeignKeys: true,
    allOrNothing: true,
    dropTables: true,
    safe: true,
    emit: 'ts',
  },
};

export default config;
