import { Router } from 'express';
import {
  createDesign,
  deleteDesign,
  getAllDesign,
  getSingleDesign,
  updateDesign,
} from './design.controller';
import validateRequest from '../../middlewares/validateRequest';
import {
  createDesignSchemaValidation,
  updateDesignSchemaValidation,
} from './desing.validation';

const designRoutes = Router();

designRoutes.post(
  '/',
  validateRequest(createDesignSchemaValidation),
  createDesign
);

designRoutes.get('/get-single-design/:id', getSingleDesign);
designRoutes.get('/', getAllDesign);

designRoutes.patch(
  '/:id',
  validateRequest(updateDesignSchemaValidation),
  updateDesign
);

designRoutes.delete('/:id', deleteDesign);


export default designRoutes;
