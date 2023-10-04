import UserEvents, { IUserEvents } from '../../src/events/userEvents';
import { IProduct } from '../../src/application/Products/productsModel';

import mongoose from 'mongoose';

describe('UserEvents', () => {
  let userEvents: IUserEvents;

  beforeEach(() => {
    userEvents = new UserEvents();
  });

  it('should emit user_connected event and be listened to', (done) => {
    const userId = new mongoose.Types.ObjectId();

    userEvents.onUserConnected((data: any) => {
      expect(data.userId).toEqual(userId);
      done();
    });

    userEvents.emitUserConnected(userId);
  });

  it('should emit wishlist_updated event and be listened to', (done) => {
    const userId = new mongoose.Types.ObjectId();
    const product: IProduct = {
      _id: new mongoose.Types.ObjectId(),
      name: '',
      description: '',
      image_url: '',
      price: 200,
      stars: 3,
      userRatings: [{ userId: new mongoose.Types.ObjectId(), rating: 4 }],
      category: [{ categoryId: new mongoose.Types.ObjectId() }],
      commentary: [{ commentaryId: new mongoose.Types.ObjectId() }],
      stock: 2000,
      views: 8,
      active: true,
    } as any;

    userEvents.onWishlistUpdated((data: any) => {
      expect(data.userId).toEqual(userId);
      expect(data.product).toEqual(product);
      done();
    });

    userEvents.emitUserWishlistUpdate(userId, product);
  });
});
