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
    return tryCatchWrap('Could Not Get All Orders', async () => {
      const sql = `SELECT users.firstname,
                          users.lastname,
                          users.id  as uid,
                          products.name,
                          products.price,
                          products.category,
                          orders.status,
                          orders.date,
                          orders.id AS oid,
                          quantity
                   FROM orders
                            JOIN order_product ON orders.id = order_product.order_id
                            JOIN products ON products.id = order_product.prod_id
                            JOIN users ON orders.user_id = users.id`;
      const results = await connectQuery(sql, client);
      return results.rows;
    });
  }
  // Create a New Order
  async create(order: Order, pid: number, q: number) {
    return tryCatchWrap('Could not Create Order', async () => {
      const sql_order = `INSERT INTO orders(user_id, status, date)
                         VALUES ('${order.uid}', '${order.status}', '${order.date}')
                         RETURNING *`;
      const results_order = await connectQuery(sql_order, client);
      const oid = results_order.rows[0].id;

      const sql_db = `INSERT INTO order_product(order_id, prod_id, quantity)
                      VALUES ('${oid}', '${pid}', '${q}')
                      RETURNING *`;

      await connectQuery(sql_db, client);

      const sql_show = `SELECT users.firstname,
                               users.lastname,
                               products.name,
                               products.price,
                               products.category,
                               orders.status,
                               orders.date,
                               orders.id,
                               quantity
                        FROM orders
                                 JOIN order_product ON orders.id = order_product.order_id
                                 JOIN products ON products.id = order_product.prod_id
                                 JOIN users ON orders.user_id = users.id`;
      const results = await connectQuery(sql_show, client);
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

  // Search an Order by ID
  async search(oid: number): Promise<Order> {
    return tryCatchWrap(`Could not Find Order with ID: ${oid}`, async () => {
      const sql = `SELECT users.firstname,
                          users.lastname,
                          users.id as uid,
                          products.name,
                          products.price,
                          products.category,
                          orders.status,
                          orders.date,
                          quantity
                   FROM orders
                            JOIN order_product ON orders.id = order_product.order_id
                            JOIN products ON products.id = order_product.prod_id
                            JOIN users ON orders.user_id = users.id
                   WHERE orders.id = ${oid}`;
      const results = await connectQuery(sql, client);
      return results.rows[0];
    });
  }

  // Get Order by Current User
  async getOrder(uid: number): Promise<Order[]> {
    return tryCatchWrap('Could Not get Orders for User', async () => {
      const sql = `SELECT users.firstname,
                          users.lastname,
                          users.id as uid,
                          products.name,
                          products.price,
                          products.category,
                          orders.status,
                          orders.date,
                          quantity
                   FROM orders
                            JOIN order_product ON orders.id = order_product.order_id
                            JOIN products ON products.id = order_product.prod_id
                            JOIN users ON orders.user_id = users.id
                   WHERE users.id = ${uid}`;
      const results = await connectQuery(sql, client);
      return results.rows;
    });
  }
}
