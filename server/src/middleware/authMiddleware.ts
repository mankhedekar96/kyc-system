import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  id: number;
  role: string;
}

interface ClientRequest extends Request {
  user?: {
    id: number;
    role: string;
  };
  headers: any;
}


export const isAuthenticated = (req: ClientRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return; // Ensure no further execution
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};


export const isAdmin = (req: ClientRequest, res: Response, next: NextFunction): void => {
  if (req.user?.role !== 'admin') {
    res.status(403).json({ message: 'Admin access required' });
    return; // Ensure no further execution
  }
  next();
};

export default { isAdmin, isAuthenticated };
