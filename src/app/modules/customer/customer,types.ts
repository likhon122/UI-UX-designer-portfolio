import { Types } from 'mongoose';
import { TUser } from '../user/user.types';

export type TCustomer = {
  user: Types.ObjectId | TUser;
  phone?: string;
  address?: string;
  membership?: 'Basic' | 'Premium' | 'VIP';
  totalSpent?: number;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
};
