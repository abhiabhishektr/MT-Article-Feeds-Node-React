import { Request, Response } from 'express';
import User from '../models/user';

// Update User Preferences
export const updatePreferences = async (req: Request, res: Response): Promise<void> => {
    const { preferences, action } = req.body;

    if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return; // Ensure we return after sending a response
    }

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        if (action === 'add') {
            user.preferences = Array.from(new Set([...user.preferences, ...preferences])); // Avoid duplicates
        } else if (action === 'delete') {
            user.preferences = user.preferences.filter((pref: string) => !preferences.includes(pref));
        } else {
            res.status(400).json({ error: 'Invalid action. Use "add" or "delete"' });
            return; // Ensure we return after sending a response
        }

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: 'Error updating preferences' });
    }
};

// Get User Profile
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return; // Ensure we return after sending a response
    }

    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return; // Handle case where user is not found
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user profile' });
    }
};

// Update User Password (New Functionality)
export const updatePassword = async (req: Request, res: Response): Promise<void> => {
    const { oldPassword, newPassword } = req.body;

    if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) {
            res.status(400).json({ error: 'Old password is incorrect' });
            return;
        }

        user.password = newPassword; 
        await user.save();
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating password' });
    }
};
