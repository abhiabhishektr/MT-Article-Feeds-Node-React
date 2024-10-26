// src/pages/DashboardPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleCard from '@/components/my/ArticleCard';
import sampleArticles from '@/utils/sampleArticles';
import { Article } from '@/types';


const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>(sampleArticles);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
      } catch (error) {
        console.error('Error fetching articles:', error);
        alert('Failed to fetch articles. Please try again.');
      }
    };

    fetchArticles();
  }, []);

  const handleArticleClick = (id: string) => {
    const article = articles.find(a => a.id === id);
    if (article) {
      navigate('/article-detail', { state: { article } });
    }
  };

  const handleLike = async (id: string) => {
    // Your like logic
  };

  const handleDislike = async (id: string) => {
    // Your dislike logic
  };

  const handleBlock = async (id: string) => {
    // Your block logic
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4">
      <h1 className="text-3xl font-extrabold mb-6">Article Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.isArray(articles) && articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onLike={handleLike}
            onDislike={handleDislike}
            onBlock={handleBlock}
            onEdit={() => handleArticleClick(article.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
