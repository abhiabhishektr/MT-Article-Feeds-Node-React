// ArticleDetail.tsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  content: string;
  author: string;
  likes: string[];
  dislikes: string[];
  blocks: string[];
  images: string[];
  tags: string[];
}

const ArticleDetail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const article: Article = location.state?.article; // Get the article from the location state

  if (!article) {
    return <div>No article found</div>;
  }

  return (
    <div className="min-h-screen p-4">
      <button onClick={() => navigate(-1)} className="mb-4">
        Back to Dashboard
      </button>
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      {article.images.length > 0 && (
        <img src={article.images[0]} alt={article.title} className="w-full h-64 object-cover rounded mb-4" />
      )}
      <p className="text-sm">{article.description}</p>
      <p className="mt-2">{article.content}</p>
      <p className="mt-4">Author: {article.author}</p>
      <p className="mt-2">Category: {article.category}</p>
      {/* You can add more details or actions like buttons here */}
    </div>
  );
};

export default ArticleDetail;
