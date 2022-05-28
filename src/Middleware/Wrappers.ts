// Async Function Wrapper

import { NextFunction, Request, Response } from 'express';

const tryCatchWrap = async (message: string, callback: CallableFunction) => {
  try {
    return await callback();
  } catch (e) {
    throw new Error(`${message} -:> ${e}`);
  }
};

const tryCatchWrapExpress = (callback: CallableFunction) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Execute the Passed Callback
      await callback(req, res, next);
    } catch (error) {
      //Catch errors if any
      next(error);
    }
  };
};

export { tryCatchWrap, tryCatchWrapExpress };
