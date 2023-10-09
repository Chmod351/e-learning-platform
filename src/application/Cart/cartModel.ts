import mongoose, { Document } from 'mongoose';

export interface ICart extends Document {
  _id: mongoose.Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

const CartSchema = new mongoose.Schema<ICart>({}, { timestamps: true });

CartSchema.path('category').validate(function (value) {
  return value.length > 0;
}, 'Categories are required');

const Cart = mongoose.model<ICart>('Cart', CartSchema);

export default Cart;
