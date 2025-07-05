import { Router } from 'express';
import * as publicController from '../controllers/publicController';

const router = Router();

// Properties
router.get('/properties', publicController.listProperties);
// router.get('/properties/:id', publicController.getProperty);
router.post('/properties/:id/inquire', publicController.inquireProperty);

// Search & Filters
router.get('/properties/search', publicController.searchProperties);
router.get('/properties/filters', publicController.getFilters);


export default router; 