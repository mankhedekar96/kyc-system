import { Router } from 'express';
import {
  getKYCStatusController,
  updateKYCStatusController,
  getAllKYCDataController,
  submitKYCController,
} from '../controllers/kycController';
import { isAdmin, isAuthenticated } from '../middleware/authMiddleware';

const router = Router();

// Submit KYC data
router.post('/submit', isAuthenticated, submitKYCController);

// Get KYC status
router.get('/status', isAuthenticated, getKYCStatusController);

// Admin updates KYC status
router.put('/:id', isAuthenticated, isAdmin, updateKYCStatusController);

// All KYC submitted
router.get('/all', isAuthenticated, isAdmin, getAllKYCDataController);

export default router;
