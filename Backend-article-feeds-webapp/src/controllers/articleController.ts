import { Request, Response } from 'express';
import Article from '../models/article';
import User from '../models/user';
import sendResponse from '../utils/response';
import fs from 'fs';
import path from 'path';
import mongoose, { Schema } from 'mongoose';



export const createArticle = async (req: Request, res: Response): Promise<void> => {
    const { title, description, category, content, tags } = req.body;

    if (!req.user) {
        sendResponse(res, 401, 'Unauthorized');
        return;
    }

    try {
        const imagePaths = req.files ? (req.files as Express.Multer.File[]).map((file) => file.path) : [];

        const newArticle = new Article({
            title,
            description,
            category,
            content,
            author: req.user.id,
            images: imagePaths,
            tags: tags ? tags.split(',').map((tag: string) => tag.trim()) : [],
        });

        await newArticle.save();
        sendResponse(res, 201, 'Article created successfully', newArticle);
    } catch (error) {
        console.error('Error creating article:', error);
        sendResponse(res, 400, 'Error creating article');
    }
};

// Get Articles
export const getArticles = async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
        sendResponse(res, 401, 'Unauthorized');
        return;
    }

    try {
        const user = await User.findById(req.user.id);
        const preferences = user?.preferences || [];

        // Aggregation pipeline to fetch articles with author name
        const articles = await Article.aggregate([
            {
                $match: { category: { $in: preferences } } // Filter articles based on user preferences
            },
            {
                $lookup: {
                    from: 'users', // The name of the User collection
                    localField: 'author', // Field from the Article collection
                    foreignField: '_id', // Field from the User collection
                    as: 'authorDetails' // Name of the new array field to add
                }
            },
            {
                $unwind: { path: '$authorDetails', preserveNullAndEmptyArrays: true } // Unwind the author details
            },
            {
                $addFields: {
                    authorName: { $concat: ['$authorDetails.firstName', ' ', '$authorDetails.lastName'] } // Create authorName from first and last name
                }
            },
            {
                $project: {
                    title: 1,
                    description: 1,
                    content: 1,
                    category: 1,
                    likes: 1,
                    dislikes: 1,
                    blocks: 1,
                    images: 1,
                    tags: 1,
                    authorName: 1, // Include the new authorName field
                }
            }
        ]);

        console.log("articles: ", articles);

        // Map articles to include isLiked and isDisliked flags
        const articlesWithInteraction = articles.map(article => {
            const isLiked = article.likes.some((likeId: string) => likeId.toString() === req.user?.id.toString());
            const isDisliked = article.dislikes.some((dislikeId: string) => dislikeId.toString() === req.user?.id.toString());

            return {
                ...article,
                isLiked,
                isDisliked,
            };
        });

        console.log("articlesWithInteraction: ", articlesWithInteraction);
        sendResponse(res, 200, 'Articles fetched successfully', articlesWithInteraction);
    } catch (error) {
        console.error('Error fetching articles:', error);
        sendResponse(res, 500, 'Error fetching articles');
    }
};



export const getArticleById = async (req: Request, res: Response): Promise<void> => {
    
    const { id } = req.params;
    console.log("id: ", id);

    console.log("req.user: ", req.user);
    if (!req.user) {
        sendResponse(res, 401, 'Unauthorized');
        return;
    }

    try {
        const article = await Article.findById(id).populate('author', 'name');

        if (!article) {
            sendResponse(res, 404, 'Article not found');
            return;
        }

        // console.log("article: ", article);
        sendResponse(res, 200, 'Article fetched successfully', article);
    } catch (error) {
        console.error('Error fetching article:', error);
        sendResponse(res, 500, 'Error fetching article');
    }
};

export const getUserArticles = async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
        sendResponse(res, 401, 'Unauthorized');
        return;
    }

    try {
        const userArticles = await Article.find({ author: req.user.id });
        sendResponse(res, 200, 'User articles fetched successfully', userArticles);
    } catch (error) {
        sendResponse(res, 500, 'Error fetching user articles');
    }
};






