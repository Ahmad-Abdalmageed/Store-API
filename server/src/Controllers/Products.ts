import { NextFunction, Request, Response } from 'express';
import { tryCatchWrapExpress } from '../Middleware/Wrappers';
import { Product, ProductTable } from '../Models/Product';
import { apiError } from '../Errors/apiError';

// Create Products Controller
const products = new ProductTable();
// List All Products
const index = tryCatchWrapExpress(
  async (req: Request, res: Response, next: NextFunction) => {
    const results = await products.listAll();
    if (!results || results.length == 0)
      return next(new apiError(204, 'No Products Found'));
    res.status(200).send(results);
  }
);
// Create a New Product
const create = tryCatchWrapExpress(async (req: Request, res: Response) => {
  const newProd: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category
  };
  const results = await products.create(newProd);
  res.status(200).send(results);
});
// Delete a Product
const erase = tryCatchWrapExpress(
  async (req: Request, res: Response, next: NextFunction) => {
    const pid = Number(req.params.pid);
    const foundProd = await products.getProduct(pid);
    if (!foundProd)
      return next(new apiError(204, `Product with ID: ${pid} is not Found`));
    const results = await products.delete(pid);
    res.status(200).send(results);
  }
);
// Search Product with ID
const search = tryCatchWrapExpress(
  async (req: Request, res: Response, next: NextFunction) => {
    const pid = Number(req.params.pid);
    const foundProd = await products.getProduct(pid);
    if (!foundProd)
      return next(new apiError(204, `Product with ID: ${pid} is not Found`));
    res.status(200).json(foundProd);
  }
);
export { index, create, erase, search };
