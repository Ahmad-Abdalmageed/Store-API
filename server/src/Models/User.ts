import { client } from '../db';
import { tryCatchWrap } from '../Middleware/Wrappers';
import { connectQuery } from './helpers';
import bcrypt from 'bcrypt';

// USERS Table Schema
export type User = {
  id?: number;
  username: string;
  firstname: string;
  lastname: string;
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
      const sql = `INSERT INTO users (username, firstname, lastname, password)
                   VALUES ('${user.username}', '${user.firstname}', '${user.lastname}', '${user.password}')
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
        const sql = `DELETE
                     FROM users
                     WHERE id = ${userID}
                     RETURNING *`;
        const results = await connectQuery(sql, client);
        return results.rows;
      }
    );
  }

  // Authenticate User
  async auth(uname: string, password: string): Promise<User | null> {
    return tryCatchWrap('User cannot be Authenticated', async () => {
      const sql = `SELECT *
                   FROM users
                   WHERE users.username = '${uname}'`;
      const result = await connectQuery(sql, client);

      const authenticated = bcrypt.compareSync(
        password + process.env.BCRYPT_PASSWORD,
        result.rows[0].password
      );

      if (authenticated) return result.rows[0];
      return null;
    });
  }
}
