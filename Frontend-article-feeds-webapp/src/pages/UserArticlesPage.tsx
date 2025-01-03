// src/pages/UserArticlesPage.tsx
import React, { useEffect, useState } from 'react';
import ArticleCard from '@/components/my/ArticleCard';
import { Article } from '@/types';
import { useNavigate } from 'react-router-dom';
import { getUserArticles } from '@/api/articleApi';

const UserArticlesPage: React.FC = () => {
    const [userArticles, setUserArticles] = useState<Article[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUserArticles = async () => {
            try {
                getUserArticles().then((response) => {
                    setUserArticles(response.data); 
                })
                // setUserArticles(response.data);
            } catch (error) {
                console.error('Error fetching user articles:', error);
                alert('Failed to fetch articles. Please try again.');
            }
        };

        fetchUserArticles();
    }, []);

    const handleEdit = (id: string) => {
        navigate('/edit-article/'+id);
    };
    const handleArticleClick = (id: string) => {
        const article = userArticles.find(a => a._id === id);
        if (article) {
          navigate('/article-detail', { state: { article } });
        }
      };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4">
            <h1 className="text-3xl font-extrabold mb-6">Your Articles</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.isArray(userArticles) && userArticles.map((article) => (
                    <ArticleCard
                        key={article.id}
                        article={article}
                        onEdit={handleEdit} 
                        onArticleClick={handleArticleClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default UserArticlesPage;
