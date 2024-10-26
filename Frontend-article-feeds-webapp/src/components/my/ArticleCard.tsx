// src/components/ArticleCard.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Article } from '@/types'; 



interface ArticleCardProps {
  article: Article;
  onLike?: (id: string) => void;
  onDislike?: (id: string) => void;
  onBlock?: (id: string) => void;
  onEdit?: (id: string) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onLike,
  onDislike,
  onBlock,
  onEdit,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {article.images.length > 0 && (
        <img src={article.images[0]} alt={article.title} className="w-full h-48 object-cover rounded" />
      )}
      <h2 className="font-bold text-lg mt-2">{article.title}</h2>
      <p className="text-sm">{article.description}</p>
      <div className="mt-4 flex justify-between">
        {onLike && <Button onClick={() => onLike(article.id)}>👍 {article.likes.length}</Button>}
        {onDislike && <Button onClick={() => onDislike(article.id)}>👎 {article.dislikes.length}</Button>}
        {onBlock && <Button onClick={() => onBlock(article.id)} variant="destructive">Block</Button>}
        {onEdit && <Button onClick={() => onEdit(article.id)}>Edit</Button>}
      </div>
    </div>
  );
};

export default ArticleCard;
