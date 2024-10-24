import { Request, Response } from 'express';
import Article from '../models/article';
import User from '../models/user';

// Create Article
// Create Article
export const createArticle = async (req: Request, res: Response): Promise<void> => {
    const { title, description, category, content, tags } = req.body; // Include description and tags

    // Check if user is authenticated
    if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    try {
        // Check if files are uploaded
        const imagePaths = req.files ? (req.files as Express.Multer.File[]).map((file) => file.path) : []; // Get the file paths or set to empty array

        // Create a new article instance
        const newArticle = new Article({
            title,
            description, // Save description
            category,
            content,
            author: req.user.id,
            images: imagePaths, // Store image paths in the article
            tags: tags ? tags.split(',').map((tag: string) => tag.trim()) : [] // Handle tags, assuming they are passed as a comma-separated string
        });

        // Save the new article to the database
        await newArticle.save();
        res.status(201).json(newArticle); // Respond with the newly created article
    } catch (error) {
        console.error('Error creating article:', error); // Log the error for debugging
        res.status(400).json({ error: 'Error creating article' }); // Return error response
    }
};


// Get Articles
export const getArticles = async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    try {
        const user = await User.findById(req.user.id);
        const preferences = user?.preferences || [];

        // Find articles based on user preferences
        const articles = await Article.find({ category: { $in: preferences } }).populate('author', 'name');
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching articles' });
    }
};

export const getUserArticles = async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    try {
        // Find articles created by the authenticated user
        const userArticles = await Article.find({ author: req.user.id }).populate('author', 'name');
        res.json(userArticles);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user articles' });
    }
};


// Like/Dislike/Block Article
export const interactWithArticle = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { action } = req.body; // "like", "dislike", "block"

    if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    try {
        const article = await Article.findById(id);
        if (!article) {
            res.status(404).json({ error: 'Article not found' });
            return;
        }

        switch (action) {
            case 'like':
                if (!article.likes.includes(req.user.id)) {
                    article.likes.push(req.user.id);
                }
                break;
            case 'dislike':
                if (!article.dislikes.includes(req.user.id)) {
                    article.dislikes.push(req.user.id);
                }
                break;
            case 'block':
                if (!article.blocks.includes(req.user.id)) {
                    article.blocks.push(req.user.id);
                }
                break;
            default:
                res.status(400).json({ error: 'Invalid action. Use "like", "dislike", or "block"' });
                return;
        }

        await article.save();
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: 'Error interacting with article' });
    }
};


// Update Article
export const updateArticle = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedArticle = await Article.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedArticle) {
            res.status(404).json({ error: 'Article not found' });
            return;
        }
        res.json(updatedArticle);
    } catch (error) {
        res.status(400).json({ error: 'Error updating article' });
    }
};

// Delete Article
export const deleteArticle = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const deletedArticle = await Article.findByIdAndDelete(id);
        if (!deletedArticle) {
            res.status(404).json({ error: 'Article not found' });
            return;
        }
        res.json({ message: 'Article deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting article' });
    }
};
