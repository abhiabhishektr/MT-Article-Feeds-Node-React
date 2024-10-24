
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwt';

export const generateToken = (userId: string) => {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1d' });
};
