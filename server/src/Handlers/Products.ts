import express from 'express';
import { create, erase, index, search } from '../Controllers/Products';
import { authenticate } from '../Middleware/auth';

const prodRouter = express.Router();

// Products Routes
prodRouter.route('/').get(index).post(authenticate, create);
prodRouter.route('/:pid').get(search).delete(authenticate, erase);

export { prodRouter };
