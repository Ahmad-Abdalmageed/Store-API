import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV
} = process.env;

let client: Pool;
console.log(`Connecting to ${ENV} DB ...`);

switch (ENV) {
  case 'dev':
    client = new Pool({
      host: POSTGRES_HOST,
      port: Number(POSTGRES_PORT),
      database: POSTGRES_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD
    });
    break;
  case 'test':
    client = new Pool({
      host: POSTGRES_HOST,
      port: Number(POSTGRES_PORT),
      database: POSTGRES_DB_TEST,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD
    });
    break;
}

export { client };
