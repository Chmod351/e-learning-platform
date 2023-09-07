import { Service, Inject } from "typedi";
import { Model } from 'mongoose';
import Product,{IProduct} from "../application/Products/productsModel";

@Service()
class ProductRepository {
  constructor(
    @Inject() private Product: Model<IProduct>,
  ) { }

  async findAll(): Promise<IProduct[]> {
    return await this.Product.find().exec();
  }

  async findById(id: string): Promise<IProduct | null> {
    return await this.Product.findById(id).exec();
  }

  async create(product: object): Promise<IProduct> {
    return await this.Product.create(product);
  }

  async update(id: string, product: object): Promise<IProduct | null> {
    return await this.Product.findOneAndUpdate({ _id: id }, product, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return await this.Product.deleteOne({ _id: id }).exec();
  }
}

export default new ProductRepository(Product);
