import productService from './productsServices';
import { Request, Response, NextFunction } from 'express';
import { IProduct } from './productsModel';

class ProductController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    const page: number | undefined = parseInt(req.query.page as string) || 1;
    try {
      const products: IProduct[] = await productService.findAll(page);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  async findByQuery(req: Request, res: Response, next: NextFunction) {
    try {
      const query: string | undefined = req.query.query as string;
      if (!query) {
        return res.status(400).json({ error: 'Missing query parameter' });
      }
      const page: number | undefined = parseInt(req.query.page as string) || 1;
      const products: IProduct[] = await productService.findByQuery(
        query,
        page,
      );
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    const id: string = req.params.id;
    try {
      const product = await productService.findById(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const { name, description, image_url, price } = req.body;
    try {
      const createdProduct = await productService.createProduct({
        name,
        description,
        image_url,
        price,
      });
      res.json(createdProduct);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const id: string = req.params.id;
    const {
      name,
      description,
      image_url,
      price,
      stars,
      category,
      active,
      stock,
    } = req.body;
    try {
      const updatedProduct = await productService.updateProduct(id, {
        name,
        description,
        image_url,
        price,
        stars,
        category,
        active,
        stock,
      });
      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    const id: string = req.params.id;
    try {
      const deletedProduct = await productService.deleteProduct(id);
      res.status(200).json(deletedProduct);
    } catch (error) {
      next(error);
    }
  }
}

const productController = new ProductController();

export default productController;
