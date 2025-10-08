export type TRole = 'admin' | 'customer';
export type TUser = {
  name: string;
  email: string;
  password: string;
  role: TRole;
  createdAt: Date;
  updatedAt: Date;
};
