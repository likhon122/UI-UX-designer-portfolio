import { Router } from 'express';
import userRoutes from '../modules/users/user.route';
import categoryRoutes from '../modules/category/category.routes';
import designRoutes from '../modules/desing/design.routes';

const router = Router();

const routeModules = [
  {
    path: '/users',
    router: userRoutes,
  },
  {
    path: '/categories',
    router: categoryRoutes,
  },
  {
    path: '/designs',
    router: designRoutes,
  },
];

routeModules.forEach(module => router.use(module.path, module.router));

export default router;
