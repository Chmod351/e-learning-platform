import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

function idChecker(req: Request, res: Response, next: NextFunction) {
  const idParams = ['_id', 'productId', 'userId'];
  const hasValidId = idParams.some((param) => {
    const id = req.params[param];
    return id && mongoose.Types.ObjectId.isValid(id);
  });

  if (!hasValidId) {
    return next(new Error('Invalid or missing ID parameter'));
  }

  next();
}

export default idChecker;
