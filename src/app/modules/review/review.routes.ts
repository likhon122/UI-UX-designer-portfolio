import { Router } from 'express';
import { createReview } from './review.controller';

const reviewRoutes = Router();

reviewRoutes.post('/', createReview);
