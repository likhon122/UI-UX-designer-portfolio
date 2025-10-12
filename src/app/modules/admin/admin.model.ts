import { Schema, model } from 'mongoose';
import { TAdmin } from './admin.types';

const adminSchema = new Schema<TAdmin>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    position: {
      type: String,
      default: 'Administrator',
    },
    profileImage: { type: String },
  },
  { timestamps: true }
);

export const Admin = model<TAdmin>('admin', adminSchema);
