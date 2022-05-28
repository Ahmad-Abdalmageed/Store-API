import { client } from '../db';
import { tryCatchWrap } from '../Middleware/Wrappers';
import { connectQuery } from './helpers';

// USERS Table Schema
export type User = {
  id?: number;
  FirstName: string;
  LastName: string;
  password: string;
};

// USERS Table Controller
export class UserTable {
  // Lists all Users in the Table
  async listAll(): Promise<User[]> {
    return tryCatchWrap('Cannot Get All Users', async () => {
      const results = await connectQuery('SELECT * FROM users', client);
      return results.rows;
    });
  }
  //  Adds a User to the Table
  async create(user: User): Promise<User> {
    return tryCatchWrap('Cannot Add User', async () => {
      const sql = `INSERT INTO users (firstname, lastname, password)
                   VALUES ('${user.FirstName}','${user.LastName}','${user.password}')
                   RETURNING *`;
      const results = await connectQuery(sql, client);
      return results.rows[0];
    });
  }
  // Get User by ID
  async getUser(userID: number): Promise<User> {
    return tryCatchWrap('Cannot Get User', async () => {
      // SQL Query
      const sql = `SELECT * FROM users WHERE id = ${userID}`;

      const results = await connectQuery(sql, client);
      return results.rows[0];
    });
  }
  // Delete a User
  async delUser(userID: number): Promise<User> {
    return tryCatchWrap(
      `Could Not delete User with ID: ${userID}`,
      async () => {
        const sql = `DELETE FROM users 
                   WHERE id = ${userID}
                   RETURNING *`;
        const results = await connectQuery(sql, client);
        return results.rows;
      }
    );
  }
}
