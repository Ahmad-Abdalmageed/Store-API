import dotenv from 'dotenv';
import { Pool } from 'pg';
dotenv.config();

let client: Pool;
switch (process.env.ENV) {
  case 'dev':
    client = new Pool({
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD
    });
    break;
  case 'test':
    client = new Pool({
      host: process.env.POSTGRES_HOST,
      database: `${process.env.POSTGRES_DB}_test`,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD
    });
    break;
}
export { client };
