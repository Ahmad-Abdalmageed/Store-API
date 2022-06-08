// Verify User
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { apiError } from '../Errors/apiError';

function authenticate(req: Request, res: Response, next: NextFunction): void {
  try {
    const token = req.headers.authorization?.split(' ')[1] as unknown as string;
    const secret = process.env.TOKEN_SECRET as unknown as string;
    const decoded = jwt.verify(token, secret);
    res.locals.userID = (decoded as jwt.JwtPayload).user.id;
    next();
  } catch (e) {
    return next(new apiError(401, 'Could not Authenticate User'));
  }
}

export { authenticate };
