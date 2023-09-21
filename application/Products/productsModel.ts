import mongoose, { Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  image_url: string;
  price: number;
  stars: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'The name is required'],
    },
    description: {
      type: String,
      required: [true, 'The description is required'],
    },
    stars: {
      type: Number,
      required: false,
    },
    image_url: {
      type: String,
      required: [true, 'The image_url is required'],
    },
    price: {
      type: Number,
      required: [true, 'The price is required'],
    },
  },
  { timestamps: true },
);
const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
