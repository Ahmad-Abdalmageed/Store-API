import { Request, Response } from 'express';
import { UserTable, User } from '../Models/User';
import { tryCatchWrapExpress } from '../Middleware/Wrappers';

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

const search = tryCatchWrapExpress(async (req: Request, res: Response) => {
  const results = await users.getUser(Number(req.params.uid));
  res.status(200).json(results);
});

const erase = tryCatchWrapExpress(async (req: Request, res: Response) => {
  const results = await users.delUser(Number(req.params.uid));
  res.status(200).json(results);
});

export { index, create, erase, search };
