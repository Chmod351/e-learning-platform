import mongoose from 'mongoose';
import productRepository from '../../repositories/productsRepository';

class ProductServices {
  async findAll(page: number) {
    return await productRepository.findAll(page);
  }
  async findByQuery(query: string, page: number) {
    const q: object = {
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    };
    return await productRepository.findByQuery(q, page);
  }
  async findById(id: string | mongoose.Types.ObjectId) {
    return await productRepository.findById(id);
  }
  async createProduct(body: object) {
    return await productRepository.create(body);
  }
  async updateProduct(id: string | mongoose.Types.ObjectId, product: object) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      return await productRepository.update(id, product, session);
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
  async deleteProduct(id: string | mongoose.Types.ObjectId) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      return await productRepository.delete(id, session);
      //more operrations with the same session to delete such as , comments, and responses
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}

const productService = new ProductServices();

export default productService;
