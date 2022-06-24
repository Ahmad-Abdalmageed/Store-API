import { Pool, QueryResult } from 'pg';

export async function connectQuery(
  sql: string,
  client: Pool
): Promise<QueryResult> {
  // Connect to Database using client
  const db = await client.connect();
  const result = await db.query(sql);
  db.release();
  return result;
}
