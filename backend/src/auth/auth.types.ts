import type { Request } from 'express';

export interface AuthRequest extends Request {
  cookies: { [key: string]: string };
}
