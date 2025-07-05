import { Router } from 'express';
import * as agentController from '../controllers/agentController';

const router = Router();

// Property Management
router.post('/properties', agentController.listProperties);
router.post('/create-properties', agentController.createProperty);
// router.get('/properties/:id', agentController.getProperty);
router.put('/properties/:id', agentController.updateProperty);
router.delete('/properties/:id', agentController.deleteProperty);
router.patch('/properties/:id/archive', agentController.archiveProperty);
router.get('/properties/amenities', agentController.listAminities);

// Client Management
router.get('/clients', agentController.listClients);
// router.get('/clients/:id', agentController.getClient);
router.put('/clients/:id', agentController.updateClient);
// router.patch('/clients/:id/status', agentController.updateClientStatus);

// Viewing Management
router.get('/viewings', agentController.listViewings);
router.post('/viewings', agentController.createViewing);
router.put('/viewings/:id', agentController.updateViewing);
router.patch('/viewings/:id/status', agentController.updateViewingStatus);

// Inquiry Management
router.get('/inquiries', agentController.listInquiries);
// router.get('/inquiries/:id', agentController.getInquiry);
router.post('/inquiries/:id/respond', agentController.respondToInquiry);

export default router; 