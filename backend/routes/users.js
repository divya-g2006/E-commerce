import express from 'express';
import { authenticate, authorizeAdmin } from '../middleware/auth.js';
import { getUsers, updateProfile } from '../controllers/userController.js';

const router = express.Router();

router.get('/', authenticate, authorizeAdmin, getUsers);
router.put('/profile', authenticate, updateProfile);

export default router;
