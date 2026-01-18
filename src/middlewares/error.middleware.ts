import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      error: error.message,
    });
  }

  console.error('Unexpected error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
};