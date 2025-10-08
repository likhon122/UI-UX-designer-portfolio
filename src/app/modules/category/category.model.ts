import mongoose, { Schema } from 'mongoose';
import { TCategory } from './category.types';

const CategorySchema = new Schema<TCategory>(
  {
    name: { type: String, required: true, unique: true },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model<TCategory>('category', CategorySchema);

export default Category;
