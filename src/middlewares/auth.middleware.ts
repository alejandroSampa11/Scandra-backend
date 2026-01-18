import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { BadRequestError } from '../errors/AppError';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new BadRequestError('No token provided');
    }

    const token = authHeader.substring(7);
    const { userId } = authService.verifyToken(token);

    req.userId = userId;
    next();
  } catch (error) {
    next(error);
  }
};