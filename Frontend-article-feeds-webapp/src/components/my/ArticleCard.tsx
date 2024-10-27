
// ArticleCard.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Article } from '@/types';
import { BASE_URL } from '@/config';

interface ArticleCardProps {
  article: Article;
  onLike?: (id: string) => void;
  onDislike?: (id: string) => void;
  onBlock?: (id: string) => void;
  onEdit?: (id: string) => void;
  onArticleClick?: (id: string) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onLike,
  onDislike,
  onBlock,
  onEdit,
  onArticleClick
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {article.images.length > 0 && (
        <img 
          src={`${BASE_URL}/${article.images[0]}`} 
          alt={article.title} 
          className="w-full h-48 object-cover rounded" 
          onClick={() => onArticleClick && onArticleClick(article._id || '')}
        />
      )}
      <h2 className="font-bold text-lg mt-2">{article.title}</h2>
      <p className="text-sm">{article.description}</p>
      <div className="mt-4 flex justify-between">
        {onLike && (
          <Button
            onClick={() => onLike(article._id || '')}
            variant={article.isLiked ? "secondary" : "default"}
            className={article.isLiked ? "bg-blue-500 text-white" : ""}
          >
            👍 {article.likes.length}
          </Button>
        )}
        {onDislike && (
          <Button
            onClick={() => onDislike(article._id || '')}
            variant={article.isDisliked ? "destructive" : "default"}
            className={article.isDisliked ? "bg-red-500 text-white" : ""}
          >
            👎 {article.dislikes.length}
          </Button>
        )}
        {onBlock && (
          <Button 
            onClick={() => onBlock(article._id || '')} 
            variant="destructive"
          >
            Block
          </Button>
        )}
        {onEdit && (
          <Button 
            onClick={() => onEdit(article._id || '')}
          >
            Edit
          </Button>
        )}
      </div>
    </div>
  );
};

export default ArticleCard;