export const interactWithArticle = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { action } = req.body;

    console.log("Request params (id):", id);
    console.log("Request body (action):", action);

    if (!req.user?.id) {
        console.log("Unauthorized access attempt");
        sendResponse(res, 401, 'Unauthorized');
        return;
    }

    try {
        const userId = new mongoose.Types.ObjectId(req.user.id);
        const articleId = new mongoose.Types.ObjectId(id);

        const article = await Article.findById(articleId);

        if (!article) {
            sendResponse(res, 404, 'Article not found');
            return;
        }

        console.log(`Performing action: ${action} by user: ${userId}`);

        // Use Schema.Types.ObjectId for proper typing
        // @ts-ignore
        const likes = article.likes.map(id =>
            // @ts-ignore
            mongoose.isObjectIdOrHexString(id) ? new mongoose.Types.ObjectId(id) : id
        );
        // @ts-ignore
        const dislikes = article.dislikes.map(id =>
            // @ts-ignore
            mongoose.isObjectIdOrHexString(id) ? new mongoose.Types.ObjectId(id) : id
        );
        // @ts-ignore   
        const userHasLiked = likes.some(id => id.equals(userId));
        // @ts-ignore
        const userHasDisliked = dislikes.some(id => id.equals(userId));

        switch (action) {
            case 'like':
                if (userHasLiked) {
                    // @ts-ignore  
                    article.likes = likes.filter(id => !id.equals(userId));
                } else {
                    if (userHasDisliked) {
                        // @ts-ignore  
                        article.dislikes = dislikes.filter(id => !id.equals(userId));
                    }
                    article.likes = [...likes, userId] as Schema.Types.ObjectId[];
                }
                break;

            case 'dislike':
                if (userHasDisliked) {
                    // @ts-ignore  
                    article.dislikes = dislikes.filter(id => !id.equals(userId));
                } else {
                    if (userHasLiked) {
                        // @ts-ignore  
                        article.likes = likes.filter(id => !id.equals(userId));
                    }
                    // @ts-ignore  
                    article.dislikes = [...dislikes, userId] as Schema.Types.ObjectId[];
                }
                break;

            case 'block':
                // @ts-ignore
                const blocks = article.blocks.map(id =>
                    // @ts-ignore
                    mongoose.isObjectIdOrHexString(id) ? new mongoose.Types.ObjectId(id) : id
                );
                // @ts-ignore  
                if (!blocks.some(id => id.equals(userId))) {
                    article.blocks = [...blocks, userId] as Schema.Types.ObjectId[];
                }
                break;

            default:
                sendResponse(res, 400, 'Invalid action. Use "like", "dislike", or "block"');
                return;
        }

        await article.save();

        console.log("Updated likes:", article.likes);
        console.log("Updated dislikes:", article.dislikes);

        sendResponse(res, 200, 'Interaction updated successfully', article);
    } catch (error) {
        console.error('Error interacting with article:', error);
        sendResponse(res, 500, 'Error interacting with article');
    }
};







const UPLOADS_DIR = path.join(__dirname, '../uploads');

export const updateArticle = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title, description, category, content, tags, existingImages } = req.body;


    if (!req.user) {
        sendResponse(res, 401, 'Unauthorized');
        return;
    }

    try {
        const existingArticle = await Article.findById(id);

        if (!existingArticle) {
            sendResponse(res, 404, 'Article not found');
            return;
        }

        const newImages = req.files ? (req.files as Express.Multer.File[]).map((file) => file.path) : [];

        // Determine if we have existingImages in the request body
        const currentExistingImages = existingImages
            ? Array.isArray(existingImages) ? existingImages : [existingImages]
            : [];

        let imagesToDelete: string[] = [];

        if (currentExistingImages.length === 0) {
            // No `existingImages` provided, so delete all existing images
            imagesToDelete = existingArticle.images;
        } else {
            // Delete images that are not in `currentExistingImages`
            const existingImagesSet = new Set(currentExistingImages);
            // @ts-ignore
            imagesToDelete = existingArticle.images.filter(image => !existingImagesSet.has(image));
        }

        // Delete images from uploads folder
        imagesToDelete.forEach((image) => {
            const imagePath = path.join(UPLOADS_DIR, image);
            fs.unlink(imagePath, (err) => {
                if (err && err.code !== 'ENOENT') {
                    console.error(`Failed to delete image ${image}:`, err);
                } else {
                    console.log(`Successfully deleted image: ${image}`);
                }
            });
        });

        // Prepare updates with new images
        const updates = {
            title: title || existingArticle.title,
            description: description || existingArticle.description,
            category: category || existingArticle.category,
            content: content || existingArticle.content,
            tags: tags ? tags.split(',').map((tag: string) => tag.trim()) : existingArticle.tags,
            images: [...currentExistingImages, ...newImages],
        };

        // Check total image count
        const totalImages = updates.images.length;

        if (totalImages < 2) {
            sendResponse(res, 400, 'At least two images are required');
            return;
        }

        const updatedArticle = await Article.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedArticle) {
            sendResponse(res, 404, 'Failed to update article');
            return;
        }

        sendResponse(res, 200, 'Article updated successfully', updatedArticle);
    } catch (error) {
        console.error('Error updating article:', error);
        sendResponse(res, 400, 'Error updating article');
    }
};






// Delete Article
export const deleteArticle = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const deletedArticle = await Article.findByIdAndDelete(id);
        if (!deletedArticle) {
            sendResponse(res, 404, 'Article not found');
            return;
        }
        sendResponse(res, 200, 'Article deleted successfully');
    } catch (error) {
        sendResponse(res, 500, 'Error deleting article');
    }
};
