import { Router } from 'express';
import userRoutes from '../modules/users/user.route';

const router = Router();

const routeModules = [
  {
    path: '/users',
    router: userRoutes,
  },
];

routeModules.forEach(module => router.use(module.path, module.router));

export default router;
