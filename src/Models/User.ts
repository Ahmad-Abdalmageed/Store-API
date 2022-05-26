import { client } from '../db';
import { genericWrap } from '../Middleware/Wrappers';

// USERS Table Schema
export type User = {
  id?: number;
  FirstName: string;
  LastName: string;
  password: string;
};

// USERS Table Controller
export class UserTable {
  // TODO: Refactor Connection-Querying and Release
  // Lists all Users in the Table
  async listAll(): Promise<User[]> {
    return genericWrap('Cannot Get All Users', async () => {
      //  Connect to DB
      const db = await client.connect();
      const sql = 'SELECT * FROM users';

      // Perform Query
      const results = await db.query(sql);

      // Disconnect DB
      db.release();

      return results.rows;
    });
  }
  //  Adds a User to the Table
  async create(user: User): Promise<User> {
    return genericWrap('Cannot Add User', async () => {
      //  Connect to DB
      const db = await client.connect();
      const sql = `INSERT INTO users (firstname, lastname, password)
                   VALUES (${user.FirstName},${user.LastName},${user.password})
                   RETURNING *`;
      // Perform Query
      const results = await db.query(sql);

      // Disconnect DB
      db.release();

      return results.rows[0];
    });
  }
  // Get User by ID
  async getUser(userID: number): Promise<User> {
    return genericWrap('Cannot Get User', async () => {
      // Connect to DB
      const db = await client.connect();
      const sql = `SELECT * FROM Users WHERE id = ${userID}`;

      //  Query DB
      const result = await db.query(sql);
      db.release();

      return result.rows[0];
    });
  }
}
