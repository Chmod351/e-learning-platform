import { EventEmitter } from 'events';
import mongoose from 'mongoose';
import { IProduct } from '../application/Products/productsModel';

export interface IProductEvents {
  emitProductCreated(productId: mongoose.Types.ObjectId): void;
  onProductCreated(
    listener: (data: { productId: mongoose.Types.ObjectId }) => void,
  ): void;
}

class ProductsEvents extends EventEmitter implements IProductEvents {
  constructor() {
    super();
  }
  emitProductCreated(productId: mongoose.Types.ObjectId): void {
    this.emit('product_created', { productId });
  }
  onProductCreated(
    listener: (data: { productId: mongoose.Types.ObjectId }) => void,
  ): void {
    this.on('product_created', listener);
  }
}
export default ProductsEvents;
