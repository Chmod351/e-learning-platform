import productRepository from '../../repositories/productsRepository';

class ProductServices {
  async findAll() {
    try {
      return await productRepository.findAll();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async findByQuery(query: string) {
    const q = { name: { $all: query } } || { description: { $all: query } };
    try {
      return await productRepository.findByQuery(q);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async findById(id: string) {
    try {
      return await productRepository.findById(id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async createProduct(body: object) {
    console.log(body);
    try {
      return await productRepository.create(body);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async updateProduct(id: string, product: object) {
    try {
      return await productRepository.update(id, product);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async deleteProduct(id: string) {
    try {
      return await productRepository.delete(id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

const productService = new ProductServices();

export default productService;
