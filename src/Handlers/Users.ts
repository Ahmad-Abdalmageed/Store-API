import express from 'express';
import { create, erase, index, search } from '../Controllers/Users';

const usersRouter = express.Router();

// Users Routes
usersRouter.route('/').get(index).post(create);
usersRouter.route('/:uid').get(search).delete(erase);
export { usersRouter };
