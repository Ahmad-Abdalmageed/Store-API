import express from 'express';
import { signIn, create, erase, index, search } from '../Controllers/Users';

const usersRouter = express.Router();

// Users Routes
usersRouter.route('/login/').get(signIn);
usersRouter.route('/:uid').get(search).delete(erase);
usersRouter.route('/').get(index).post(create);
export { usersRouter };
