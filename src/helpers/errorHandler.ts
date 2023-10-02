import { Response, NextFunction, Request } from 'express';
import mongoose from 'mongoose';

export class BaseError extends Error {
  statusCode!: number;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

class AuthenticationError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
    this.statusCode = 401;
  }
}

class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = 403;
  }
}
class BadRequestError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = 400;
  }
}

async function errorHandler(error: BaseError, req: Request, res: Response) {
  if (error.statusCode) {
    res.status(error.statusCode).json({ error: error.message });
  } else if (error instanceof mongoose.Error.ValidationError) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(500).json({ error: error.message });
  }
}

export {
  errorHandler,
  UnauthorizedError,
  BadRequestError,
  AuthenticationError,
  NotFoundError,
};
