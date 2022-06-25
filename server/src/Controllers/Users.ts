import { NextFunction, Request, Response } from 'express';
import { UserTable, User } from '../Models/User';
import { tryCatchWrapExpress } from '../Middleware/Wrappers';
import { apiError } from '../Errors/apiError';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Secret } from 'jsonwebtoken';
import config from '../config';

const users = new UserTable();
const tokenSecret = config.TOKEN_SECRET as unknown as Secret;

// Return All Users Route Controller
const index = tryCatchWrapExpress(
  async (req: Request, res: Response, next: NextFunction) => {
    const results = await users.listAll();
    if (!results || results.length == 0)
      return next(new apiError(204, 'No Users Found'));
    res.status(200).json(results);
  }
);
// Create new User
const create = tryCatchWrapExpress(async (req: Request, res: Response) => {
  const passHash = bcrypt.hashSync(
    req.body.pass + config.BCRYPT_PASSWORD,
    Number(config.SALT_ROUNDS)
  );
  const newUser: User = {
    username: req.body.uname,
    firstname: req.body.fname,
    lastname: req.body.lname,
    password: passHash
  };
  const results = await users.create(newUser);
  const tokenSecret = config.TOKEN_SECRET as unknown as Secret;
  const user_token = jwt.sign({ user: results }, tokenSecret);
  res.status(200).json(user_token);
});
// Search with User ID
const search = tryCatchWrapExpress(
  async (req: Request, res: Response, next: NextFunction) => {
    const results = await users.getUser(Number(req.params.uid));
    // No User found with ID
    if (!results) return next(new apiError(204, 'User could not be found'));
    res.status(200).json(results);
  }
);
// Delete User
const erase = tryCatchWrapExpress(
  async (req: Request, res: Response, next: NextFunction) => {
    const uid = Number(req.params.uid);
    const foundUser = await users.getUser(uid);
    if (!foundUser)
      return next(new apiError(204, `User with ID: ${uid} is not Found`));
    const results = await users.delUser(uid);
    res.status(200).json(results);
  }
);
const signIn = tryCatchWrapExpress(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = {
      username: req.body.uname,
      pass: req.body.pass
    };
    const authenticated = await users.auth(user.username, user.pass);
    const user_token = jwt.sign({ user: authenticated }, tokenSecret);

    if (!authenticated)
      return next(new apiError(401, 'username/password are not correct'));
    res.status(200).json(user_token);
  }
);
export { index, create, erase, search, signIn };
