import { Request, Response } from 'express';
import User from '../models/user';
import sendResponse from '../utils/response';

// Update User Preferences
export const updatePreferences = async (req: Request, res: Response): Promise<void> => {
    const { preferences, action } = req.body;

    if (!req.user) {
        sendResponse(res, 401, 'Unauthorized');
        return;
    }

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            sendResponse(res, 404, 'User not found');
            return;
        }

        if (action === 'add') {
            user.preferences = Array.from(new Set([...user.preferences, ...preferences])); // Avoid duplicates
        } else if (action === 'delete') {
            user.preferences = user.preferences.filter((pref: string) => !preferences.includes(pref));
        } else {
            sendResponse(res, 400, 'Invalid action. Use "add" or "delete"');
            return;
        }

        const updatedUser = await user.save();
        sendResponse(res, 200, 'Preferences updated successfully', updatedUser);
    } catch (error) {
        sendResponse(res, 400, 'Error updating preferences');
    }
};

// Get User Profile
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
        sendResponse(res, 401, 'Unauthorized');
        return;
    }

    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password
        if (!user) {
            sendResponse(res, 404, 'User not found');
            return;
        }
        sendResponse(res, 200, 'User profile retrieved successfully', user);
    } catch (error) {
        sendResponse(res, 500, 'Error fetching user profile');
    }
};

// Update User Password (New Functionality)
export const updatePassword = async (req: Request, res: Response): Promise<void> => {
    const { oldPassword, newPassword } = req.body;

    if (!req.user) {
        sendResponse(res, 401, 'Unauthorized');
        return;
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            sendResponse(res, 404, 'User not found');
            return;
        }

        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) {
            sendResponse(res, 400, 'Old password is incorrect');
            return;
        }

        user.password = newPassword; 
        await user.save();
        sendResponse(res, 200, 'Password updated successfully');
    } catch (error) {
        sendResponse(res, 500, 'Error updating password');
    }
};
