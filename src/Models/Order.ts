import { tryCatchWrap } from '../Middleware/Wrappers';
import { connectQuery } from './helpers';
import { client } from '../db';

export type Order = {
  id?: number;
  uid?: number;
  status: string;
  date: string;
};

export class OrderTable {
  //  List All Orders
  async listAll(): Promise<Order[]> {
    return tryCatchWrap('Could Not Get All Oders', async () => {
      const results = await connectQuery('SELECT * FROM orders', client);
      return results.rows;
    });
  }
  // Create a New Order
  async create(order: Order): Promise<Order> {
    return tryCatchWrap('Could not Create Order', async () => {
      const sql = `INSERT INTO orders(user_id, status, date)
                 VALUES ('${order.uid}','${order.status}','${order.date}')
                 RETURNING *`;
      const results = await connectQuery(sql, client);
      return results.rows[0];
    });
  }
  // Delete Existing Order using oid
  async delete(oid: number): Promise<Order> {
    return tryCatchWrap(`Could not Create Order with id : ${oid}`, async () => {
      const sql = `DELETE FROM orders WHERE id=${oid} RETURNING *`;
      const results = await connectQuery(sql, client);
      return results.rows[0];
    });
  }
  // Search a Product by ID
  async search(oid: number): Promise<Order> {
    return tryCatchWrap(`Could not Find Order with ID: ${oid}`, async () => {
      const sql = `SELECT * FROM orders WHERE id = ${oid}`;
      const results = await connectQuery(sql, client);
      return results.rows[0];
    });
  }
}
