import { Router } from 'express';
import publicRoutes from './public';
import agentRoutes from './agent';

const router = Router();

router.use('/public', publicRoutes);
router.use('/agent', agentRoutes);

export default router; 