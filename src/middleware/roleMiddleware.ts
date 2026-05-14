import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';

// Role-Based Access Control
export const checkRole = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    // Check if user exists (should be set by authMiddleware)
    if (!req.user) {
      return res.status(401).json({ 
        message: 'access route denied' 
      });
    }
    
    // Check if user has required role
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'access route denied' 
      });
    }
    
    next();
  };
};

// Specific role checkers for convenience
export const isAdmin = checkRole(['Admin']);
export const isAdminOrStaff = checkRole(['Admin', 'Staff']);
export const isAnyAuthenticated = checkRole(['Admin', 'Administrator', 'Staff']);