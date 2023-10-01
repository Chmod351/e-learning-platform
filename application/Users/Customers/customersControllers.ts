import customerService from './customersService';
import { Request, Response, NextFunction } from 'express';
import { ICustomer, IProduct } from './customersModels';
import Encrypt from '../../../helpers/encription';
import { Service, Inject } from 'typedi';
import { SessionData } from 'express-session';
import UserEvents from '../../../events/userEvents';

interface MySessionData extends SessionData {
  loggedin?: boolean;
}

@Service()
class CustomerController {
  constructor(
    @Inject() private encrypt: Encrypt,
    private userEvents: UserEvents,
  ) {}
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
  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: string = req.params.id;
      const user: ICustomer | null = await customerService.findById(userId);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { password } = req.body;
      const hashedPassword = await this.encrypt.hashPassword(password);
      const customerId: string = req.params.id;
      const newCustomer: ICustomer | null =
        await customerService.updateCustomer(customerId, {
          password: hashedPassword,
        });
      res.status(200).json(newCustomer);
    } catch (error) {
      next(error);
    }
  }
  async addToWishList(req: Request, res: Response, next: NextFunction) {
    try {
      const productId: IProduct = req.body.productId;
      const customerId: string = req.params.id;
      const store: object = { $addToSet: { wishList: productId } };
      const newWishlist: ICustomer | null =
        await customerService.updateCustomer(customerId, store);
      res.status(200).json(newWishlist);
    } catch (error) {
      next(error);
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password, email } = req.body;
      const hashedPassword = await this.encrypt.hashPassword(password);
      const user: ICustomer = await customerService.createCustomer({
        username,
        password: hashedPassword,
        email,
      });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user: ICustomer | null = await customerService.findByEmail(email);
      if (user !== null) {
        const match: Boolean = await this.encrypt.comparePassword(
          password,
          user.password,
        );
        if (user === null || !match) {
          res.status(400).json({ message: 'password or email invalid' });
        } else {
          req.session.regenerate((err) => {
            if (err) {
              return next(err);
            }
            (req.session as MySessionData).loggedin = true;
            this.userEvents.emitUserConnected(user._id);
            res.status(200).json({ message: 'Logged in successfully' });
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      req.session.destroy(function (err) {
        if (err) {
          next(err);
        } else {
          res.clearCookie('sessionId');
          res.status(200).json({ message: 'Logged out successfully' });
        }
      });
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: string = req.params.id;
      const deletedCustomer = await customerService.deleteCustomer(userId);
      res.status(200).json(deletedCustomer);
    } catch (error) {
      next(error);
    }
  }
}
const events = new UserEvents();
const encrypt = new Encrypt();
const customerController = new CustomerController(encrypt, events);
export default customerController;
