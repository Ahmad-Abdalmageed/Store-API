import express from 'express';
import {
  create,
  erase,
  getUserOrders,
  index,
  search
} from '../Controllers/Orders';

const orderRouter = express.Router();

orderRouter.route('/').get(index).post(create);
orderRouter.route('/:oid').get(search).delete(erase);
orderRouter.route('/users/:uid').get(getUserOrders);
export { orderRouter };
