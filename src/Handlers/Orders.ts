import express from 'express';
import { create, erase, index, search } from '../Controllers/Orders';

const orderRouter = express.Router();

orderRouter.route('/').get(index).post(create);
orderRouter.route('/:oid').get(search).delete(erase);

export { orderRouter };
