import express from 'express';
import { login, getProfile } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Public routes
router.post('/login', login);

// Protected routes
router.get('/profile', authMiddleware, getProfile);

export default router;