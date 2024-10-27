// Backend-article-feeds-webapp/src/routes/userRoutes.ts
import express from 'express';
import { updatePreferences, getUserProfile, updatePassword, updateUserProfile, updateUserPassword } from '../controllers/userController';

const router = express.Router();

router.get('/', getUserProfile);
router.put('/profile', updateUserProfile);
router.put('/password', updateUserPassword);

router.put('/preferences', updatePreferences); 
router.put('/password', updatePassword); 

export default router;
