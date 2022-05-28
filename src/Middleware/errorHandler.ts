import { apiError } from '../Errors/apiError';
import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  error: apiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = error.statusCode || 500;
  const mssg = error.message || 'Something Went Wrong';
  res.status(status).send({ status, mssg });
  next();
}
