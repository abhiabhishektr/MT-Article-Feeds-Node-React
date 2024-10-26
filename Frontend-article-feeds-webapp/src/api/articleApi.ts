// src/api/articleApi.ts

import { Article } from '@/types';
import api from './clientApi';

export interface ICreateArticle {
  id?: string;
  title: string;
  description: string;
  category: string;
  content: string;
  tags?: string[];
  images?: File[];
}

export const createArticle = async (articleData: ICreateArticle): Promise<void> => {
  const formData = new FormData();

  formData.append('title', articleData.title || '');
  formData.append('description', articleData.description || '');
  formData.append('category', articleData.category || '');
  formData.append('content', articleData.content || '');

  if (Array.isArray(articleData.tags)) {
    articleData.tags.forEach(tag => formData.append('tags', tag));
  }
  if (Array.isArray(articleData.images) && articleData.images.length > 0) {
    articleData.images.forEach(image => {
      formData.append('images', image);
    });
  }

  try {
    await api.post('/articles', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.error('Error creating article:', error);
    throw error;
  }
};

export const getArticleById = async (id: string): Promise<Article> => {
  try {
    const response = await api.get<Article>(`/articles/${id}`); 
    return response.data;
  } catch (error) {
    console.error('Error fetching article:', error);
    throw error; 
  }
}

// Get All Articles
export const getArticles = async (): Promise<Article[]> => {
  try {
    const response = await api.get<Article[]>('/articles');
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

// Get User's Articles
export const getUserArticles = async (): Promise<Article[]> => {
  try {
    const response = await api.get<Article[]>('/articles/user');
    return response.data;
  } catch (error) {
    console.error("Error fetching user's articles:", error);
    throw error;
  }
};

// Update Article
export const updateArticle = async (id: string, updatedData: Partial<Article>): Promise<void> => {
  try {
    await api.put(`/articles/${id}`, updatedData);
  } catch (error) {
    console.error('Error updating article:', error);
    throw error;
  }
};

// Delete Article
export const deleteArticle = async (id: string): Promise<void> => {
  try {
    await api.delete(`/articles/${id}`);
  } catch (error) {
    console.error('Error deleting article:', error);
    throw error;
  }
};

// Interact with Article (like, dislike, block)
export const interactWithArticle = async (id: string, action: 'like' | 'dislike' | 'block'): Promise<void> => {
  try {
    await api.post(`/articles/${id}/interact`, { action });
  } catch (error) {
    console.error(`Error interacting with article: ${action}`, error);
    throw error;
  }
};
