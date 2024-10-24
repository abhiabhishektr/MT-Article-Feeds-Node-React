// middleware/errorHandler.ts

import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error(err); // Log the error for debugging

  const status = err.status || 500; // Use the error's status or default to 500
  const message = err.message || 'Internal Server Error'; // Default error message

  // Send formatted error response
  res.status(status).json({
    success: false,
    message,
  });
};

export default errorHandler;
