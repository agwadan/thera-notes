import { Request } from 'express';
import { UserDocument } from '../../models/user';

interface User {
  id: string;
  username: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
} 

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; username: string };
    }
  }
}