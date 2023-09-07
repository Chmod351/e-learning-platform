const Product = require("../application/Products/productsModel");

class ProductRepository {
  async findAll() {
    return await Product.find();
  }

  async findById(id:string) {
    return await Product.findById(id);
  }

  async create(product:object) {
    return await Product.create(product);
  }

  async update(id:string, product:object) {
    return await Product.findOneAndUpdate({ _id: id }, product, { new: true });
  }
  async delete(id:string) {
    return await Product.deleteOne({ _id: id });
  }
}

module.exports = new ProductRepository();