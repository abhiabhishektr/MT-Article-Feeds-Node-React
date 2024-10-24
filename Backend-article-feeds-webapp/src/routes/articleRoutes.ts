// Backend-article-feeds-webapp/src/routes/articleRoutes.ts
import express from 'express';
import {
    createArticle,
    getArticles,
    updateArticle,
    deleteArticle,
    interactWithArticle,
    getUserArticles,
} from '../controllers/articleController';
import { authMiddleware } from '../middlewares/authMiddleware';
import upload from '../middlewares/upload';

const router = express.Router();

// Article Routes
router.post('/', authMiddleware, upload.array('images'), createArticle); // Accept multiple images
router.get('/', getArticles);
router.get('/articles/user', authMiddleware, getUserArticles);
router.put('/:id', authMiddleware, updateArticle);
router.delete('/:id', authMiddleware, deleteArticle);
router.post('/:id/interact', authMiddleware, interactWithArticle);

export default router;
