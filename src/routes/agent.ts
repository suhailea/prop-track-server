import { Router } from 'express';
import * as agentController from '../controllers/agentController';

const router = Router();

// Property Management
router.post('/properties', agentController.listProperties);
router.post('/create-property', agentController.createProperty);
router.put('/properties/:id', agentController.updateProperty);
router.delete('/properties/:id', agentController.deleteProperty);
router.patch('/properties/:id/archive', agentController.archiveProperty);
router.get('/properties/amenities', agentController.listAminities);

// Client Management
router.get('/clients', agentController.listClients);

router.put('/clients/:id', agentController.updateClient);
export default router; 