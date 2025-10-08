import { Router } from 'express';
import { createDesign } from './design.controller';

const designRoutes = Router();

designRoutes.post('/', createDesign);
