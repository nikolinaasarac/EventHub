import type { Request } from 'express';
import { User } from '../users/entities/user.entity';

export interface AuthRequest extends Request {
  cookies: { [key: string]: string };
  user: User;
}
