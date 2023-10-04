import idChecker from '../../src/helpers/idChecker';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

describe('idChecker Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      params: {},
    };
    res = {};
    next = jest.fn();
  });

  it('should pass with a valid ObjectId', () => {
    const validId = new mongoose.Types.ObjectId().toString();
    if (req.params) {
      req.params._id = validId;

      idChecker(req as Request, res as Response, next);

      expect(next).toHaveBeenCalled();
    }
  });

  it('should pass with a valid ObjectId for different params name', () => {
    const validId = new mongoose.Types.ObjectId().toString();
    if (req.params) {
      req.params.productId = validId;
      idChecker(req as Request, res as Response, next);

      expect(next).toHaveBeenCalled();
    }
  });

  it('should fail with missing id parameter', () => {
    idChecker(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(
      new Error('Invalid or missing ID parameter'),
    );
  });

  it('should fail with invalid ObjectId', () => {
    if (req.params) {
      req.params._id = 'invalidId';

      idChecker(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(
        new Error('Invalid or missing ID parameter'),
      );
    }
  });

  it('should fail with invalid ObjectId for different params name', () => {
    if (req.params) {
      req.params.productId = 'invalidId';

      idChecker(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(
        new Error('Invalid or missing ID parameter'),
      );
    }
  });
});
