// mikro-orm.config.ts
import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import * as dotenv from 'dotenv';
dotenv.config();

const config: Options = {
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: process.env.DB_NAME || 'expenses_Tracking',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'rohit45##G',
  host: process.env.DB_HOST || 'localhost',
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
