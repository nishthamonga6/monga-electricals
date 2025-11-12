import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  image: string;
  price: number;
  desc: string;
  category?: string;
  createdAt?: Date;
}

const ProductSchema: Schema = new Schema<IProduct>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  desc: { type: String, required: true },
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
