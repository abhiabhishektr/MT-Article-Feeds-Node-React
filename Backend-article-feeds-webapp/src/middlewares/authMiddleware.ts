import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwt';
import { IJwtPayload } from '../types/jwtPayload';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authorizationHeader = req.headers.authorization;
    
    if (!authorizationHeader || authorizationHeader.split(' ').length !== 2) {  
        res.status(403).json({ error: 'Unauthorized' });
        return;
    }

    const token = authorizationHeader.split(' ')[1];
    
    if (!token) {
        res.status(403).json({ error: 'Invalid token' });
        return;
    } 

    req.token = token;

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).json({ error: 'Invalid token' });
            return;
        }

        if (!decoded) {
            res.status(401).json({ error: 'Token verification failed' });
            return;
        }

        const payload = decoded as IJwtPayload;
        req.user = { id: payload.id, name: payload.name, email: payload.email };
        next();
    });
};