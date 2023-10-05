import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model } from 'mongoose';
import Product, {
  IProduct,
} from '../../src/application/Products/productsModel';
import ProductRepository from '../../src/repositories/productsRepository';

describe('ProductRepository', () => {
  let productRepository: ProductRepository;
  let ProductModel: Model<IProduct>;
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    mongod = new MongoMemoryServer();
    const uri = await mongod.getUri();
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    ProductModel = mongoose.model<IProduct>('Product', Product.schema);
    productRepository = new ProductRepository(ProductModel);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });

  it('should find all products', async () => {
    const products = await productRepository.findAll(1);
    expect(products).toHaveLength(0); // Assuming there are no products in the test database
  });

  it('should find products by query', async () => {
    const query = { name: 'Test Product' };
    const products = await productRepository.findByQuery(query, 1);
    expect(products).toHaveLength(0); // Assuming no products match the query
  });

  it('should find product by id', async () => {
    const product = await productRepository.create({
      name: 'Test Product',
      description: 'This is a test product',
      image_url: 'test-image.jpg',
      price: 99.99,
      stars: 4,
      userRatings: [],
      category: [],
      commentary: [],
      stock: 100,
      views: 10,
      active: true,
    });

    const foundProduct = await productRepository.findById(product._id);
    expect(foundProduct).toEqual(
      expect.objectContaining({ name: 'Test Product' }),
    );
  });

  it('should create a product', async () => {
    const productData = {
      name: 'New Product',
      description: 'A new product for testing',
      image_url: 'new-product.jpg',
      price: 49.99,
      stars: 3,
      userRatings: [],
      category: [],
      commentary: [],
      stock: 50,
      views: 5,
      active: true,
    };

    const createdProduct = await productRepository.create(productData);
    expect(createdProduct).toEqual(expect.objectContaining(productData));
  });

  it('should update a product', async () => {
    const product = await productRepository.create({
      name: 'Old Product',
      description: 'An old product for testing',
      image_url: 'old-product.jpg',
      price: 29.99,
      stars: 2,
      userRatings: [],
      category: [],
      commentary: [],
      stock: 30,
      views: 3,
      active: true,
    });

    const updatedData = {
      name: 'Updated Product',
      price: 39.99,
      stars: 4,
      stock: 40,
    };

    const updatedProduct = await productRepository.update(
      product._id,
      updatedData,
    );
    expect(updatedProduct).toEqual(expect.objectContaining(updatedData));
  });

  it('should delete a product', async () => {
    const product = await productRepository.create({
      name: 'Product to Delete',
      description: 'A product to be deleted',
      image_url: 'delete-product.jpg',
      price: 19.99,
      stars: 1,
      userRatings: [],
      category: [],
      commentary: [],
      stock: 20,
      views: 2,
      active: true,
    });

    await productRepository.delete(product._id);
    const deletedProduct = await productRepository.findById(product._id);
    expect(deletedProduct).toBeNull();
  });
});
