import express from 'express';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';
import { checkRole, isAdmin, isAdminOrStaff } from '../middleware/roleMiddleware';

const router = express.Router();

// All routes here require authentication
router.use(authMiddleware);

// Admin only - matches your diagram flow
router.delete('/admin/:id', isAdmin, (req: AuthRequest, res) => {
  res.json({ 
    message: 'admin delete',
    deletedId: req.params.id,
    deletedBy: req.user?.id
  });
});

// Admin + Staff can access
router.get('/dashboard', isAdminOrStaff, (req: AuthRequest, res) => {
  res.json({ 
    message: 'access route granted',
    data: 'Sensitive dashboard data',
    user: req.user
  });
});

// Dynamic role checker
router.get('/messages', checkRole(['Admin', 'Staff']), (req: AuthRequest, res) => {
  res.json({ 
    message: 'get message',
    messages: ['Message 1', 'Message 2']
  });
});

// Delete message - Admin only
router.delete('/messages/:id', checkRole(['Admin']), (req: AuthRequest, res) => {
  res.json({ 
    message: 'delete message',
    deletedMessageId: req.params.id,
    deletedBy: req.user?.role
  });
});

export default router;