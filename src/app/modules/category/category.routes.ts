import { Router } from 'express';
import { createCategory } from './category.controller';

const categoryRoutes = Router();

categoryRoutes.post('/', createCategory);

export default categoryRoutes;
