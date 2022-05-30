import express from 'express';
import { uAuthin, create, erase, index, search } from '../Controllers/Users';

const usersRouter = express.Router();

// Users Routes
usersRouter.route('/auth/').get(uAuthin);
usersRouter.route('/:uid').get(search).delete(erase);
usersRouter.route('/').get(index).post(create);
export { usersRouter };
