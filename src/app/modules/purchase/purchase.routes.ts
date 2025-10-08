import { Router } from 'express';
import { createPurchase } from './purchase.controller';

const purchaseRoutes = Router();
purchaseRoutes.post('/', createPurchase);

export default purchaseRoutes;
