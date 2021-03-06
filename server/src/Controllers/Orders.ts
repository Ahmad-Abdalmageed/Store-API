import { Order, OrderTable } from '../Models/Order';
import { tryCatchWrapExpress } from '../Middleware/Wrappers';
import { NextFunction, Request, Response } from 'express';
import { apiError } from '../Errors/apiError';

const orders = new OrderTable();

// Return ALl Orders
const index = tryCatchWrapExpress(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization?.split(' ')[1] !== 'Admin')
      return next(new apiError(401, 'Bad Authentication'));

    const results = await orders.listAll();
    if (!results || results.length == 0)
      return next(new apiError(204, 'No Orders Found'));
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
  const results = await orders.create(
    newOrder,
    req.body.pid,
    req.body.quantity
  );
  res.status(200).json(results);
});
// Delete Order Using ID
const erase = tryCatchWrapExpress(
  async (req: Request, res: Response, next: NextFunction) => {
    const oid = Number(req.params.oid);
    const foundID = await orders.search(oid);
    if (foundID.uid !== res.locals.uid)
      return next(new apiError(401, 'Bad Authentication'));
    if (!foundID)
      return next(new apiError(204, `Order with ID: ${oid} is not found`));
    const results = await orders.delete(oid);
    res.status(200).json(results);
  }
);
const search = tryCatchWrapExpress(
  async (req: Request, res: Response, next: NextFunction) => {
    const oid = Number(req.params.oid);
    const foundID = await orders.search(oid);
    if (!foundID)
      return next(new apiError(204, `Order with ID: ${oid} is not found`));
    if (
      req.headers.authorization?.split(' ')[1] !== 'Admin' &&
      foundID.uid !== res.locals.uid
    ) {
      return next(new apiError(401, 'Bad Authentication'));
    }
    res.status(200).json(foundID);
  }
);
// Get User's Current Orders
const getUserOrders = tryCatchWrapExpress(
  async (req: Request, res: Response, next: NextFunction) => {
    const uid = Number(req.params.uid);
    const foundOrders = await orders.getOrder(uid);
    if (
      req.headers.authorization?.split(' ')[1] !== 'Admin' &&
      uid !== res.locals.uid
    )
      return next(new apiError(401, 'Bad Authentication'));
    if (!foundOrders || foundOrders.length == 0)
      return next(new apiError(204, `No Orders Found `));
    res.status(200).json(foundOrders);
  }
);
export { index, create, erase, search, getUserOrders };
