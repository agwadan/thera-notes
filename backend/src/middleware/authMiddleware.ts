import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const SECRET_KEY = "your_secret_key";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded: any = jwt.verify(token, SECRET_KEY);
    (req as any).user = await User.findByPk(decoded.id);
    if (!req.user) return res.status(401).json({ message: 'Invalid token' });
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
