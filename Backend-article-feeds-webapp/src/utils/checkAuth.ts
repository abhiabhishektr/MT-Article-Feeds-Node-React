import { Request, Response } from 'express';
import sendResponse from '../utils/response';

export const checkUserAuthenticated = (req: Request, res: Response): boolean => {
    if (!req.user) {
        sendResponse(res, 401, 'Unauthorized');
        return false;
    }
    return true;
};
