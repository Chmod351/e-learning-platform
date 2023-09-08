import productRepository from '../../repositories/productsRepository';

class ProductServices {
  async findAll() {
    return await productRepository.findAll();
  }
  async findByQuery(query: string) {
    const q = {
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    };
    return await productRepository.findByQuery(q);
  }
  async findById(id: string) {
    return await productRepository.findById(id);
  }
  async createProduct(body: object) {
    return await productRepository.create(body);
  }
  async updateProduct(id: string, product: object) {
    return await productRepository.update(id, product);
  }
  async deleteProduct(id: string) {
    return await productRepository.delete(id);
  }
}

const productService = new ProductServices();

export default productService;
