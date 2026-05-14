import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const SECRET_KEY: Secret = 'your-secret-key-change-in-production';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const authMiddleware = (
  req: AuthRequest, 
  res: Response, 
  next: NextFunction
) => {
  // Get token from header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  // Check if token exists
  if (!token) {
    return res.status(401).json({ 
      message: 'not valid + token' 
    });
  }
  
  try {
    // Verify token (your teacher's method)
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    
    // Attach user info to request
    req.user = {
      id: decoded.id as string,
      role: decoded.role as string
    };
    
    next(); // Pass to next middleware or route
  } catch (error) {
    return res.status(403).json({ 
      message: 'not valid + token' 
    });
  }
};