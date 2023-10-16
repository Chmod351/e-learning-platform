import { EventEmitter } from 'events';
import mongoose from 'mongoose';
import { IProduct } from '../application/Products/productsModel';

export interface IUserEvents {
  emitUserConnected(userId: mongoose.Types.ObjectId): void;

  onUserConnected(
    listener: (data: { userId: mongoose.Types.ObjectId }) => void,
  ): void;

  emitUserWishlistUpdate(
    userId: mongoose.Types.ObjectId | string,
    product: IProduct,
  ): void;

  onWishlistUpdated(
    listener: (data: {
      userId: mongoose.Types.ObjectId | string;
      product: IProduct;
    }) => void,
  ): void;
}

class UserEvents extends EventEmitter implements IUserEvents {
  constructor() {
    super();
  }

  emitUserConnected(userId: mongoose.Types.ObjectId) {
    this.emit('user_connected', { userId });
  }

  onUserConnected(
    listener: (data: { userId: mongoose.Types.ObjectId }) => void,
  ) {
    this.on('user_connected', listener);
  }
  emitUserWishlistUpdate(
    userId: mongoose.Types.ObjectId | string,
    product: IProduct,
  ) {
    this.emit('wishlist_updated', { userId, product });
  }

  onWishlistUpdated(
    listener: (data: {
      userId: mongoose.Types.ObjectId | string;
      product: IProduct;
    }) => void,
  ) {
    this.on('wishlist_updated', listener);
  }
}
export default UserEvents;
