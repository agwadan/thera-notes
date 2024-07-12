import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { UserDocument } from '../models/User';
import { UserRepository } from '../repositories/userRepository';
import dotenv from 'dotenv';

dotenv.config();

const userRepository = new UserRepository();
const JWT_SECRET = process.env.JWT_SECRET || '';

export class AuthController {
  static async register(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword });
      await userRepository.save(user);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'An unknown error occurred' });
      }
    }
  }

  static async login(req: Request, res: Response) {
    const { username, password } = req.body;
    console.log('====================================');
    console.log(req.body);
    console.log('====================================');
    try {
      const user = await userRepository.findByUsername(username);
      if (!user || !await bcrypt.compare(password, user.password)) {
        throw new Error('Invalid username or password');
      }
      const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'An unknown error occurred' });
      }
    }
  }
}
