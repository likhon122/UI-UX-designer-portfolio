import mongoose, { Schema } from 'mongoose';
import { TUser } from './user.types';

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<TUser>('user', userSchema);

export default User;
