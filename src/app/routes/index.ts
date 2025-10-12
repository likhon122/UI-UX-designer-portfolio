import { Router } from 'express';
import categoryRoutes from '../modules/category/category.routes';
import designRoutes from '../modules/desing/design.routes';
import authRoutes from '../modules/auth/auth.routes';

const router = Router();

const routeModules = [
  {
    path: '/auth',
    router: authRoutes,
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
