// Backend-article-feeds-webapp/src/routes/articleRoutes.ts
import express from 'express';
import {
    createArticle,
    getArticles,
    updateArticle,
    getArticleById,
    deleteArticle,
    interactWithArticle,
    getUserArticles,
} from '../controllers/articleController';
import upload from '../middlewares/upload';

const router = express.Router();

// Article Routes
router.post('/', upload.array('images'), createArticle);
router.get('/', getArticles);
router.get('/user', getUserArticles);
router.get('/:id', getArticleById);
router.put('/:id', upload.array('images'), updateArticle);
router.delete('/:id', deleteArticle);
router.post('/:id/interact', interactWithArticle);

export default router;
