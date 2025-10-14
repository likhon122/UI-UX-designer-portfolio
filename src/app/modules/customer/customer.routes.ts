import { Router } from 'express';
import auth from '../../middlewares/auth';
import { getAllCustomers, getSingleCustomer } from './customer.controller';

const customerRoutes = Router();

customerRoutes.get('/:id', auth('admin', 'superAdmin'), getSingleCustomer);
customerRoutes.get('/', auth('admin', 'superAdmin'), getAllCustomers);
export default customerRoutes;
