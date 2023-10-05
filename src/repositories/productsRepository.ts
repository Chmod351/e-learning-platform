import { Service, Inject } from 'typedi';
import mongoose, { Model, ClientSession } from 'mongoose';
import Product, { IProduct } from '../application/Products/productsModel';

@Service()
class ProductRepository {
  constructor(@Inject('ProductModel') private Product: Model<IProduct>) {}

  async findAll(page: number): Promise<IProduct[]> {
    const itemsPerPage: number = 50;
    const skip: number = (page - 1) * itemsPerPage;

    return await this.Product.find().skip(skip).limit(itemsPerPage).exec();
  }
  async findByQuery(query: object, page: number): Promise<IProduct[]> {
    const itemsPerPage: number = 50;
    const skip: number = (page - 1) * itemsPerPage;

    return await this.Product.find(query).skip(skip).limit(itemsPerPage).exec();
  }
  async findById(
    id: string | mongoose.Types.ObjectId,
  ): Promise<IProduct | null> {
    return await this.Product.findById(id).exec();
  }

  async create(product: object): Promise<IProduct> {
    return await this.Product.create(product);
  }

  async update(
    id: mongoose.Types.ObjectId | string,
    product: object,
    session: ClientSession,
  ): Promise<IProduct | null> {
    return await this.Product.findOneAndUpdate({ _id: id }, product, {
      new: true,
    })
      .session(session)
      .exec();
  }

  async delete(
    id: mongoose.Types.ObjectId | string,
    session: ClientSession,
  ): Promise<object> {
    return await this.Product.deleteOne({ _id: id }).session(session).exec();
  }
}

const productRepository = new ProductRepository(Product);

export default productRepository;
