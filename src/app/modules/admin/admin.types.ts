import { Types } from 'mongoose';
import { TUser } from '../user/user.types';

export type TAdmin = {
  name: string;
  user: Types.ObjectId | TUser;
  position?: string;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
};
