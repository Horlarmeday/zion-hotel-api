import * as dotenv from 'dotenv';
import { IDatabaseConfig } from './interfaces/database.interface';

dotenv.config();

export const databaseConfig: IDatabaseConfig = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  },
  test: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: process.env.DB_DIALECT,
  },
};
