// src/pages/DashboardPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleCard from '@/components/my/ArticleCard';
import sampleArticles from '@/utils/sampleArticles';
import { Article } from '@/types';
import { getArticles, interactWithArticle } from '@/api/articleApi';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>(sampleArticles);
  const userId = 'userId'; // Replace with actual user ID from your auth system

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await getArticles();
        console.log("response: ", response.data);
        // Add isLiked and isDisliked flags based on user's previous interactions
        const articlesWithInteractions = response.data.map((article: Article) => ({
          ...article,
          isLiked: article.likes.includes(userId),
          isDisliked: article.dislikes.includes(userId)
        }));
        setArticles(articlesWithInteractions);
      } catch (error) {
        console.error('Error fetching articles:', error);
        alert('Failed to fetch articles. Please try again.');
      }
    };

    fetchArticles();
  }, []);

  const handleArticleClick = (id: string) => {
    const article = articles.find(a => a._id === id);
    if (article) {
      navigate('/article-detail', { state: { article } });
    }
  };
  

  // const EditArticleClick = (id: string) => {
  //     navigate('/edit-article/'+id);
  // };

  const handleLike = async (id: string) => {
    try {
      const article = articles.find(a => a._id === id);
      if (!article) return;

      const success = await interactWithArticle(id, 'like');
      if (success) {
        setArticles(prevArticles =>
          prevArticles.map(article => {
            if (article._id === id) {
              // If already liked, remove like
              if (article.isLiked) {
                return {
                  ...article,
                  isLiked: false,
                  likes: article.likes.filter(uid => uid !== userId)
                };
              }
              // If disliked, remove dislike and add like
              if (article.isDisliked) {
                return {
                  ...article,
                  isLiked: true,
                  isDisliked: false,
                  likes: [...article.likes, userId],
                  dislikes: article.dislikes.filter(uid => uid !== userId)
                };
              }
              // If neither liked nor disliked, add like
              return {
                ...article,
                isLiked: true,
                likes: [...article.likes, userId]
              };
            }
            return article;
          })
        );
      } else {
        alert('Failed to like the article. Please try again.');
      }
    } catch (error) {
      console.error('Error liking article:', error);
    }
  };

  const handleDislike = async (id: string) => {
    try {
      const article = articles.find(a => a._id === id);
      if (!article) return;

      const success = await interactWithArticle(id, 'dislike');
      if (success) {
        setArticles(prevArticles =>
          prevArticles.map(article => {
            if (article._id === id) {
              // If already disliked, remove dislike
              if (article.isDisliked) {
                return {
                  ...article,
                  isDisliked: false,
                  dislikes: article.dislikes.filter(uid => uid !== userId)
                };
              }
              // If liked, remove like and add dislike
              if (article.isLiked) {
                return {
                  ...article,
                  isLiked: false,
                  isDisliked: true,
                  likes: article.likes.filter(uid => uid !== userId),
                  dislikes: [...article.dislikes, userId]
                };
              }
              // If neither liked nor disliked, add dislike
              return {
                ...article,
                isDisliked: true,
                dislikes: [...article.dislikes, userId]
              };
            }
            return article;
          })
        );
      } else {
        alert('Failed to dislike the article. Please try again.');
      }
    } catch (error) {
      console.error('Error disliking article:', error);
    }
  };

  const handleBlock = async (id: string) => {
    try {
      if (window.confirm("Are you sure you want to block this article?")) {
        await interactWithArticle(id, 'block');
        setArticles(prevArticles => prevArticles.filter(article => article._id !== id));
      }
    } catch (error) {
      console.error('Error blocking article:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4">
      <h1 className="text-3xl font-extrabold mb-6">Article Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.isArray(articles) && articles.map((article) => (
          <ArticleCard
            key={article._id}
            article={article}
            onLike={handleLike}
            onDislike={handleDislike}
            onBlock={handleBlock}
            // onEdit={() => {
            //   if (!article._id) return console.log("no article id");
            //   EditArticleClick(article._id);
            // }}
            onArticleClick={handleArticleClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
