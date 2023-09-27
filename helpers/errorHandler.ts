import { Response, NextFunction, Request } from 'express';
//error handler
export default function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const errMsg: object = { error: error.message };

  res.status(500).json(errMsg);

  next();
}
