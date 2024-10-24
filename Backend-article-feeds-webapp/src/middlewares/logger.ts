// src/middlewares/logger.ts
import { Request, Response, NextFunction } from 'express';

const logger = (req: Request, res: Response, next: NextFunction) => {
  // console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  console.log(`${req.method} ${req.url}`);
  next(); 
};

export default logger;
