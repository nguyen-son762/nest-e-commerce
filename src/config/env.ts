import * as dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  DATABASE_MYSQL_USER: process.env.DATABASE_MYSQL_USER || 'root',
  DATABASE_MYSQL_PASSWORD: process.env.DATABASE_MYSQL_PASSWORD || 'root',
  DATABASE_NAME: process.env.DATABASE_NAME || '',
  HOST_MYSQL: process.env.HOST_MYSQL || 'localhost',
  PORT_MYSQL: Number(process.env.PORT_MYSQL) || 3306,
};
