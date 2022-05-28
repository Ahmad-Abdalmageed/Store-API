import { client } from '../db';
import { tryCatchWrap } from '../Middleware/Wrappers';
import { connectQuery } from './helpers';

// Product Template
export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string; // TODO: A Better way to portray a Category is by an enum
};

// Product Controller
export class ProductTable {
  // List All Products
  async listAll(): Promise<Product[]> {
    return tryCatchWrap('Cannot Get All Products', async () => {
      const results = await connectQuery(`SELECT * FROM products`, client);
      return results.rows;
    });
  }
  // Get a Single Product by an ID
  async getProduct(pid: number): Promise<Product[]> {
    return tryCatchWrap(`Could not Get Product with ID ${pid}`, async () => {
      const sql = `SELECT * FROM products WHERE id = ${pid}`;
      const result = await connectQuery(sql, client);
      return result.rows[0];
    });
  }
  // Add a new Product
  async create(product: Product): Promise<Product> {
    return tryCatchWrap('Could not Create a New Product', async () => {
      const sql = `INSERT INTO products (name, price, category)
                   VALUES ('${product.name}','${product.price}','${product.category}')
                   RETURNING *`;
      const result = await connectQuery(sql, client);
      return result.rows;
    });
  }
  // Delete a Product
  async delete(pid: number): Promise<Product> {
    return tryCatchWrap(
      `Coult not Delete Product with ID : ${pid}`,
      async () => {
        const sql = `DELETE FROM products
                     WHERE id = ${pid}
                     RETURNING *`;
        const result = await connectQuery(sql, client);
        return result.rows;
      }
    );
  }
  // TODO : Top 5 Popular Products
  // TODO: Products by Category
}
