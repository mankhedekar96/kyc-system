import { Router } from 'express';
import uploadMiddleware from '../middleware/uploadMiddleware';
import { uploadFileController } from '../controllers/uploadController';
import { isAuthenticated } from '../middleware/authMiddleware';

const router = Router();

// Upload a file
router.post('/', isAuthenticated, uploadMiddleware.single('file'), uploadFileController);

export default router;
