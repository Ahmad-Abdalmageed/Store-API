import dotenv from 'dotenv';
import { Pool } from 'pg';
dotenv.config();

// Database Connection
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, ENV } =
  process.env;

let client: Pool;
switch (ENV) {
  case 'test':
    client = new Pool({
      host: POSTGRES_HOST,
      database: POSTGRES_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD
    });
    break;
  case 'dev':
    client = new Pool({
      host: POSTGRES_HOST,
      database: `${POSTGRES_DB}_test`,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD
    });
    break;
}
export { client };
