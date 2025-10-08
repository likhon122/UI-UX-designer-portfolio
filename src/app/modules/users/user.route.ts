import { Router } from 'express';

const userRoutes = Router();

userRoutes.get('/', (req, res) => {
  res.send('User List');
});

export default userRoutes;
