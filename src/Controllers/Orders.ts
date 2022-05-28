import { Order, OrderTable } from '../Models/Order';
import { tryCatchWrapExpress } from '../Middleware/Wrappers';
import { NextFunction, Request, Response } from 'express';
import { apiError } from '../Errors/apiError';

const orders = new OrderTable();

// Return ALl Orders
const index = tryCatchWrapExpress(
  async (req: Request, res: Response, next: NextFunction) => {
    const results = await orders.listAll();
    if (!results || results.length == 0)
      return next(new apiError(404, 'No Orders Found'));
    res.status(200).json(results);
  }
);
// Create a new Order
const create = tryCatchWrapExpress(async (req: Request, res: Response) => {
  const newOrder: Order = {
    uid: req.body.uid,
    status: req.body.os,
    date: req.body.date
  };
  const results = await orders.create(newOrder);
  res.status(200).json(results);
});
// Delete Order Using ID
const erase = tryCatchWrapExpress(
  async (req: Request, res: Response, next: NextFunction) => {
    const oid = Number(req.params.oid);
    const foundID = await orders.search(oid);
    if (!foundID)
      return next(new apiError(404, `Order with ID: ${oid} is not found`));
    const results = await orders.delete(oid);
    res.status(200).json(results);
  }
);
const search = tryCatchWrapExpress(
  async (req: Request, res: Response, next: NextFunction) => {
    const oid = Number(req.params.oid);
    const foundID = await orders.search(oid);
    if (!foundID)
      return next(new apiError(404, `Order with ID: ${oid} is not found`));
    res.status(200).json(foundID);
  }
);
export { index, create, erase, search };
