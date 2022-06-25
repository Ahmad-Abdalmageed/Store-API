import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  RDS_HOSTNAME,
  RDS_HOSTNAME_TEST,
  RDS_PORT,
  RDS_DB_NAME,
  RDS_DB_NAME_TEST,
  RDS_USERNAME,
  RDS_PASSWORD,
  ENV
} = process.env;

let client: Pool;
console.log(`Connecting to ${ENV} DB ...`);

switch (ENV) {
  case 'dev':
    client = new Pool({
      host: RDS_HOSTNAME,
      port: Number(RDS_PORT),
      database: RDS_DB_NAME,
      user: RDS_USERNAME,
      password: RDS_PASSWORD
    });
    break;
  case 'test':
    client = new Pool({
      host: RDS_HOSTNAME_TEST,
      port: Number(RDS_PORT),
      database: RDS_DB_NAME_TEST,
      user: RDS_USERNAME,
      password: RDS_PASSWORD
    });
    break;
}

export { client };
