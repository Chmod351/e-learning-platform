import productService from './productsServices';
import { Request, Response, NextFunction } from 'express';
import { ICategory, IProduct } from './productsModel';

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
      const product: IProduct | null = await productService.findById(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const { name, description, stars, image_url, price, stock } = req.body;
    try {
      const createdProduct: IProduct | null =
        await productService.createProduct({
          name,
          description,
          stars,
          stock,
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
    const { name, description, image_url, price, active, stock } = req.body;
    try {
      const updatedProduct: IProduct | null =
        await productService.updateProduct(id, {
          name,
          description,
          image_url,
          price,
          active,
          stock,
        });
      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }

  async removeCategory(req: Request, res: Response, next: NextFunction) {
    const productId: string = req.params.productId;
    const categoryId: ICategory = req.body.category;

    try {
      const product: IProduct | null = await productService.findById(productId);

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      const categoryIndex = product.category.indexOf(categoryId);

      if (categoryIndex === -1) {
        return res
          .status(404)
          .json({ error: `Category not found in ${productId}` });
      }

      product.category.splice(categoryIndex, 1);

      const updatedProduct: IProduct | null =
        await productService.updateProduct(productId, product);

      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }

  async rateProduct(req: Request, res: Response, next: NextFunction) {
    const productId: string = req.params.productId;
    const { userId, rating } = req.body;

    try {
      const product: IProduct | null = await productService.findById(productId);

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      product.userRatings.push({ userId, rating });

      const totalRatings: number = product.userRatings.length;
      const sumRatings: number = product.userRatings.reduce(
        (sum, userRating) => sum + userRating.rating,
        0,
      );
      const newAverageRating: number = sumRatings / totalRatings;

      product.stars = newAverageRating;

      const updatedProduct: IProduct | null =
        await productService.updateProduct(productId, product);

      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }

  async updateViews(req: Request, res: Response, next: NextFunction) {
    const productId: string = req.params.productId;
    const views: number = req.body.views;

    try {
      const product: IProduct | null = await productService.findById(productId);

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      product.views = views;

      const updatedProduct: IProduct | null =
        await productService.updateProduct(productId, product);

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
