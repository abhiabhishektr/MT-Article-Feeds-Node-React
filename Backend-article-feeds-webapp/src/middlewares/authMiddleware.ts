import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwt';
import { IJwtPayload } from '../types/jwtPayload';
import  sendResponse  from '../utils/response';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authorizationHeader = req.headers.authorization;
    
    if (!authorizationHeader || authorizationHeader.split(' ').length !== 2) {  
        sendResponse(res, 403, 'Unauthorized');
        return;
    }

    const token = authorizationHeader.split(' ')[1];
    
    if (!token) {
        sendResponse(res, 403, 'Invalid token');
        return;
    } 

    req.token = token;

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            sendResponse(res, 401, 'Invalid token');
            return;
        }

        if (!decoded) {
            sendResponse(res, 401, 'Token verification failed');
            return;
        }

        const payload = decoded as IJwtPayload;
        req.user = { id: payload.id, name: payload.name, email: payload.email };
        next();
    });
};
 