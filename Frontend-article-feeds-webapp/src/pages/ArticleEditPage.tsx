import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Article } from '../types';

const ArticleEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [articleData, setArticleData] = useState<Article>({
    id: '',
    title: '',
    description: '',
    content: '',
    category: '',
    tags: [],
    likes: 0,
    dislikes: 0,
    blocks: 0
  });

  useEffect(() => {
    const fetchArticle = async () => {
      const response = await axios.get(`/api/articles/${id}`);
      setArticleData(response.data);
    };
    fetchArticle();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.name === 'tags') {
      setArticleData({ ...articleData, tags: e.target.value.split(',') });
    } else {
      setArticleData({ ...articleData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`/api/articles/${id}`, articleData);
      // Redirect or show success message
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={articleData.title} onChange={handleChange} placeholder="Article Title" required />
      <textarea name="description" value={articleData.description} onChange={handleChange} placeholder="Description" required />
      <input name="category" value={articleData.category} onChange={handleChange} placeholder="Category" required />
      <textarea name="content" value={articleData.content} onChange={handleChange} placeholder="Content" required />
      <input name="tags" value={articleData.tags.join(',')} onChange={handleChange} placeholder="Tags (comma separated)" required />
      <button type="submit">Update Article</button>
    </form>
  );
};

export default ArticleEditPage;
