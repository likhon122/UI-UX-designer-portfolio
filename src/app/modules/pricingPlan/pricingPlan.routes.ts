import { Router } from 'express';
import { createPricingPlan } from './pricingPlan.controller';

const pricingPlanRoutes = Router();

pricingPlanRoutes.post('/', createPricingPlan);
