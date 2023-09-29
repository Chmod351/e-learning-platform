import mongoose, { Document } from 'mongoose';

export interface IUserRating {
  userId: mongoose.Types.ObjectId;
  rating: number;
}
export interface ICategory {
  categoryId: mongoose.Types.ObjectId;
}
export interface ICommentary {
  commentaryId: mongoose.Types.ObjectId;
}
export interface IProduct extends Document {
  name: string;
  description: string;
  image_url: string;
  price: number;
  stars: number;
  userRatings: IUserRating[];
  category: ICategory[];
  commentary: ICommentary[];
  stock: number;
  views: number;
  active: Boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'The name is required'],
      maxLength: [20, 'The name max length must be 20 characters'],
      minlength: [10, 'The name min length should be at least 10 characters'],
    },
    description: {
      type: String,
      required: [true, 'The description is required'],
      maxLength: [
        500,
        'Your description is too long, please only use 500 characters',
      ],
      minlength: [
        100,
        'Your description is too short, please use at least 100 characters',
      ],
    },
    stars: {
      type: Number,
      default: 0,
      min: [0, 'The minimum allowed is 0'],
      max: [5, 'The max value allowed is 5'],
    },
    userRatings: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        rating: {
          type: Number,
          required: true,
          min: [0, 'The minimum allowed is 0'],
          max: [5, 'The max value allowed is 5'],
        },
      },
    ],
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    commentary: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Commentary',
      },
    ],
    stock: {
      type: Number,
      required: [true, 'Stock is required'],
      min: [0, 'The stock cannot be less than 0'],
    },
    views: {
      type: Number,
      default: 0,
      min: [0, 'The views cannot be less than 0'],
    },
    image_url: {
      type: String,
      required: [true, 'The image_url is required'],
    },
    price: {
      type: Number,
      required: [true, 'The price is required'],
      min: [100, 'The price cannot be less than 100'],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

ProductSchema.path('category').validate(function (value) {
  return value.length > 0;
}, 'Categories are required');
const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
