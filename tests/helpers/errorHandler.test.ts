import { Response, NextFunction, Request } from 'express';
import mongoose from 'mongoose';
import {
  errorHandler,
  UnauthorizedError,
  BadRequestError,
  AuthenticationError,
  NotFoundError,
  BaseError,
} from '../../src/helpers/errorHandler';
describe('errorHandler', () => {
  it('should handle NotFoundError', async () => {
    const error = new NotFoundError('Resource not found') as BaseError;
    const mockRequest = {} as Request;
    const mockResponse = {} as Response;

    mockResponse.status = jest.fn().mockReturnValue(mockResponse);
    mockResponse.json = jest.fn();

    await errorHandler(error, mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Resource not found',
    });
  });

  it('should handle AuthenticationError', async () => {
    const error = new AuthenticationError('Authentication failed');
    const mockRequest = {} as Request;
    const mockResponse = {} as Response;

    mockResponse.status = jest.fn().mockReturnValue(mockResponse);
    mockResponse.json = jest.fn();

    await errorHandler(error, mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Authentication failed',
    });
  });

  it('should handle UnauthorizedError', async () => {
    const error = new UnauthorizedError('Unauthorized access');
    const mockRequest = {} as Request;
    const mockResponse = {} as Response;

    mockResponse.status = jest.fn().mockReturnValue(mockResponse);
    mockResponse.json = jest.fn();

    await errorHandler(error, mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Unauthorized access',
    });
  });

  it('should handle BadRequestError', async () => {
    const error = new BadRequestError('Bad request');
    const mockRequest = {} as Request;
    const mockResponse = {} as Response;

    mockResponse.status = jest.fn().mockReturnValue(mockResponse);
    mockResponse.json = jest.fn();

    await errorHandler(error, mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Bad request' });
  });

  it('should handle generic errors with status code 500', async () => {
    const genericError = new Error('Generic error') as BaseError;
    const mockRequest = {} as Request;
    const mockResponse = {} as Response;

    mockResponse.status = jest.fn().mockReturnValue(mockResponse);
    mockResponse.json = jest.fn();

    await errorHandler(genericError, mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Generic error',
    });
  });

  // it('should handle mongoose ValidationError with status code 400', async () => {
  //   const validationError = new mongoose.Error.ValidationError();
  //   validationError.message = 'Validation failed';
  //   const mockRequest = {} as Request;
  //   const mockResponse = {} as Response;
  //   const   = {} as NextFunction;

  //   mockResponse.status = jest.fn().mockReturnValue(mockResponse);
  //   mockResponse.json = jest.fn();

  //   await errorHandler(validationError, mockRequest, mockResponse,  );

  //   expect(mockResponse.status).toHaveBeenCalledWith(400);
  //   expect(mockResponse.json).toHaveBeenCalledWith({
  //     error: 'Validation failed',
  //   });
  // });
});
