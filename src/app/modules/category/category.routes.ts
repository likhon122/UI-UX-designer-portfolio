import { Router } from 'express';
import {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
} from './category.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createCategorySchemaValidation } from './category.validation';

const categoryRoutes = Router();

categoryRoutes.post(
  '/',
  validateRequest(createCategorySchemaValidation),
  createCategory
);

categoryRoutes.get('/get-single-category/:id', getSingleCategory);
categoryRoutes.get('/', getAllCategories);
categoryRoutes.patch('/:id', updateCategory);

export default categoryRoutes;
