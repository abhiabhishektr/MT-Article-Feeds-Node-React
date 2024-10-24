// Backend-article-feeds-webapp/src/routes/userRoutes.ts
import express from 'express';
import { updatePreferences, getUserProfile, updatePassword } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.put('/preferences', authMiddleware, updatePreferences);
router.get('/profile', authMiddleware, getUserProfile);
router.put('/password', authMiddleware, updatePassword); 

export default router;
