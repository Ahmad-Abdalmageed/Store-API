/*
  Not Found Response Middleware
*/

import { Request, Response } from 'express';

const notFound = (req: Request, res: Response) =>
  res.status(404).send('Route Does not Exist');

export { notFound };
