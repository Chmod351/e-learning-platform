import { Response, NextFunction, Request } from 'express';
//error handler
export default function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(error);

  next();
}
