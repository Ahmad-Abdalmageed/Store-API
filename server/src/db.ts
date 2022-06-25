import { Pool } from 'pg';
import config from './config';

let client: Pool;
console.log(`Connecting to ${config.ENV} DB ...`);

switch (config.ENV) {
  case 'dev':
    client = new Pool({
      host: config.RDS_HOSTNAME,
      port: Number(config.RDS_PORT),
      database: config.RDS_DB_NAME,
      user: config.RDS_USERNAME,
      password: config.RDS_PASSWORD
    });
    break;
  case 'test':
    client = new Pool({
      host: config.RDS_HOSTNAME_TEST,
      port: Number(config.RDS_PORT),
      database: config.RDS_DB_NAME_TEST,
      user: config.RDS_USERNAME,
      password: config.RDS_PASSWORD
    });
    break;
}

export { client };
