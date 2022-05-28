import express from 'express';
import { create, erase, index, search } from '../Controllers/Products';

const prodRouter = express.Router();

// Products Routes
prodRouter.route('/').get(index).post(create);
prodRouter.route('/:pid').get(search).delete(erase);

export { prodRouter };
