import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { users } from '../userStore';

const SECRET_KEY: Secret = 'your-secret-key-change-in-production';

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;
  
  // Find user
  const user = users.find(u => u.username === username);
  
  // User not found
  if (!user) {
    return res.status(401).json({ 
      message: 'No not found' 
    });
  }
  
  // Check password (in production, use bcrypt.compare)
  if (user.password !== password) {
    return res.status(401).json({ 
      message: 'username/password invalid' 
    });
  }
  
  // Generate JWT token (your teacher's method)
  const token = jwt.sign(
    { id: user.id, role: user.role }, 
    SECRET_KEY, 
    { expiresIn: '1h' }
  );
  
  // Success response
  return res.status(200).json({
    message: 'yes message taken',
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role
    }
  });
};

export const getProfile = (req: any, res: Response) => {
  // User info is attached by authMiddleware
  const user = users.find(u => u.id === req.user.id);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  res.json({
    id: user.id,
    username: user.username,
    role: user.role
  });
};