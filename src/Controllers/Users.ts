import { NextFunction, Request, Response } from 'express';
import { UserTable, User } from '../Models/User';
import { tryCatchWrapExpress } from '../Middleware/Wrappers';
import { apiError } from '../Errors/apiError';

const users = new UserTable();

// Return All Users Route Controller
const index = tryCatchWrapExpress(async (req: Request, res: Response) => {
  const results = await users.listAll();
  res.status(200).json(results);
});

const create = tryCatchWrapExpress(async (req: Request, res: Response) => {
  const newUser: User = {
    FirstName: req.body.fname,
    LastName: req.body.lname,
    password: req.body.pass
  };
  const results = await users.create(newUser);
  res.status(200).json(results);
});

const search = tryCatchWrapExpress(
  async (req: Request, res: Response, next: NextFunction) => {
    const results = await users.getUser(Number(req.params.uid));
    // No User found with ID
    if (!results) return next(new apiError(404, 'User could not be found'));
    res.status(200).json(results);
  }
);

const erase = tryCatchWrapExpress(
  async (req: Request, res: Response, next: NextFunction) => {
    const uid = Number(req.params.uid);
    const foundUser = await users.getUser(uid);
    if (!foundUser)
      return next(new apiError(404, `User with ID: ${uid} is not Found`));
    const results = await users.delUser(uid);
    res.status(200).json(results);
  }
);

export { index, create, erase, search };
