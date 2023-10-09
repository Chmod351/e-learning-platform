import { Request, Response, NextFunction } from 'express';
import productController from '../../../src/application/Products/productsControllers';
import productService from '../../../src/application/Products/productsServices';

jest.mock('./productsServices');

describe('ProductController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should find all products', async () => {
    // Arrange
    const mockProducts = [{ name: 'Product 1' }, { name: 'Product 2' }];
    (productService.findAll as jest.Mock).mockResolvedValueOnce(mockProducts);

    // Act
    await productController.findAll(req as Request, res as Response, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockProducts);
  });
  it('should find product by name', async () => {
    const mockProduct = [{ name: 'Product 1' }, { name: 'Product 2' }];
    (productService.findAll as jest.Mock).mockResolvedValueOnce(mockProduct);

    // Act
    await productController.findByQuery(req as Request, res as Response, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockProduct);
  });
});
