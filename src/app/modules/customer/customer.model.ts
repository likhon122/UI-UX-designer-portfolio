import { Schema, model } from 'mongoose';
import { TCustomer } from './customer,types';

const customerSchema = new Schema<TCustomer>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    phone: String,
    address: String,
    membership: {
      type: String,
      enum: ['Basic', 'Premium', 'VIP'],
      default: 'Basic',
    },
    totalSpent: {
      type: Number,
      default: 0,
    },
    profileImage: { type: String },
  },
  { timestamps: true }
);

export const Customer = model<TCustomer>('customer', customerSchema);
