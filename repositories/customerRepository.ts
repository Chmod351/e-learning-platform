import { Service, Inject } from 'typedi';
import mongoose, { Model } from 'mongoose';
import Customer, {
  ICustomer,
} from '../application/Users/Customers/customersModels';

@Service()
class CustomerRepository {
  constructor(@Inject('CustomerModel') private Customer: Model<ICustomer>) {}
  async findAll(page: number): Promise<ICustomer[]> {
    const itemsPerPage: number = 50;
    const skip: number = (page - 1) * itemsPerPage;

    return await this.Customer.find().skip(skip).limit(itemsPerPage).exec();
  }
  async findByQuery(query: object, page: number): Promise<ICustomer[]> {
    const itemsPerPage: number = 50;
    const skip: number = (page - 1) * itemsPerPage;

    return await this.Customer.find(query)
      .skip(skip)
      .limit(itemsPerPage)
      .exec();
  }
  async findById(
    id: string | mongoose.Types.ObjectId,
  ): Promise<ICustomer | null> {
    return await this.Customer.findById(id).exec();
  }
  async findByEmail(email: string): Promise<ICustomer | null> {
    return await this.Customer.findOne({ email }).exec();
  }
  async create(user: object): Promise<ICustomer> {
    return await this.Customer.create(user);
  }

  async update(id: string, info: object): Promise<ICustomer | null> {
    return await this.Customer.findOneAndUpdate({ _id: id }, info, {
      new: true,
    }).exec();
  }

  async delete(id: string): Promise<any> {
    return await this.Customer.deleteOne({ _id: id }).exec();
  }
}

const customersRepository = new CustomerRepository(Customer);
export default customersRepository;
