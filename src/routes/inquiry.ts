import { Router } from 'express';
import * as inquiryController from '../controllers/inquiry.controller';
const router = Router();

router.post('/create', inquiryController.createInquiry);
router.post('/schedules', inquiryController.getSchedules);
export default router; 