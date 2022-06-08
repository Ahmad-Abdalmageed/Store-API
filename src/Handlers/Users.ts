import express from 'express';
import { signIn, create, erase, index, search } from '../Controllers/Users';
import { authenticate } from '../Middleware/auth';

const usersRouter = express.Router();

// Users Routes
usersRouter.route('/login/').get(signIn);
usersRouter.route('/:uid').get(search).delete(authenticate, erase);
usersRouter.route('/').get(authenticate, index).post(create);
export { usersRouter };
