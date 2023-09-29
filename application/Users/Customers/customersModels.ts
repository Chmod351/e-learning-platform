import mongoose from 'mongoose';

export interface ICart {
  cartId: mongoose.Types.ObjectId;
}

export interface IProduct {
  productId: mongoose.Types.ObjectId;
}

export interface ICustomer {
  username: string;
  password: string;
  email: string;
  cartId: ICart;
  wishList: Set<IProduct['productId']>;
  createdAt?: Date;
  updatedAt?: Date;
}

const CustomerSchema = new mongoose.Schema<ICustomer>(
  {
    username: {
      type: String,
      required: [true, 'The username is required'],
      maxLength: [50, 'The max length for the username is 50 characters'],
      minlength: [3, 'The username must have at least 3 characters'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'The password is required'],
      minlength: [8, 'The password must have at least 8 characters'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'The email is required'],
      maxlength: [320, 'Email address is too long'],
      validate: {
        validator: function (value: string) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: 'Invalid email format',
      },
    },
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cart',
    },
    wishList: {
      type: Set,
      of: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    },
  },
  { timestamps: true },
);

const Customer = mongoose.model<ICustomer>('Customer', CustomerSchema);
export default Customer;
