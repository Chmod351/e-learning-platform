import customerService from './customersService';
import { Request, Response, NextFunction } from 'express';
import { ICustomer, ICart, IProduct } from './customersModels';

class CustomerController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    const page: number | undefined = parseInt(req.query.page as string) || 1;
    try {
      const customer: ICustomer[] = await customerService.findAll(page);
      res.status(200).json(customer);
    } catch (error) {
      next(error);
    }
  }
  async findByQuery(req: Request, res: Response, next: NextFunction) {
    try {
      const query: string | undefined = req.query.query as string;
      if (!query) {
        res.status(400).json({ error: 'Missing query parameter' });
      }
      const page: number | undefined = parseInt(req.query.page as string) || 1;
      const customer: ICustomer[] = await customerService.findByQuery(
        query,
        page,
      );
      res.status(200).json(customer);
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { password } = req.body;
      const customerId: string = req.params.id;
      const newCustomer: ICustomer | null =
        await customerService.updateCustomer(customerId, password);
      res.status(200).json(newCustomer);
    } catch (error) {
      next(error);
    }
  }
  async addToWishList(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.body;
      const customerId: string = req.params.id;
      const store: object = { $addToSet: { wishList: productId } };
      const newWishlist: ICustomer | null =
        await customerService.updateCustomer(customerId, store);
      res.status(200).json(newWishlist);
    } catch (error) {
      next(error);
    }
  }
}
const customerController = new CustomerController();
export default customerController;
