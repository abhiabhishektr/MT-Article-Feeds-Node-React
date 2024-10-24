import React from 'react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const handleLike = () => {
    // Handle like action
  };

  const handleDislike = () => {
    // Handle dislike action
  };

  const handleBlock = () => {
    // Handle block action
  };

  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.description}</p>
      <button onClick={handleLike}>Like</button>
      <button onClick={handleDislike}>Dislike</button>
      <button onClick={handleBlock}>Block</button>
    </div>
  );
};

export default ArticleCard;
